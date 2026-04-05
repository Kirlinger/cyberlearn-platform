'use client';

import { useLanguage } from '@/app/providers';
import { IconUsers, IconArrowRight } from '@/components/icons';
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

const team = [
  {
    name: 'Marcus Chen',
    initials: 'MC',
    title: 'CEO & Founder',
    bio: 'Former penetration tester and security architect with 15 years in the industry. Marcus founded CyberLearn to democratize access to the kind of hands-on training that shaped his career. Previously led red team operations at a Fortune 100 financial firm.',
    gradient: 'from-brand-500 to-brand-600',
  },
  {
    name: 'Dr. Amara Okafor',
    initials: 'AO',
    title: 'Head of Curriculum',
    bio: 'PhD in Computer Science with a specialization in network security. Amara spent 8 years designing cybersecurity programs at a top-tier university before joining CyberLearn. She ensures every course meets rigorous academic and industry standards, aligning with NIST and CompTIA frameworks.',
    gradient: 'from-cyber-500 to-cyber-600',
  },
  {
    name: 'Jordan Reeves',
    initials: 'JR',
    title: 'Lead Platform Engineer',
    bio: 'Full-stack engineer and DevSecOps specialist who built CyberLearn\'s sandboxed lab infrastructure from the ground up. Jordan previously worked on cloud security at a major tech company, engineering automated threat detection systems at scale.',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Sofia Martínez',
    initials: 'SM',
    title: 'Community Manager',
    bio: 'Cybersecurity advocate and certified SOC analyst who is passionate about building inclusive tech communities. Sofia manages CyberLearn\'s 10,000+ member Discord, organizes monthly CTF events, and curates mentorship programs connecting students with industry professionals.',
    gradient: 'from-amber-500 to-amber-600',
  },
];

export default function TeamPage() {
  const { lang } = useLanguage();

  const heading =
    lang === 'fr'
      ? 'Notre Équipe'
      : lang === 'ht'
        ? 'Ekip Nou'
        : 'Our Team';

  const subtitle =
    lang === 'fr'
      ? "Les personnes passionnées derrière CyberLearn"
      : lang === 'ht'
        ? 'Moun pasyone ki dèyè CyberLearn'
        : 'The passionate cybersecurity professionals building the future of security education';

  return (
    <div className="animate-fade-in">
      <PageHeader icon={IconUsers} title={heading} description={subtitle} />

      {/* Team Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {team.map((member) => (
          <div
            key={member.name}
            className="card group transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${member.gradient} shadow-lg`}
              >
                <span className="text-lg font-bold text-white">
                  {member.initials}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <span className="badge-brand">{member.title}</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {member.bio}
            </p>
          </div>
        ))}
      </div>

      {/* Join Our Team */}
      <div className="mt-8 card relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-cyber-500/5 dark:from-brand-500/10 dark:to-cyber-500/10" />
        <div className="relative">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyber-500 shadow-lg">
            <IconUsers className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-xl font-bold mb-2">
            Join Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-lg mx-auto">
            We&apos;re always looking for passionate cybersecurity professionals,
            educators, and engineers who want to make a difference. If you believe in
            accessible security education, we&apos;d love to hear from you.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in Touch
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
