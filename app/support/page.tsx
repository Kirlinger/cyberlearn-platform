'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/providers';
import {
  IconAlertCircle,
  IconSearch,
  IconZap,
  IconUser,
  IconBookOpen,
  IconLock,
  IconAward,
  IconTerminal,
  IconChevronRight,
  IconArrowRight,
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

const topics = [
  {
    icon: IconZap,
    title: 'Getting Started',
    description:
      'New to CyberLearn? Learn how to set up your account, choose your first course, and navigate the platform.',
    color: 'text-brand-500',
    bg: 'bg-brand-500/10 dark:bg-brand-500/20',
  },
  {
    icon: IconUser,
    title: 'Account Issues',
    description:
      'Password resets, profile updates, email changes, two-factor authentication, and account security.',
    color: 'text-cyber-500',
    bg: 'bg-cyber-500/10 dark:bg-cyber-500/20',
  },
  {
    icon: IconBookOpen,
    title: 'Course Access',
    description:
      'Enrollment issues, course progress not saving, video playback problems, and content availability.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
  },
  {
    icon: IconLock,
    title: 'Payments & Billing',
    description:
      'Subscription management, payment methods, invoices, refund requests, and promotional codes.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
  },
  {
    icon: IconTerminal,
    title: 'Technical Issues',
    description:
      'Lab environment errors, browser compatibility, connectivity problems, and system requirements.',
    color: 'text-red-500',
    bg: 'bg-red-500/10 dark:bg-red-500/20',
  },
  {
    icon: IconAward,
    title: 'Certificates',
    description:
      'Certificate issuance, verification links, LinkedIn integration, and credential sharing.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
  },
];

const popularFaqs = [
  {
    q: 'How do I reset my password?',
    a: 'Go to the login page and click "Forgot Password." Enter your email address and follow the instructions sent to your inbox. If you don\'t receive the email within 5 minutes, check your spam folder or contact support.',
  },
  {
    q: 'Why is my lab environment not loading?',
    a: 'Ensure you\'re using a modern browser (Chrome, Firefox, or Edge) with JavaScript enabled. Disable browser extensions that may block WebSocket connections. If the issue persists, try clearing your cache or using incognito mode.',
  },
  {
    q: 'How do I get my certificate of completion?',
    a: 'Certificates are automatically generated when you complete all required lessons and pass the final assessment with a score of 70% or higher. You can download your certificate from the course page or your dashboard.',
  },
  {
    q: 'Can I access courses offline?',
    a: 'Video lessons can be downloaded for offline viewing through our mobile app. However, interactive labs and assessments require an active internet connection as they run in cloud-based environments.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Go to Settings → Subscription → Manage Plan and click "Cancel Subscription." Your access continues until the end of the current billing period. You can reactivate at any time.',
  },
];

const quickLinks = [
  { label: 'System Requirements', href: '/support' },
  { label: 'Browser Compatibility', href: '/support' },
  { label: 'Lab Setup Guide', href: '/support' },
  { label: 'API Documentation', href: '/support' },
  { label: 'Community Guidelines', href: '/support' },
  { label: 'Release Notes', href: '/support' },
];

export default function SupportPage() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heading =
    lang === 'fr'
      ? "Centre d'Aide"
      : lang === 'ht'
        ? 'Sant Èd'
        : 'Help Center';

  const subtitle =
    lang === 'fr'
      ? 'Trouvez rapidement les réponses à vos questions'
      : lang === 'ht'
        ? 'Jwenn repons kesyon ou yo rapidman'
        : 'Find answers fast — browse topics, search our FAQ, or reach out to our team';

  const filteredFaqs = searchQuery.trim()
    ? popularFaqs.filter(
        (f) =>
          f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.a.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : popularFaqs;

  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconAlertCircle} title={heading} description={subtitle} />

      {/* Search */}
      <div className="card mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-cyber-500/5 dark:from-brand-500/10 dark:to-cyber-500/10" />
        <div className="relative">
          <h2 className="text-lg font-bold mb-3 text-center">
            How can we <span className="gradient-text">help you</span>?
          </h2>
          <div className="relative max-w-xl mx-auto">
            <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="input pl-10"
              placeholder="Search for help articles, FAQs, or topics…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Browse by <span className="gradient-text">Topic</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="card group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${topic.bg}`}
                >
                  <topic.icon className={`h-5 w-5 ${topic.color}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold mb-1">{topic.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular FAQs */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Popular <span className="gradient-text">Questions</span>
        </h2>
        {filteredFaqs.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-slate-500 dark:text-slate-400">
              No results found for &ldquo;{searchQuery}&rdquo;. Try a different search or{' '}
              <Link href="/contact" className="text-brand-500 hover:underline">
                contact us
              </Link>{' '}
              directly.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
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
        )}
      </section>

      {/* Quick Links */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Quick <span className="gradient-text">Links</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="card !p-4 group flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="text-sm font-medium">{link.label}</span>
              <IconArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
            </Link>
          ))}
        </div>
      </section>

      {/* Still need help? */}
      <div className="card relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-cyber-500/5 dark:from-brand-500/10 dark:to-cyber-500/10" />
        <div className="relative">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 dark:bg-brand-500/20">
            <IconAlertCircle className="h-7 w-7 text-brand-500" />
          </div>
          <h3 className="text-lg font-bold mb-2">Still Need Help?</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help
            you with any questions or issues.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
