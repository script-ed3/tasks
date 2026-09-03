import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { signOut } from '../utils/supabase';
import { Moon, Sun, LogOut, ArrowRight } from 'lucide-react';
import { Task } from '../types';

interface DashboardProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Research Paper Proofreading',
    description: 'Review academic paper for grammar and structure',
    category: 'academic',
    reward: 5,
    estimatedTime: 45,
    difficulty: 'easy',
    status: 'available',
  },
  {
    id: '2',
    title: 'RLHF Model Ranking',
    description: 'Rank AI responses for quality and helpfulness',
    category: 'rlhf',
    reward: 8,
    estimatedTime: 30,
    difficulty: 'medium',
    status: 'available',
  },
  {
    id: '3',
    title: 'Statistical Data Audit',
    description: 'Verify statistical calculations in research',
    category: 'academic',
    reward: 10,
    estimatedTime: 60,
    difficulty: 'hard',
    requiresDesktop: true,
    status: 'available',
  },
];

export default function DashboardPage({ toggleTheme, theme }: DashboardProps) {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [completedToday, setCompletedToday] = useState(2);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    navigate('/auth');
  };

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-stone-900 text-white' : 'bg-sand-50 text-sand-dark'}`}>
      {/* Header */}
      <header className={`border-b ${theme === 'dark' ? 'border-stone-700 bg-stone-800' : 'border-sand-100 bg-white'} sticky top-0 z-50`}>
        <div className="container flex items-center justify-between py-4">
          <h1 className="font-display text-2xl font-bold">Scholax</h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-sand-200">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm btn-secondary px-3 py-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome Section */}
        <div className={`card mb-8 animate-in ${theme === 'dark' ? 'bg-stone-800 border-stone-700' : ''}`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display text-2xl mb-2">Welcome, {user?.firstName}! 👋</h2>
              <p className={theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}>
                You're on track. Keep completing tasks to earn more rewards.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`card animate-in ${theme === 'dark' ? 'bg-stone-800 border-stone-700' : ''}`}>
            <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
              Total Earnings
            </h3>
            <p className="font-display text-3xl font-bold">${user?.balance || 0}.00</p>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-500'}`}>
              USD
            </p>
          </div>

          <div className={`card animate-in ${theme === 'dark' ? 'bg-stone-800 border-stone-700' : ''}`}>
            <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
              Completed Today
            </h3>
            <p className="font-display text-3xl font-bold">{completedToday}</p>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-500'}`}>
              tasks
            </p>
          </div>

          <div className={`card animate-in ${theme === 'dark' ? 'bg-stone-800 border-stone-700' : ''}`}>
            <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
              Tier Status
            </h3>
            <p className="font-display text-3xl font-bold capitalize">{user?.subscription}</p>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-500'}`}>
              Membership
            </p>
          </div>
        </div>

        {/* Available Tasks */}
        <div>
          <h2 className="font-display text-2xl mb-4">Available Tasks</h2>
          <div className="grid gap-4">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`card hover:shadow-md cursor-pointer transition-all transform hover:scale-102 animate-in ${
                  theme === 'dark' ? 'bg-stone-800 border-stone-700' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{task.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.category === 'academic'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {task.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.difficulty === 'easy'
                          ? 'bg-green-100 text-green-800'
                          : task.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'} mb-2`}>
                      {task.description}
                    </p>
                    <div className={`text-xs ${theme === 'dark' ? 'text-stone-500' : 'text-stone-500'}`}>
                      ⏱️ {task.estimatedTime} min
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-display text-2xl font-bold text-green-600">+${task.reward}</p>
                    <button className="mt-2 btn-primary text-sm px-3 py-1 flex items-center gap-1 ml-auto">
                      Start <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
