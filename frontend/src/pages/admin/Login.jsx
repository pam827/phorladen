import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = f => e => setForm({...form,[f]:e.target.value});

  const handleSubmit = async e => {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(form); navigate("/admin/dashboard"); }
    catch { setError("Invalid username or password."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,var(--dark) 0%,var(--dark-2) 50%,var(--royal-deep) 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}} />
      <div style={{position:"fixed",top:"-30%",right:"-10%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(8,20,227,0.2) 0%,transparent 70%)",pointerEvents:"none"}} />

      <div style={{position:"relative",width:"100%",maxWidth:"420px"}}>
        <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
          <div style={{width:"56px",height:"56px",background:"linear-gradient(135deg,var(--royal),var(--blue-mid))",borderRadius:"var(--radius-lg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",margin:"0 auto 1rem",boxShadow:"0 8px 24px rgba(8,20,227,0.4)"}}>✈</div>
          <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"1.1rem",fontWeight:800,color:"var(--white)",letterSpacing:"0.08em"}}>PHORLADEN</h1>
          <p style={{fontSize:"0.65rem",fontWeight:600,letterSpacing:"0.2em",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",marginTop:"0.2rem"}}>Admin Portal</p>
        </div>

        <div style={{background:"rgba(255,255,255,0.04)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"var(--radius-xl)",padding:"2.5rem"}}>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"1.7rem",fontWeight:400,marginBottom:"0.35rem",color:"var(--white)"}}>Welcome Back</h2>
          <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.45)",marginBottom:"2rem"}}>Sign in to manage your platform.</p>

          {error && (
            <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",padding:"0.85rem 1rem",fontSize:"0.85rem",marginBottom:"1.5rem",borderRadius:"var(--radius)"}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1.1rem"}}>
            <div className="form-group">
              <label style={{color:"rgba(255,255,255,0.5)"}}>Username</label>
              <input value={form.username} onChange={set("username")} placeholder="admin" autoComplete="username" required
                style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"var(--white)"}} />
            </div>
            <div className="form-group">
              <label style={{color:"rgba(255,255,255,0.5)"}}>Password</label>
              <input value={form.password} onChange={set("password")} placeholder="••••••••" type="password" autoComplete="current-password" required
                style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"var(--white)"}} />
            </div>
            <button type="submit" className="btn-primary" style={{justifyContent:"center",marginTop:"0.5rem"}} disabled={loading}>
              {loading?"Signing in...":"Sign In →"}
            </button>
          </form>

          <div style={{marginTop:"1.75rem",paddingTop:"1.5rem",borderTop:"1px solid rgba(255,255,255,0.08)",textAlign:"center"}}>
            <a href="/" style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.35)"}}>← Back to Website</a>
          </div>
        </div>

        <p style={{textAlign:"center",fontSize:"0.72rem",color:"rgba(255,255,255,0.2)",marginTop:"1.5rem"}}>
          © {new Date().getFullYear()} Phorladen Global Services
        </p>
      </div>
    </div>
  );
}
