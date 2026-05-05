// 1. GLOBAL VARIABLE MAPPING (Replaces Vite/NPM imports)
const { useState, useEffect } = React;
const { HashRouter: Router, Routes, Route, NavLink } = ReactRouterDOM;
const { motion, AnimatePresence } = FramerMotion;
const { 
  LayoutDashboard, Kanban, Brain, MessageCircle, CreditCard,
  CheckCircle, XCircle, Play, Send, Bell, User, Plus, Download 
} = lucide;

// 2. MAIN APPLICATION COMPONENT
const App = () => {
  // We removed strict TS types (e.g., <Project[]>) to prevent Babel crashes
  const [proposedProjects, setProposedProjects] = useState([]);
  const [kanbanProjects, setKanbanProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 3. CONNECTING TO THE SCRAPER BRAIN
  useEffect(() => {
    // This fetches the JSON file your Colab scraper pushes every 12 hours
    fetch('./live_projects.json')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map((p) => ({
          id: 'scraped-' + (p.id || Math.random()),
          title: p.title || "Untitled Project",
          description: `Live lead from ${p.source || 'Source'}. Click Approve to start Agent Brain.`,
          client: p.company || "Unknown Client",
          budget: p.stipend || "TBD",
          deadline: "ASAP",
          status: 'proposed',
          category: "Python/Automation"
        }));
        setProposedProjects(mappedData);
      })
      .catch(err => console.log("Waiting for Scraper data to sync...", err));
  }, []);

  // 4. LOGIC HANDLERS (Approve/Reject)
  const approveProject = (project) => {
    setProposedProjects(prev => prev.filter(p => p.id !== project.id));
    setKanbanProjects(prev => [...prev, { ...project, status: 'todo' }]);
  };

  const rejectProject = (id) => {
    setProposedProjects(prev => prev.filter(p => p.id !== id));
  };

  // 5. UI RENDERING (Your Original Structure)
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: '20px', borderBottom: '1px solid #1e293b', gap: '15px' }}>
        <div style={{ backgroundColor: '#3b82f6', padding: '8px', borderRadius: '8px' }}>
          <LayoutDashboard size={24} />
        </div>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>NEXUS AI PRIVATE</h1>
      </nav>

      <main style={{ padding: '40px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', margin: 0 }}>Freelance Agent Dashboard</h2>
          <p style={{ color: '#94a3b8' }}>Real-time leads from your Scraper Brain</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {proposedProjects.map(project => (
            <div key={project.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <h3 style={{ marginTop: 0 }}>{project.title}</h3>
              <p style={{ fontSize: '14px', color: '#cbd5e1' }}>{project.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{project.budget}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => approveProject(project)}
                    style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => rejectProject(project.id)}
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          ))}
          {proposedProjects.length === 0 && <p>Searching for active leads...</p>}
        </div>
      </main>
    </div>
  );
};

// 6. INITIALIZE REACT
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
