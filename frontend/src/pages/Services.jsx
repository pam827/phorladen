import { useState, useEffect } from "react";
import { getServices } from "../services/api";
import ServiceCard from "../components/ServiceCard";

const FALLBACK = [
  { id:1, name:"Courier & Cargo",      slug:"courier-cargo",      description:"Reliable, fast, and secure courier and cargo solutions across domestic and international destinations." },
  { id:2, name:"Travel Reservation",   slug:"travel-reservation", description:"Premium travel booking services tailored to business and leisure travelers worldwide." },
  { id:3, name:"Hotel Reservation",    slug:"hotel-reservation",  description:"Curated hotel accommodations from boutique properties to luxury five-star resorts globally." },
  { id:4, name:"Aircraft Charter",     slug:"aircraft-charter",   description:"Private and commercial aircraft charter services for executives, groups, and specialized cargo." },
  { id:5, name:"General Logistics",    slug:"general-logistics",  description:"End-to-end logistics management including warehousing, distribution, and supply chain optimization." },
];

export default function Services() {
  const [services, setServices] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then(r => r.data?.length && setServices(r.data)).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="section-label fade-up">What We Offer</span>
          <h1 className="section-title fade-up fade-up-1">Our <em>Services</em></h1>
          <div className="blue-line fade-up fade-up-2" />
          <p className="fade-up fade-up-3" style={{ color:"rgba(255,255,255,0.65)", maxWidth:"520px", fontSize:"1rem", lineHeight:1.8 }}>
            Comprehensive logistics, travel, and freight solutions tailored for individuals and enterprises across Africa and internationally.
          </p>
        </div>
      </section>

      <section style={{ padding:"5rem 0", background:"var(--off-white)" }}>
        <div className="container">
          {loading ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
              {[1,2,3,4,5].map(n => <div key={n} className="skeleton-card" />)}
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
              {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
            </div>
          )}
        </div>
      </section>

      <section style={{ padding:"5rem 0", background:"var(--white)" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <span className="section-label">Simple Process</span>
            <h2 className="section-title">How It <em>Works</em></h2>
            <div className="blue-line" style={{ margin:"0 auto" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.5rem" }}>
            {[
              { step:"01", title:"Submit Request",  desc:"Fill our quick form with your service requirements.",  d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" },
              { step:"02", title:"Get a Quote",     desc:"Receive a tailored quote within 2 hours.",            d:"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
              { step:"03", title:"Confirm Booking", desc:"Review, confirm, and proceed securely.",              d:"M22 11.08V12a10 10 0 11-5.93-9.14M22 4l-10 10.01-3-3" },
              { step:"04", title:"We Deliver",      desc:"Our team executes with full tracking.",               d:"M5 12h14M12 5l7 7-7 7" },
            ].map(({ step, title, desc, d }) => (
              <div key={step} style={{ textAlign:"center", padding:"2rem 1.5rem", background:"var(--off-white)", border:"1.5px solid rgba(8,20,227,0.08)", borderRadius:"var(--radius-lg)", transition:"var(--transition)" }}>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:"2.2rem", fontWeight:300, color:"rgba(8,20,227,0.12)", lineHeight:1, marginBottom:"0.75rem" }}>{step}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"56px", height:"56px", margin:"0 auto 0.75rem", background:"rgba(8,20,227,0.06)", borderRadius:"50%" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--royal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                </div>
                <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.95rem", fontWeight:700, color:"var(--text-dark)", marginBottom:"0.4rem" }}>{title}</h3>
                <p style={{ fontSize:"0.83rem", color:"var(--text-muted)", lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width:960px) {
          section > .container > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr 1fr !important; }
          section > .container > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr 1fr !important; }
          .skeleton-card { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width:560px) {
          section > .container > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
