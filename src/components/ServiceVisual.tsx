import './ServiceVisual.css';

interface ServiceVisualProps {
  serviceId: string;
  size?: 'small' | 'large';
}

/**
 * Original illustrative visuals for each service.
 * Uses SVG compositions that represent the work without stock imagery.
 */
export default function ServiceVisual({ serviceId, size = 'large' }: ServiceVisualProps) {
  const sizeClass = size === 'small' ? 'visual-small' : 'visual-large';
  
  return (
    <div className={`service-visual ${sizeClass}`}>
      {getVisual(serviceId)}
    </div>
  );
}

function getVisual(id: string) {
  switch (id) {
    case 'website-development':
      return <WebsiteVisual />;
    case 'ui-ux-design':
      return <DesignVisual />;
    case 'seo-digital-marketing':
      return <SEOVisual />;
    case 'ai-automation':
      return <AIVisual />;
    case 'crm-workflow-automation':
      return <CRMVisual />;
    case 'business-analytics':
      return <AnalyticsVisual />;
    default:
      return <WebsiteVisual />;
  }
}

/* Browser window with layout elements */
function WebsiteVisual() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
      {/* Browser chrome */}
      <rect x="20" y="16" width="240" height="148" rx="8" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
      <rect x="20" y="16" width="240" height="24" rx="8" fill="var(--accent)" fillOpacity="0.06" />
      <circle cx="36" cy="28" r="3" fill="var(--accent)" fillOpacity="0.4" />
      <circle cx="48" cy="28" r="3" fill="var(--accent)" fillOpacity="0.3" />
      <circle cx="60" cy="28" r="3" fill="var(--accent)" fillOpacity="0.2" />
      {/* URL bar */}
      <rect x="76" y="24" width="100" height="8" rx="4" fill="var(--accent)" fillOpacity="0.08" />
      {/* Hero area */}
      <rect x="36" y="52" width="100" height="8" rx="2" fill="var(--accent)" fillOpacity="0.35" />
      <rect x="36" y="64" width="70" height="6" rx="2" fill="var(--accent)" fillOpacity="0.15" />
      <rect x="36" y="78" width="50" height="12" rx="6" fill="var(--accent)" fillOpacity="0.2" />
      {/* Image placeholder */}
      <rect x="160" y="50" width="84" height="60" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
      {/* Cards below */}
      <rect x="36" y="120" width="60" height="32" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      <rect x="108" y="120" width="60" height="32" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      <rect x="180" y="120" width="60" height="32" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

/* Figma-style design interface */
function DesignVisual() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
      {/* Artboard */}
      <rect x="60" y="20" width="160" height="140" rx="6" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
      {/* Layout grid lines */}
      <line x1="100" y1="20" x2="100" y2="160" stroke="var(--accent)" strokeWidth="0.3" opacity="0.15" />
      <line x1="140" y1="20" x2="140" y2="160" stroke="var(--accent)" strokeWidth="0.3" opacity="0.15" />
      <line x1="180" y1="20" x2="180" y2="160" stroke="var(--accent)" strokeWidth="0.3" opacity="0.15" />
      {/* Component blocks */}
      <rect x="72" y="34" width="96" height="14" rx="3" fill="var(--accent)" fillOpacity="0.25" />
      <rect x="72" y="54" width="64" height="8" rx="2" fill="var(--accent)" fillOpacity="0.12" />
      {/* Button component */}
      <rect x="72" y="72" width="44" height="14" rx="7" fill="var(--accent)" fillOpacity="0.2" />
      {/* Card wireframe */}
      <rect x="72" y="96" width="68" height="52" rx="4" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
      <rect x="80" y="104" width="52" height="20" rx="2" fill="var(--accent)" fillOpacity="0.06" />
      <rect x="80" y="130" width="40" height="4" rx="1" fill="var(--accent)" fillOpacity="0.15" />
      <rect x="80" y="138" width="28" height="4" rx="1" fill="var(--accent)" fillOpacity="0.1" />
      {/* Cursor */}
      <path d="M192 88 L200 104 L195 104 L198 114 L194 115 L191 105 L187 110 Z" fill="var(--accent)" fillOpacity="0.5" />
      {/* Selection handles */}
      <rect x="150" y="96" width="56" height="40" rx="3" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
      <circle cx="150" cy="96" r="2.5" fill="var(--accent)" fillOpacity="0.7" />
      <circle cx="206" cy="96" r="2.5" fill="var(--accent)" fillOpacity="0.7" />
      <circle cx="150" cy="136" r="2.5" fill="var(--accent)" fillOpacity="0.7" />
      <circle cx="206" cy="136" r="2.5" fill="var(--accent)" fillOpacity="0.7" />
    </svg>
  );
}

/* Search/content structure */
function SEOVisual() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
      {/* Search bar */}
      <rect x="60" y="28" width="160" height="28" rx="14" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
      <circle cx="80" cy="42" r="8" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
      <line x1="86" y1="48" x2="92" y2="54" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
      <rect x="96" y="38" width="80" height="6" rx="3" fill="var(--accent)" fillOpacity="0.15" />
      {/* Search results */}
      <rect x="60" y="68" width="160" height="1" fill="var(--accent)" fillOpacity="0.1" />
      {/* Result 1 - highlighted */}
      <rect x="60" y="78" width="160" height="28" rx="4" fill="var(--accent)" fillOpacity="0.06" />
      <rect x="68" y="84" width="100" height="6" rx="2" fill="var(--accent)" fillOpacity="0.3" />
      <rect x="68" y="94" width="140" height="4" rx="1" fill="var(--accent)" fillOpacity="0.1" />
      {/* Result 2 */}
      <rect x="68" y="118" width="90" height="6" rx="2" fill="var(--accent)" fillOpacity="0.2" />
      <rect x="68" y="128" width="130" height="4" rx="1" fill="var(--accent)" fillOpacity="0.08" />
      {/* Result 3 */}
      <rect x="68" y="146" width="80" height="6" rx="2" fill="var(--accent)" fillOpacity="0.15" />
      <rect x="68" y="156" width="120" height="4" rx="1" fill="var(--accent)" fillOpacity="0.06" />
      {/* Ranking arrow */}
      <path d="M240 140 L240 70 L234 80 M240 70 L246 80" stroke="var(--accent)" strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}

/* AI chat/document flow */
function AIVisual() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
      {/* Chat bubbles */}
      <rect x="80" y="20" width="120" height="24" rx="12" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
      <rect x="90" y="28" width="60" height="5" rx="2" fill="var(--accent)" fillOpacity="0.2" />
      <rect x="60" y="54" width="100" height="24" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      <rect x="70" y="62" width="50" height="5" rx="2" fill="var(--accent)" fillOpacity="0.15" />
      <rect x="100" y="88" width="130" height="28" rx="14" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
      <rect x="112" y="96" width="70" height="5" rx="2" fill="var(--accent)" fillOpacity="0.2" />
      {/* AI brain/node */}
      <circle cx="140" cy="145" r="18" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
      <circle cx="140" cy="145" r="6" fill="var(--accent)" fillOpacity="0.25" />
      {/* Connection lines */}
      <line x1="140" y1="127" x2="140" y2="116" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
      <line x1="124" y1="138" x2="100" y2="130" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.2" />
      <line x1="156" y1="138" x2="180" y2="130" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.2" />
      {/* Sparkle dots */}
      <circle cx="95" cy="128" r="2" fill="var(--accent)" fillOpacity="0.4" />
      <circle cx="185" cy="128" r="2" fill="var(--accent)" fillOpacity="0.4" />
    </svg>
  );
}

/* CRM pipeline flow */
function CRMVisual() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
      {/* Pipeline columns */}
      <rect x="28" y="30" width="60" height="120" rx="6" stroke="var(--accent)" strokeWidth="0.6" opacity="0.2" />
      <rect x="96" y="30" width="60" height="120" rx="6" stroke="var(--accent)" strokeWidth="0.6" opacity="0.2" />
      <rect x="164" y="30" width="60" height="120" rx="6" stroke="var(--accent)" strokeWidth="0.6" opacity="0.2" />
      <rect x="232" y="30" width="28" height="120" rx="6" stroke="var(--accent)" strokeWidth="0.6" opacity="0.15" />
      {/* Column headers */}
      <rect x="34" y="36" width="36" height="6" rx="2" fill="var(--accent)" fillOpacity="0.25" />
      <rect x="102" y="36" width="32" height="6" rx="2" fill="var(--accent)" fillOpacity="0.25" />
      <rect x="170" y="36" width="28" height="6" rx="2" fill="var(--accent)" fillOpacity="0.25" />
      {/* Lead cards */}
      <rect x="34" y="52" width="48" height="22" rx="3" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      <rect x="34" y="80" width="48" height="22" rx="3" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.12" />
      <rect x="34" y="108" width="48" height="22" rx="3" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.5" opacity="0.1" />
      <rect x="102" y="52" width="48" height="22" rx="3" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
      <rect x="102" y="80" width="48" height="22" rx="3" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.12" />
      <rect x="170" y="52" width="48" height="22" rx="3" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.5" opacity="0.25" />
      {/* Flow arrows */}
      <path d="M88 63 L96 63" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
      <path d="M156 63 L164 63" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
      <path d="M224 63 L232 63" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

/* Analytics dashboard */
function AnalyticsVisual() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="visual-svg">
      {/* Dashboard frame */}
      <rect x="30" y="16" width="220" height="148" rx="8" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" />
      {/* KPI cards row */}
      <rect x="40" y="28" width="60" height="28" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      <rect x="46" y="34" width="24" height="6" rx="2" fill="var(--accent)" fillOpacity="0.25" />
      <rect x="46" y="44" width="16" height="4" rx="1" fill="var(--accent)" fillOpacity="0.1" />
      <rect x="108" y="28" width="60" height="28" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      <rect x="114" y="34" width="28" height="6" rx="2" fill="var(--accent)" fillOpacity="0.25" />
      <rect x="114" y="44" width="20" height="4" rx="1" fill="var(--accent)" fillOpacity="0.1" />
      <rect x="176" y="28" width="60" height="28" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      <rect x="182" y="34" width="20" height="6" rx="2" fill="var(--accent)" fillOpacity="0.25" />
      <rect x="182" y="44" width="14" height="4" rx="1" fill="var(--accent)" fillOpacity="0.1" />
      {/* Chart area */}
      <rect x="40" y="66" width="140" height="86" rx="4" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
      {/* Bar chart */}
      <rect x="56" y="120" width="12" height="24" rx="2" fill="var(--accent)" fillOpacity="0.15" />
      <rect x="76" y="108" width="12" height="36" rx="2" fill="var(--accent)" fillOpacity="0.2" />
      <rect x="96" y="96" width="12" height="48" rx="2" fill="var(--accent)" fillOpacity="0.25" />
      <rect x="116" y="102" width="12" height="42" rx="2" fill="var(--accent)" fillOpacity="0.2" />
      <rect x="136" y="84" width="12" height="60" rx="2" fill="var(--accent)" fillOpacity="0.35" />
      <rect x="156" y="90" width="12" height="54" rx="2" fill="var(--accent)" fillOpacity="0.28" />
      {/* Pie chart */}
      <circle cx="210" cy="106" r="30" stroke="var(--accent)" strokeWidth="6" opacity="0.1" />
      <circle cx="210" cy="106" r="30" stroke="var(--accent)" strokeWidth="6" opacity="0.3" strokeDasharray="60 130" strokeDashoffset="-20" />
      <circle cx="210" cy="106" r="30" stroke="var(--accent)" strokeWidth="6" opacity="0.15" strokeDasharray="40 150" strokeDashoffset="-80" />
    </svg>
  );
}
