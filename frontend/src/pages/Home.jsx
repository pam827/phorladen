import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../services/api";
import ServiceCard from "../components/ServiceCard";

const HERO_IMAGES = [
  "/images/hero/logistics.jpg",
  "/images/hero/aircraft.jpg",
  "/images/hero/hotel.jpg",
  "/images/hero/travel.jpg",
  "/images/hero/courier.jpg",
];

const FALLBACK = [
  { id:1, name:"Courier & Cargo",      slug:"courier-cargo",      description:"Reliable, fast, and secure courier and cargo solutions across domestic and international destinations." },
  { id:2, name:"Travel Reservation",   slug:"travel-reservation", description:"Premium travel booking services tailored to business and leisure travelers worldwide." },
  { id:3, name:"Hotel Reservation",    slug:"hotel-reservation",  description:"Curated hotel accommodations from boutique properties to luxury five-star resorts globally." },
  { id:4, name:"Aircraft Charter",     slug:"aircraft-charter",   description:"Private and commercial aircraft charter services for executives, groups, and specialized cargo." },
  { id:5, name:"General Logistics",    slug:"general-logistics",  description:"End-to-end logistics management including warehousing, distribution, and supply chain optimization." },
];

// SVG icon helpers
const Icon = ({ d, size = 24, color = "currentColor", children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{children || <path d={d} />}</svg>
);

const STATS = [
  { value:"12+", label:"Years Experience", icon:"trophy" },
  { value:"50+", label:"Countries Served", icon:"globe" },
  { value:"10K+",label:"Happy Clients",    icon:"users" },
  { value:"99%", label:"On-Time Delivery", icon:"zap" },
];

const STAT_ICONS = {
  trophy: (c) => <Icon size={28} color={c}><path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></Icon>,
  globe:  (c) => <Icon size={28} color={c}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 014 10 14.5 14.5 0 01-4 10 14.5 14.5 0 01-4-10A14.5 14.5 0 0112 2"/><path d="M2 12h20"/></Icon>,
  users:  (c) => <Icon size={28} color={c}><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Icon>,
  zap:    (c) => <Icon size={28} color={c}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>,
};

const WHY_US = [
  { icon:"globe",     title:"Global Network",      desc:"Operations spanning 50+ countries with trusted local partners for seamless end-to-end delivery." },
  { icon:"zap",       title:"Speed & Reliability",  desc:"Time-critical shipments handled with precision, real-time tracking, and guaranteed timelines." },
  { icon:"lock",      title:"Secure Handling",      desc:"Every shipment is insured, tracked, and handled with the highest security standards." },
  { icon:"chat",      title:"24/7 Support",         desc:"Dedicated account managers available around the clock for every query and concern." },
  { icon:"briefcase", title:"Tailored Solutions",    desc:"Customized logistics and travel packages designed specifically for your business needs." },
  { icon:"check",     title:"Certified & Licensed",  desc:"Fully accredited with IATA, FAAN, and major international logistics certifications." },
];

const WHY_ICONS = {
  globe:     () => <Icon color="var(--royal)"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 014 10 14.5 14.5 0 01-4 10 14.5 14.5 0 01-4-10A14.5 14.5 0 0112 2"/><path d="M2 12h20"/></Icon>,
  zap:       () => <Icon color="var(--royal)"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>,
  lock:      () => <Icon color="var(--royal)"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></Icon>,
  chat:      () => <Icon color="var(--royal)"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></Icon>,
  briefcase: () => <Icon color="var(--royal)"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></Icon>,
  check:     () => <Icon color="var(--royal)"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>,
};

const PROCESS_ICONS = {
  edit:    () => <Icon size={32} color="var(--royal)"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></Icon>,
  quote:   () => <Icon size={32} color="var(--royal)"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><path d="M8 9h8"/><path d="M8 13h4"/></Icon>,
  confirm: () => <Icon size={32} color="var(--royal)"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>,
  deliver: () => <Icon size={32} color="var(--royal)"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></Icon>,
};

export default function Home() {
  const [services, setServices] = useState(FALLBACK);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    getServices().then(r => r.data?.length && setServices(r.data)).catch(()=>{});
  }, []);

  // Preload hero images
  useEffect(() => {
    HERO_IMAGES.forEach(src => { const img = new Image(); img.src = src; });
  }, []);

  // Auto-cycle hero images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        {/* Slideshow background images */}
        <div className="hero-slideshow">
          {HERO_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`hero-slide ${i === currentImg ? "active" : ""}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="hero-slide-overlay" />
        </div>
        <div className="hero-bg">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-dots" />
        </div>
        <div className="container hero-inner">
          <div className="hero-content fade-up">
            <div className="hero-badge">
              <span className="badge orange">✈ Trusted by 10,000+ clients</span>
            </div>
            <h1 className="hero-title">
              Your World-Class<br />
              <em>Travels & Logistics</em><br />
              Partner
            </h1>
            <p className="hero-sub">
              From courier deliveries to private aircraft charters, hotel bookings to full supply-chain management — Phorladen delivers excellence across Africa and beyond.
            </p>
            <div className="hero-actions fade-up fade-up-2">
              <Link to="/booking" className="btn-primary">
                Get a Free Quote
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/services" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}>Explore Services</Link>
            </div>
            
          </div>

          <div className="hero-visual fade-up fade-up-2">
            <div className="hero-card-stack">
              <div className="hcard hcard-back" />
              <div className="hcard hcard-mid" />
              <div className="hcard hcard-front">
                <div className="hcard-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-1 1 3 2 2 3 1-1v-3l3-2 4.3 7.3c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.7.5-1.1z"/></svg></div>
                <p className="hcard-title">Phorladen Express</p>
                <p className="hcard-sub">Live Tracking Available</p>
                <div className="hcard-route">
                  <span>LOS</span>
                  <div className="hcard-line"><div className="hcard-dot" /></div>
                  <span>LHR</span>
                </div>
                <div className="hcard-status">
                  <span className="status-dot" />
                  <span>In Transit · On Schedule</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow indicators */}
        <div className="hero-indicators">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === currentImg ? "active" : ""}`}
              onClick={() => setCurrentImg(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero-stats-bar fade-up fade-up-4">
          <div className="container">
            <div className="stats-row">
              {STATS.map(({ value, label, icon }) => (
                <div key={label} className="stat-pill">
                  <span className="stat-icon">{STAT_ICONS[icon]("rgba(255,255,255,0.7)")}</span>
                  <div>
                    <span className="stat-val">{value}</span>
                    <span className="stat-lbl">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="section svc-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-label">What We Offer</span>
              <h2 className="section-title">Our <em>Services</em></h2>
              <div className="blue-line" />
            </div>
            <p className="section-intro">
              From last-mile delivery to intercontinental cargo, luxury travel bookings to private jet charters — Phorladen brings world-class service to every engagement.
            </p>
          </div>
          <div className="svc-grid">
            {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
          <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
            <Link to="/services" className="btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section className="section why-section">
        <div className="container">
          <div className="why-layout">
            <div className="why-left">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">Built for <em>Excellence</em></h2>
              <div className="blue-line" />
              <p style={{ color:"var(--text-muted)", lineHeight:1.8, marginBottom:"2rem", fontSize:"0.97rem" }}>
                With lot of experience, Phorladen has established itself as the leading provider of integrated logistics and travel solutions in West Africa. Our commitment is simple: deliver beyond expectations, every single time.
              </p>
              <Link to="/booking" className="btn-primary">Start a Request</Link>

              <div className="why-numbers">
                {[
                  { n:"50+", l:"Countries" },
                  { n:"10K+",l:"Clients" },
                  { n:"99%", l:"Satisfaction" },
                ].map(({n,l}) => (
                  <div key={l} className="why-num-item">
                    <span className="why-num-val">{n}</span>
                    <span className="why-num-lbl">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="why-right">
              {WHY_US.map(({ icon, title, desc }) => (
                <div key={title} className="why-card">
                  <div className="why-icon">{WHY_ICONS[icon]()}</div>
                  <div>
                    <h4 className="why-card-title">{title}</h4>
                    <p className="why-card-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="section process-section">
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <span className="section-label">Simple Process</span>
            <h2 className="section-title">How It <em>Works</em></h2>
            <div className="blue-line" style={{ margin:"0 auto" }} />
          </div>
          <div className="process-steps">
            {[
              { n:"01", icon:"edit",    title:"Submit Request",  desc:"Fill our quick service form with your requirements." },
              { n:"02", icon:"quote",   title:"Receive Quote",   desc:"Get a tailored quote from our team within 2 hours." },
              { n:"03", icon:"confirm", title:"Confirm & Pay",   desc:"Review, confirm, and proceed with your booking." },
              { n:"04", icon:"deliver", title:"We Deliver",      desc:"Our experts execute with full tracking and updates." },
            ].map(({ n, icon, title, desc }, i) => (
              <div key={n} className="process-step">
                <div className="ps-num">{n}</div>
                <div className="ps-icon">{PROCESS_ICONS[icon]()}</div>
                <h3 className="ps-title">{title}</h3>
                <p className="ps-desc">{desc}</p>
                {i < 3 && <div className="ps-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-bg-1" /><div className="cta-bg-2" />
            <div className="cta-text">
              <h2 className="cta-title">Ready to Ship, Travel, or Charter?</h2>
              <p className="cta-sub">Get a customized quote within 2 hours. No commitments, no hidden fees.</p>
            </div>
            <div className="cta-actions">
              <Link to="/booking" className="btn-white">Get Your Quote</Link>
              <Link to="/contact" className="btn-outline" style={{ borderColor:"rgba(255,255,255,0.5)", color:"white" }}>Talk to Us</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* HERO */
        .hero {
          min-height: 100vh; padding: 7rem 0 0;
          background: var(--dark);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
        }

        /* SLIDESHOW */
        .hero-slideshow {
          position: absolute; inset: 0; z-index: 0;
        }
        .hero-slide {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          will-change: opacity;
        }
        .hero-slide.active {
          opacity: 1;
        }
        .hero-slide-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(13,15,26,0.82) 0%, rgba(19,22,42,0.78) 45%, rgba(4,12,138,0.75) 100%);
          z-index: 1;
        }

        /* INDICATORS */
        .hero-indicators {
          position: absolute;
          bottom: 7rem; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 0.5rem;
          z-index: 5;
        }
        .hero-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.5);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .hero-dot.active {
          background: var(--white);
          border-color: var(--white);
          transform: scale(1.2);
        }
        .hero-dot:hover {
          border-color: var(--white);
        }

        .hero-bg { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .hero-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); opacity: 0.35;
        }
        .hero-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, var(--royal) 0%, transparent 70%);
          top: -200px; right: -100px;
        }
        .hero-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, var(--orange) 0%, transparent 70%);
          bottom: 0; left: -100px; opacity: 0.2;
        }
        .hero-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .hero-inner {
          position: relative; z-index: 3;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center; flex: 1; padding-top: 2rem;
        }
        .hero-badge { margin-bottom: 1.25rem; }
        .hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400; line-height: 1.1;
          color: var(--white); margin-bottom: 1.25rem;
        }
        .hero-title em { color: var(--blue-light); font-style: italic; }
        .hero-sub {
          font-size: 1rem; color: rgba(255,255,255,0.65);
          max-width: 520px; line-height: 1.8; margin-bottom: 2rem;
        }
        .hero-actions { display: flex; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .hero-trust { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
        .trust-text { font-size: 0.75rem; color: rgba(255,255,255,0.4); }
        .trust-badge {
          font-size: 0.68rem; font-weight: 700;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px; padding: 0.2rem 0.55rem;
        }

        /* HERO CARD */
        .hero-visual { display: flex; align-items: center; justify-content: center; }
        .hero-card-stack { position: relative; width: 320px; height: 220px; }
        .hcard {
          position: absolute; border-radius: 20px;
          width: 300px; height: 180px;
        }
        .hcard-back  { background: rgba(8,20,227,0.3); top:20px; left:20px; transform: rotate(8deg); }
        .hcard-mid   { background: rgba(8,20,227,0.5); top:12px; left:10px; transform: rotate(4deg); }
        .hcard-front {
          background: linear-gradient(135deg, var(--royal) 0%, var(--blue-mid) 100%);
          top: 0; left: 0;
          padding: 1.5rem; display: flex; flex-direction: column;
          box-shadow: 0 20px 60px rgba(8,20,227,0.5);
          animation: float 4s ease-in-out infinite;
        }
        .hcard-icon { font-size: 1.8rem; margin-bottom: 0.5rem; }
        .hcard-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 700; color: white; }
        .hcard-sub { font-size: 0.72rem; color: rgba(255,255,255,0.6); margin-bottom: auto; }
        .hcard-route {
          display: flex; align-items: center; gap: 0.75rem;
          margin-top: 1rem; margin-bottom: 0.5rem;
        }
        .hcard-route span { font-size: 0.85rem; font-weight: 800; color: white; }
        .hcard-line {
          flex: 1; height: 2px; background: rgba(255,255,255,0.3);
          position: relative; border-radius: 1px;
        }
        .hcard-dot {
          position: absolute; top: 50%; left: 40%;
          transform: translate(-50%,-50%);
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--orange);
          box-shadow: 0 0 8px var(--orange);
        }
        .hcard-status {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.7rem; color: rgba(255,255,255,0.7);
        }
        .status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px #4ade80;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1 } 50% { opacity:0.4 }
        }

        /* STATS BAR */
        .hero-stats-bar {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 1.5rem 0; margin-top: 3rem;
          position: relative; z-index: 3;
        }
        .stats-row {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 0;
        }
        .stat-pill {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.5rem 2rem;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .stat-pill:last-child { border-right: none; }
        .stat-icon { font-size: 1.5rem; display: flex; align-items: center; }
        .stat-val {
          display: block;
          font-family: 'Fraunces', serif;
          font-size: 1.8rem; font-weight: 600; color: white; line-height: 1;
        }
        .stat-lbl {
          display: block; font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase; letter-spacing: 0.08em;
        }

        /* SECTIONS */
        .section { padding: 6rem 0; }
        .section-head {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 3rem; align-items: end; margin-bottom: 3rem;
        }
        .section-intro { font-size: 0.97rem; color: var(--text-muted); line-height: 1.8; }
        .svc-section { background: var(--off-white); }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1.5rem;
        }

        /* WHY */
        .why-section { background: var(--blue-pale); }
        .why-layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: 5rem; align-items: start; }
        .why-numbers {
          display: flex; gap: 2rem; margin-top: 2.5rem;
          padding-top: 2rem; border-top: 1.5px solid rgba(8,20,227,0.12);
        }
        .why-num-item { text-align: center; }
        .why-num-val {
          display: block;
          font-family: 'Fraunces', serif;
          font-size: 2.2rem; font-weight: 600;
          color: var(--royal); line-height: 1;
        }
        .why-num-lbl { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); }
        .why-right { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .why-card {
          display: flex; gap: 1rem;
          background: var(--white);
          border: 1px solid rgba(8,20,227,0.08);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .why-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
        .why-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--blue-dim); border-radius: var(--radius);
        }
        .why-card-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.3rem; }
        .why-card-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.65; }

        /* PROCESS */
        .process-section { background: var(--white); }
        .process-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; position: relative; }
        .process-step {
          text-align: center; padding: 2rem 1.5rem;
          background: var(--off-white);
          border: 1.5px solid rgba(8,20,227,0.08);
          border-radius: var(--radius-lg);
          position: relative;
          transition: var(--transition);
        }
        .process-step:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: rgba(8,20,227,0.2); }
        .ps-num {
          font-family: 'Fraunces', serif;
          font-size: 2.5rem; font-weight: 300;
          color: rgba(8,20,227,0.12); line-height: 1; margin-bottom: 0.75rem;
        }
        .ps-icon {
          display: flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; margin: 0 auto 0.75rem;
          background: var(--blue-dim); border-radius: 50%;
        }
        .ps-title { font-size: 1rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; font-family: 'Plus Jakarta Sans', sans-serif; }
        .ps-desc { font-size: 0.83rem; color: var(--text-muted); line-height: 1.65; }
        .ps-connector {
          position: absolute; top: 50%; right: -0.85rem;
          width: 1.5rem; height: 2px;
          background: linear-gradient(90deg, var(--royal), var(--blue-mid));
          z-index: 1;
        }

        /* CTA */
        .cta-section { padding: 5rem 0; background: var(--off-white); }
        .cta-box {
          background: linear-gradient(135deg, var(--royal) 0%, var(--blue-mid) 100%);
          border-radius: var(--radius-xl);
          padding: 4rem;
          display: flex; align-items: center;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
          position: relative; overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .cta-bg-1 {
          position: absolute; top: -60px; right: -60px;
          width: 250px; height: 250px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .cta-bg-2 {
          position: absolute; bottom: -80px; left: 30%;
          width: 300px; height: 300px; border-radius: 50%;
          background: rgba(255,122,0,0.1);
          pointer-events: none;
        }
        .cta-text { position: relative; }
        .cta-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400; color: var(--white);
          margin-bottom: 0.4rem;
        }
        .cta-sub { font-size: 0.93rem; color: rgba(255,255,255,0.65); }
        .cta-actions { display: flex; gap: 1rem; flex-shrink: 0; position: relative; }

        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; }
          .hero-visual { display: none; }
          .svc-grid { grid-template-columns: 1fr 1fr; }
          .why-layout { grid-template-columns: 1fr; gap: 3rem; }
          .why-right { grid-template-columns: 1fr 1fr; }
          .process-steps { grid-template-columns: 1fr 1fr; }
          .ps-connector { display: none; }
        }
        @media (max-width: 768px) {
          .hero-inner { padding-top: 1rem; }
          .stats-row { grid-template-columns: 1fr 1fr; }
          .stat-pill { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .section-head { grid-template-columns: 1fr; gap: 1rem; }
          .svc-grid { grid-template-columns: 1fr; }
          .why-right { grid-template-columns: 1fr; }
          .process-steps { grid-template-columns: 1fr 1fr; }
          .cta-box { flex-direction: column; text-align: center; padding: 2.5rem; }
          .cta-actions { flex-wrap: wrap; justify-content: center; }
        }
        @media (max-width: 480px) {
          .process-steps { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
