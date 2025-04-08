import React from 'react';
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
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="App-nav" style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
          <img src="/logo192.png" alt="AppliFlow Logo" style={{ width: '40px', height: '40px', verticalAlign: 'middle' }} />
          <span style={{ fontSize: '1.5em', marginLeft: '10px' }}>AppliFlow</span>
          <ul style={{ listStyleType: 'none', display: 'inline', marginLeft: '30px' }}>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/job-tracker">Job Tracker</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/documents">Documents</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '15px' }}>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
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
