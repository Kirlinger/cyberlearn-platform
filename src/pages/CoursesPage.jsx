import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { sections } from '../data/lessons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { IconArrowRight } from '../components/Icons';

function SectionReveal({ children, delay = 0 }) {
  const [ref, visible] = useScrollAnimation(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function CoursesPage({ filteredLessons, ui, activeSection, setActiveSection }) {
  const displayedLessons = activeSection
    ? filteredLessons.filter((l) => l.section === activeSection)
    : filteredLessons;

  const bySection = filteredLessons.reduce((acc, l) => {
    acc[l.section] = (acc[l.section] || 0) + 1;
    return acc;
  }, {});

  const usedSections = sections.filter((s) => bySection[s]);

  return (
    <div className="space-y-8">
      <Helmet>
        <title>{ui.courses} — CyberLearn</title>
        <meta name="description" content="Browse the full CyberLearn course catalog: cybersecurity, Linux, networking, Python, SQL, and more." />
      </Helmet>

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{ui.courses}</h1>
        <p className="mt-2 text-slate-500">{displayedLessons.length} {ui.lessonsCount}</p>
      </div>

      {/* Section filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSection(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
            !activeSection
              ? 'bg-brand-500 text-white shadow-glow'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-surface-800 dark:text-slate-400 dark:hover:bg-surface-700'
          }`}
        >
          {ui.allSections}
        </button>
        {usedSections.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(activeSection === s ? null : s)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
              activeSection === s
                ? 'bg-brand-500 text-white shadow-glow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-surface-800 dark:text-slate-400 dark:hover:bg-surface-700'
            }`}
          >
            {s} ({bySection[s]})
          </button>
        ))}
      </div>

      {/* Course grid */}
      {displayedLessons.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-16 text-center dark:border-slate-800">
          <p className="text-lg text-slate-500">{ui.noResults}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {displayedLessons.map((lesson, i) => (
            <SectionReveal key={lesson.id} delay={Math.min(i * 40, 400)}>
              <Link
                to={`/lesson/${lesson.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card-hover dark:border-white/5 dark:bg-surface-850 dark:hover:border-brand-500/20"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/5 transition-transform duration-500 group-hover:scale-150 dark:bg-brand-500/10" />
                <div className="relative flex flex-1 flex-col">
                  <span className="badge-brand mb-3 self-start">{lesson.section}</span>
                  <h3 className="font-semibold leading-snug">{lesson.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">{lesson.definitionFr}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                    <span>{ui.heroCtaPrimary}</span>
                    <IconArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      )}
    </div>
  );
}
