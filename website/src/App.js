// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login      from './components/Login';
import JobTracker from './components/JobTracker';
import Documents  from './components/Documents';
import Settings   from './components/Settings';
import './App.css';

function App() {
  // Load existing token (if any) from localStorage
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // If no token, show the Login screen
  if (!token) {
    return <Login onLogin={token => {
      localStorage.setItem('token', token);
      setToken(token);
    }} />;
  }

  // Logout helper
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="App-nav">
          <div className="nav-left">
            <span className="nav-title">AppliFlow</span>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/job-tracker">Job Tracker</Link></li>
            <li><Link to="/documents">Documents</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
          <div className="nav-right">
            <button onClick={handleLogout} className="theme-toggle">
              Logout
            </button>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<JobTracker token={token} />} />
          <Route path="/job-tracker" element={<JobTracker token={token} />} />
          <Route path="/documents"  element={<Documents token={token} />} />
          <Route path="/settings"   element={<Settings token={token} />} />
          {/* Redirect any unknown route back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
