'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, useLanguage } from '@/app/providers';
import { ui as uiDict } from '@/data/translations';
import { IconShield, IconAlertCircle } from '@/components/icons';

export default function SignupPage() {
  const { signup, isAuthenticated } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();
  const ui = uiDict[lang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
      router.replace('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center animate-fade-in">
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
            <Link href="/login" className="font-medium text-brand-500 hover:text-brand-600">{ui.login}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
