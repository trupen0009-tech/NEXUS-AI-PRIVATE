// Global definitions - mapping names to the CDN objects
const { useState, useEffect } = React;
const { motion, AnimatePresence } = FramerMotion;
const { HashRouter: Router, Routes, Route, NavLink } = ReactRouterDOM;
const { 
  LayoutDashboard, Kanban, Brain, MessageCircle, CreditCard,
  CheckCircle, XCircle, Play, Send, Bell, User, Plus, Download 
} = lucide;

const App = () => {
  const [proposedProjects, setProposedProjects] = useState([]);

  useEffect(() => {
    fetch('./live_projects.json')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map((p) => ({
          id: p.id,
          title: p.title,
          client: p.company,
          status: 'proposed'
        }));
        setProposedProjects(mappedData);
      })
      .catch(err => console.log("Waiting for data..."));
  }, []);

  return (
    <Router>
      <div style={{ padding: '40px', background: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: 'bold' }}>
          <LayoutDashboard size={32} /> NEXUS AI
        </nav>
        <hr style={{ borderColor: '#1e293b', margin: '20px 0' }} />
        <h1>Agent Automation Dashboard</h1>
        <p>Active Leads Found: {proposedProjects.length}</p>
        
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <h3>System Status: Online</h3>
          <p>Ready to scrape and automate.</p>
        </div>
      </div>
    </Router>
  );
};

// This connects the code to your HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
