import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CaretRight } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { services } from '../data/content';
import ServiceVisual from './ServiceVisual';
import './ServiceCardStage.css';

/*
  ═══════════════════════════════════════════════════════════════
  ServiceCardStage — GSAP ScrollTrigger-driven two-card layout

  Architecture:
    The section is pinned by ScrollTrigger while the user scrolls.
    A horizontal `.cards-track` holds all 6 cards in a flex row.
    GSAP tweens the track's x position based on scroll progress.
    Two cards are visible at any time through the clipping viewport.

  Scroll math:
    6 cards → 5 visible pairs → 4 transitions between them.
    Each transition consumes ~600px of scroll → end: "+=2400".
    progress 0 → 1 maps to pair 01+02 → pair 05+06.
  ═══════════════════════════════════════════════════════════════
*/

// Register GSAP plugins (idempotent — safe to call multiple times)
gsap.registerPlugin(ScrollTrigger);

const TOTAL    = services.length;  // 6
const PAIRS    = TOTAL - 1;        // 5  (01+02, 02+03, …, 05+06)
const STEPS    = PAIRS - 1;        // 4 transitions
const GAP      = 32;               // px gap between cards (matches CSS)
const SCROLL_PER_STEP = 600;       // px of scroll per card transition

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export default function ServiceCardStage() {
  // ── Refs ────────────────────────────────────────────────────
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);

  // ── Update active/secondary classes + progress bar ─────────
  const lastPair = useRef(-1);

  const updateUI = useCallback((progress: number) => {
    // progress: 0 → 1 over the entire scroll range
    // Map to pair index: 0..STEPS
    const pairProg = progress * STEPS;
    const pairIdx  = clamp(Math.round(pairProg), 0, STEPS);

    // Progress bar (direct DOM, no React re-render)
    if (progressRef.current) {
      progressRef.current.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // Counter (only on pair change)
    if (pairIdx !== lastPair.current) {
      lastPair.current = pairIdx;
      if (counterRef.current) {
        counterRef.current.textContent = String(pairIdx + 1).padStart(2, '0');
      }
    }

    // Active / secondary class toggle on cards
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      // The left-slot card index at this progress
      const leftIdx  = pairIdx;
      const rightIdx = pairIdx + 1;

      const isActive    = i === leftIdx;
      const isSecondary = i === rightIdx;

      card.classList.toggle('is-active', isActive);
      card.classList.toggle('is-secondary', isSecondary);
    });
  }, []);

  // ── GSAP ScrollTrigger setup ────────────────────────────────
  useGSAP(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // Calculate how far the track needs to move:
    // Each step moves the track left by one card width + gap.
    // Card width = calc(50% - 16px) → we compute it from the first card.
    const firstCard = cardRefs.current[0];
    if (!firstCard) return;
    const cardW = firstCard.offsetWidth;
    const stride = cardW + GAP;
    const totalShift = stride * STEPS; // pixels to move left

    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,                         // pin the section
        scrub: 0.6,                        // smooth 0.6s catch-up
        start: 'top top',                  // pin starts when top hits viewport top
        end: `+=${SCROLL_PER_STEP * STEPS}`,  // total scroll distance
        anticipatePin: 1,                  // smooths the pin start
        invalidateOnRefresh: true,         // recalc on resize
        onUpdate: (self) => {
          updateUI(self.progress);
        },
      },
    });

    // Tween the track's x position from 0 to -totalShift
    tl.to(track, {
      x: -totalShift,
      ease: 'none',           // linear — scroll position = animation position
      duration: 1,            // normalized; scrub handles actual timing
    });

    // Initial UI state
    updateUI(0);

    // Cleanup is handled automatically by useGSAP
  }, {
    scope: sectionRef,          // scopes gsap selectors to this element
    dependencies: [],           // run once on mount
  });

  // ── Render ──────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="service-stage"
      aria-label="Our services"
    >
      <div className="container stage-inner">

        {/* Header */}
        <div className="stage-header">
          <h2 className="stage-title">What we do</h2>
          <Link to="/services" className="btn btn-ghost stage-view-all">
            View all services <CaretRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Card viewport — clips the track as it slides */}
        <div className="stage-viewport">
          {/*
            Cards track — a flex row of all 6 cards.
            GSAP translates this container horizontally.
            Width = 6 × cardWidth + 5 × gap.
          */}
          <div ref={trackRef} className="cards-track">
            {services.map((service, i) => (
              <div
                key={service.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`stage-card${i === 0 ? ' is-active' : i === 1 ? ' is-secondary' : ''}`}
                role="group"
                aria-label={`Service ${service.number}: ${service.title}`}
              >
                <div className="card-visual-wrapper">
                  <ServiceVisual serviceId={service.id} size="large" />
                </div>
                <div className="card-content">
                  <span className="card-number">{service.number}</span>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.shortDescription}</p>
                  <div className="card-capabilities">
                    {service.capabilities.map((cap) => (
                      <span key={cap} className="capability-tag">{cap}</span>
                    ))}
                  </div>
                  <Link
                    to={`/services#${service.id}`}
                    className="btn btn-secondary card-cta"
                    tabIndex={0}
                  >
                    Explore service <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className="stage-controls">
          <div className="stage-counter">
            <span ref={counterRef} className="counter-current">01</span>
            <span className="counter-separator">/</span>
            <span className="counter-total">{String(TOTAL).padStart(2, '0')}</span>
          </div>

          <div className="stage-progress">
            <div
              ref={progressRef}
              className="progress-fill"
              style={{ width: '0%' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
