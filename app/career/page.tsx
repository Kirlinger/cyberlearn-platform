'use client';

import { career } from '@/data/site-content';
import { IconBriefcase, IconCheck } from '@/components/icons';

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

export default function CareerPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconBriefcase} title="Career Center" description="Build your cybersecurity career path" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <p className="text-slate-600 dark:text-slate-400">{career.intro}</p>
          <h2 className="mb-3 mt-6 text-lg font-bold">Target Roles</h2>
          <div className="flex flex-wrap gap-2">
            {career.roles.map((r) => (
              <span key={r} className="badge bg-slate-100 text-slate-700 dark:bg-surface-800 dark:text-slate-300">{r}</span>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="mb-4 text-lg font-bold">Portfolio Checklist</h2>
          <ul className="space-y-3">
            {career.portfolioChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
