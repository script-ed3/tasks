import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { getCurrentUser } from './utils/supabase';

// Pages
import AuthPage from './pages/Auth';
import DashboardPage from './pages/Dashboard';
import VerifyPage from './pages/Verify';
import DepositPage from './pages/Deposit';
import FinancialsPage from './pages/Financials';

function App() {
  const { setUser, setLoading } = useAuthStore();
  const user = useAuthStore((state) => state.user);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const initAuth = async () => {
      const { user } = await getCurrentUser();
      if (user) {
        setUser({
          id: user.id,
          email: user.email || '',
          firstName: user.user_metadata?.first_name || '',
          lastName: user.user_metadata?.last_name || '',
          createdAt: user.created_at,
          subscription: 'free',
          balance: 0,
        });
      }
      setLoading(false);
    };

    initAuth();

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
  }, [setUser, setLoading]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Router>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <Routes>
          {!user ? (
            <>
              <Route path="/auth" element={<AuthPage toggleTheme={toggleTheme} theme={theme} />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<DashboardPage toggleTheme={toggleTheme} theme={theme} />} />
              <Route path="/verify" element={<VerifyPage toggleTheme={toggleTheme} theme={theme} />} />
              <Route path="/deposit" element={<DepositPage toggleTheme={toggleTheme} theme={theme} />} />
              <Route path="/financials" element={<FinancialsPage toggleTheme={toggleTheme} theme={theme} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
