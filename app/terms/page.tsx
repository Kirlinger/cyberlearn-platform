'use client';

import { useLanguage } from '@/app/providers';
import { IconBook, IconShield } from '@/components/icons';

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

interface TermsSection {
  id: string;
  title: string;
  content: string[];
}

const sections: TermsSection[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using CyberLearn ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform. These Terms constitute a legally binding agreement between you and CyberLearn.',
      'We reserve the right to modify these Terms at any time. Material changes will be communicated via email or platform notification at least 30 days in advance. Your continued use of the Platform after changes become effective constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id: 'registration',
    title: '2. Account Registration',
    content: [
      'To access most features of CyberLearn, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information up to date.',
      'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify CyberLearn of any unauthorized use of your account or any other security breach.',
      'You may not share your account credentials with others, create multiple accounts for the same person, or create an account on behalf of someone else without their permission. CyberLearn reserves the right to suspend or terminate accounts that violate these provisions.',
    ],
  },
  {
    id: 'acceptable-use',
    title: '3. Acceptable Use Policy',
    content: [
      'CyberLearn provides cybersecurity education in a controlled, legal, and ethical environment. You agree to use the Platform and its lab environments solely for educational purposes as intended.',
      'You may NOT: (a) use skills or techniques learned on CyberLearn to conduct unauthorized testing, hacking, or attacks against any system you do not own or have explicit permission to test; (b) attempt to compromise, disrupt, or gain unauthorized access to CyberLearn infrastructure, other users\' accounts, or lab environments beyond your assigned scope; (c) distribute malware, exploits, or attack tools outside of designated lab environments; (d) share course materials, lab content, or assessment answers with unauthorized parties.',
      'You may NOT: (e) use automated scripts, bots, or crawlers to access Platform content; (f) reverse engineer, decompile, or attempt to extract the source code of the Platform; (g) use the Platform for any commercial purpose without written authorization; (h) impersonate another user or misrepresent your identity or affiliation.',
      'Violation of this Acceptable Use Policy may result in immediate account suspension, permanent ban, and/or legal action.',
    ],
  },
  {
    id: 'intellectual-property',
    title: '4. Intellectual Property',
    content: [
      'All content on CyberLearn — including courses, lab environments, assessments, videos, text, graphics, logos, and software — is the intellectual property of CyberLearn or its content creators and is protected by copyright, trademark, and other intellectual property laws.',
      'Your enrollment grants you a limited, non-exclusive, non-transferable, revocable license to access and use course materials for your personal, non-commercial educational purposes. This license does not include the right to reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any Platform content.',
      'User-generated content (such as forum posts, project submissions, and reviews) remains your property, but you grant CyberLearn a worldwide, royalty-free license to use, display, and distribute such content in connection with Platform operations.',
    ],
  },
  {
    id: 'payments',
    title: '5. Payment Terms',
    content: [
      'Certain courses and features on CyberLearn require payment. All prices are listed in US Dollars (USD) unless otherwise stated. Prices are subject to change, but changes will not affect active enrollments.',
      'Payments are processed securely through our third-party payment provider (Stripe). CyberLearn does not store your full credit card number. By providing payment information, you represent that you are authorized to use the payment method.',
      'Subscription plans are billed on a recurring basis (monthly or annually) as selected at the time of purchase. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period. No partial refunds are provided for unused portions of a billing period.',
    ],
  },
  {
    id: 'refunds',
    title: '6. Refund Policy',
    content: [
      'CyberLearn offers a tiered refund policy for individual course purchases: 100% refund within 7 days of purchase, 50% refund within 8–14 days, and no refund after 14 days. Refunds are subject to the condition that less than 30% of course content has been accessed.',
      'Subscription refunds follow the same 7-day full refund window from the initial purchase or renewal date. Please refer to our detailed Refund Policy page for complete terms, exceptions, and the refund request process.',
    ],
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    content: [
      'CyberLearn provides educational content and lab environments "as is" and "as available." We make no warranties, express or implied, regarding the accuracy, completeness, reliability, or suitability of the content for any particular purpose, including preparation for specific certifications or employment.',
      'To the maximum extent permitted by law, CyberLearn shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, revenue, profits, or business opportunities, arising from your use of or inability to use the Platform.',
      'CyberLearn\'s total aggregate liability for any claims arising from these Terms or your use of the Platform shall not exceed the amount you paid to CyberLearn in the twelve (12) months preceding the claim.',
      'CyberLearn is not responsible for any consequences arising from the misuse of cybersecurity skills or knowledge gained through the Platform. You are solely responsible for ensuring that your application of learned techniques complies with all applicable laws.',
    ],
  },
  {
    id: 'termination',
    title: '8. Termination',
    content: [
      'You may terminate your account at any time by contacting support@cyberlearn.dev or through your account settings. Upon termination, your access to paid courses and lab environments will cease immediately.',
      'CyberLearn reserves the right to suspend or terminate your account, without prior notice, if you violate these Terms, engage in fraudulent activity, or pose a security risk to the Platform or other users. In cases of termination for cause, no refund will be provided.',
      'Upon termination, we will retain your data as described in our Privacy Policy. You may request data export before terminating your account.',
    ],
  },
  {
    id: 'governing-law',
    title: '9. Governing Law & Dispute Resolution',
    content: [
      'These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.',
      'Any disputes arising from these Terms or your use of the Platform shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.',
      'You agree that any dispute resolution proceedings will be conducted on an individual basis and not as part of a class, consolidated, or representative action.',
    ],
  },
  {
    id: 'contact',
    title: '10. Contact Information',
    content: [
      'If you have any questions about these Terms of Service, please contact us:',
      'Email: legal@cyberlearn.dev | General Support: support@cyberlearn.dev',
      'We will respond to all inquiries within 30 business days.',
    ],
  },
];

export default function TermsPage() {
  const { lang } = useLanguage();

  const heading =
    lang === 'fr'
      ? "Conditions d'Utilisation"
      : lang === 'ht'
        ? 'Kondisyon Sèvis'
        : 'Terms of Service';

  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconBook} title={heading} />

      {/* Effective Date Banner */}
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
              Please read these terms carefully before using CyberLearn.
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="card mb-6">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Welcome to CyberLearn. These Terms of Service govern your access to and use of
          our cybersecurity education platform, including all courses, lab environments,
          assessments, community features, and related services. By creating an account or
          using any part of the Platform, you agree to comply with these Terms.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="card">
            <h2 className="text-lg font-bold mb-3">{section.title}</h2>
            <div className="space-y-3">
              {section.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
