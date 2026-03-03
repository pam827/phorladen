import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost/phorladen/backend/index.php";

export default function Contact() {
  const [form,setForm]=useState({name:"",email:"",phone:"",subject:"",message:""});
  const [loading,setLoading]=useState(false);
  const [toast,setToast]=useState(null);
  const showToast=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),4000);};
  const set=f=>e=>setForm({...form,[f]:e.target.value});

  const handleSubmit=async e=>{
    e.preventDefault(); setLoading(true);
    try { await axios.post(`${BASE_URL}/contact`,form,{withCredentials:true}); showToast("Message sent! We'll be in touch shortly."); setForm({name:"",email:"",phone:"",subject:"",message:""}); }
    catch { showToast("Something went wrong. Please try again.","error"); }
    finally { setLoading(false); }
  };

  return (
    <div>
      {toast&&<div className={`toast ${toast.type}`}>{toast.msg}</div>}
      <section className="page-hero">
        <div className="container">
          <span className="section-label fade-up">Get In Touch</span>
          <h1 className="section-title fade-up fade-up-1">Contact <em>Us</em></h1>
          <div className="blue-line fade-up fade-up-2" />
          <p className="fade-up fade-up-3" style={{color:"rgba(255,255,255,0.65)",fontSize:"1rem",lineHeight:1.8,maxWidth:"500px"}}>
            Have a question or ready to get started? Reach out and we'll get back to you within 2 hours.
          </p>
        </div>
      </section>

      <section style={{padding:"5rem 0",background:"var(--off-white)"}}>
        <div className="container ct-grid">
          <div>
            <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"1.8rem",marginBottom:"2rem"}}>Let's <em style={{color:"var(--royal)"}}>Connect</em></h3>
            {[
              {icon:"📍",title:"Head Office",   lines:["123 Global Avenue","Business District, Lagos, Nigeria"]},
              {icon:"📞",title:"Phone",         lines:["+2348034724314","+2348021038466"]},
              {icon:"✉️",title:"Email",         lines:["Ladenglowing@gmail.com",""]},
              {icon:"🕐",title:"Business Hours",lines:["Mon–Fri: 8AM – 6PM WAT","Saturday: 9AM – 2PM WAT"]},
            ].map(({icon,title,lines})=>(
              <div key={title} style={{display:"flex",gap:"1.1rem",marginBottom:"1.75rem",alignItems:"flex-start"}}>
                <div style={{width:"46px",height:"46px",background:"linear-gradient(135deg,var(--royal),var(--blue-mid))",borderRadius:"var(--radius)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.15rem",flexShrink:0,boxShadow:"0 4px 12px rgba(8,20,227,0.3)"}}>
                  {icon}
                </div>
                <div>
                  <p style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--orange)",marginBottom:"0.3rem"}}>{title}</p>
                  {lines.map((l,i)=><p key={i} style={{fontSize:"0.88rem",color:"var(--text-body)",lineHeight:1.6}}>{l}</p>)}
                </div>
              </div>
            ))}

            <div style={{background:"var(--blue-pale)",border:"1.5px solid rgba(8,20,227,0.1)",borderRadius:"var(--radius-lg)",height:"200px",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1.5rem"}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>🗺️</div>
                <p style={{fontSize:"0.82rem",color:"var(--text-muted)",fontWeight:600}}>Google Maps Embed</p>
                <p style={{fontSize:"0.72rem",color:"rgba(8,20,227,0.3)",marginTop:"0.2rem"}}>Replace with Google Maps iframe</p>
              </div>
            </div>
          </div>

          <div style={{background:"var(--white)",border:"1.5px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius-lg)",padding:"2.5rem",boxShadow:"var(--shadow)"}}>
            <div style={{width:"48px",height:"4px",background:"linear-gradient(90deg,var(--royal),var(--orange))",borderRadius:"4px",marginBottom:"1.5rem"}} />
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"1.8rem",marginBottom:"1.75rem"}}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
                <div className="form-group"><label>Full Name *</label><input value={form.name} onChange={set("name")} placeholder="John Adebayo" required /></div>
                <div className="form-group"><label>Phone</label><input value={form.phone} onChange={set("phone")} placeholder="+234 ..." type="tel" /></div>
              </div>
              <div className="form-group"><label>Email Address *</label><input value={form.email} onChange={set("email")} placeholder="john@example.com" type="email" required /></div>
              <div className="form-group"><label>Subject</label><input value={form.subject} onChange={set("subject")} placeholder="How can we help?" /></div>
              <div className="form-group"><label>Message *</label><textarea value={form.message} onChange={set("message")} placeholder="Write your message here..." rows={6} required /></div>
              <button type="submit" className="btn-primary" style={{justifyContent:"center",width:"100%"}} disabled={loading}>
                {loading?"Sending...":"Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <style>{`
        .ct-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
        @media (max-width:960px) { .ct-grid { grid-template-columns: 1fr; } }
        @media (max-width:560px) { form > div:first-child { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
