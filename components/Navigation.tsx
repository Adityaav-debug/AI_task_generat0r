
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8">
      <div className="max-w-[480px] mx-auto glass-card rounded-[2.5rem] h-20 flex items-center justify-around px-8 shadow-2xl">
        <button 
          onClick={() => onViewChange('board')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'board' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-[26px]">dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Board</span>
        </button>
        
        <button 
          onClick={() => onViewChange('stats')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'stats' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-[26px]">analytics</span>
          <span className="text-[10px] font-medium uppercase tracking-widest">Stats</span>
        </button>
        
        <button 
          onClick={() => onViewChange('settings')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'settings' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-[26px]">settings</span>
          <span className="text-[10px] font-medium uppercase tracking-widest">Settings</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
