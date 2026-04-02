import { career, glossary, labs, resources, roadmaps } from '../data/siteContent';

export function RoadmapsPage() {
  return <div className="space-y-4">{roadmaps.map((r)=><div key={r.id} className="card"><h2 className="text-xl font-bold">{r.title}</h2><p className="text-sm text-slate-500">{r.level}</p><ul className="mt-3 list-disc pl-5">{r.milestones.map((m)=><li key={m}>{m}</li>)}</ul></div>)}</div>;
}

export function LabsPage() {
  return <div className="space-y-4">{labs.map((l)=><div key={l.id} className="card"><h2 className="text-xl font-bold">{l.title}</h2><p>{l.objective}</p><ol className="mt-2 list-decimal pl-5">{l.steps.map((s)=><li key={s}>{s}</li>)}</ol></div>)}</div>;
}

export function GlossaryPage() {
  return <div className="card"><h1 className="mb-3 text-2xl font-bold">Glossary</h1><div className="space-y-2">{glossary.map(([term,def])=><div key={term}><strong>{term}:</strong> {def}</div>)}</div></div>;
}

export function ResourcesPage() {
  return <div className="card space-y-4"><h1 className="text-2xl font-bold">Resources</h1><div><h2 className="font-semibold">Platforms</h2><ul className="list-disc pl-5">{resources.platforms.map((p)=><li key={p}>{p}</li>)}</ul></div><div><h2 className="font-semibold">Books</h2><ul className="list-disc pl-5">{resources.books.map((p)=><li key={p}>{p}</li>)}</ul></div><div><h2 className="font-semibold">Tools</h2><ul className="list-disc pl-5">{resources.tools.map((p)=><li key={p}>{p}</li>)}</ul></div></div>;
}

export function CareerPage() {
  return <div className="card space-y-3"><h1 className="text-2xl font-bold">Career Center</h1><p>{career.intro}</p><h2 className="font-semibold">Target roles</h2><ul className="list-disc pl-5">{career.roles.map((r)=><li key={r}>{r}</li>)}</ul><h2 className="font-semibold">Portfolio checklist</h2><ul className="list-disc pl-5">{career.portfolioChecklist.map((r)=><li key={r}>{r}</li>)}</ul></div>;
}
