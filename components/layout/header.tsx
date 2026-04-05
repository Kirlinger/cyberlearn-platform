'use client';

import Link from 'next/link';
import { ui } from '@/data/translations';
import {
  useTheme,
  useLanguage,
  useAuth,
  useSearch,
} from '@/app/providers';
import {
  IconMenu,
  IconSearch,
  IconSun,
  IconMoon,
} from '@/components/icons';
import type { Language } from '@/types';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { dark, setDark } = useTheme();
  const { lang, setLang } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const { search, setSearch } = useSearch();
  const t = ui[lang];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-surface-950/80">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <IconMenu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            className="input pl-10"
          />
        </div>

        {/* Language switcher */}
        <div
          className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-surface-800"
          role="radiogroup"
          aria-label="Language selector"
        >
          {(['en', 'fr', 'ht'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              role="radio"
              aria-checked={lang === l}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold uppercase transition-all duration-200 ${
                lang === l
                  ? 'bg-white text-brand-600 shadow-sm dark:bg-surface-700 dark:text-brand-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Dark mode */}
        <button
          onClick={() => setDark(!dark)}
          className="rounded-xl border border-slate-200 p-2 transition-all duration-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
          aria-pressed={dark}
          aria-label={dark ? t.lightMode : t.darkMode}
        >
          {dark ? (
            <IconSun className="h-4 w-4 text-amber-400" />
          ) : (
            <IconMoon className="h-4 w-4 text-slate-600" />
          )}
        </button>

        {/* Auth */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyber-500 text-xs font-bold text-white">
                {(user!.name || user!.email)[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user!.name}</span>
            </div>
            <button onClick={logout} className="btn-ghost text-xs">
              {t.logout}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-ghost text-xs">
              {t.login}
            </Link>
            <Link href="/signup" className="btn-primary text-xs">
              {t.signup}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
