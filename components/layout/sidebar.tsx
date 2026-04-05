'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { sections } from '@/data/lessons';
import { ui } from '@/data/translations';
import { useLanguage, useAuth, useActiveSection } from '@/app/providers';
import {
  IconShield,
  IconHome,
  IconBook,
  IconMap,
  IconFlask,
  IconBookOpen,
  IconLink,
  IconBriefcase,
  IconLayout,
  IconChevronRight,
} from '@/components/icons';

const navItems = [
  { href: '/', icon: IconHome, key: 'home' as const },
  { href: '/courses', icon: IconBook, key: 'courses' as const },
  { href: '/roadmaps', icon: IconMap, key: 'roadmaps' as const },
  { href: '/labs', icon: IconFlask, key: 'labs' as const },
  { href: '/glossary', icon: IconBookOpen, key: 'glossary' as const },
  { href: '/resources', icon: IconLink, key: 'resources' as const },
  { href: '/career', icon: IconBriefcase, key: 'career' as const },
];

function SidebarLink({
  href,
  icon: Icon,
  label,
  onClick,
  isActive,
}: {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick?: () => void;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-brand-500/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
      }`}
    >
      <Icon className="shrink-0" style={{ width: 18, height: 18 }} />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { activeSection, setActiveSection } = useActiveSection();
  const t = ui[lang];

  const handleSectionClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
    router.push('/courses');
    onClose?.();
  };

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 pb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyber-500 shadow-glow">
          <IconShield className="h-5 w-5 text-white" />
        </div>
        <Link
          href="/"
          onClick={onClose}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white"
        >
          {t.platform}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-1">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {t.platform}
        </p>
        {navItems.map((item) => (
          <SidebarLink
            key={item.key}
            href={item.href}
            icon={item.icon}
            label={t[item.key]}
            onClick={onClose}
            isActive={isLinkActive(item.href)}
          />
        ))}
        {isAuthenticated && (
          <SidebarLink
            href="/dashboard"
            icon={IconLayout}
            label={t.dashboard}
            onClick={onClose}
            isActive={isLinkActive('/dashboard')}
          />
        )}
      </nav>

      {/* Sections */}
      <div className="mt-6">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {t.sections}
        </p>
        <div className="max-h-[40vh] space-y-0.5 overflow-y-auto pr-1">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => handleSectionClick(s)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs transition-all duration-200 ${
                activeSection === s
                  ? 'bg-brand-500/10 font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-slate-300'
              }`}
            >
              <span className="truncate">{s}</span>
              <IconChevronRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
