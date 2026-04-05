import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { IconShield, IconAlertCircle } from '../components/Icons';

export default function SignupPage({ ui }) {
  const { signup, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center animate-fade-in">
      <Helmet>
        <title>{ui.signupTitle} — CyberLearn</title>
      </Helmet>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyber-500 shadow-glow">
            <IconShield className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold">{ui.signupTitle}</h1>
          <p className="mt-1 text-sm text-slate-500">{ui.signupSubtitle}</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                <IconAlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium">{ui.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{ui.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{ui.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? '...' : ui.signup}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-500">
            {ui.haveAccount}{' '}
            <Link to="/login" className="font-medium text-brand-500 hover:text-brand-600">{ui.login}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
