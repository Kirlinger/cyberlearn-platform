'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/providers';
import {
  IconAward,
  IconShield,
  IconCheck,
  IconAlertCircle,
  IconChevronRight,
} from '@/components/icons';
import Link from 'next/link';

function PageHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 dark:bg-brand-500/20">
          <Icon className="h-5 w-5 text-brand-500" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      </div>
      {description && (
        <p className="mt-2 text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}

const tiers = [
  {
    window: 'Within 7 Days',
    refund: '100%',
    description: 'Full refund, no questions asked',
    color: 'text-cyber-500',
    bg: 'bg-cyber-500/10 dark:bg-cyber-500/20',
    border: 'border-cyber-500/30',
  },
  {
    window: '8 – 14 Days',
    refund: '50%',
    description: 'Partial refund if less than 30% content accessed',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    border: 'border-amber-500/30',
  },
  {
    window: 'After 14 Days',
    refund: '0%',
    description: 'No refund available after this period',
    color: 'text-red-500',
    bg: 'bg-red-500/10 dark:bg-red-500/20',
    border: 'border-red-500/30',
  },
];

const exceptions = [
  'Technical issues that prevent course access and cannot be resolved by our support team',
  'Duplicate charges or billing errors',
  'Course content that is materially different from what was advertised',
  'Platform downtime exceeding 72 consecutive hours during your enrollment period',
];

const processSteps = [
  {
    step: '1',
    title: 'Submit Request',
    description:
      'Contact support@cyberlearn.dev with your order number and reason for the refund request.',
  },
  {
    step: '2',
    title: 'Review Period',
    description:
      'Our team reviews your request within 3 business days and may ask for additional information.',
  },
  {
    step: '3',
    title: 'Decision & Processing',
    description:
      'If approved, your refund is processed to the original payment method within 5–10 business days.',
  },
];

const faqs = [
  {
    q: 'What if I purchased a subscription bundle instead of an individual course?',
    a: 'Subscription plans follow the same 7-day full refund window from the initial purchase or renewal date. After 7 days, you can cancel to prevent future billing, but no partial refund is issued for the current billing period.',
  },
  {
    q: 'Can I get a refund if I already received a certificate?',
    a: 'No. Once a certificate of completion has been issued for a course, that course is no longer eligible for a refund, regardless of the purchase date.',
  },
  {
    q: 'What counts toward the "30% content accessed" threshold?',
    a: 'This includes any lessons, videos, or lab environments you have opened or interacted with. Simply viewing a course overview page does not count toward this threshold.',
  },
  {
    q: 'How do I check the status of my refund request?',
    a: 'After submitting your refund request, you will receive an email confirmation with a ticket number. You can reply to that email or contact support@cyberlearn.dev with your ticket number for status updates.',
  },
  {
    q: 'Are there any fees deducted from my refund?',
    a: 'No. CyberLearn does not deduct processing fees from refund amounts. You receive the full refund amount as specified by the applicable tier.',
  },
];

export default function RefundPage() {
  const { lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heading =
    lang === 'fr'
      ? 'Politique de Remboursement'
      : lang === 'ht'
        ? 'Politik Ranbousman'
        : 'Refund Policy';

  const subtitle =
    lang === 'fr'
      ? 'Notre engagement envers votre satisfaction'
      : lang === 'ht'
        ? 'Angajman nou anvè satisfaksyon ou'
        : 'Our commitment to your satisfaction and fair dealings';

  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconAward} title={heading} description={subtitle} />

      {/* Effective Date */}
      <div className="card mb-6 flex items-center gap-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-transparent dark:from-brand-500/10" />
        <div className="relative flex items-center gap-3">
          <IconShield className="h-5 w-5 text-brand-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold">
              Effective Date:{' '}
              <span className="text-brand-500">January 1, 2025</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We believe in fair and transparent refund practices.
            </p>
          </div>
        </div>
      </div>

      {/* Refund Tiers */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Refund <span className="gradient-text">Tiers</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.window}
              className={`card text-center border ${t.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
            >
              <div
                className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${t.bg}`}
              >
                <span className={`text-lg font-extrabold ${t.color}`}>
                  {t.refund}
                </span>
              </div>
              <h3 className="font-bold">{t.window}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          * Refunds within the 8–14 day window require that less than 30% of the course
          content has been accessed.
        </p>
      </section>

      {/* Exceptions */}
      <section className="mb-8">
        <div className="card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent dark:from-amber-500/10" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/20">
                <IconAlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <h2 className="text-lg font-bold">Exceptions</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Regardless of the refund window, refunds may be granted in the following
              circumstances:
            </p>
            <ul className="space-y-3">
              {exceptions.map((exc) => (
                <li
                  key={exc}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyber-500" />
                  {exc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Refund <span className="gradient-text">Process</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {processSteps.map((s) => (
            <div
              key={s.step}
              className="card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 dark:bg-brand-500/20">
                <span className="text-sm font-extrabold text-brand-500">
                  {s.step}
                </span>
              </div>
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="card !p-0 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-sm pr-4">{faq.q}</span>
                <IconChevronRight
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? 'rotate-90' : ''}`}
                />
              </button>
              {openFaq === i && (
                <div className="border-t border-slate-200/80 dark:border-slate-800/60 px-5 pb-5 pt-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <div className="card relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-cyber-500/5 dark:from-brand-500/10 dark:to-cyber-500/10" />
        <div className="relative">
          <h3 className="text-lg font-bold mb-2">Need to Request a Refund?</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-lg mx-auto">
            Contact our support team with your order details and we&apos;ll process your
            request promptly.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
