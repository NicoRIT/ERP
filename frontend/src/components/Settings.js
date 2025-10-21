import React from 'react';
import '../styles/Settings.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-options">
        <label>
          <input type="checkbox" /> Enable Dark Mode
        </label>
        <label>
          <input type="checkbox" /> Enable Notifications
        </label>
      </div>
    </div>
  );
};

export default Settings;
