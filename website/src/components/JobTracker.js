// src/components/JobTracker.js

import React, { useState, useEffect, useMemo } from 'react';
import { fetchJobs } from '../api';

const statusOptions = ['Applied', 'Interview', 'Cancelled', 'Offer'];

const statusStyles = {
  Applied:   { backgroundColor: 'rgba(37,117,252,0.2)', color: '#2575fc' },
  Interview: { backgroundColor: 'rgba(39,174,96,0.2)',  color: '#27ae60' },
  Cancelled: { backgroundColor: 'rgba(231,76,60,0.2)',  color: '#e74c3c' },
  Offer:     { backgroundColor: 'rgba(155,89,182,0.2)', color: '#9b59b6' },
};

export default function JobTracker({ token }) {
  const [jobs, setJobs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fetch jobs from the API on mount (and when token changes)
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJobs(token);
        setJobs(data);
      } catch (err) {
        setError('Could not load jobs');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // Sorting logic
  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedJobs = useMemo(() => {
    const sortable = [...jobs];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === 'appliedDate') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [jobs, sortConfig]);

  // Update status locally (you can hook this into your API later)
  const updateJobStatus = (id, newStatus) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job));
  };

  const sortArrow = key => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  if (loading) return <p style={{ padding: '20px' }}>Loading jobs…</p>;
  if (error)   return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', overflowX: 'auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Job Tracker</h2>
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
              <td style={{ padding: '10px' }}>
                {new Date(job.appliedDate).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px' }}>
                <a
                  href={job.docsUsed}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2575fc', textDecoration: 'none' }}
                >
                  Docs Folder
                </a>
              </td>
              <td style={{ padding: '10px' }}>
                <select
                  value={job.status}
                  onChange={e => updateJobStatus(job.id, e.target.value)}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '20px',
                    backgroundColor: statusStyles[job.status].backgroundColor,
                    color: statusStyles[job.status].color,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    outline: 'none'
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
