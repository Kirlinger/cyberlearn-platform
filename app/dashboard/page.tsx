'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, useLanguage } from '@/app/providers';
import { ui as uiDict } from '@/data/translations';
import { lessons } from '@/data/lessons';
import { IconUsers, IconTrendingUp, IconAward, IconBook } from '@/components/icons';
import ProgressCard from '@/components/ui/progress-card';

function DashStatCard({
  icon: Icon,
  value,
  label,
  trend,
  color,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number;
  label: string;
  trend?: string;
  color: string;
}) {
  return (
    <div className="card flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-extrabold">{value}</p>
        {trend && <p className="mt-1 text-xs text-cyber-600">{trend}</p>}
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();
  const ui = uiDict[lang];

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const bySection = lessons.reduce<Record<string, number>>((acc, l) => {
    acc[l.section] = (acc[l.section] || 0) + 1;
    return acc;
  }, {});

  const popularCourses = Object.entries(bySection)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-r from-brand-50 to-cyber-50/30 p-6 dark:border-white/5 dark:from-brand-950/20 dark:to-cyber-950/10">
        <h1 className="text-2xl font-extrabold">
          {ui.welcomeBack}, {user?.name || 'User'} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {ui.adminDashboard}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashStatCard icon={IconUsers} value="1,234" label={ui.totalStudents} trend="+12%" color="bg-brand-500" />
        <DashStatCard icon={IconTrendingUp} value="892" label={ui.activeUsers} trend="+5.2%" color="bg-cyber-600" />
        <DashStatCard icon={IconAward} value="76%" label={ui.completionRate} trend="+3%" color="bg-purple-500" />
        <DashStatCard icon={IconBook} value={lessons.length} label={ui.statsLessons} color="bg-amber-500" />
      </div>

      {/* Progress */}
      <div className="grid gap-4 md:grid-cols-3">
        <ProgressCard label={ui.pathCompletion} value={42} />
        <ProgressCard label={ui.weeklyPractice} value={68} />
        <ProgressCard label={ui.overallProgress} value={55} />
      </div>

      {/* Popular courses */}
      <div className="card">
        <h2 className="mb-4 text-lg font-bold">{ui.popularCourses}</h2>
        <div className="space-y-3">
          {popularCourses.map(([name, count], i) => (
            <div key={name} className="flex items-center justify-between rounded-xl border border-slate-200/60 p-3 transition-all duration-200 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-xs font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                  {i + 1}
                </span>
                <span className="font-medium">{name}</span>
              </div>
              <span className="text-sm text-slate-500">{count} {ui.lessonsCount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="card">
        <h2 className="mb-4 text-lg font-bold">{ui.recentActivity}</h2>
        <div className="space-y-3">
          {lessons.slice(0, 5).map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lesson/${lesson.id}`}
              className="flex items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-white/5"
            >
              <div className="h-2 w-2 rounded-full bg-cyber-500" />
              <div>
                <p className="text-sm font-medium">{lesson.title}</p>
                <p className="text-xs text-slate-500">{lesson.section}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
