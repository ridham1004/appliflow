import React from 'react';

function Settings() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Settings</h2>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="defaultJobType" style={{ marginRight: '10px' }}>Default Job Type:</label>
          <select id="defaultJobType" name="defaultJobType">
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '6px 12px', border: 'none', backgroundColor: '#2575fc', color: '#fff', borderRadius: '4px' }}>Save Settings</button>
      </form>
    </div>
  );
}

export default Settings;
