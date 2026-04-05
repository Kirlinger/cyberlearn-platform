'use client';

import { useLanguage } from '@/app/providers';
import {
  IconShield,
  IconTerminal,
  IconUsers,
  IconAward,
  IconGlobe,
  IconTarget,
  IconBookOpen,
  IconTrendingUp,
  IconZap,
} from '@/components/icons';

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

const values = [
  {
    icon: IconTerminal,
    title: 'Hands-on Learning',
    description:
      'Real-world labs, capture-the-flag challenges, and interactive environments where you learn by doing — not just reading.',
    color: 'text-brand-500',
    bg: 'bg-brand-500/10 dark:bg-brand-500/20',
  },
  {
    icon: IconTarget,
    title: 'Industry-Aligned Content',
    description:
      'Curriculum mapped to NIST NICE Framework, CompTIA, and OWASP standards so your skills translate directly to the job market.',
    color: 'text-cyber-500',
    bg: 'bg-cyber-500/10 dark:bg-cyber-500/20',
  },
  {
    icon: IconUsers,
    title: 'Community-Driven',
    description:
      'Join thousands of learners, mentors, and industry professionals in a vibrant Discord community that supports your growth.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
  },
];

const stats = [
  { label: 'Active Students', value: '12,500+', icon: IconUsers },
  { label: 'Expert-Led Courses', value: '85+', icon: IconBookOpen },
  { label: 'Countries Reached', value: '60+', icon: IconGlobe },
  { label: 'Completion Rate', value: '94%', icon: IconTrendingUp },
];

export default function AboutPage() {
  const { lang } = useLanguage();

  const heading =
    lang === 'fr'
      ? 'À propos de CyberLearn'
      : lang === 'ht'
        ? 'Sou CyberLearn'
        : 'About CyberLearn';

  const subtitle =
    lang === 'fr'
      ? "Découvrez notre mission pour rendre l'éducation en cybersécurité accessible à tous"
      : lang === 'ht'
        ? 'Dekouvri misyon nou pou rann edikasyon siber-sekirite aksesib pou tout moun'
        : 'Discover our mission to make premium cybersecurity education accessible to every student';

  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconShield} title={heading} description={subtitle} />

      {/* Mission Statement */}
      <section className="card mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-cyber-500/5 dark:from-brand-500/10 dark:to-cyber-500/10" />
        <div className="relative">
          <h2 className="text-xl font-bold mb-3">
            Our <span className="gradient-text">Mission</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            CyberLearn exists to bridge the global cybersecurity skills gap by delivering
            premium, hands-on education that is accessible to every aspiring security
            professional — regardless of background, location, or budget. We believe the
            next generation of defenders should have world-class training at their
            fingertips.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          What Sets Us <span className="gradient-text">Apart</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="card group transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${v.bg}`}
              >
                <v.icon className={`h-6 w-6 ${v.color}`} />
              </div>
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 dark:bg-brand-500/20">
                <s.icon className="h-5 w-5 text-brand-500" />
              </div>
              <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 to-purple-500/5 dark:from-cyber-500/10 dark:to-purple-500/10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyber-500/10 dark:bg-cyber-500/20">
              <IconZap className="h-5 w-5 text-cyber-500" />
            </div>
            <h2 className="text-xl font-bold">Our Story</h2>
          </div>
          <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              CyberLearn was founded in 2023 by a team of cybersecurity professionals and
              educators who saw a critical disconnect: the industry needed hundreds of
              thousands of skilled defenders, yet quality training remained locked behind
              expensive certifications and inaccessible programs.
            </p>
            <p>
              We set out to build something different — a platform that combines the rigor
              of professional certification prep with the accessibility of modern
              e-learning. Every course on CyberLearn is designed by practitioners who work
              in SOCs, red teams, and security engineering roles at leading organizations.
            </p>
            <p>
              From ethical hacking and network defense to cloud security and digital
              forensics, our curriculum covers the full spectrum of cybersecurity
              disciplines. With interactive labs, real-world scenarios, and a supportive
              global community, CyberLearn is where the next generation of security
              professionals begins their journey.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <IconAward className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Trusted by learners in 60+ countries and endorsed by industry professionals
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
