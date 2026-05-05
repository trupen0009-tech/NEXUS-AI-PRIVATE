
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Kanban, Brain, MessageCircle, CreditCard,
  CheckCircle, XCircle, Play, Send, Bell, User, Plus, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ... (Keep your existing Type Definitions here) ...

const App: React.FC = () => {
  const [proposedProjects, setProposedProjects] = React.useState([]);
  const [kanbanProjects, setKanbanProjects] = React.useState([]);
  // ... (Keep other state variables) ...

  // CONNECTING TO THE SCRAPER BRAIN
  useEffect(() => {
    fetch('./live_projects.json')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map((p: any) => ({
          id: 'scraped-' + p.id,
          title: p.title,
          description: `Live lead from ${p.source}. Click Approve to start Agent Brain.`,
          client: p.company,
          budget: p.stipend,
          deadline: "ASAP",
          status: 'proposed',
          category: "Python/Automation"
        }));
        setProposedProjects(mappedData);
      })
      .catch(err => console.log("Waiting for Scraper data..."));
  }, []);

  // ... (Rest of your existing logic: approveProject, rejectProject, etc.) ...

  return (
    <Router>
       {/* ... (Your existing UI/JSX code) ... */}
    </Router>
  );
};

export default App;
