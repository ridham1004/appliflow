import React, { useState, useMemo } from 'react';

// Sample job data
const sampleJobs = [
  {
    id: 1,
    postingLink: "https://example.com/job1",
    title: "Software Engineer",
    company: "Tech Corp",
    appliedDate: "2023-12-01",
    docsUsed: "Resume v1",
    status: "Applied",
  },
  {
    id: 2,
    postingLink: "https://example.com/job2",
    title: "Data Analyst",
    company: "Data Inc",
    appliedDate: "2023-12-08",
    docsUsed: "Resume v1",
    status: "Interview",
  },
  {
    id: 3,
    postingLink: "https://example.com/job3",
    title: "Product Manager",
    company: "Product Co",
    appliedDate: "2023-12-07",
    docsUsed: "Resume v1",
    status: "Cancelled",
  },
];

// Status options (including the "Offer" option)
const statusOptions = ['Applied', 'Interview', 'Cancelled', 'Offer'];

// Translucent background and color for each status
const statusStyles = {
  "Applied":   { backgroundColor: 'rgba(37, 117, 252, 0.2)',  color: '#2575fc' },
  "Interview": { backgroundColor: 'rgba(39, 174, 96, 0.2)',   color: '#27ae60' },
  "Cancelled": { backgroundColor: 'rgba(231, 76, 60, 0.2)',   color: '#e74c3c' },
  "Offer":     { backgroundColor: 'rgba(155, 89, 182, 0.2)',  color: '#9b59b6' },
};

function JobTracker() {
  const [jobs, setJobs] = useState(sampleJobs);

  // Sort configuration: which column is sorted, and in what direction
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle sorting logic when a column is clicked
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort the jobs array based on the current sortConfig
  const sortedJobs = useMemo(() => {
    let sortable = [...jobs];
    if (sortConfig.key !== null) {
      sortable.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // For date sorting, convert to Date objects
        if (sortConfig.key === 'appliedDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          // Convert strings to lowercase for case-insensitive sort
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [jobs, sortConfig]);

  // Update job status
  const updateJobStatus = (id, newStatus) => {
    const updatedJobs = jobs.map(job =>
      job.id === id ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
  };

  // Helper function to display an arrow next to the sorted column
  const sortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div style={{ padding: '20px', overflowX: 'auto' }}>
      <h2 style={{ marginBottom: '20px', fontWeight: '500' }}>Job Tracker</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px' }}>Job Posting Link</th>
            <th style={{ padding: '10px' }}>Job Title</th>
            <th
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('company')}
            >
              Company{sortArrow('company')}
            </th>
            <th
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('appliedDate')}
            >
              Applied Date{sortArrow('appliedDate')}
            </th>
            <th style={{ padding: '10px' }}>Docs Used</th>
            <th
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('status')}
            >
              Status{sortArrow('status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map(job => (
            <tr key={job.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>
                <a
                  href={job.postingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2575fc', textDecoration: 'none' }}
                >
                  View Job
                </a>
              </td>
              <td style={{ padding: '10px' }}>{job.title}</td>
              <td style={{ padding: '10px' }}>{job.company}</td>
              <td style={{ padding: '10px' }}>{job.appliedDate}</td>
              <td style={{ padding: '10px' }}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: '#2575fc', textDecoration: 'none' }}
                >
                  {job.docsUsed}
                </a>
              </td>
              <td style={{ padding: '10px' }}>
                {/* Always display a single <select> for status, styled like a pill */}
                <select
                  value={job.status}
                  onChange={(e) => updateJobStatus(job.id, e.target.value)}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '20px',
                    backgroundColor: statusStyles[job.status].backgroundColor,
                    color: statusStyles[job.status].color,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTracker;
