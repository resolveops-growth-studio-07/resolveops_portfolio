import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { projects } from '../data/content';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import './Work.css';

export default function Work() {
  return (
    <>
      {/* Hero */}
      <section className="work-hero section" aria-label="Our work">
        <div className="container">
          <Reveal>
            <h1 className="work-hero-title">Our work</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="work-hero-subtitle">
              Real projects for real businesses. Each website is live, functional, 
              and built to serve the specific needs of the business it represents.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="section" aria-label="Projects">
        <div className="container">
          <div className="work-projects-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section work-bottom-cta" aria-label="Start a project">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-lg)' }}>
              Have a project in mind?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{
              color: 'var(--text-secondary)',
              maxWidth: '440px',
              margin: '0 auto var(--space-2xl)',
            }}>
              We'd like to hear about your business and what you're looking to build.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a project <ArrowRight size={16} weight="bold" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
