import type { Roadmap, Lab, Resources, Career } from '@/types';

export const roadmaps: Roadmap[] = [
  {
    id: 'roadmap-soc',
    title: 'Roadmap: SOC Analyst (12 months)',
    level: 'Beginner to Junior',
    milestones: ['Months 1-2: Linux, Networking, SIEM basics', 'Months 3-5: Detection engineering and log analysis', 'Months 6-9: Incident response and threat hunting', 'Months 10-12: Portfolio + certification prep'],
  },
  {
    id: 'roadmap-cloud-security',
    title: 'Roadmap: Cloud Security Engineer',
    level: 'Intermediate',
    milestones: ['Cloud fundamentals (IAM, VPC, logging)', 'Infrastructure as Code security', 'Container and workload security', 'Governance, compliance, and architecture reviews'],
  },
  {
    id: 'roadmap-fullstack-secure',
    title: 'Roadmap: Secure Full-Stack Developer',
    level: 'Beginner to Intermediate',
    milestones: ['Programming + web fundamentals', 'Authentication and session security', 'Secure coding and OWASP Top 10', 'CI/CD security and monitoring'],
  },
];

export const labs: Lab[] = [
  {
    id: 'lab-phishing-triage',
    title: 'Lab: Phishing Email Triage',
    objective: 'Analyze a suspicious email and decide containment actions.',
    steps: ['Review sender and headers', 'Inspect URLs/domains', 'Extract indicators', 'Document recommendation'],
  },
  {
    id: 'lab-linux-hardening',
    title: 'Lab: Linux Baseline Hardening',
    objective: 'Apply baseline controls to a Linux server.',
    steps: ['Create non-root admin user', 'Disable password SSH auth', 'Configure firewall', 'Validate audit logs'],
  },
  {
    id: 'lab-sql-investigation',
    title: 'Lab: SQL Incident Investigation',
    objective: 'Use SQL to identify anomalous authentication patterns.',
    steps: ['Filter failed logins', 'Join with user metadata', 'Find impossible travel patterns', 'Write incident summary'],
  },
];

export const glossary: [string, string][] = [
  ['SIEM', 'Security Information and Event Management platform for centralized logging and detection.'],
  ['EDR', 'Endpoint Detection and Response tool for endpoint telemetry and containment.'],
  ['CVE', 'Common Vulnerabilities and Exposures identifier for publicly known vulnerabilities.'],
  ['MFA', 'Multi-Factor Authentication requiring multiple proofs of identity.'],
  ['CIDR', 'Classless Inter-Domain Routing notation for IP subnet sizing.'],
];

export const resources: Resources = {
  platforms: ['OWASP Top 10', 'MITRE ATT&CK', 'NIST CSF 2.0', 'TryHackMe', 'Hack The Box'],
  books: ['The Web Application Hacker\u2019s Handbook', 'Blue Team Handbook', 'Practical Malware Analysis'],
  tools: ['Wireshark', 'nmap', 'Burp Suite Community', 'VS Code', 'GitHub'],
};

export const career: Career = {
  intro: 'Build evidence-based skills through labs, projects, and portfolio storytelling.',
  roles: ['SOC Analyst', 'Security Engineer', 'Cloud Security Engineer', 'Threat Hunter', 'Security-Focused Developer'],
  portfolioChecklist: ['Document 3 incident investigations', 'Publish 2 automation scripts', 'Create one security architecture case study'],
};
