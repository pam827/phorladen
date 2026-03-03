import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBookings, updateBooking, deleteBooking, getServices, updateService } from "../../services/api";

const STATUS = {
  pending:   { bg:"#FFF7ED", border:"#FED7AA", text:"#C2410C", label:"Pending" },
  contacted: { bg:"#EFF6FF", border:"#BFDBFE", text:"#1D4ED8", label:"Contacted" },
  completed: { bg:"#F0FDF4", border:"#BBF7D0", text:"#15803D", label:"Completed" },
};

const NAV = [
  { id:"bookings",  icon:"📋", label:"Bookings" },
  { id:"services",  icon:"🌐", label:"Services" },
  { id:"analytics", icon:"📊", label:"Analytics" },
];

export default function Dashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [editSvc, setEditSvc] = useState(null);
  const [viewBk, setViewBk] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const showToast=(msg,type="success")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3500); };

  useEffect(()=>{
    Promise.all([getBookings(),getServices()])
      .then(([b,s])=>{ setBookings(b.data||[]); setServices(s.data||[]); })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  },[]);

  const handleLogout = async ()=>{ await logout(); navigate("/admin/login"); };
  const handleStatusChange = async(id,status)=>{
    try{ await updateBooking(id,{status}); setBookings(p=>p.map(b=>b.id===id?{...b,status}:b)); showToast("Status updated."); }
    catch{ showToast("Failed.","error"); }
  };
  const handleDelete = async id=>{
    if(!confirm("Delete this booking?")) return;
    try{ await deleteBooking(id); setBookings(p=>p.filter(b=>b.id!==id)); setViewBk(null); showToast("Deleted."); }
    catch{ showToast("Failed.","error"); }
  };
  const handleSaveSvc = async()=>{
    try{ await updateService(editSvc.id,{name:editSvc.name,description:editSvc.description}); setServices(p=>p.map(s=>s.id===editSvc.id?editSvc:s)); setEditSvc(null); showToast("Service updated."); }
    catch{ showToast("Failed.","error"); }
  };

  const filtered = bookings.filter(b=>{
    const ms = !search || b.full_name?.toLowerCase().includes(search.toLowerCase()) || b.email?.toLowerCase().includes(search.toLowerCase());
    const ms2 = statusFilter==="all" || b.status===statusFilter;
    return ms && ms2;
  });

  const stats = { total:bookings.length, pending:bookings.filter(b=>b.status==="pending").length, contacted:bookings.filter(b=>b.status==="contacted").length, completed:bookings.filter(b=>b.status==="completed").length };

  return (
    <div style={{minHeight:"100vh",background:"var(--off-white)",display:"flex"}}>
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      {/* SIDEBAR */}
      <aside style={{width:"240px",background:"var(--white)",borderRight:"1px solid rgba(8,20,227,0.08)",padding:"1.75rem 1.25rem",display:"flex",flexDirection:"column",position:"fixed",top:0,bottom:0,left:0,zIndex:100,boxShadow:"4px 0 24px rgba(8,20,227,0.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"2.5rem",paddingBottom:"1.5rem",borderBottom:"1px solid rgba(8,20,227,0.08)"}}>
          <div style={{width:"36px",height:"36px",background:"linear-gradient(135deg,var(--royal),var(--blue-mid))",borderRadius:"var(--radius-sm)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1rem",boxShadow:"0 4px 12px rgba(8,20,227,0.3)"}}>✈</div>
          <div>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"0.9rem",fontWeight:800,color:"var(--royal)",letterSpacing:"0.06em",lineHeight:1}}>PHORLADEN</p>
            <p style={{fontSize:"0.58rem",fontWeight:600,letterSpacing:"0.15em",color:"var(--text-muted)",textTransform:"uppercase",marginTop:"2px"}}>Admin</p>
          </div>
        </div>

        <nav style={{flex:1,display:"flex",flexDirection:"column",gap:"0.25rem"}}>
          {NAV.map(({id,icon,label})=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.8rem 1rem",background:tab===id?"var(--blue-dim)":"transparent",border:"none",borderRadius:"var(--radius)",color:tab===id?"var(--royal)":"var(--text-muted)",fontSize:"0.88rem",fontWeight:600,cursor:"pointer",textAlign:"left",width:"100%",transition:"all 0.2s",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              <span style={{fontSize:"1rem"}}>{icon}</span>{label}
            </button>
          ))}
        </nav>

        <div style={{borderTop:"1px solid rgba(8,20,227,0.08)",paddingTop:"1.1rem"}}>
          <p style={{fontSize:"0.72rem",color:"var(--text-muted)",marginBottom:"0.75rem"}}>
            Signed in as <strong style={{color:"var(--text-dark)"}}>{admin?.username}</strong>
          </p>
          <button onClick={handleLogout}
            style={{display:"flex",alignItems:"center",gap:"0.5rem",background:"transparent",border:"1.5px solid rgba(239,68,68,0.2)",color:"#ef4444",padding:"0.6rem 1rem",fontSize:"0.78rem",fontWeight:600,cursor:"pointer",width:"100%",borderRadius:"var(--radius)",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.06)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{marginLeft:"240px",flex:1,padding:"2rem 2.5rem",minWidth:0}}>
        {/* HEADER */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"2rem"}}>
          <div>
            <h1 style={{fontFamily:"'Fraunces',serif",fontSize:"1.8rem",fontWeight:400,color:"var(--text-dark)"}}>
              {tab==="bookings"?"Booking Requests":tab==="services"?"Manage Services":"Analytics"}
            </h1>
            <p style={{fontSize:"0.82rem",color:"var(--text-muted)",marginTop:"0.2rem"}}>
              {new Date().toLocaleDateString("en-NG",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
            </p>
          </div>
          <a href="/" target="_blank" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.78rem",fontWeight:600,color:"var(--royal)",background:"var(--blue-dim)",border:"1px solid rgba(8,20,227,0.12)",padding:"0.55rem 1.1rem",borderRadius:"var(--radius)"}}>
            🌐 View Site
          </a>
        </div>

        {/* STATS CARDS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.25rem",marginBottom:"2rem"}}>
          {[
            {label:"Total Bookings",value:stats.total,   icon:"📋",color:"var(--royal)",  bg:"var(--blue-dim)"},
            {label:"Pending",       value:stats.pending,  icon:"⏳",color:"#C2410C",       bg:"#FFF7ED"},
            {label:"Contacted",     value:stats.contacted,icon:"📞",color:"#1D4ED8",       bg:"#EFF6FF"},
            {label:"Completed",     value:stats.completed,icon:"✅",color:"#15803D",       bg:"#F0FDF4"},
          ].map(({label,value,icon,color,bg})=>(
            <div key={label} style={{background:"var(--white)",border:"1px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius-lg)",padding:"1.5rem",boxShadow:"var(--shadow-sm)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.75rem"}}>
                <span style={{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-muted)"}}>{label}</span>
                <div style={{width:"34px",height:"34px",background:bg,borderRadius:"var(--radius-sm)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem"}}>{icon}</div>
              </div>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:"2.5rem",fontWeight:600,color,lineHeight:1}}>{value}</p>
            </div>
          ))}
        </div>

        {/* BOOKINGS TAB */}
        {tab==="bookings" && (
          <div>
            <div style={{display:"flex",gap:"0.75rem",marginBottom:"1.5rem",flexWrap:"wrap"}}>
              <input placeholder="Search name or email..." value={search} onChange={e=>setSearch(e.target.value)}
                style={{background:"var(--white)",border:"1.5px solid #D8DCEE",color:"var(--text-dark)",padding:"0.65rem 1rem",fontSize:"0.85rem",outline:"none",fontFamily:"'Plus Jakarta Sans',sans-serif",borderRadius:"var(--radius)",flex:1,minWidth:"200px"}} />
              <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
                style={{background:"var(--white)",border:"1.5px solid #D8DCEE",color:"var(--text-dark)",padding:"0.65rem 1rem",fontSize:"0.85rem",outline:"none",fontFamily:"'Plus Jakarta Sans',sans-serif",borderRadius:"var(--radius)"}}>
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {loading ? (
              <div style={{textAlign:"center",padding:"4rem",color:"var(--text-muted)"}}>Loading bookings...</div>
            ) : filtered.length===0 ? (
              <div style={{textAlign:"center",padding:"4rem",color:"var(--text-muted)",background:"var(--white)",borderRadius:"var(--radius-lg)",border:"1px solid rgba(8,20,227,0.08)"}}>
                <p style={{fontSize:"2.5rem",marginBottom:"0.75rem"}}>📋</p>
                <p style={{fontWeight:600}}>No bookings found</p>
              </div>
            ) : (
              <div style={{background:"var(--white)",border:"1px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius-lg)",overflow:"hidden",boxShadow:"var(--shadow-sm)"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{background:"var(--off-white)",borderBottom:"1px solid rgba(8,20,227,0.08)"}}>
                      {["#","Client","Service","Date","Status","Submitted","Actions"].map(h=>(
                        <th key={h} style={{padding:"0.9rem 1.25rem",textAlign:"left",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--text-muted)"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b,i)=>{
                      const sc=STATUS[b.status]||STATUS.pending;
                      return (
                        <tr key={b.id} style={{borderBottom:"1px solid rgba(8,20,227,0.05)",transition:"background 0.2s"}}
                          onMouseEnter={e=>e.currentTarget.style.background="var(--off-white)"}
                          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          <td style={{padding:"1rem 1.25rem",fontSize:"0.78rem",color:"var(--text-muted)",fontWeight:600}}>#{b.id}</td>
                          <td style={{padding:"1rem 1.25rem"}}>
                            <p style={{fontSize:"0.88rem",color:"var(--text-dark)",fontWeight:600}}>{b.full_name}</p>
                            <p style={{fontSize:"0.75rem",color:"var(--text-muted)"}}>{b.email}</p>
                          </td>
                          <td style={{padding:"1rem 1.25rem",fontSize:"0.83rem",color:"var(--text-body)"}}>{b.service_name||`Service #${b.service_id}`}</td>
                          <td style={{padding:"1rem 1.25rem",fontSize:"0.83rem",color:"var(--text-muted)"}}>{b.preferred_date||"—"}</td>
                          <td style={{padding:"1rem 1.25rem"}}>
                            <select value={b.status} onChange={e=>handleStatusChange(b.id,e.target.value)}
                              style={{background:sc.bg,border:`1px solid ${sc.border}`,color:sc.text,padding:"0.3rem 0.7rem",fontSize:"0.75rem",fontWeight:700,outline:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",borderRadius:"100px"}}>
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td style={{padding:"1rem 1.25rem",fontSize:"0.78rem",color:"var(--text-muted)"}}>{b.created_at?new Date(b.created_at).toLocaleDateString():"—"}</td>
                          <td style={{padding:"1rem 1.25rem"}}>
                            <div style={{display:"flex",gap:"0.5rem"}}>
                              <button onClick={()=>setViewBk(b)} style={{background:"var(--blue-dim)",border:"1px solid rgba(8,20,227,0.12)",color:"var(--royal)",padding:"0.3rem 0.85rem",fontSize:"0.72rem",fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",borderRadius:"var(--radius-sm)"}}>View</button>
                              <button onClick={()=>handleDelete(b.id)} style={{background:"#FEF2F2",border:"1px solid #FECACA",color:"#DC2626",padding:"0.3rem 0.85rem",fontSize:"0.72rem",fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",borderRadius:"var(--radius-sm)"}}>Del</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SERVICES TAB */}
        {tab==="services" && (
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            {services.map(s=>(
              <div key={s.id} style={{background:"var(--white)",border:"1px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius-lg)",padding:"1.75rem 2rem",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"2rem",boxShadow:"var(--shadow-sm)"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.5rem"}}>
                    <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"var(--royal)"}} />
                    <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"1.2rem"}}>{s.name}</h3>
                  </div>
                  <p style={{fontSize:"0.85rem",color:"var(--text-muted)",lineHeight:1.7,maxWidth:"600px"}}>{s.description}</p>
                  <span style={{fontSize:"0.68rem",color:"rgba(8,20,227,0.3)",marginTop:"0.4rem",display:"block"}}>/{s.slug}</span>
                </div>
                <button onClick={()=>setEditSvc({...s})}
                  style={{background:"var(--blue-dim)",border:"1px solid rgba(8,20,227,0.12)",color:"var(--royal)",padding:"0.6rem 1.4rem",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",borderRadius:"var(--radius)",flexShrink:0}}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab==="analytics" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
            <div style={{background:"var(--white)",border:"1px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius-lg)",padding:"2rem",boxShadow:"var(--shadow-sm)"}}>
              <p style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:"1.5rem"}}>Status Breakdown</p>
              {[{label:"Pending",count:stats.pending,color:"#F97316"},{label:"Contacted",count:stats.contacted,color:"var(--royal)"},{label:"Completed",count:stats.completed,color:"#16A34A"}].map(({label,count,color})=>(
                <div key={label} style={{marginBottom:"1.25rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.4rem"}}>
                    <span style={{fontSize:"0.85rem",color:"var(--text-body)",fontWeight:500}}>{label}</span>
                    <span style={{fontSize:"0.85rem",color:"var(--text-dark)",fontWeight:700}}>{count} ({stats.total?Math.round(count/stats.total*100):0}%)</span>
                  </div>
                  <div style={{height:"6px",background:"var(--off-white)",borderRadius:"6px"}}>
                    <div style={{height:"100%",width:`${stats.total?count/stats.total*100:0}%`,background:color,borderRadius:"6px",transition:"width 1s ease"}} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:"var(--white)",border:"1px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius-lg)",padding:"2rem",boxShadow:"var(--shadow-sm)"}}>
              <p style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:"1.5rem"}}>Requests by Service</p>
              {services.map(s=>{
                const count=bookings.filter(b=>b.service_id==s.id).length;
                const pct=bookings.length?count/bookings.length:0;
                return (
                  <div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.65rem 0",borderBottom:"1px solid var(--off-white)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.6rem",flex:1}}>
                      <span style={{fontSize:"0.83rem",color:"var(--text-body)"}}>{s.name}</span>
                      <div style={{height:"4px",flex:1,background:"var(--off-white)",borderRadius:"4px",maxWidth:"80px"}}>
                        <div style={{height:"100%",width:`${pct*100}%`,background:"linear-gradient(90deg,var(--royal),var(--blue-mid))",borderRadius:"4px"}} />
                      </div>
                    </div>
                    <span style={{fontFamily:"'Fraunces',serif",fontSize:"1.5rem",color:"var(--royal)",minWidth:"2rem",textAlign:"right"}}>{count}</span>
                  </div>
                );
              })}
            </div>

            <div style={{background:"var(--white)",border:"1px solid rgba(8,20,227,0.08)",borderRadius:"var(--radius-lg)",padding:"2rem",gridColumn:"1/-1",boxShadow:"var(--shadow-sm)"}}>
              <p style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:"1.5rem"}}>Recent Activity</p>
              {bookings.slice(0,6).map(b=>{
                const sc=STATUS[b.status]||STATUS.pending;
                return (
                  <div key={b.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.75rem 0",borderBottom:"1px solid var(--off-white)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                      <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"var(--blue-dim)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"0.85rem",color:"var(--royal)"}}>
                        {b.full_name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span style={{fontSize:"0.88rem",color:"var(--text-dark)",fontWeight:600}}>{b.full_name}</span>
                        <span style={{fontSize:"0.75rem",color:"var(--text-muted)",marginLeft:"0.6rem"}}>{b.service_name||`Service #${b.service_id}`}</span>
                      </div>
                    </div>
                    <span style={{fontSize:"0.72rem",fontWeight:700,color:sc.text,background:sc.bg,border:`1px solid ${sc.border}`,padding:"0.2rem 0.75rem",borderRadius:"100px"}}>{b.status}</span>
                  </div>
                );
              })}
              {bookings.length===0 && <p style={{color:"var(--text-muted)",fontSize:"0.85rem",textAlign:"center",padding:"2rem"}}>No bookings yet.</p>}
            </div>
          </div>
        )}
      </main>

      {/* VIEW BOOKING MODAL */}
      {viewBk && (
        <div style={{position:"fixed",inset:0,background:"rgba(13,15,26,0.7)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:"2rem"}} onClick={()=>setViewBk(null)}>
          <div style={{background:"var(--white)",border:"1px solid rgba(8,20,227,0.1)",borderRadius:"var(--radius-xl)",padding:"2.5rem",maxWidth:"500px",width:"100%",boxShadow:"var(--shadow-lg)"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.75rem",borderBottom:"1px solid var(--off-white)",paddingBottom:"1.25rem"}}>
              <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"1.5rem"}}>Booking #{viewBk.id}</h3>
              <button onClick={()=>setViewBk(null)} style={{background:"var(--off-white)",border:"none",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)",fontSize:"0.9rem"}}>✕</button>
            </div>
            {[["Full Name",viewBk.full_name],["Email",viewBk.email],["Phone",viewBk.phone||"Not provided"],["Service",viewBk.service_name||`Service #${viewBk.service_id}`],["Preferred Date",viewBk.preferred_date||"Not specified"],["Status",viewBk.status],["Submitted",viewBk.created_at?new Date(viewBk.created_at).toLocaleString():"Unknown"]].map(([label,value])=>(
              <div key={label} style={{marginBottom:"0.85rem"}}>
                <p style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--orange)",marginBottom:"0.15rem"}}>{label}</p>
                <p style={{fontSize:"0.9rem",color:"var(--text-dark)",fontWeight:500}}>{value}</p>
              </div>
            ))}
            {viewBk.message && (
              <div style={{marginTop:"0.5rem"}}>
                <p style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--orange)",marginBottom:"0.5rem"}}>Message</p>
                <p style={{fontSize:"0.88rem",color:"var(--text-body)",background:"var(--off-white)",borderRadius:"var(--radius)",padding:"1rem",lineHeight:1.7}}>{viewBk.message}</p>
              </div>
            )}
            <div style={{display:"flex",gap:"0.75rem",marginTop:"1.75rem"}}>
              <button onClick={()=>handleDelete(viewBk.id)} style={{background:"#FEF2F2",border:"1px solid #FECACA",color:"#DC2626",padding:"0.65rem 1.5rem",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",borderRadius:"var(--radius)"}}>Delete</button>
              <button onClick={()=>setViewBk(null)} className="btn-blue" style={{flex:1,justifyContent:"center",padding:"0.65rem"}}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editSvc && (
        <div style={{position:"fixed",inset:0,background:"rgba(13,15,26,0.7)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:"2rem"}} onClick={()=>setEditSvc(null)}>
          <div style={{background:"var(--white)",borderRadius:"var(--radius-xl)",padding:"2.5rem",maxWidth:"540px",width:"100%",boxShadow:"var(--shadow-lg)"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.75rem",borderBottom:"1px solid var(--off-white)",paddingBottom:"1.25rem"}}>
              <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"1.5rem"}}>Edit Service</h3>
              <button onClick={()=>setEditSvc(null)} style={{background:"var(--off-white)",border:"none",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)"}}>✕</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
              <div className="form-group"><label>Service Name</label><input value={editSvc.name} onChange={e=>setEditSvc({...editSvc,name:e.target.value})} /></div>
              <div className="form-group"><label>Description</label><textarea value={editSvc.description||""} onChange={e=>setEditSvc({...editSvc,description:e.target.value})} rows={5} /></div>
            </div>
            <div style={{display:"flex",gap:"0.75rem",marginTop:"2rem"}}>
              <button onClick={()=>setEditSvc(null)} className="btn-outline" style={{flex:1,justifyContent:"center"}}>Cancel</button>
              <button onClick={handleSaveSvc} className="btn-blue" style={{flex:1,justifyContent:"center"}}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
