
import React from 'react';
import { Task, TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
}

const getStatusStyles = (status: TaskStatus) => {
  switch (status) {
    case 'in_progress':
      return 'bg-primary/10 border-primary/20 text-primary';
    case 'completed':
      return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500';
    case 'pending':
    default:
      return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
  }
};

const formatStatusText = (status: TaskStatus) => {
  return status.replace('_', ' ').toUpperCase();
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="glass-card p-6 rounded-4xl shadow-premium hover:bg-white/[0.04] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-white font-semibold text-lg leading-snug group-hover:text-primary transition-colors pr-4">
          {task.title}
        </h4>
        <span className={`flex-shrink-0 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(task.status)}`}>
          {formatStatusText(task.status)}
        </span>
      </div>
      <p className="text-gray-400 text-[15px] leading-relaxed mb-5 font-light">
        {task.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-gray-500">calendar_today</span>
          <span className="text-[13px] text-gray-500 font-medium">{task.dueDate}</span>
        </div>
        <span className="material-symbols-outlined text-gray-600 text-[20px] group-hover:text-white transition-colors">arrow_forward_ios</span>
      </div>
    </div>
  );
};

export default TaskCard;
