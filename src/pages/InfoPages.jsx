import { Helmet } from 'react-helmet-async';
import { career, glossary, labs, resources, roadmaps } from '../data/siteContent';
import { IconMap, IconFlask, IconBookOpen, IconLink, IconBriefcase, IconCheck } from '../components/Icons';

function PageHeader({ icon: Icon, title, description }) {
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

export function RoadmapsPage() {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Career Roadmaps — CyberLearn</title>
        <meta name="description" content="Explore cybersecurity career roadmaps for SOC Analyst, Cloud Security Engineer, and Secure Full-Stack Developer with month-by-month milestones." />
      </Helmet>
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

export function LabsPage() {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Labs &amp; Exercises — CyberLearn</title>
        <meta name="description" content="Practice hands-on cybersecurity labs including phishing email triage, Linux baseline hardening, and SQL incident investigation." />
      </Helmet>
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

export function GlossaryPage() {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Glossary — CyberLearn</title>
        <meta name="description" content="Cybersecurity glossary covering key terms: SIEM, EDR, CVE, MFA, CIDR and more." />
      </Helmet>
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

export function ResourcesPage() {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Resources — CyberLearn</title>
        <meta name="description" content="Curated cybersecurity resources: platforms like OWASP and MITRE ATT&CK, essential books, and tools including Wireshark and Burp Suite." />
      </Helmet>
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

export function CareerPage() {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Career Center — CyberLearn</title>
        <meta name="description" content="Cybersecurity career guidance: target roles like SOC Analyst, Security Engineer, and Threat Hunter with a portfolio-building checklist." />
      </Helmet>
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

