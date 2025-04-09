import React from 'react';

function JobTracker() {
  // Sample job data; later, this could come from an API or state
  const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Tech Corp', status: 'Applied' },
    { id: 2, title: 'Frontend Developer', company: 'Web Solutions', status: 'Interview' },
    { id: 3, title: 'Backend Developer', company: 'Data Systems', status: 'Pending' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Job Tracker</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Job Title</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Company</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{job.title}</td>
              <td style={{ padding: '8px' }}>{job.company}</td>
              <td style={{ padding: '8px' }}>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTracker;
