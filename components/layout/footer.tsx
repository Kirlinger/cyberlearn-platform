'use client';

import Link from 'next/link';
import { ui } from '@/data/translations';
import { useLanguage } from '@/app/providers';
import { IconShield } from '@/components/icons';

const footerLinks = [
  { href: '/about', labelEn: 'About', labelFr: 'À propos', labelHt: 'Sou nou' },
  { href: '/contact', labelEn: 'Contact', labelFr: 'Contact', labelHt: 'Kontakte' },
  { href: '/privacy', labelEn: 'Privacy Policy', labelFr: 'Politique de confidentialité', labelHt: 'Politik konfidansyalite' },
  { href: '/terms', labelEn: 'Terms of Service', labelFr: 'Conditions d\'utilisation', labelHt: 'Kondisyon sèvis' },
  { href: '/support', labelEn: 'Support', labelFr: 'Support', labelHt: 'Sipò' },
  { href: '/team', labelEn: 'Team', labelFr: 'Équipe', labelHt: 'Ekip' },
];

function getLabel(link: (typeof footerLinks)[number], lang: string) {
  if (lang === 'fr') return link.labelFr;
  if (lang === 'ht') return link.labelHt;
  return link.labelEn;
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
    <footer className="border-t border-slate-200/70 px-4 py-6 dark:border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-cyber-500">
            <IconShield className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t.platform}
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-slate-500 transition-colors duration-200 hover:text-brand-500 dark:text-slate-500 dark:hover:text-brand-400"
            >
              {getLabel(link, lang)}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} {t.platform}. {rights}
        </p>
      </div>
    </footer>
  );
}
