import { Link, NavLink } from 'react-router-dom';
import { sections } from '../data/lessons';

export default function Layout({ children, lang, setLang, dark, setDark, search, setSearch, ui }) {
  return (
    <div className="flex min-h-screen text-slate-900 dark:text-slate-100">
      <aside className="hidden w-72 border-r border-slate-200 bg-white/80 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 lg:block">
        <Link to="/" className="mb-4 block text-xl font-bold text-brand-700 dark:text-brand-500">{ui.platform}</Link>
        <nav className="space-y-1 text-sm">
          <NavLink className="block rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/">{ui.dashboard}</NavLink>
          <NavLink className="block rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/roadmaps">{ui.roadmaps}</NavLink>
          <NavLink className="block rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/labs">{ui.labs}</NavLink>
          <NavLink className="block rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/glossary">{ui.glossary}</NavLink>
          <NavLink className="block rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/resources">{ui.resources}</NavLink>
          <NavLink className="block rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/career">{ui.career}</NavLink>
        </nav>
        <div className="mt-6">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Sections</h4>
          <ul className="max-h-[60vh] space-y-1 overflow-auto text-xs">
            {sections.map((s) => <li key={s} className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">{s}</li>)}
          </ul>
        </div>
      </aside>
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={ui.search} className="min-w-[220px] flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
            <div className="flex items-center gap-2" role="radiogroup" aria-label="Language selector">
              {['fr', 'ht', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  role="radio"
                  aria-checked={lang === l}
                  className={`rounded-lg px-3 py-1 text-xs uppercase ${lang===l?'bg-brand-500 text-white':'bg-slate-200 dark:bg-slate-800'}`}
                >
                  {l}
                </button>
              ))}
              <button
                onClick={() => setDark(!dark)}
                className="rounded-lg bg-slate-200 px-3 py-1 text-xs dark:bg-slate-800"
                aria-pressed={dark}
              >
                {dark ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4">{children}</main>
      </div>
    </div>
  );
}
