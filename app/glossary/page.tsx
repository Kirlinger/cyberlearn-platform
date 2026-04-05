'use client';

import { glossary } from '@/data/site-content';
import { IconBookOpen } from '@/components/icons';

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

export default function GlossaryPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconBookOpen} title="Glossary" description="Key cybersecurity terms and definitions" />
      <div className="space-y-3">
        {glossary.map(([term, def]) => (
          <div key={term} className="card group py-4 transition-all duration-300 hover:border-brand-500/20">
            <div className="flex items-start gap-3">
              <span className="badge-brand shrink-0 font-mono">{term}</span>
              <p className="text-sm text-slate-600 dark:text-slate-400">{def}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
