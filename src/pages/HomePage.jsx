import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProgressCard from '../components/ProgressCard';

export default function HomePage({ lessons, ui }) {
  const bySection = lessons.reduce((acc, l) => {
    acc[l.section] = (acc[l.section] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <Helmet>
        <title>CyberLearn Platform — Dashboard</title>
        <meta name="description" content="Browse the CyberLearn lesson catalog covering cybersecurity, Linux, networking, Python, and SQL. Track your learning progress and explore hands-on exercises." />
        <meta property="og:title" content="CyberLearn Platform — Dashboard" />
        <meta property="og:description" content="Browse the CyberLearn lesson catalog covering cybersecurity, Linux, networking, Python, and SQL." />
      </Helmet>
      <section className="grid gap-4 md:grid-cols-3">
        <ProgressCard label="Learning Path Completion" value={42} />
        <ProgressCard label="Weekly Practice" value={68} />
        <ProgressCard label={ui.progress} value={55} />
      </section>
      <section className="card">
        <h2 className="mb-3 text-xl font-bold">Lesson Catalog</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="rounded-xl border border-slate-200 p-4 hover:border-brand-500 dark:border-slate-800">
              <p className="text-xs text-slate-500">{lesson.section}</p>
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{lesson.definitionFr}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="card">
        <h2 className="mb-2 text-lg font-semibold">Section Coverage</h2>
        <div className="grid gap-2 text-sm md:grid-cols-2">
          {Object.entries(bySection).map(([key, count]) => <div key={key} className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">{key}: {count} lessons</div>)}
        </div>
      </section>
    </div>
  );
}
