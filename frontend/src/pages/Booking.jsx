import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createBooking, getServices } from "../services/api";

const FALLBACK_SVC = [
  { id:1, name:"Courier & Cargo" },{ id:2, name:"Travel Reservation" },
  { id:3, name:"Hotel Reservation" },{ id:4, name:"Aircraft Charter" },{ id:5, name:"General Logistics" },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState(FALLBACK_SVC);
  const [form, setForm] = useState({ full_name:"",email:"",phone:"",service_id:searchParams.get("service")||"",preferred_date:"",message:"" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getServices().then(r=>r.data?.length&&setServices(r.data)).catch(()=>{});
  }, []);

  const showToast = (msg,type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),4000); };
  const set = f => e => setForm({...form,[f]:e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.full_name||!form.email||!form.service_id) { showToast("Please fill all required fields.","error"); return; }
    setLoading(true);
    try { await createBooking(form); setSubmitted(true); }
    catch { showToast("Something went wrong. Please try again.","error"); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div>
      <section style={{ minHeight:"80vh",display:"flex",alignItems:"center",background:"linear-gradient(135deg,var(--dark) 0%,var(--royal-deep) 100%)",paddingTop:"6rem" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <div style={{ width:"80px",height:"80px",background:"rgba(74,222,128,0.1)",border:"2px solid #4ade80",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",margin:"0 auto 2rem" }}>✅</div>
          <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:"2.8rem",fontWeight:400,marginBottom:"1rem",color:"var(--white)" }}>Request Received!</h1>
          <p style={{ color:"rgba(255,255,255,0.65)",fontSize:"1rem",maxWidth:"460px",margin:"0 auto 2.5rem",lineHeight:1.8 }}>
            Thank you, {form.full_name}! Our team will review your request and get back to you within 2 business hours.
          </p>
          <button onClick={()=>{setSubmitted(false);setForm({full_name:"",email:"",phone:"",service_id:"",preferred_date:"",message:""});}} className="btn-white">
            Submit Another Request
          </button>
        </div>
      </section>
    </div>
  );

  return (
    <div>
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      <section className="page-hero">
        <div className="container">
          <span className="section-label fade-up">Get Started</span>
          <h1 className="section-title fade-up fade-up-1">Request <em>a Quote</em></h1>
          <div className="blue-line fade-up fade-up-2" />
          <p className="fade-up fade-up-3" style={{ color:"rgba(255,255,255,0.65)",fontSize:"1rem",lineHeight:1.8,maxWidth:"500px" }}>
            Fill in the form and our team will contact you with a tailored quote within 2 hours.
          </p>
        </div>
      </section>

      <section style={{ padding:"5rem 0",background:"var(--off-white)" }}>
        <div className="container bk-grid">
          <div>
            <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:"1.8rem",marginBottom:"1.75rem",color:"var(--text-dark)" }}>Why Request Through Us?</h3>
            {[
              { icon:"⚡",title:"Fast Response",    desc:"Our team responds to all requests within 2 business hours." },
              { icon:"💰",title:"Best Rates",       desc:"We negotiate the best rates from our global partner network." },
              { icon:"🔒",title:"Secure & Trusted", desc:"All transactions are secure and your data is fully protected." },
              { icon:"🌐",title:"Global Reach",     desc:"Service coverage across 50+ countries and counting." },
            ].map(({icon,title,desc})=>(
              <div key={title} style={{ display:"flex",gap:"1rem",marginBottom:"1.75rem",alignItems:"flex-start" }}>
                <div style={{ width:"44px",height:"44px",background:"var(--blue-dim)",border:"1px solid rgba(8,20,227,0.12)",borderRadius:"var(--radius)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0 }}>{icon}</div>
                <div>
                  <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"0.93rem",fontWeight:700,color:"var(--text-dark)",marginBottom:"0.25rem" }}>{title}</h4>
                  <p style={{ fontSize:"0.85rem",color:"var(--text-muted)",lineHeight:1.65 }}>{desc}</p>
                </div>
              </div>
            ))}

            <div style={{ background:"linear-gradient(135deg,var(--royal) 0%,var(--blue-mid) 100%)",borderRadius:"var(--radius-lg)",padding:"1.75rem",color:"white",marginTop:"1rem" }}>
              <p style={{ fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",opacity:.7,marginBottom:"0.75rem" }}>Need Help?</p>
              <p style={{ fontSize:"0.9rem",marginBottom:"0.4rem",fontWeight:600 }}>📞 +2348034724314</p>
              <p style={{ fontSize:"0.9rem",fontWeight:600 }}>✉️ info@phorladen.com</p>
            </div>
          </div>

          <div style={{ background:"var(--white)",border:"1.5px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius-lg)",padding:"2.5rem",boxShadow:"var(--shadow)" }}>
            <div style={{ width:"48px",height:"4px",background:"linear-gradient(90deg,var(--royal),var(--orange))",borderRadius:"4px",marginBottom:"1.5rem" }} />
            <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:"1.8rem",marginBottom:"1.75rem" }}>Service Request Form</h2>
            <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:"1.25rem" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem" }}>
                <div className="form-group"><label>Full Name *</label><input value={form.full_name} onChange={set("full_name")} placeholder="John Adebayo" required /></div>
                <div className="form-group"><label>Phone Number</label><input value={form.phone} onChange={set("phone")} placeholder="+234 800 000 0000" type="tel" /></div>
              </div>
              <div className="form-group"><label>Email Address *</label><input value={form.email} onChange={set("email")} placeholder="john@example.com" type="email" required /></div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem" }}>
                <div className="form-group">
                  <label>Service Type *</label>
                  <select value={form.service_id} onChange={set("service_id")} required>
                    <option value="">Select a service...</option>
                    {services.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Preferred Date</label><input value={form.preferred_date} onChange={set("preferred_date")} type="date" min={new Date().toISOString().split("T")[0]} /></div>
              </div>
              <div className="form-group"><label>Message / Requirements</label><textarea value={form.message} onChange={set("message")} placeholder="Describe your requirements — origin, destination, quantity, special handling..." rows={5} /></div>
              <button type="submit" className="btn-primary" style={{ justifyContent:"center",width:"100%" }} disabled={loading}>
                {loading ? "Submitting..." : "Submit Request →"}
              </button>
              <p style={{ fontSize:"0.75rem",color:"var(--text-muted)",textAlign:"center" }}>By submitting, you agree to our Privacy Policy. We'll never share your data.</p>
            </form>
          </div>
        </div>
      </section>
      <style>{`
        .bk-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start; }
        @media (max-width:960px) { .bk-grid { grid-template-columns: 1fr; } }
        @media (max-width:560px) {
          form > div:first-child, form > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
