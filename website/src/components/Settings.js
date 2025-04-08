import React from 'react';

function Settings() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Settings</h2>
      <p>Set your global preferences and integration settings here.</p>
      <form>
        <div>
          <label htmlFor="defaultJobType">Default Job Type:</label>
          <select id="defaultJobType" name="defaultJobType">
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default Settings;
