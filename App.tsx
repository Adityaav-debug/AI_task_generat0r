import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TaskInput from './components/TaskInput';
import TaskCard from './components/TaskCard';
import Stats from './components/Stats';
import Settings from './components/Settings';
import { Task, View } from './types';
import { generateTasksFromGoal } from './services/geminiService';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design System Update',
    description: 'Refine the color palette and typography for the mobile dashboard components.',
    status: 'in_progress',
    dueDate: 'Oct 24'
  },
  {
    id: '2',
    title: 'User Feedback Review',
    description: 'Analyze comments from the beta group regarding the new navigation flow.',
    status: 'pending',
    dueDate: 'Oct 26'
  },
  {
    id: '3',
    title: 'API Documentation',
    description: 'Finalize the endpoint documentation for the authentication service.',
    status: 'completed',
    dueDate: 'Oct 20'
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('board');

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [loading, setLoading] = useState(false);
  const [lastGoal, setLastGoal] = useState('');

  // Save tasks locally
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Generate / Regenerate tasks
  const handleGenerateTasks = async (goal: string) => {
    const finalGoal = goal || lastGoal;

    if (!finalGoal.trim()) return;

    setLoading(true);

    try {
      const newTasks = await generateTasksFromGoal(finalGoal);

      if (newTasks.length > 0) {
        setTasks(newTasks); // reset, no stacking
        setLastGoal(finalGoal); // save for regenerate
      }

    } catch (error) {
      console.error("Generation failed", error);
      alert("Something went wrong generating tasks. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'stats':
        return <Stats />;

      case 'settings':
        return <Settings />;

      case 'board':
      default:
        return (
          <>
            {/* Heading */}
            <div className="px-8 pt-12 pb-10">
              <h1 className="text-white tracking-tight text-4xl font-bold leading-[1.15] text-center mb-4">
                What shall we <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-end">
                  accomplish
                </span>{' '}
                today?
              </h1>

              <p className="text-gray-400/80 text-center text-base font-medium max-w-[280px] mx-auto leading-relaxed">
                Harness AI to transform your vision into actionable steps.
              </p>
            </div>

            {/* Input */}
            <TaskInput
              onGenerate={handleGenerateTasks}
              isLoading={loading}
            />

            {/* Tasks */}
            <div className="mt-14 px-6 pb-20">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-white text-xl font-bold tracking-tight">
                  Generated Tasks
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    {tasks.length} Items
                  </span>

                  {/* Regenerate Button */}
                  {lastGoal && (
                    <button
                      onClick={() => handleGenerateTasks('')}
                      disabled={loading}
                      className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition"
                    >
                      {loading ? 'Thinking...' : 'Regenerate'}
                    </button>
                  )}
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-5">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="flex flex-col flex-1 pb-32 max-w-[480px] mx-auto w-full">
        {renderContent()}
      </main>

      <Navigation
        currentView={view}
        onViewChange={setView}
      />
    </div>
  );
};

export default App;