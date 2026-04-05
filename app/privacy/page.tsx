'use client';

import { useLanguage } from '@/app/providers';
import { IconLock, IconShield } from '@/components/icons';

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

interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

const sections: PolicySection[] = [
  {
    id: 'info-collect',
    title: '1. Information We Collect',
    content: [
      'We collect information you provide directly when creating an account, enrolling in courses, or contacting support. This includes your name, email address, password (stored in hashed form), profile information, and payment details processed securely through our third-party payment provider.',
      'As you use CyberLearn, we automatically collect learning analytics data including course progress, assessment results, lab completion times, quiz scores, and interaction patterns. This data helps us personalize your learning experience and improve our curriculum.',
      'We also collect technical data such as IP address, browser type, device information, operating system, and access timestamps. When you use our interactive cybersecurity labs, we log environment configurations and command histories for security monitoring purposes.',
    ],
  },
  {
    id: 'info-use',
    title: '2. How We Use Your Information',
    content: [
      'Your personal information is used to provide and maintain your CyberLearn account, process course enrollments and payments, deliver personalized learning recommendations, track your progress across courses and career roadmaps, and issue certificates of completion.',
      'Learning analytics data — including assessment results, lab performance metrics, and course completion rates — is used to adapt difficulty levels, recommend relevant courses, generate progress reports, and continuously improve our educational content.',
      'We may use aggregated, de-identified data for research purposes to improve cybersecurity education outcomes. This data cannot be used to identify individual users and may be shared in published research or industry reports.',
    ],
  },
  {
    id: 'data-sharing',
    title: '3. Data Sharing & Third Parties',
    content: [
      'CyberLearn does not sell your personal data to third parties. We share information only in the following limited circumstances:',
      'Service Providers: We work with trusted third-party services for payment processing (Stripe), email delivery, cloud hosting (AWS), and analytics. These providers are contractually obligated to protect your data and use it only for the services they provide to us.',
      'Legal Requirements: We may disclose your information if required by law, subpoena, or other legal process, or if we believe disclosure is necessary to protect the rights, property, or safety of CyberLearn, our users, or the public.',
      'With Your Consent: We may share your data with employer-sponsored training programs or certification bodies only with your explicit consent, such as when you choose to share a certificate or completion record.',
    ],
  },
  {
    id: 'data-security',
    title: '4. Data Security',
    content: [
      'As a cybersecurity education platform, we hold ourselves to the highest security standards. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We implement multi-layered security controls including Web Application Firewalls, intrusion detection systems, and regular penetration testing.',
      'User passwords are hashed using bcrypt with appropriate salt rounds. We support multi-factor authentication (MFA) and encourage all users to enable it. Our lab environments are fully sandboxed and isolated from production infrastructure.',
      'We conduct regular security audits, maintain an incident response plan, and follow responsible disclosure practices. If a data breach occurs, we will notify affected users within 72 hours in accordance with applicable regulations.',
    ],
  },
  {
    id: 'cookies',
    title: '5. Cookies & Tracking Technologies',
    content: [
      'CyberLearn uses essential cookies to maintain your session, remember your preferences (such as language and theme settings), and ensure the security of your account. These cookies are strictly necessary for the platform to function.',
      'We use analytics cookies to understand how users interact with our platform, which courses are most popular, and where learners encounter difficulties. You can opt out of non-essential cookies through your browser settings or our cookie preference center.',
      'We do not use third-party advertising cookies or tracking pixels. Your learning activity is never shared with advertising networks.',
    ],
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: [
      'You have the right to access, correct, or delete your personal data at any time. You can export your learning progress, assessment history, and account data from your dashboard settings in a machine-readable format.',
      'You may request account deletion by contacting support@cyberlearn.dev. Upon deletion, we will remove your personal data within 30 days, except where retention is required by law or for legitimate business purposes (such as fraud prevention).',
      'If you are located in the European Economic Area (EEA), you have additional rights under GDPR including the right to data portability, the right to restrict processing, and the right to object to automated decision-making. Contact our Data Protection Officer at privacy@cyberlearn.dev for any GDPR-related requests.',
    ],
  },
  {
    id: 'children',
    title: "7. Children's Privacy",
    content: [
      'CyberLearn is designed for users aged 16 and older. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal data, please contact us at support@cyberlearn.dev and we will promptly delete the information.',
      'For users between 16 and 18, we recommend parental guidance when participating in advanced cybersecurity lab environments that involve simulated attack scenarios.',
    ],
  },
  {
    id: 'changes',
    title: '8. Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes via email or a prominent notice on our platform at least 30 days before the changes take effect.',
      'Your continued use of CyberLearn after the effective date of any changes constitutes your acceptance of the updated policy. We encourage you to review this page periodically.',
    ],
  },
  {
    id: 'contact',
    title: '9. Contact Us',
    content: [
      'If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
      'Email: privacy@cyberlearn.dev | General Support: support@cyberlearn.dev',
      'We will respond to all privacy-related inquiries within 30 days.',
    ],
  },
];

export default function PrivacyPage() {
  const { lang } = useLanguage();

  const heading =
    lang === 'fr'
      ? 'Politique de Confidentialité'
      : lang === 'ht'
        ? 'Politik Konfidansyalite'
        : 'Privacy Policy';

  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconLock} title={heading} />

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
              This policy applies to all users of the CyberLearn platform and services.
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="card mb-6">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          At CyberLearn, we understand that privacy is a fundamental right — especially
          for those learning cybersecurity. This Privacy Policy explains how we collect,
          use, protect, and share your information when you use our platform, courses,
          labs, and related services. We are committed to being transparent about our data
          practices and giving you control over your personal information.
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
