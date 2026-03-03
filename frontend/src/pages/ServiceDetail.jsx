import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getService } from "../services/api";

const FALLBACK = {
  "courier-cargo":      { name:"Courier & Cargo",       icon:"📦", color:"var(--royal)",  description:"Phorladen's Courier & Cargo service provides end-to-end delivery solutions for individuals and businesses. Whether you're shipping documents, parcels, or bulk freight, we guarantee safe, timely, and cost-effective delivery across Nigeria and internationally.", features:["Same-day and next-day delivery options","Real-time tracking and notifications","Insured packages up to $50,000","Temperature-controlled cargo handling","Customs clearance assistance","Door-to-door pickup and delivery"] },
  "travel-reservation": { name:"Travel Reservation",    icon:"✈️", color:"var(--orange)", description:"Our Travel Reservation service offers bespoke travel planning for business executives, families, and groups. We handle everything from flight bookings and visa arrangements to ground transportation and travel insurance.", features:["Domestic and international flight bookings","Business class and first class arrangements","Visa application support","Travel insurance packages","Group travel coordination","24/7 travel support hotline"] },
  "hotel-reservation":  { name:"Hotel Reservation",     icon:"🏨", color:"var(--royal)",  description:"Experience seamless hotel booking through Phorladen's Hotel Reservation service. We partner with over 5,000 properties worldwide, from budget-friendly business hotels to ultra-luxury resorts.", features:["Access to 5,000+ global properties","Negotiated corporate rates","Room upgrades and special amenities","Extended stay arrangements","Conference and event venue booking","Airport transfer coordination"] },
  "aircraft-charter":   { name:"Aircraft Charter",      icon:"🛩️", color:"var(--orange)", description:"Phorladen's Aircraft Charter service provides private and semi-private air travel solutions for executives, corporate groups, and time-sensitive cargo. Fly on your schedule, not the airline's.", features:["Light, mid-size, and heavy jet options","Cargo-configured aircraft available","On-demand departure scheduling","International and regional routes","In-flight catering and concierge","Dedicated charter coordinators"] },
  "general-logistics":  { name:"General Logistics",     icon:"🚚", color:"var(--royal)",  description:"Our General Logistics division manages complex supply chains with precision. From warehousing and inventory management to last-mile delivery and distribution planning, we optimize your entire logistics operation.", features:["Supply chain consulting","Warehousing and inventory management","Distribution network optimization","Fleet management services","Import/export documentation","Third-party logistics (3PL) solutions"] },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const fb = FALLBACK[slug];

  useEffect(() => {
    window.scrollTo(0,0);
    getService(slug).then(r => setService(r.data)).catch(()=>setService(fb||null)).finally(()=>setLoading(false));
  }, [slug]);

  if (loading) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh" }}><div className="spinner lg" /></div>;
  if (!service) return <div style={{ textAlign:"center",padding:"8rem 2rem" }}><h2>Service not found</h2><Link to="/services" className="btn-blue" style={{ marginTop:"1.5rem",display:"inline-flex" }}>Back to Services</Link></div>;

  const features = service.features || fb?.features || [];
  const meta = fb || {};

  return (
    <div className="page-enter">
      <section className="page-hero" style={{ paddingBottom:"6rem" }}>
        <div className="container">
          <Link to="/services" style={{ color:"rgba(255,255,255,0.5)",fontSize:"0.82rem",letterSpacing:"0.05em",display:"inline-flex",alignItems:"center",gap:"0.4rem",marginBottom:"1.5rem" }}>
            ← All Services
          </Link>
          <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>{meta.icon || "🌐"}</div>
          <h1 className="section-title fade-up">{service.name}</h1>
          <div className="blue-line fade-up fade-up-1" />
        </div>
      </section>

      <section style={{ padding:"5rem 0",background:"var(--off-white)" }}>
        <div className="container" style={{ display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:"4rem",alignItems:"start" }}>
          <div>
            <span className="section-label">Overview</span>
            <p style={{ fontSize:"1.02rem",color:"var(--text-body)",lineHeight:1.85,marginBottom:"2.5rem" }}>{service.description}</p>
            {features.length > 0 && (
              <>
                <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:"1.6rem",marginBottom:"1.25rem",color:"var(--text-dark)" }}>Key Features</h3>
                <ul style={{ listStyle:"none",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem" }}>
                  {features.map((f,i) => (
                    <li key={i} style={{ display:"flex",alignItems:"flex-start",gap:"0.75rem",fontSize:"0.9rem",color:"var(--text-body)",background:"var(--white)",border:"1px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius)",padding:"0.85rem 1rem",boxShadow:"var(--shadow-sm)" }}>
                      <span style={{ color:"var(--royal)",fontWeight:700,flexShrink:0,marginTop:"1px" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div style={{ position:"sticky",top:"6rem" }}>
            <div style={{ background:"var(--white)",border:"1.5px solid rgba(8,20,227,0.1)",borderRadius:"var(--radius-lg)",padding:"2.25rem",boxShadow:"var(--shadow)" }}>
              <div style={{ width:"48px",height:"4px",background:"linear-gradient(90deg,var(--royal),var(--orange))",borderRadius:"4px",marginBottom:"1.25rem" }} />
              <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:"1.6rem",marginBottom:"0.5rem" }}>Ready to Get Started?</h3>
              <p style={{ color:"var(--text-muted)",fontSize:"0.88rem",marginBottom:"1.75rem",lineHeight:1.7 }}>
                Request a customized quote for {service.name} and our team will respond within 2 hours.
              </p>
              <Link to={`/booking?service=${service.id||""}`} className="btn-primary" style={{ width:"100%",justifyContent:"center",marginBottom:"0.75rem" }}>
                Request This Service
              </Link>
              <Link to="/contact" className="btn-outline" style={{ width:"100%",justifyContent:"center" }}>Ask a Question</Link>
              <div style={{ marginTop:"1.75rem",paddingTop:"1.5rem",borderTop:"1px solid rgba(8,20,227,0.08)",display:"flex",flexDirection:"column",gap:"0.5rem" }}>
                <p style={{ fontSize:"0.82rem",color:"var(--text-muted)",display:"flex",alignItems:"center",gap:"0.5rem" }}>📞 +234 8034724314</p>
                <p style={{ fontSize:"0.82rem",color:"var(--text-muted)",display:"flex",alignItems:"center",gap:"0.5rem" }}>✉️ Ladenglowing@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width:960px) {
          section > .container { grid-template-columns: 1fr !important; }
          ul[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
