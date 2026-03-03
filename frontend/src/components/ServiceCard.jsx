import { Link } from "react-router-dom";

const SERVICE_META = {
  "courier-cargo":      { icon: "📦", color: "#0814E3", bg: "rgba(8,20,227,0.06)" },
  "travel-reservation": { icon: "✈️", color: "#FF7A00", bg: "rgba(255,122,0,0.08)" },
  "hotel-reservation":  { icon: "🏨", color: "#0814E3", bg: "rgba(8,20,227,0.06)" },
  "aircraft-charter":   { icon: "🛩️", color: "#FF7A00", bg: "rgba(255,122,0,0.08)" },
  "general-logistics":  { icon: "🚚", color: "#0814E3", bg: "rgba(8,20,227,0.06)" },
};

export default function ServiceCard({ service, index = 0 }) {
  const meta = SERVICE_META[service.slug] || { icon: "🌐", color: "#0814E3", bg: "rgba(8,20,227,0.06)" };

  return (
    <Link to={`/services/${service.slug}`} className="svc-card fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="svc-icon-wrap" style={{ background: meta.bg }}>
        <span className="svc-icon">{meta.icon}</span>
      </div>
      <div className="svc-num">0{index + 1}</div>
      <h3 className="svc-name">{service.name}</h3>
      <p className="svc-desc">{service.description?.substring(0, 105)}...</p>
      <div className="svc-link" style={{ color: meta.color }}>
        <span>Learn More</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="svc-bar" style={{ background: meta.color }} />

      <style>{`
        .svc-card {
          display: flex; flex-direction: column;
          background: var(--white);
          border: 1.5px solid rgba(8,20,227,0.08);
          border-radius: var(--radius-lg);
          padding: 2rem 1.75rem 1.75rem;
          position: relative; overflow: hidden;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 2px 16px rgba(8,20,227,0.06);
          cursor: pointer;
        }
        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(8,20,227,0.14);
          border-color: rgba(8,20,227,0.2);
        }
        .svc-icon-wrap {
          width: 52px; height: 52px;
          border-radius: var(--radius);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          transition: transform 0.3s;
        }
        .svc-card:hover .svc-icon-wrap { transform: scale(1.08); }
        .svc-icon { font-size: 1.6rem; }
        .svc-num {
          position: absolute; top: 1.5rem; right: 1.75rem;
          font-family: 'Fraunces', serif;
          font-size: 3rem; font-weight: 300;
          color: rgba(8,20,227,0.06); line-height: 1;
          pointer-events: none;
        }
        .svc-name {
          font-family: 'Fraunces', serif;
          font-size: 1.25rem; font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 0.65rem;
        }
        .svc-desc {
          font-size: 0.875rem; color: var(--text-muted);
          line-height: 1.7; flex: 1; margin-bottom: 1.5rem;
        }
        .svc-link {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          transition: gap 0.25s;
        }
        .svc-card:hover .svc-link { gap: 0.85rem; }
        .svc-bar {
          position: absolute; bottom: 0; left: 0;
          width: 100%; height: 3px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }
        .svc-card:hover .svc-bar { transform: scaleX(1); }
      `}</style>
    </Link>
  );
}
