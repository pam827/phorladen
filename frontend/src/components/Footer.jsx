import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  const services = [
    { slug: "courier-cargo",       name: "Courier & Cargo" },
    { slug: "travel-reservation",  name: "Travel Reservation" },
    { slug: "hotel-reservation",   name: "Hotel Reservation" },
    { slug: "aircraft-charter",    name: "Aircraft Charter" },
    { slug: "general-logistics",   name: "General Logistics" },
  ];

  return (
    <footer className="footer">
      <div className="footer-wave" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-mark">✈</div>
              <div>
                <span className="footer-logo-name">PHORLADEN</span>
                <span className="footer-logo-tagline">Travels & Tours</span>
              </div>
            </Link>
            <p className="footer-desc">
              Your trusted partner for global logistics, travel, and freight solutions. Excellence delivered worldwide since 2012.
            </p>
            <div className="footer-socials">
              {[{label:"LinkedIn",icon:"in"},{label:"Twitter",icon:"tw"},{label:"Facebook",icon:"fb"}].map(({label,icon}) => (
                <a key={icon} href="#" aria-label={label} className="social-pill">{icon.toUpperCase()}</a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              {services.map(s => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">All Services</Link></li>
              <li><Link to="/booking">Request Quote</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/admin/login">Admin Portal</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact-list">
              {[
                { icon: "📍", lines: ["123 Global Avenue", "Business District, Lagos, Nigeria"] },
                { icon: "📞", lines: ["+2348034724314"] },
                { icon: "✉️", lines: ["Ladenglowing@gmail.com"] },
                { icon: "🕐", lines: ["Mon–Fri: 8AM – 6PM WAT"] },
              ].map(({ icon, lines }) => (
                <li key={icon}>
                  <span className="ci-icon">{icon}</span>
                  <span className="ci-text">{lines.join(", ")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Phorladen Global Services. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 60%, var(--royal-deep) 100%);
          padding: 5rem 0 0;
          position: relative;
          margin-top: 0;
        }
        .footer-wave {
          position: absolute; top: -1px; left: 0; right: 0;
          height: 60px;
          background: var(--off-white);
          clip-path: ellipse(60% 100% at 50% 0%);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.3fr;
          gap: 3rem;
          padding-top: 2rem;
        }
        .footer-logo {
          display: flex; align-items: center; gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .footer-logo-mark {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, var(--royal), var(--blue-mid));
          border-radius: var(--radius);
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 1.1rem;
        }
        .footer-logo-name {
          display: block;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.05rem; font-weight: 800;
          color: var(--white); letter-spacing: 0.08em; line-height: 1;
        }
        .footer-logo-tagline {
          display: block; font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.45);
          text-transform: uppercase; margin-top: 2px;
        }
        .footer-desc {
          font-size: 0.88rem; line-height: 1.75;
          color: rgba(255,255,255,0.5); margin-bottom: 1.5rem; max-width: 280px;
        }
        .footer-socials { display: flex; gap: 0.6rem; }
        .social-pill {
          padding: 0.35rem 0.9rem;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.05em;
          color: rgba(255,255,255,0.5);
          transition: all 0.25s;
        }
        .social-pill:hover { border-color: var(--orange); color: var(--orange); background: rgba(255,122,0,0.1); }
        .footer-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--orange); margin-bottom: 1.25rem;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-links a {
          font-size: 0.88rem; color: rgba(255,255,255,0.5);
          transition: color 0.2s; display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .footer-links a:hover { color: var(--white); }
        .footer-contact-list { list-style: none; display: flex; flex-direction: column; gap: 0.85rem; }
        .footer-contact-list li { display: flex; gap: 0.75rem; align-items: flex-start; }
        .ci-icon { font-size: 0.9rem; margin-top: 1px; flex-shrink: 0; }
        .ci-text { font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.5; }
        .footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.75rem 0;
          margin-top: 3rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .footer-bottom-links { display: flex; gap: 1.5rem; }
        .footer-bottom-links a { transition: color 0.2s; }
        .footer-bottom-links a:hover { color: rgba(255,255,255,0.7); }
        @media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 0.75rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
