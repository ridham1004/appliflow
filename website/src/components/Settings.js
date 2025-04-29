// src/components/Settings.js

import React, { useState } from 'react';
import { API_URL } from '../api';

/**
 * Settings page:
 * - Default Job Type selector
 * - Save Settings button (placeholder)
 * - Connect Google Drive integration
 */
export default function Settings({ token }) {
  // State for the default job type preference
  const [defaultJobType, setDefaultJobType] = useState('fulltime');

  // Handler for saving settings (expand to call backend)
  const handleSaveSettings = (e) => {
    e.preventDefault();
    // TODO: call API to persist defaultJobType
    alert(`Saved default job type: ${defaultJobType}`);
  };

  // Handler to initiate Google Drive OAuth flow
  const handleConnectDrive = async () => {
    try {
      // Fetch the OAuth URL from the backend
      const res = await fetch(`${API_URL}/auth/google/url`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Could not get OAuth URL');
      const { url } = await res.json();
      // Open the Google consent screen in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error(err);
      alert('Failed to initiate Google Drive connection');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Settings</h2>

      {/* Default Job Type Form */}
      <form onSubmit={handleSaveSettings} style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label
            htmlFor="defaultJobType"
            style={{ marginRight: '10px', fontWeight: '500' }}
          >
            Default Job Type:
          </label>
          <select
            id="defaultJobType"
            name="defaultJobType"
            value={defaultJobType}
            onChange={(e) => setDefaultJobType(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '4px' }}
          >
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            padding: '6px 12px',
            border: 'none',
            backgroundColor: '#2575fc',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Settings
        </button>
      </form>

      {/* Google Drive Integration */}
      <div>
        <h3 style={{ marginBottom: '10px' }}>Google Drive</h3>
        <p style={{ marginBottom: '10px' }}>
          Connect your Google Drive to automatically store application documents.
        </p>
        <button
          onClick={handleConnectDrive}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2575fc',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Connect Google Drive
        </button>
      </div>
    </div>
  );
}
