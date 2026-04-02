import { Link, useParams } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import QuizBlock from '../components/QuizBlock';

export default function LessonPage({ lessons, ui }) {
  const { id } = useParams();
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) return <div className="card">Lesson not found.</div>;

  return (
    <div className="space-y-5">
      <div className="card">
        <p className="text-xs uppercase tracking-wide text-slate-500">{lesson.section}</p>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <p className="mt-3"><strong>Définition:</strong> {lesson.definitionFr}</p>
        <p className="mt-2"><strong>Kreyòl:</strong> {lesson.conceptHt}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-2 font-semibold">Why it matters</h2><p>{lesson.whyItMatters}</p>
          <h2 className="mb-2 mt-4 font-semibold">Core concepts</h2><ul className="list-disc pl-5">{lesson.coreConcepts.map((c)=><li key={c}>{c}</li>)}</ul>
          <h2 className="mb-2 mt-4 font-semibold">Deep explanation</h2><p>{lesson.deepExplanation}</p>
        </div>
        <div className="card">
          <h2 className="mb-2 font-semibold">Step-by-step breakdown</h2><ol className="list-decimal space-y-1 pl-5">{lesson.steps.map((s)=><li key={s}>{s}</li>)}</ol>
          <h2 className="mb-2 mt-4 font-semibold">Code and commands (English)</h2><CodeBlock code={lesson.code} />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card"><h2 className="mb-2 font-semibold">{ui.commonMistakes}</h2><ul className="list-disc pl-5">{lesson.commonMistakes.map((m)=><li key={m}>{m}</li>)}</ul></div>
        <div className="card"><h2 className="mb-2 font-semibold">Practical exercises</h2><ul className="list-disc pl-5">{lesson.practicalExercises.map((p)=><li key={p}>{p}</li>)}</ul><h2 className="mb-2 mt-4 font-semibold">Challenge exercises</h2><ul className="list-disc pl-5">{lesson.challengeExercises.map((c)=><li key={c}>{c}</li>)}</ul></div>
      </div>
      <QuizBlock questions={lesson.quiz} label={ui.quiz} />
      <div className="card">
        <h2 className="font-semibold">Summary</h2><p className="mt-2">{lesson.summary}</p>
        <h3 className="mt-4 font-semibold">{ui.relatedTopics}</h3><ul className="list-disc pl-5">{lesson.relatedTopics.map((r)=><li key={r}>{r}</li>)}</ul>
        <h3 className="mt-4 font-semibold">{ui.nextLesson}</h3>
        <Link className="text-brand-700 underline" to={`/lesson/${lesson.nextLesson}`}>{lesson.nextLesson}</Link>
      </div>
    </div>
  );
}
