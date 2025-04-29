// src/components/JobTracker.js

import React, { useState, useEffect, useMemo } from 'react';
import { fetchJobs, createJob } from '../api';

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

  // New-job form state
  const [newJob, setNewJob] = useState({
    postingLink: '',
    title:       '',
    company:     '',
    appliedDate: '',
    docsUsed:    '',
    status:      'Applied'
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJobs(token);
        setJobs(data);
      } catch {
        setError('Could not load jobs');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // Handle sorting
  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedJobs = useMemo(() => {
    const list = [...jobs];
    if (sortConfig.key) {
      list.sort((a, b) => {
        let aVal = a[sortConfig.key], bVal = b[sortConfig.key];
        if (sortConfig.key === 'appliedDate') {
          aVal = new Date(aVal); bVal = new Date(bVal);
        } else {
          aVal = String(aVal).toLowerCase(); bVal = String(bVal).toLowerCase();
        }
        if (aVal < bVal) return sortConfig.direction==='asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction==='asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [jobs, sortConfig]);

  // Add-job form handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };
  const handleAddJob = async e => {
    e.preventDefault();
    try {
      const created = await createJob(token, newJob);
      setJobs(prev => [...prev, created]);
      setNewJob({ postingLink:'', title:'', company:'', appliedDate:'', docsUsed:'', status:'Applied' });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p style={{ padding:'20px' }}>Loading jobs…</p>;
  if (error)   return <p style={{ padding:'20px', color:'red' }}>{error}</p>;

  const sortArrow = key =>
    sortConfig.key===key ? (sortConfig.direction==='asc'?' ▲':' ▼') : '';

  return (
    <div style={{ padding: '20px', overflowX: 'auto' }}>
      <h2 style={{ marginBottom: '10px' }}>Job Tracker</h2>

      {/* Add Job Form */}
      <form onSubmit={handleAddJob} style={{ marginBottom: '20px', display:'grid', gap:'10px', maxWidth:'600px' }}>
        <input
          name="postingLink"
          placeholder="Job Posting URL"
          value={newJob.postingLink}
          onChange={handleChange}
          required
        />
        <input
          name="title"
          placeholder="Job Title"
          value={newJob.title}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder="Company"
          value={newJob.company}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="appliedDate"
          value={newJob.appliedDate}
          onChange={handleChange}
          required
        />
        <input
          name="docsUsed"
          placeholder="Docs Folder URL (optional)"
          value={newJob.docsUsed}
          onChange={handleChange}
        />
        <select name="status" value={newJob.status} onChange={handleChange}>
          {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="submit" style={{ maxWidth:'150px' }}>Add Job</button>
      </form>

      {/* Job Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom:'2px solid #ddd' }}>
            <th style={{ padding:'10px' }}>Posting Link</th>
            <th style={{ padding:'10px' }}>Title</th>
            <th style={{ padding:'10px', cursor:'pointer' }} onClick={()=>handleSort('company')}>
              Company{sortArrow('company')}
            </th>
            <th style={{ padding:'10px', cursor:'pointer' }} onClick={()=>handleSort('appliedDate')}>
              Applied Date{sortArrow('appliedDate')}
            </th>
            <th style={{ padding:'10px' }}>Docs Used</th>
            <th style={{ padding:'10px', cursor:'pointer' }} onClick={()=>handleSort('status')}>
              Status{sortArrow('status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map(job => (
            <tr key={job._id} style={{ borderBottom:'1px solid #eee' }}>
              <td style={{ padding:'10px' }}>
                <a href={job.postingLink} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
              <td style={{ padding:'10px' }}>{job.title}</td>
              <td style={{ padding:'10px' }}>{job.company}</td>
              <td style={{ padding:'10px' }}>{new Date(job.appliedDate).toLocaleDateString()}</td>
              <td style={{ padding:'10px' }}>
                {job.docsUsed
                  ? <a href={job.docsUsed} target="_blank" rel="noopener noreferrer">Folder</a>
                  : '—'
                }
              </td>
              <td style={{ padding:'10px' }}>
                <select
                  value={job.status}
                  onChange={e => {
                    const updated = { ...job, status: e.target.value };
                    // you can call your updateJob API here later
                    setJobs(js => js.map(j => j._id===job._id ? updated : j));
                  }}
                  style={{
                    padding:'6px 12px',
                    border:'none',
                    borderRadius:'20px',
                    backgroundColor: statusStyles[job.status].backgroundColor,
                    color: statusStyles[job.status].color,
                    cursor:'pointer',
                    outline:'none'
                  }}
                >
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
