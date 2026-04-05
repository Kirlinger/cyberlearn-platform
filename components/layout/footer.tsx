'use client';

import Link from 'next/link';
import { ui } from '@/data/translations';
import { useLanguage } from '@/app/providers';
import { IconShield } from '@/components/icons';

interface FooterLink {
  href: string;
  labelEn: string;
  labelFr: string;
  labelHt: string;
}

const columns: { titleEn: string; titleFr: string; titleHt: string; links: FooterLink[] }[] = [
  {
    titleEn: 'Platform',
    titleFr: 'Plateforme',
    titleHt: 'Platfòm',
    links: [
      { href: '/about', labelEn: 'About', labelFr: 'À propos', labelHt: 'Sou nou' },
      { href: '/team', labelEn: 'Team', labelFr: 'Équipe', labelHt: 'Ekip' },
      { href: '/contact', labelEn: 'Contact', labelFr: 'Contact', labelHt: 'Kontakte' },
    ],
  },
  {
    titleEn: 'Legal',
    titleFr: 'Légal',
    titleHt: 'Legal',
    links: [
      { href: '/privacy', labelEn: 'Privacy Policy', labelFr: 'Politique de confidentialité', labelHt: 'Politik konfidansyalite' },
      { href: '/terms', labelEn: 'Terms of Service', labelFr: 'Conditions d\'utilisation', labelHt: 'Kondisyon sèvis' },
      { href: '/refund', labelEn: 'Refund Policy', labelFr: 'Politique de remboursement', labelHt: 'Politik ranbousman' },
    ],
  },
  {
    titleEn: 'Support',
    titleFr: 'Support',
    titleHt: 'Sipò',
    links: [
      { href: '/support', labelEn: 'Help Center', labelFr: 'Centre d\'aide', labelHt: 'Sant èd' },
      { href: '/contact', labelEn: 'Contact Us', labelFr: 'Contactez-nous', labelHt: 'Kontakte nou' },
    ],
  },
];

function getLabel(link: FooterLink, lang: string) {
  if (lang === 'fr') return link.labelFr;
  if (lang === 'ht') return link.labelHt;
  return link.labelEn;
}

function getTitle(col: (typeof columns)[number], lang: string) {
  if (lang === 'fr') return col.titleFr;
  if (lang === 'ht') return col.titleHt;
  return col.titleEn;
}

export default function Footer() {
  const { lang } = useLanguage();
  const t = ui[lang];

  const rights =
    lang === 'fr'
      ? 'Tous droits réservés.'
      : lang === 'ht'
        ? 'Tout dwa rezève.'
        : 'All rights reserved.';

  return (
    <footer className="border-t border-slate-200/70 px-4 py-8 dark:border-white/5">
      <div className="mx-auto max-w-7xl">
        {/* Top: Brand + Columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-cyber-500">
                <IconShield className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t.platform}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
              Premium cybersecurity education for the next generation of defenders.
            </p>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.titleEn}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {getTitle(col, lang)}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href + link.labelEn}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-500 transition-colors duration-200 hover:text-brand-500 dark:text-slate-500 dark:hover:text-brand-400"
                    >
                      {getLabel(link, lang)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + Copyright */}
        <div className="mt-8 border-t border-slate-200/70 pt-4 dark:border-white/5 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} {t.platform}. {rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
