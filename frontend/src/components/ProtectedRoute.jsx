import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"var(--dark)" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:"48px",height:"48px",background:"linear-gradient(135deg,var(--royal),var(--blue-mid))",borderRadius:"var(--radius-lg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",margin:"0 auto 1rem",animation:"pulse 1.5s ease infinite" }}>✈</div>
        <p style={{ color:"rgba(255,255,255,0.4)",fontSize:"0.78rem",letterSpacing:"0.1em",fontWeight:600 }}>LOADING...</p>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  );
  return admin ? children : <Navigate to="/admin/login" replace />;
}
