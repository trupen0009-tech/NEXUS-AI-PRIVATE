const { useState, useEffect } = React;

const App = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Fetch your scraped data
    fetch('./live_projects.json')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(() => console.log("JSON lead file not found yet."));
  }, []);

  // Use icons only if they are ready; otherwise, use simple text
  const { LayoutDashboard } = typeof lucide !== 'undefined' ? lucide : {};

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
        {LayoutDashboard ? <LayoutDashboard size={32} color="#60a5fa" /> : <span>📊</span>}
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>NEXUS AI LIVE</span>
      </nav>

      <div style={{ marginTop: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Dashboard Online</h1>
        <p style={{ color: '#94a3b8' }}>Python Automation Leads Found: <strong>{leads.length}</strong></p>
        
        <div style={{ background: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1e293b', marginTop: '30px' }}>
          <div style={{ fontSize: '20px', color: '#60a5fa' }}>System Status: <span style={{color: '#10b981'}}>Active</span></div>
          <p>We have bypassed library checks to ensure your data loads instantly.</p>
        </div>
      </div>
    </div>
  );
};

// Mount the App immediately
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
