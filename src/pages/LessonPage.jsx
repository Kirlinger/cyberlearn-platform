import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CodeBlock from '../components/CodeBlock';
import QuizBlock from '../components/QuizBlock';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { IconArrowRight, IconChevronRight } from '../components/Icons';

function Section({ children, className = '' }) {
  const [ref, visible] = useScrollAnimation(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionCard({ title, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
        <span className="h-1 w-4 rounded-full bg-brand-500" />
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function LessonPage({ lessons, ui }) {
  const { id } = useParams();
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-bold text-slate-200 dark:text-slate-800">404</p>
          <p className="mt-2 text-lg text-slate-500">{ui.lessonNotFound}</p>
          <Link to="/" className="btn-primary mt-4 inline-flex">{ui.backToHome}</Link>
        </div>
      </div>
    );
  }

  const nextLessonData = lessons.find((l) => l.id === lesson.nextLesson);

  return (
    <div className="space-y-6 animate-fade-in">
      <Helmet>
        <title>{`${lesson.title} — CyberLearn`}</title>
        <meta name="description" content={`${lesson.definitionFr} — ${lesson.whyItMatters}`} />
        <meta property="og:title" content={`${lesson.title} — CyberLearn`} />
        <meta property="og:description" content={lesson.definitionFr} />
      </Helmet>

      {/* Breadcrumb + Header */}
      <div>
        <div className="flex items-center gap-1 text-sm text-slate-400">
          <Link to="/courses" className="hover:text-brand-500 transition-colors">{ui.courses}</Link>
          <IconChevronRight className="h-3 w-3" />
          <span className="text-slate-600 dark:text-slate-300">{lesson.section}</span>
        </div>
        <div className="mt-4 rounded-2xl border border-slate-200/60 bg-gradient-to-r from-white to-brand-50/30 p-6 dark:border-white/5 dark:from-surface-850 dark:to-brand-950/10 md:p-8">
          <span className="badge-brand">{lesson.section}</span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">{lesson.title}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400"><strong className="text-slate-800 dark:text-slate-200">{ui.definition}:</strong> {lesson.definitionFr}</p>
          <p className="mt-2 text-sm text-slate-500"><strong className="text-slate-600 dark:text-slate-400">{ui.creole}:</strong> {lesson.conceptHt}</p>
        </div>
      </div>

      {/* Two-column content */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title={ui.whyItMatters}>
            <p className="text-slate-600 dark:text-slate-400">{lesson.whyItMatters}</p>
            <h3 className="mb-2 mt-5 text-sm font-semibold uppercase tracking-wider text-slate-400">{ui.coreConcepts}</h3>
            <div className="flex flex-wrap gap-2">
              {lesson.coreConcepts.map((c) => (
                <span key={c} className="badge bg-slate-100 text-slate-600 dark:bg-surface-800 dark:text-slate-400">{c}</span>
              ))}
            </div>
          </SectionCard>
          <SectionCard title={ui.deepExplanation}>
            <p className="text-slate-600 dark:text-slate-400">{lesson.deepExplanation}</p>
          </SectionCard>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title={ui.steps}>
            <ol className="space-y-3">
              {lesson.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                    {i + 1}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">{s}</span>
                </li>
              ))}
            </ol>
          </SectionCard>
          <SectionCard title={ui.codeCommands}>
            <CodeBlock code={lesson.code} />
          </SectionCard>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title={ui.commonMistakes}>
            <ul className="space-y-2">
              {lesson.commonMistakes.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  {m}
                </li>
              ))}
            </ul>
          </SectionCard>
          <div className="space-y-6">
            <SectionCard title={ui.practicalExercises}>
              <ul className="space-y-2">
                {lesson.practicalExercises.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title={ui.challengeExercises}>
              <ul className="space-y-2">
                {lesson.challengeExercises.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      </Section>

      {/* Quiz */}
      <Section>
        <QuizBlock questions={lesson.quiz} label={ui.quiz} />
      </Section>

      {/* Summary + Next */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title={ui.summary}>
            <p className="text-slate-600 dark:text-slate-400">{lesson.summary}</p>
            <h3 className="mb-2 mt-4 text-sm font-semibold uppercase tracking-wider text-slate-400">{ui.relatedTopics}</h3>
            <div className="flex flex-wrap gap-2">
              {lesson.relatedTopics.map((r) => (
                <span key={r} className="badge bg-slate-100 text-slate-600 dark:bg-surface-800 dark:text-slate-400">{r}</span>
              ))}
            </div>
          </SectionCard>

          {/* Next lesson CTA */}
          {nextLessonData && (
            <Link
              to={`/lesson/${lesson.nextLesson}`}
              className="group flex flex-col justify-center rounded-2xl border border-brand-200/50 bg-gradient-to-br from-brand-50 to-brand-100/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover dark:border-brand-800/30 dark:from-brand-950/30 dark:to-brand-900/10"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">{ui.nextLesson}</p>
              <h3 className="mt-2 text-lg font-bold">{nextLessonData.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{nextLessonData.definitionFr}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                <span>{ui.heroCtaPrimary || 'Continue'}</span>
                <IconArrowRight className="h-4 w-4" />
              </div>
            </Link>
          )}
        </div>
      </Section>
    </div>
  );
}

