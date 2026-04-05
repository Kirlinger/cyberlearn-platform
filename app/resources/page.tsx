'use client';

import { resources } from '@/data/site-content';
import { IconLink } from '@/components/icons';

function PageHeader({ icon: Icon, title, description }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; description?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 dark:bg-brand-500/20">
          <Icon className="h-5 w-5 text-brand-500" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      </div>
      {description && <p className="mt-2 text-slate-500">{description}</p>}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconLink} title="Resources" description="Curated tools, platforms, and reading material" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card">
          <h2 className="mb-4 text-lg font-bold">Platforms</h2>
          <ul className="space-y-2">
            {resources.platforms.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="mb-4 text-lg font-bold">Books</h2>
          <ul className="space-y-2">
            {resources.books.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="mb-4 text-lg font-bold">Tools</h2>
          <ul className="space-y-2">
            {resources.tools.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
