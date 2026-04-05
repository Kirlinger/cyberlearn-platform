'use client';

import { roadmaps } from '@/data/site-content';
import { IconMap, IconCheck } from '@/components/icons';

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

export default function RoadmapsPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconMap} title="Career Roadmaps" description="Structured paths to launch your cybersecurity career" />
      <div className="grid gap-6 lg:grid-cols-3">
        {roadmaps.map((r) => (
          <div key={r.id} className="card group transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">{r.title}</h2>
            </div>
            <span className="badge-brand">{r.level}</span>
            <ul className="mt-4 space-y-2">
              {r.milestones.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
