'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/providers';
import { IconGlobe, IconZap, IconUsers, IconCheck } from '@/components/icons';

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

const contactInfo = [
  {
    icon: IconGlobe,
    title: 'Email Us',
    detail: 'support@cyberlearn.dev',
    sub: 'For all general inquiries and support requests',
    color: 'text-brand-500',
    bg: 'bg-brand-500/10 dark:bg-brand-500/20',
  },
  {
    icon: IconZap,
    title: 'Response Time',
    detail: 'Under 24 hours',
    sub: 'We aim to respond to every message within one business day',
    color: 'text-cyber-500',
    bg: 'bg-cyber-500/10 dark:bg-cyber-500/20',
  },
  {
    icon: IconUsers,
    title: 'Community',
    detail: 'discord.gg/cyberlearn',
    sub: 'Join our Discord for real-time help and community discussions',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
  },
];

const subjects = [
  'General Inquiry',
  'Technical Support',
  'Billing & Payments',
  'Course Content Feedback',
  'Partnership Opportunity',
  'Bug Report',
  'Feature Request',
];

export default function ContactPage() {
  const { lang } = useLanguage();

  const heading =
    lang === 'fr'
      ? 'Contactez-nous'
      : lang === 'ht'
        ? 'Kontakte Nou'
        : 'Contact Us';

  const subtitle =
    lang === 'fr'
      ? 'Nous sommes là pour vous aider. Envoyez-nous un message.'
      : lang === 'ht'
        ? 'Nou la pou ede w. Voye yon mesaj ban nou.'
        : "Have a question or need help? We'd love to hear from you.";

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address';
    if (!form.subject) errs.subject = 'Please select a subject';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10)
      errs.message = 'Message must be at least 10 characters';
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconGlobe} title={heading} description={subtitle} />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="card">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyber-500/10 dark:bg-cyber-500/20">
                  <IconCheck className="h-8 w-8 text-cyber-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  Thank you for reaching out. Our team will get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="btn-secondary mt-6"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-lg font-bold mb-1">Send us a message</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Fill out the form below and we&apos;ll get back to you as soon as
                  possible.
                </p>

                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className={`input ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className={`input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Subject</label>
                  <select
                    className={`input ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    value={form.subject}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subject: e.target.value }))
                    }
                  >
                    <option value="">Select a subject…</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Message</label>
                  <textarea
                    rows={5}
                    className={`input resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    placeholder="Describe your question or issue in detail…"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-4">
          {contactInfo.map((c) => (
            <div
              key={c.title}
              className="card group transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg}`}
                >
                  <c.icon className={`h-5 w-5 ${c.color}`} />
                </div>
                <div>
                  <h3 className="font-bold">{c.title}</h3>
                  <p className="text-sm font-semibold text-brand-500 dark:text-brand-400">
                    {c.detail}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {c.sub}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Extra CTA */}
          <div className="card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-cyber-500/5 dark:from-brand-500/10 dark:to-cyber-500/10" />
            <div className="relative">
              <h3 className="font-bold mb-2">Enterprise &amp; Partnerships</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Looking to train your team or integrate CyberLearn into your
                organization? Reach out at{' '}
                <span className="font-semibold text-brand-500">
                  partnerships@cyberlearn.dev
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
