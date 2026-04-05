import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { IconShield, IconBook, IconTerminal, IconZap, IconTarget, IconArrowRight, IconAward } from '../components/Icons';
import { lessons } from '../data/lessons';

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card dark:border-white/5 dark:bg-surface-850/70">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function SectionReveal({ children, className = '' }) {
  const [ref, visible] = useScrollAnimation(0.05);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}>
      {children}
    </div>
  );
}

export default function HomePage({ filteredLessons, ui, activeSection, setActiveSection }) {
  const displayedLessons = activeSection
    ? filteredLessons.filter((l) => l.section === activeSection)
    : filteredLessons;

  const bySection = filteredLessons.reduce((acc, l) => {
    acc[l.section] = (acc[l.section] || 0) + 1;
    return acc;
  }, {});

  const totalQuizQuestions = lessons.reduce((sum, l) => sum + (l.quiz?.length || 0), 0);

  return (
    <div className="space-y-10">
      <Helmet>
        <title>CyberLearn — {ui.tagline}</title>
        <meta name="description" content="Browse the CyberLearn lesson catalog covering cybersecurity, Linux, networking, Python, and SQL. Track your learning progress and explore hands-on exercises." />
        <meta property="og:title" content={`CyberLearn — ${ui.tagline}`} />
        <meta property="og:description" content="Browse the CyberLearn lesson catalog covering cybersecurity, Linux, networking, Python, and SQL." />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white via-slate-50 to-brand-50/30 p-8 dark:border-white/5 dark:from-surface-900 dark:via-surface-850 dark:to-brand-950/20 md:p-12">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/20" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyber-500/10 blur-3xl dark:bg-cyber-500/15" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-400">
            <IconShield className="h-3.5 w-3.5" />
            {ui.platform}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {ui.heroTitle}{' '}
            <span className="gradient-text">{ui.heroTitleAccent}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400 md:text-lg">
            {ui.heroDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/courses" className="btn-primary">
              {ui.heroCtaPrimary}
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/roadmaps" className="btn-secondary">
              {ui.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={IconBook} value={lessons.length} label={ui.statsLessons} color="bg-brand-500" />
          <StatCard icon={IconTarget} value={Object.keys(bySection).length} label={ui.statsSections} color="bg-purple-500" />
          <StatCard icon={IconTerminal} value="3" label={ui.statsLabs} color="bg-cyber-600" />
          <StatCard icon={IconAward} value={totalQuizQuestions} label={ui.statsQuizzes} color="bg-amber-500" />
        </div>
      </SectionReveal>

      {/* Section filter */}
      {activeSection && (
        <div className="flex items-center gap-2">
          <span className="badge-brand">{activeSection}</span>
          <button onClick={() => setActiveSection(null)} className="text-xs text-slate-500 underline hover:text-slate-700 dark:hover:text-slate-300">
            {ui.allSections}
          </button>
        </div>
      )}

      {/* Lesson catalog */}
      <SectionReveal>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{ui.lessonCatalog}</h2>
          <Link to="/courses" className="text-sm font-medium text-brand-500 hover:text-brand-600">
            {ui.heroCtaSecondary} →
          </Link>
        </div>
        {displayedLessons.length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
            <p className="text-slate-500">{ui.noResults}</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {displayedLessons.slice(0, 6).map((lesson, i) => (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card-hover dark:border-white/5 dark:bg-surface-850 dark:hover:border-brand-500/20"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/5 transition-transform duration-500 group-hover:scale-150 dark:bg-brand-500/10" />
                <div className="relative">
                  <span className="badge-brand mb-3">{lesson.section}</span>
                  <h3 className="mt-2 font-semibold leading-snug">{lesson.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{lesson.definitionFr}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span>{ui.heroCtaPrimary}</span>
                    <IconArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </SectionReveal>

      {/* Section coverage */}
      <SectionReveal>
        <h2 className="mb-4 text-xl font-bold">{ui.sectionCoverage}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(bySection).map(([key, count]) => (
            <button
              key={key}
              onClick={() => { setActiveSection(activeSection === key ? null : key); }}
              className={`group flex items-center justify-between rounded-xl border p-3 text-left text-sm transition-all duration-200 ${
                activeSection === key
                  ? 'border-brand-500/30 bg-brand-50 dark:border-brand-500/20 dark:bg-brand-950/30'
                  : 'border-slate-200/60 bg-white hover:border-brand-500/20 hover:shadow-sm dark:border-white/5 dark:bg-surface-850 dark:hover:border-brand-500/10'
              }`}
            >
              <span className="font-medium">{key}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-surface-800 dark:text-slate-400">
                {count} {ui.lessonsCount}
              </span>
            </button>
          ))}
        </div>
      </SectionReveal>
    </div>
  );
}

