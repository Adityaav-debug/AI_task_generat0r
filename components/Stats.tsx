
import React from 'react';

const Stats: React.FC = () => {
  return (
    <div className="px-6 pt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Productivity Stats</h2>
      <div className="glass-card p-10 rounded-4xl flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-primary text-6xl">bar_chart</span>
        <p className="text-gray-400">Deep insights coming soon. Track your momentum and reach your peak performance.</p>
      </div>
    </div>
  );
};

export default Stats;
