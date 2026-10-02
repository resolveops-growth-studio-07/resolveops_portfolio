import { Link } from 'react-router-dom';
import { ArrowUp, EnvelopeSimple } from '@phosphor-icons/react';
import { brand, navigation, projects } from '../data/content';
import Reveal from './Reveal';
import './SiteFooter.css';

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Decorative wordmark */}
      <div className="footer-wordmark" aria-hidden="true">
        RESOLVEOPS
      </div>

      <div className="container footer-inner">
        <Reveal>
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-name">{brand.name}</span>
                <span className="footer-logo-subtitle">{brand.subtitle}</span>
              </div>
              <p className="footer-tagline">{brand.tagline}</p>
              <p className="footer-description">{brand.footerDescription}</p>
            </div>

            <div className="footer-columns">
              <div className="footer-col">
                <h4 className="footer-col-title">Navigation</h4>
                <ul className="footer-links">
                  {navigation.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} className="footer-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">Projects</h4>
                <ul className="footer-links">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                      >
                        {project.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">Contact</h4>
                <a href={`mailto:${brand.email}`} className="footer-email">
                  <EnvelopeSimple size={16} weight="bold" />
                  {brand.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={18} weight="bold" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
