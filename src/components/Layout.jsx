import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { sections } from '../data/lessons';
import { useAuth } from '../context/AuthContext';
import {
  IconShield, IconSearch, IconSun, IconMoon, IconMenu, IconX,
  IconHome, IconBook, IconMap, IconFlask, IconBookOpen, IconLink,
  IconBriefcase, IconLayout, IconUser, IconChevronRight
} from './Icons';

const navItems = [
  { to: '/', icon: IconHome, key: 'home' },
  { to: '/courses', icon: IconBook, key: 'courses' },
  { to: '/roadmaps', icon: IconMap, key: 'roadmaps' },
  { to: '/labs', icon: IconFlask, key: 'labs' },
  { to: '/glossary', icon: IconBookOpen, key: 'glossary' },
  { to: '/resources', icon: IconLink, key: 'resources' },
  { to: '/career', icon: IconBriefcase, key: 'career' },
];

function SidebarLink({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-brand-500/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
        }`
      }
      end={to === '/'}
    >
      <Icon className="h-4.5 w-4.5 shrink-0" style={{ width: 18, height: 18 }} />
      <span>{label}</span>
    </NavLink>
  );
}

export default function Layout({ children, lang, setLang, dark, setDark, search, setSearch, ui, activeSection, setActiveSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
    navigate('/courses');
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 pb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyber-500 shadow-glow">
          <IconShield className="h-5 w-5 text-white" />
        </div>
        <Link to="/" onClick={closeMobile} className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          {ui.platform}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-1">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {ui.platform}
        </p>
        {navItems.map((item) => (
          <SidebarLink
            key={item.key}
            to={item.to}
            icon={item.icon}
            label={ui[item.key]}
            onClick={closeMobile}
          />
        ))}
        {isAuthenticated && (
          <SidebarLink to="/dashboard" icon={IconLayout} label={ui.dashboard} onClick={closeMobile} />
        )}
      </nav>

      {/* Sections */}
      <div className="mt-6">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {ui.sections}
        </p>
        <div className="max-h-[40vh] space-y-0.5 overflow-y-auto pr-1">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => handleSectionClick(s)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs transition-all duration-200 ${
                activeSection === s
                  ? 'bg-brand-500/10 font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-slate-300'
              }`}
            >
              <span className="truncate">{s}</span>
              <IconChevronRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ width: 12, height: 12 }} />
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-surface-950 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden w-[260px] shrink-0 border-r border-slate-200/70 bg-white/50 backdrop-blur-xl dark:border-white/5 dark:bg-surface-900/50 lg:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-y-auto p-4">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobile} />
          <aside className="absolute left-0 top-0 h-full w-[280px] animate-slide-in-left overflow-y-auto border-r border-slate-200/70 bg-white p-4 dark:border-white/5 dark:bg-surface-900">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold">{ui.mobileMenu}</span>
              <button onClick={closeMobile} className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800">
                <IconX className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-surface-950/80">
          <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">
              <IconMenu className="h-5 w-5" />
            </button>

            {/* Search */}
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={ui.search}
                className="input pl-10"
              />
            </div>

            {/* Language switcher */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-surface-800" role="radiogroup" aria-label="Language selector">
              {['en', 'fr', 'ht'].map((l) => (
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
              aria-label={dark ? ui.lightMode : ui.darkMode}
            >
              {dark ? <IconSun className="h-4 w-4 text-amber-400" /> : <IconMoon className="h-4 w-4 text-slate-600" />}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyber-500 text-xs font-bold text-white">
                    {(user.name || user.email)[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button onClick={logout} className="btn-ghost text-xs">
                  {ui.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-xs">{ui.login}</Link>
                <Link to="/signup" className="btn-primary text-xs">{ui.signup}</Link>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/70 px-4 py-6 dark:border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 text-center text-xs text-slate-400 dark:text-slate-600">
            <p>© {new Date().getFullYear()} {ui.platform}. {lang === 'fr' ? 'Tous droits réservés.' : lang === 'ht' ? 'Tout dwa rezève.' : 'All rights reserved.'}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

