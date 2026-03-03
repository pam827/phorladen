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
    <div>
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
            <div style={{ textAlign:"center", padding:"4rem", color:"var(--text-muted)" }}>Loading services...</div>
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
              { step:"01", icon:"📝", title:"Submit Request",  desc:"Fill our quick form with your service requirements." },
              { step:"02", icon:"💬", title:"Get a Quote",     desc:"Receive a tailored quote within 2 hours." },
              { step:"03", icon:"✅", title:"Confirm Booking", desc:"Review, confirm, and proceed securely." },
              { step:"04", icon:"🚀", title:"We Deliver",      desc:"Our team executes with full tracking." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} style={{ textAlign:"center", padding:"2rem 1.5rem", background:"var(--off-white)", border:"1.5px solid rgba(8,20,227,0.08)", borderRadius:"var(--radius-lg)", transition:"var(--transition)" }}>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:"2.2rem", fontWeight:300, color:"rgba(8,20,227,0.12)", lineHeight:1, marginBottom:"0.75rem" }}>{step}</div>
                <div style={{ fontSize:"2rem", marginBottom:"0.75rem" }}>{icon}</div>
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
        }
        @media (max-width:560px) {
          section > .container > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
