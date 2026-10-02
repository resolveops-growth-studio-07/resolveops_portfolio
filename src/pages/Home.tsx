import { Link } from 'react-router-dom';
import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react';
import { brand, projects, processSteps } from '../data/content';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import ServiceCardStage from '../components/ServiceCardStage';
import ProjectCard from '../components/ProjectCard';
import './Home.css';

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <div className="container hero-container">
          <Reveal delay={100} direction="none">
            <span className="hero-eyebrow">
              {brand.name} / {brand.subtitle}
            </span>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="hero-heading">
              We Design.<br />
              We Develop.<br />
              We <span className="text-accent">Grow.</span>
            </h1>
          </Reveal>

          <Reveal delay={360}>
            <p className="hero-subtext">{brand.heroSubtext}</p>
          </Reveal>

          <Reveal delay={480} direction="none">
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start a project <ArrowRight size={16} weight="bold" />
              </Link>
              <Link to="/work" className="btn btn-secondary btn-lg">
                Explore our work
              </Link>
            </div>
          </Reveal>

          <Reveal delay={560} direction="none">
            <a href={`mailto:${brand.email}`} className="hero-email">
              <EnvelopeSimple size={16} weight="bold" />
              {brand.email}
            </a>
          </Reveal>
        </div>

        {/* Subtle gradient accent */}
        <div className="hero-gradient" aria-hidden="true" />
      </section>

      {/* ── Studio Introduction ───────────────────── */}
      <section className="section studio-intro" aria-label="About us">
        <div className="container">
          <div className="intro-layout">
            <Reveal>
              <div className="intro-label">The Studio</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="intro-heading">
                We bring design, development, marketing, automation, and analytics together — 
                <span className="text-accent"> built around your business goals.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="intro-body">
                ResolveOPS is a freelance community that works with businesses at every stage of their digital journey. 
                Whether you're launching your first website or scaling with automation and analytics, our team handles 
                the technical work so you can focus on running your business.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Services — Animated Stage ─────────────── */}
      <ServiceCardStage />

      {/* ── Selected Work ─────────────────────────── */}
      <section className="section work-section" aria-label="Selected work">
        <div className="container">
          <SectionHeading
            title="Selected work"
            subtitle="Real projects, live websites — built for businesses that needed a clear, professional web presence."
          />
          <div className="work-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <Reveal delay={240}>
            <div className="work-cta">
              <Link to="/work" className="btn btn-secondary">
                View all projects <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Process ───────────────────────────────── */}
      <section className="section process-section" aria-label="Our process">
        <div className="container">
          <SectionHeading
            title="How we work"
            subtitle="A focused process that moves from understanding to results."
          />
          <div className="process-grid">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <div className="process-step">
                  <span className="process-number">{step.number}</span>
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-description">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────── */}
      <section className="section cta-section" aria-label="Get started">
        <div className="container cta-container">
          <Reveal>
            <h2 className="cta-heading">{brand.ctaHeading}</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start a project <ArrowRight size={16} weight="bold" />
              </Link>
              <a href={`mailto:${brand.email}`} className="btn btn-ghost">
                <EnvelopeSimple size={16} weight="bold" />
                {brand.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
