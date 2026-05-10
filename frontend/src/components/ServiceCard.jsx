import { Link } from "react-router-dom";

const SERVICE_META = {
  "courier-cargo":      { img: "/images/services/courier-cargo.jpg",      color: "#0814E3" },
  "travel-reservation": { img: "/images/services/travel-reservation.jpg", color: "#FF7A00" },
  "hotel-reservation":  { img: "/images/services/hotel-reservation.jpg",  color: "#0814E3" },
  "aircraft-charter":   { img: "/images/services/aircraft-charter.jpg",   color: "#FF7A00" },
  "general-logistics":  { img: "/images/services/general-logistics.jpg",  color: "#0814E3" },
};

export default function ServiceCard({ service, index = 0 }) {
  const meta = SERVICE_META[service.slug] || { img: null, color: "#0814E3" };

  return (
    <Link to={`/services/${service.slug}`} className="svc-card fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="svc-img-wrap">
        {meta.img ? (
          <img src={meta.img} alt={service.name} className="svc-img" loading="lazy" />
        ) : (
          <div className="svc-img-placeholder" />
        )}
        <div className="svc-img-overlay" />
        <div className="svc-num">0{index + 1}</div>
      </div>
      <div className="svc-body">
        <h3 className="svc-name">{service.name}</h3>
        <p className="svc-desc">{service.description?.substring(0, 105)}...</p>
        <div className="svc-link" style={{ color: meta.color }}>
          <span>Learn More</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="svc-bar" style={{ background: meta.color }} />

      <style>{`
        .svc-card {
          display: flex; flex-direction: column;
          background: var(--white);
          border: 1.5px solid rgba(8,20,227,0.08);
          border-radius: var(--radius-lg);
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
        .svc-img-wrap {
          position: relative; height: 180px; overflow: hidden;
        }
        .svc-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .svc-card:hover .svc-img { transform: scale(1.06); }
        .svc-img-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, var(--blue-dim), var(--blue-pale));
        }
        .svc-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%);
          pointer-events: none;
        }
        .svc-num {
          position: absolute; top: 0.85rem; right: 1rem;
          font-family: 'Fraunces', serif;
          font-size: 2.2rem; font-weight: 300;
          color: rgba(255,255,255,0.5); line-height: 1;
          pointer-events: none;
        }
        .svc-body {
          padding: 1.5rem 1.75rem 1.75rem;
          display: flex; flex-direction: column; flex: 1;
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
