'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/providers';
import { ui } from '@/data/translations';
import { IconX } from '@/components/icons';
import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';

export default function Shell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang } = useLanguage();
  const t = ui[lang];

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-surface-950 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden w-[260px] shrink-0 border-r border-slate-200/70 bg-white/50 backdrop-blur-xl dark:border-white/5 dark:bg-surface-900/50 lg:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-y-auto p-4">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobile}
          />
          <aside className="absolute left-0 top-0 h-full w-[280px] animate-slide-in-left overflow-y-auto border-r border-slate-200/70 bg-white p-4 dark:border-white/5 dark:bg-surface-900">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold">{t.mobileMenu}</span>
              <button
                onClick={closeMobile}
                className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>
            <Sidebar onClose={closeMobile} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setMobileOpen(true)} />

        {/* Content */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
