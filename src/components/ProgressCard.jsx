export default function ProgressCard({ label, value }) {
  const clampedValue = Math.max(0, Math.min(100, value));
  return (
    <div className="card group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">{label}</p>
        <span className="text-lg font-extrabold text-brand-500">{clampedValue}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-800">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-cyber-500 transition-all duration-700"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}

