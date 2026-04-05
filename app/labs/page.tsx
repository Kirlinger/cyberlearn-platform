'use client';

import { labs } from '@/data/site-content';
import { IconFlask } from '@/components/icons';

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

export default function LabsPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconFlask} title="Labs & Exercises" description="Hands-on practice for real-world scenarios" />
      <div className="grid gap-6 lg:grid-cols-3">
        {labs.map((l) => (
          <div key={l.id} className="card group transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
            <h2 className="text-lg font-bold">{l.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{l.objective}</p>
            <ol className="mt-4 space-y-2">
              {l.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
