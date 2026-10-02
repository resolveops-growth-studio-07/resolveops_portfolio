import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CaretRight } from '@phosphor-icons/react';
import { services } from '../data/content';
import ServiceVisual from './ServiceVisual';
import './ServiceCardStage.css';

export default function ServiceCardStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalCards = services.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, totalCards - 1)));
  }, [totalCards]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!stageRef.current?.contains(document.activeElement) &&
          document.activeElement !== stageRef.current) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  // Scroll-driven progression on desktop
  useEffect(() => {
    if (isMobile) return;

    const stage = stageRef.current;
    if (!stage) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const stageHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress through the stage
        const scrollProgress = (-rect.top) / (stageHeight - viewportHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        const newIndex = Math.round(clampedProgress * (totalCards - 1));
        
        setActiveIndex(prev => {
          if (prev !== newIndex) return newIndex;
          return prev;
        });
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, totalCards]);

  if (isMobile) {
    return (
      <section className="service-stage-section section" aria-label="Our services">
        <div className="container">
          <div className="stage-header">
            <h2 className="stage-title">What we do</h2>
            <Link to="/services" className="btn btn-ghost stage-view-all">
              View all services <CaretRight size={14} weight="bold" />
            </Link>
          </div>
          <div className="mobile-cards">
            {services.map((service, i) => (
              <div key={service.id} className="mobile-service-card">
                <div className="mobile-card-visual">
                  <ServiceVisual serviceId={service.id} size="small" />
                </div>
                <div className="mobile-card-content">
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
                    className="btn btn-ghost card-cta"
                  >
                    Explore service <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={stageRef}
      className="service-stage-section"
      aria-label="Our services"
      tabIndex={0}
      style={{ height: `${totalCards * 100}vh` }}
    >
      <div className="stage-sticky">
        <div className="container">
          <div className="stage-header">
            <h2 className="stage-title">What we do</h2>
            <Link to="/services" className="btn btn-ghost stage-view-all">
              View all services <CaretRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="stage-viewport">
            <div className="cards-container">
              {services.map((service, i) => {
                const offset = i - activeIndex;
                const isActive = offset === 0;
                const absOffset = Math.abs(offset);
                
                // Card transforms for the arc effect
                const rotateY = offset * 25;
                const translateX = offset * 320;
                const translateZ = -absOffset * 200;
                const scale = isActive ? 1 : Math.max(0.7, 1 - absOffset * 0.15);
                const opacity = absOffset > 2 ? 0 : isActive ? 1 : 0.4;

                return (
                  <div
                    key={service.id}
                    className={`stage-card ${isActive ? 'active' : ''}`}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex: totalCards - absOffset,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    aria-hidden={!isActive}
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
                        tabIndex={isActive ? 0 : -1}
                      >
                        Explore service <ArrowRight size={14} weight="bold" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="stage-controls">
            <div className="stage-counter">
              <span className="counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="counter-separator">/</span>
              <span className="counter-total">{String(totalCards).padStart(2, '0')}</span>
            </div>

            <div className="stage-progress">
              <div
                className="progress-fill"
                style={{ width: `${((activeIndex + 1) / totalCards) * 100}%` }}
              />
            </div>

            <div className="stage-nav-buttons">
              <button
                className="stage-nav-btn"
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous service"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
              <button
                className="stage-nav-btn"
                onClick={next}
                disabled={activeIndex === totalCards - 1}
                aria-label="Next service"
              >
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
