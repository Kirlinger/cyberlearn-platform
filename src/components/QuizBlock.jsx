import { useState } from 'react';
import { IconCheck, IconAlertCircle } from './Icons';

export default function QuizBlock({ questions, label }) {
  const [answered, setAnswered] = useState({});

  if (!questions || questions.length === 0) return null;

  const toggleAnswer = (idx) => {
    setAnswered((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="card">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <span className="h-1 w-4 rounded-full bg-amber-400" />
        {label}
      </h3>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div
            key={q}
            className={`rounded-xl border p-4 transition-all duration-200 ${
              answered[i]
                ? 'border-cyber-500/30 bg-cyber-50/50 dark:border-cyber-500/20 dark:bg-cyber-950/20'
                : 'border-slate-200/60 hover:border-brand-500/20 dark:border-white/5 dark:hover:border-brand-500/10'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-slate-700 dark:text-slate-300">{q}</p>
              <button
                onClick={() => toggleAnswer(i)}
                className={`shrink-0 rounded-lg p-1.5 text-xs transition-all duration-200 ${
                  answered[i]
                    ? 'bg-cyber-100 text-cyber-600 dark:bg-cyber-900/30 dark:text-cyber-400'
                    : 'bg-slate-100 text-slate-400 hover:text-brand-500 dark:bg-surface-800'
                }`}
                aria-label={answered[i] ? 'Mark incomplete' : 'Mark complete'}
              >
                {answered[i] ? <IconCheck className="h-4 w-4" /> : <IconAlertCircle className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

