import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 'var(--nav-height)',
      }}
      aria-label="Page not found"
    >
      <div className="container" style={{ maxWidth: '480px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 4rem + 4vw, 8rem)',
            fontWeight: 700,
            color: 'var(--accent)',
            opacity: 0.2,
            lineHeight: 1,
            marginBottom: 'var(--space-lg)',
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>
          Page not found
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-2xl)',
            maxWidth: '360px',
            margin: '0 auto var(--space-2xl)',
          }}
        >
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} weight="bold" /> Back to home
        </Link>
      </div>
    </section>
  );
}
