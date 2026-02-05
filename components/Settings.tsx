
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="px-6 pt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="glass-card p-10 rounded-4xl flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-primary text-6xl">settings</span>
        <p className="text-gray-400">Customize your experience. Manage notifications, AI intensity, and account preferences.</p>
      </div>
    </div>
  );
};

export default Settings;
