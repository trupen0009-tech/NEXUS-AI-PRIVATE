// Map global libraries from the scripts we added to index.html
const { useState, useEffect } = React;

const App = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Fetch your scraped data from the JSON file you created
    fetch('./live_projects.json')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(() => console.log("Waiting for scraper data..."));
  }, []);

  // WAIT-CHECK: This prevents the "Not Defined" white screen crash
  if (typeof FramerMotion === 'undefined' || typeof lucide === 'undefined') {
    return <div style={{background: '#0f172a', color: 'white', height: '100vh', padding: '20px'}}>Initializing NEXUS Engine...</div>;
  }

  // Define icons inside the component after the safety check
  const { LayoutDashboard, Brain, Kanban } = lucide;

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
        <LayoutDashboard size={32} color="#60a5fa" />
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>NEXUS AI</span>
      </nav>

      <div style={{ marginTop: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Freelance Automation</h1>
        <p style={{ color: '#94a3b8' }}>Live leads from scraped sources.</p>
        
        <div style={{ background: '#111827', padding: '30px', borderRadius: '12px', border: '1px solid #1e293b', marginTop: '30px' }}>
          <div style={{ fontSize: '20px', color: '#60a5fa' }}>System Status: <span style={{color: '#10b981'}}>Active</span></div>
          <div style={{ marginTop: '10px' }}>Projects Found: <strong>{leads.length}</strong></div>
        </div>
      </div>
    </div>
  );
};

// Start the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
