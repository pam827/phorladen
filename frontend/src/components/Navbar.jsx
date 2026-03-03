import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <div className="logo-mark">
            <span>✈</span>
          </div>
          <div>
            <span className="logo-main">PHORLADEN</span>
            <span className="logo-sub">Travels & Tours</span>
          </div>
        </Link>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={`nav-link ${location.pathname === to ? "active" : ""}`}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/booking" className="nav-cta btn-primary">
              Get a Quote
            </Link>
          </li>
        </ul>

        <button className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000; padding: 1.25rem 0;
          transition: all 0.35s ease;
          background: transparent;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          padding: 0.85rem 0;
          box-shadow: 0 4px 24px rgba(8,20,227,0.1);
          border-bottom: 1px solid rgba(8,20,227,0.08);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; gap: 0.85rem; }
        .logo-mark {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, var(--royal), var(--blue-mid));
          border-radius: var(--radius);
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 1.1rem;
          box-shadow: 0 4px 12px rgba(8,20,227,0.35);
        }
        .logo-main {
          display: block;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.05rem; font-weight: 800;
          color: var(--white); letter-spacing: 0.08em; line-height: 1;
          transition: color 0.3s;
        }
        .navbar.scrolled .logo-main { color: var(--royal); }
        .logo-sub {
          display: block; font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.12em; color: rgba(255,255,255,0.6);
          text-transform: uppercase; margin-top: 1px;
          transition: color 0.3s;
        }
        .navbar.scrolled .logo-sub { color: var(--text-muted); }
        .nav-links { display: flex; align-items: center; gap: 0.25rem; list-style: none; }
        .nav-link {
          display: block; padding: 0.55rem 1rem;
          font-size: 0.85rem; font-weight: 600;
          color: rgba(255,255,255,0.8);
          border-radius: var(--radius-sm);
          transition: all 0.25s;
        }
        .navbar.scrolled .nav-link { color: var(--text-body); }
        .nav-link:hover, .nav-link.active {
          color: var(--white); background: rgba(255,255,255,0.15);
        }
        .navbar.scrolled .nav-link:hover,
        .navbar.scrolled .nav-link.active {
          color: var(--royal); background: var(--blue-dim);
        }
        .nav-cta { margin-left: 0.75rem; padding: 0.65rem 1.4rem !important; font-size: 0.78rem !important; }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: var(--white); transition: all 0.3s ease; transform-origin: center; border-radius: 2px; }
        .navbar.scrolled .hamburger span { background: var(--text-dark); }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        @media (max-width: 900px) {
          .hamburger { display: flex; }
          .nav-links {
            position: fixed; top: 0; right: -100%;
            width: min(300px, 85vw); height: 100vh;
            background: var(--white);
            box-shadow: -8px 0 40px rgba(8,20,227,0.15);
            flex-direction: column; align-items: flex-start;
            padding: 5rem 1.75rem 2rem; gap: 0.25rem;
            transition: right 0.4s cubic-bezier(0.4,0,0.2,1);
          }
          .nav-links.open { right: 0; }
          .nav-links li { width: 100%; }
          .nav-link { color: var(--text-body) !important; display: block; padding: 0.75rem 1rem; font-size: 0.95rem; }
          .nav-link:hover, .nav-link.active { color: var(--royal) !important; background: var(--blue-dim) !important; }
          .nav-cta { margin: 0.75rem 0 0; width: 100%; justify-content: center; }
        }
      `}</style>
    </nav>
  );
}
