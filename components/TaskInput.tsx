
import React, { useState } from 'react';

interface TaskInputProps {
  onGenerate: (goal: string) => void;
  isLoading: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({ onGenerate, isLoading }) => {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim() && !isLoading) {
      onGenerate(goal);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 max-w-[480px] mx-auto w-full">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-end rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
        <div className="relative flex w-full items-stretch rounded-[2rem] overflow-hidden glass-card shadow-premium">
          <input 
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            disabled={isLoading}
            className="flex w-full min-w-0 flex-1 border-none bg-transparent text-white focus:ring-0 h-16 placeholder:text-gray-500 px-7 text-base font-normal" 
            placeholder="Describe a goal or project..."
          />
          <div className="flex items-center justify-center pr-6 text-primary">
            <span className={`material-symbols-outlined font-light ${isLoading ? 'animate-spin' : ''}`}>
              {isLoading ? 'progress_activity' : 'auto_fix_high'}
            </span>
          </div>
        </div>
      </div>
      <button 
        type="submit"
        disabled={isLoading || !goal.trim()}
        className="gradient-btn group relative flex min-w-full cursor-pointer items-center justify-center overflow-hidden rounded-[2rem] h-16 px-5 text-white text-base font-semibold tracking-wide shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? 'Crafting Strategy...' : 'Generate Tasks'}
          {!isLoading && <span className="material-symbols-outlined text-lg">bolt</span>}
        </span>
      </button>
    </form>
  );
};

export default TaskInput;
