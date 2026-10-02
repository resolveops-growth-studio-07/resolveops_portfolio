import Reveal from './Reveal';
import './SectionHeading.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  accent?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  accent = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? 'centered' : ''}`}>
      {eyebrow && (
        <Reveal delay={0}>
          <span className="section-eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="section-title">
          {accent
            ? title.split(' ').map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="text-accent">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )
            : title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p className="section-subtitle">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
