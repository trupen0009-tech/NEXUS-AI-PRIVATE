const { useState, useEffect } = React;

const App = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch('./live_projects.json')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(() => console.log("JSON not found yet."));
  }, []);

  // Define icons safely
  const { LayoutDashboard, Brain, Activity } = typeof lucide !== 'undefined' ? lucide : {};

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
        {LayoutDashboard ? <LayoutDashboard size={32} color="#60a5fa" /> : <div style={{width:32, height:32, background:'#60a5fa'}} />}
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>NEXUS AI LIVE</span>
      </nav>

      <div style={{ marginTop: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Dashboard Active</h1>
        <p style={{ color: '#94a3b8' }}>Python Automation Leads Found: <strong>{leads.length}</strong></p>
        
        <div style={{ background: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1e293b', marginTop: '30px' }}>
          <div style={{ fontSize: '20px', color: '#60a5fa' }}>System Status: <span style={{color: '#10b981'}}>Online</span></div>
          <p>The system has bypassed library delays. Your scraped data is ready.</p>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
