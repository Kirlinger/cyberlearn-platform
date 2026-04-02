export default function QuizBlock({ questions, label }) {
  return (
    <div className="card">
      <h3 className="mb-3 text-lg font-semibold">{label}</h3>
      <ul className="list-disc space-y-2 pl-6 text-sm text-slate-700 dark:text-slate-300">
        {questions.map((q) => <li key={q}>{q}</li>)}
      </ul>
    </div>
  );
}
