import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobTracker from './components/JobTracker';
import Documents from './components/Documents';
import Settings from './components/Settings';
import './App.css';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to AppliFlow Dashboard</h1>
      <p>Use the navigation above to manage your job applications.</p>
    </div>
  );
}

function App() {
  // Use a lazy initializer to persist theme across refreshes
  const [theme, setTheme] = useState(() => localStorage.getItem('appliflowTheme') || 'light');

  // Save theme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('appliflowTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        {/* Navigation Bar */}
        <nav className="App-nav">
          <div className="nav-left">
            <img src="/logo192.png" alt="AppliFlow Logo" className="App-logo" />
            <span className="nav-title">AppliFlow</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/job-tracker">Job Tracker</Link>
            </li>
            <li>
              <Link to="/documents">Documents</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
          <div className="nav-right">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-tracker" element={<JobTracker />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
