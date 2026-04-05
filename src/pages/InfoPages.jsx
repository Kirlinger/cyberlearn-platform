import { Helmet } from 'react-helmet-async';
import { career, glossary, labs, resources, roadmaps } from '../data/siteContent';

export function RoadmapsPage() {
  return <div className="space-y-4"><Helmet><title>Career Roadmaps — CyberLearn Platform</title><meta name="description" content="Explore cybersecurity career roadmaps for SOC Analyst, Cloud Security Engineer, and Secure Full-Stack Developer with month-by-month milestones." /><meta property="og:title" content="Career Roadmaps — CyberLearn Platform" /><meta property="og:description" content="Explore cybersecurity career roadmaps with month-by-month milestones." /></Helmet>{roadmaps.map((r)=><div key={r.id} className="card"><h2 className="text-xl font-bold">{r.title}</h2><p className="text-sm text-slate-500">{r.level}</p><ul className="mt-3 list-disc pl-5">{r.milestones.map((m)=><li key={m}>{m}</li>)}</ul></div>)}</div>;
}

export function LabsPage() {
  return <div className="space-y-4"><Helmet><title>Labs &amp; Exercises — CyberLearn Platform</title><meta name="description" content="Practice hands-on cybersecurity labs including phishing email triage, Linux baseline hardening, and SQL incident investigation." /><meta property="og:title" content="Labs & Exercises — CyberLearn Platform" /><meta property="og:description" content="Practice hands-on cybersecurity labs including phishing triage, Linux hardening, and SQL investigation." /></Helmet>{labs.map((l)=><div key={l.id} className="card"><h2 className="text-xl font-bold">{l.title}</h2><p>{l.objective}</p><ol className="mt-2 list-decimal pl-5">{l.steps.map((s)=><li key={s}>{s}</li>)}</ol></div>)}</div>;
}

export function GlossaryPage() {
  return <div className="card"><Helmet><title>Glossary — CyberLearn Platform</title><meta name="description" content="Cybersecurity glossary covering key terms: SIEM, EDR, CVE, MFA, CIDR and more." /><meta property="og:title" content="Glossary — CyberLearn Platform" /><meta property="og:description" content="Cybersecurity glossary covering key terms: SIEM, EDR, CVE, MFA, CIDR and more." /></Helmet><h1 className="mb-3 text-2xl font-bold">Glossary</h1><div className="space-y-2">{glossary.map(([term,def])=><div key={term}><strong>{term}:</strong> {def}</div>)}</div></div>;
}

export function ResourcesPage() {
  return <div className="card space-y-4"><Helmet><title>Resources — CyberLearn Platform</title><meta name="description" content="Curated cybersecurity resources: platforms like OWASP and MITRE ATT&CK, essential books, and tools including Wireshark and Burp Suite." /><meta property="og:title" content="Resources — CyberLearn Platform" /><meta property="og:description" content="Curated cybersecurity resources: platforms, books, and tools." /></Helmet><h1 className="text-2xl font-bold">Resources</h1><div><h2 className="font-semibold">Platforms</h2><ul className="list-disc pl-5">{resources.platforms.map((p)=><li key={p}>{p}</li>)}</ul></div><div><h2 className="font-semibold">Books</h2><ul className="list-disc pl-5">{resources.books.map((p)=><li key={p}>{p}</li>)}</ul></div><div><h2 className="font-semibold">Tools</h2><ul className="list-disc pl-5">{resources.tools.map((p)=><li key={p}>{p}</li>)}</ul></div></div>;
}

export function CareerPage() {
  return <div className="card space-y-3"><Helmet><title>Career Center — CyberLearn Platform</title><meta name="description" content="Cybersecurity career guidance: target roles like SOC Analyst, Security Engineer, and Threat Hunter with a portfolio-building checklist." /><meta property="og:title" content="Career Center — CyberLearn Platform" /><meta property="og:description" content="Cybersecurity career guidance with target roles and portfolio-building checklist." /></Helmet><h1 className="text-2xl font-bold">Career Center</h1><p>{career.intro}</p><h2 className="font-semibold">Target roles</h2><ul className="list-disc pl-5">{career.roles.map((r)=><li key={r}>{r}</li>)}</ul><h2 className="font-semibold">Portfolio checklist</h2><ul className="list-disc pl-5">{career.portfolioChecklist.map((r)=><li key={r}>{r}</li>)}</ul></div>;
}
