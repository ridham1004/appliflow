import React from 'react';

function JobTracker() {
  // For now, we simply return static content.
  return (
    <div style={{ padding: '20px' }}>
      <h2>Job Tracker</h2>
      <p>This is where your list of job applications will be displayed.</p>
      <ul>
        <li>Software Engineer - Tech Corp (Applied)</li>
        <li>Frontend Developer - Web Solutions (Interview)</li>
        <li>Backend Developer - Data Systems (Pending)</li>
      </ul>
    </div>
  );
}

export default JobTracker;
