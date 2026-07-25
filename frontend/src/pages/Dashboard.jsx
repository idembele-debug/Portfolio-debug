import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await getMe();
      setUser(data);
    } catch {
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-mono flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-mono">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-transparent border border-[var(--border)] text-[var(--muted)] px-4 py-2 rounded-md text-sm cursor-pointer hover:text-[var(--text)] hover:border-[var(--accent)] transition-all"
          >
            Logout
          </button>
        </div>
        {user && (
          <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-xl p-6">
            <p className="text-sm text-[var(--muted)] mb-2">Logged in as</p>
            <p className="text-lg font-bold">{user.email}</p>
            <p className="text-sm text-[var(--muted)] mt-1">
              Role: {user.is_admin ? 'Admin' : 'User'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}