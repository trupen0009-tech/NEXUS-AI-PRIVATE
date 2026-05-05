const { useState, useEffect } = React;

const App = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Fetch your scraped lead data
    fetch('./live_projects.json')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(() => console.log("JSON lead file not found."));
  }, []);

  // Use icons if they exist, otherwise use placeholders
  const { LayoutDashboard } = typeof lucide !== 'undefined' ? lucide : {};

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
        {LayoutDashboard ? <LayoutDashboard size={32} color="#60a5fa" /> : <span>🚀</span>}
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>NEXUS AI LIVE</span>
      </nav>

      <div style={{ marginTop: '40px' }}>
        <h1 style={{ fontSize: '32px' }}>Dashboard Online</h1>
        <p style={{ color: '#94a3b8' }}>Python Automation Leads Found: <strong>{leads.length}</strong></p>
        
        <div style={{ background: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #1e293b', marginTop: '20px' }}>
          <div style={{ color: '#60a5fa', fontWeight: 'bold' }}>Status: Connected</div>
          <p>The system is now bypassing external library delays to show your data immediately.</p>
        </div>
      </div>
    </div>
  );
};

// Mount immediately
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
