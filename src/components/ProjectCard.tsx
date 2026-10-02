import { ArrowUpRight } from '@phosphor-icons/react';
import type { Project } from '../data/content';
import Reveal from './Reveal';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal delay={index * 120} direction="up">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card"
        aria-label={`${project.title} — ${project.urlLabel}`}
      >
        <div className="project-image-wrapper">
          <img
            src={project.image}
            alt={project.alt}
            className="project-image"
            loading="lazy"
            width="800"
            height="500"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'project-fallback';
                fallback.innerHTML = `<span class="fallback-text">${project.title}</span>`;
                parent.appendChild(fallback);
              }
            }}
          />
          <div className="project-overlay">
            <span className="project-view-label">
              {project.urlLabel} <ArrowUpRight size={16} weight="bold" />
            </span>
          </div>
        </div>

        <div className="project-info">
          <span className="project-category">{project.category}</span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
        </div>
      </a>
    </Reveal>
  );
}
