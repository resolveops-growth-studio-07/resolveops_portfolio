import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Globe } from '@phosphor-icons/react';
import type { Project } from '../data/content';
import Reveal from './Reveal';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project & { imageFallback?: string };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // Format clean display URL (e.g., ymta-dental-clinic.vercel.app)
  const displayUrl = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const [imgSrc, setImgSrc] = useState(project.image);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [imgSrc]);

  const handleImageError = () => {
    // If primary real screenshot failed, try static fallback screenshot
    const fallback = project.imageFallback || (
      project.id === 'ymta-dental' ? '/projects/ymta-dental.png' :
      project.id === 'sindhus-dental' ? '/projects/sindhus-dental.png' :
      project.id === 'maruthi-fitness' ? '/projects/maruthi-fitness.png' : null
    );

    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    } else {
      setHasError(true);
    }
  };

  return (
    <Reveal delay={index * 120} direction="up">
      <article className="project-card-container">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card"
          onPointerMove={event => {
            if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty('--image-x', `${((event.clientX - rect.left) / rect.width - .5) * 6}px`);
            event.currentTarget.style.setProperty('--image-y', `${((event.clientY - rect.top) / rect.height - .5) * 6}px`);
          }}
          onPointerLeave={event => { event.currentTarget.style.setProperty('--image-x', '0px'); event.currentTarget.style.setProperty('--image-y', '0px'); }}
          aria-label={`${project.title} — ${project.urlLabel}`}
        >
          {/* Authentic Browser Frame Mockup */}
          <div className="project-browser-frame">
            <div className="browser-header-bar" aria-hidden="true">
              <div className="browser-dots">
                <span className="browser-dot dot-close" />
                <span className="browser-dot dot-minimize" />
                <span className="browser-dot dot-maximize" />
              </div>
              <div className="browser-address-container">
                <svg
                  className="browser-ssl-lock"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="browser-url-text">{displayUrl}</span>
              </div>
              <div className="browser-action-hint">
                <ArrowUpRight size={13} weight="bold" />
              </div>
            </div>

            <div className={`project-image-viewport ${!isLoaded && !hasError ? 'is-loading' : ''}`}>
              {!hasError ? (
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt={project.alt}
                  className={`project-screenshot ${isLoaded ? 'is-visible' : 'is-loading'}`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  width="1440"
                  height="900"
                  onLoad={() => setIsLoaded(true)}
                  onError={handleImageError}
                />
              ) : (
                <div className="project-fallback" aria-hidden="true">
                  <div className="fallback-inner">
                    <Globe size={32} weight="duotone" className="fallback-icon" />
                    <span className="fallback-text">{project.title}</span>
                    <span className="fallback-url">{displayUrl}</span>
                  </div>
                </div>
              )}
              <div className="project-hover-pill">
                <span>{project.urlLabel}</span>
                <ArrowUpRight size={14} weight="bold" />
              </div>
            </div>
          </div>

          <div className="project-info">
            <span className="project-category">{project.category}</span>
            <h3 className="project-title">{project.title}</h3>
          </div>
        </a>
      </article>
    </Reveal>
  );
}
