'use client';

import { useEffect, useMemo, useState } from 'react';

type StatusPayload = {
  sceneCount: number;
  targetDurationSec: number;
  finalVideoExists: boolean;
  missingSceneClips: string[];
  missingNarrations: string[];
  finalVideoPath: string;
};

export default function HistoirePourEnfantsPage() {
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState('');
  const [error, setError] = useState('');

  const fetchStatus = async () => {
    const res = await fetch('/api/histoire-pour-enfants/haiti-revolution/status', { cache: 'no-store' });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Unable to fetch status');
    setStatus(data.status);
  };

  useEffect(() => {
    fetchStatus().catch((e) => setError(e.message));
  }, []);

  const runBuild = async (mode: 'prepare' | 'full') => {
    setLoading(true);
    setError('');
    setLog('');

    try {
      const res = await fetch('/api/histoire-pour-enfants/haiti-revolution/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Build failed');

      const text = Object.entries(data.logs as Record<string, string>)
        .map(([step, output]) => `### ${step}\n${output}`)
        .join('\n\n');

      setLog(text);
      await fetchStatus();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const completionPct = useMemo(() => {
    if (!status || status.sceneCount === 0) return 0;
    const complete = status.sceneCount - status.missingSceneClips.length;
    return Math.max(0, Math.round((complete / status.sceneCount) * 100));
  }, [status]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200/60 bg-white/80 p-8 dark:border-white/10 dark:bg-surface-900/70">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-500">Histoire pour enfants</p>
        <h1 className="text-3xl font-bold tracking-tight">Révolution haïtienne (1791–1804)</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Page de production intégrée au site pour générer une vidéo documentaire historique de 10–12 minutes,
          avec storyboard chronologique, sous-titres, narration synchronisée et assemblage final.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Scenes" value={status?.sceneCount ?? '-'} />
        <Stat label="Durée cible" value={status ? `${Math.floor(status.targetDurationSec / 60)}m ${status.targetDurationSec % 60}s` : '-'} />
        <Stat label="Progress clips" value={`${completionPct}%`} />
      </section>

      <section className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 dark:border-white/10 dark:bg-surface-900/70">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => runBuild('prepare')} disabled={loading} className="btn-primary text-xs">
            {loading ? 'Exécution...' : 'Préparer pipeline'}
          </button>
          <button onClick={() => runBuild('full')} disabled={loading} className="btn-secondary text-xs">
            {loading ? 'Exécution...' : 'Assembler vidéo finale'}
          </button>
          {status?.finalVideoExists && (
            <a href="/api/histoire-pour-enfants/haiti-revolution/download" className="btn-ghost text-xs">
              Télécharger la vidéo finale
            </a>
          )}
        </div>

        {error && <p className="mt-4 rounded-xl border border-rose-300/40 bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/20 dark:text-rose-300">{error}</p>}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ListCard title="Clips manquants" items={status?.missingSceneClips ?? []} />
        <ListCard title="Narrations manquantes" items={status?.missingNarrations ?? []} />
      </section>

      <section className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 dark:border-white/10 dark:bg-surface-900/70">
        <h2 className="mb-3 text-lg font-semibold">Logs pipeline</h2>
        {log ? (
          <pre className="max-h-[420px] overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">{log}</pre>
        ) : (
          <p className="text-sm text-slate-500">Aucun log pour le moment.</p>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 dark:border-white/10 dark:bg-surface-900/70">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 dark:border-white/10 dark:bg-surface-900/70">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-emerald-600 dark:text-emerald-300">Aucun élément manquant.</p>
      ) : (
        <ul className="max-h-64 space-y-1 overflow-auto text-xs text-slate-600 dark:text-slate-300">
          {items.slice(0, 120).map((item) => (
            <li key={item} className="rounded bg-slate-100 px-2 py-1 dark:bg-surface-800">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
