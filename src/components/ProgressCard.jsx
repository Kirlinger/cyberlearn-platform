export default function ProgressCard({ label, value }) {
  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-medium">{label}</p>
        <span className="text-sm text-slate-500">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="h-2 rounded-full bg-brand-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
