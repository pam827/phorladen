import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../services/api";
import ServiceCard from "../components/ServiceCard";

const FALLBACK = [
  { id:1, name:"Courier & Cargo",      slug:"courier-cargo",      description:"Reliable, fast, and secure courier and cargo solutions across domestic and international destinations." },
  { id:2, name:"Travel Reservation",   slug:"travel-reservation", description:"Premium travel booking services tailored to business and leisure travelers worldwide." },
  { id:3, name:"Hotel Reservation",    slug:"hotel-reservation",  description:"Curated hotel accommodations from boutique properties to luxury five-star resorts globally." },
  { id:4, name:"Aircraft Charter",     slug:"aircraft-charter",   description:"Private and commercial aircraft charter services for executives, groups, and specialized cargo." },
  { id:5, name:"General Logistics",    slug:"general-logistics",  description:"End-to-end logistics management including warehousing, distribution, and supply chain optimization." },
];

const STATS = [
  { value:"12+", label:"Years Experience", icon:"🏆" },
  { value:"50+", label:"Countries Served", icon:"🌍" },
  { value:"10K+",label:"Happy Clients",    icon:"😊" },
  { value:"99%", label:"On-Time Delivery", icon:"⚡" },
];

const WHY_US = [
  { icon:"🌐", title:"Global Network",    desc:"Operations spanning 50+ countries with trusted local partners for seamless end-to-end delivery." },
  { icon:"⚡", title:"Speed & Reliability",desc:"Time-critical shipments handled with precision, real-time tracking, and guaranteed timelines." },
  { icon:"🔒", title:"Secure Handling",   desc:"Every shipment is insured, tracked, and handled with the highest security standards." },
  { icon:"💬", title:"24/7 Support",      desc:"Dedicated account managers available around the clock for every query and concern." },
  { icon:"💼", title:"Tailored Solutions",desc:"Customized logistics and travel packages designed specifically for your business needs." },
  { icon:"✅", title:"Certified & Licensed",desc:"Fully accredited with IATA, FAAN, and major international logistics certifications." },
];

export default function Home() {
  const [services, setServices] = useState(FALLBACK);
  useEffect(() => {
    getServices().then(r => r.data?.length && setServices(r.data)).catch(()=>{});
  }, []);

  return (
    <div className="home">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
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
              <Link to="/services" className="btn-outline">Explore Services</Link>
            </div>
            <div className="hero-trust fade-up fade-up-3">
              <span className="trust-text">Certified with</span>
              {["IATA","FAAN","ICEA","FIATA"].map(b => (
                <span key={b} className="trust-badge">{b}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual fade-up fade-up-2">
            <div className="hero-card-stack">
              <div className="hcard hcard-back" />
              <div className="hcard hcard-mid" />
              <div className="hcard hcard-front">
                <div className="hcard-icon">✈️</div>
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

        <div className="hero-stats-bar fade-up fade-up-4">
          <div className="container">
            <div className="stats-row">
              {STATS.map(({ value, label, icon }) => (
                <div key={label} className="stat-pill">
                  <span className="stat-icon">{icon}</span>
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
                With over a decade of experience, Phorladen has established itself as the leading provider of integrated logistics and travel solutions in West Africa. Our commitment is simple: deliver beyond expectations, every single time.
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
                  <div className="why-icon">{icon}</div>
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
              { n:"01", icon:"📝", title:"Submit Request",  desc:"Fill our quick service form with your requirements." },
              { n:"02", icon:"💬", title:"Receive Quote",   desc:"Get a tailored quote from our team within 2 hours." },
              { n:"03", icon:"✅", title:"Confirm & Pay",   desc:"Review, confirm, and proceed with your booking." },
              { n:"04", icon:"🚀", title:"We Deliver",      desc:"Our experts execute with full tracking and updates." },
            ].map(({ n, icon, title, desc }, i) => (
              <div key={n} className="process-step">
                <div className="ps-num">{n}</div>
                <div className="ps-icon">{icon}</div>
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
          background: linear-gradient(160deg, var(--dark) 0%, var(--dark-2) 45%, var(--royal-deep) 100%);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .hero-bg { position: absolute; inset: 0; pointer-events: none; }
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
          position: relative; z-index: 1;
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
          position: relative; z-index: 1;
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
        .stat-icon { font-size: 1.5rem; }
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
        .why-icon { font-size: 1.5rem; flex-shrink: 0; }
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
        .ps-icon { font-size: 2rem; margin-bottom: 0.75rem; }
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
