import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-enter">
      <section className="page-hero" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(5rem, 15vw, 10rem)", fontWeight: 300, color: "rgba(255,255,255,0.08)", lineHeight: 1, marginBottom: "-1rem", userSelect: "none" }}>404</p>
          <h1 className="section-title fade-up" style={{ color: "var(--white)" }}>Page Not Found</h1>
          <div className="blue-line fade-up fade-up-1" style={{ margin: "0 auto" }} />
          <p className="fade-up fade-up-2" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "440px", margin: "0 auto 2.5rem", fontSize: "1rem", lineHeight: 1.8 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary fade-up fade-up-3">
            Back to Home
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
