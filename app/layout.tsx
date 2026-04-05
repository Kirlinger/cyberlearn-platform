import type { Metadata } from 'next';
import Providers from './providers';
import Shell from '@/components/layout/shell';
import './globals.css';

export const metadata: Metadata = {
  title: 'CyberLearn – Master Cybersecurity, One Lesson at a Time',
  description:
    'A premium learning platform for cybersecurity, Linux, networking, Python, and SQL. Hands-on labs, interactive quizzes, and expert-crafted career roadmaps.',
  keywords: [
    'cybersecurity',
    'linux',
    'networking',
    'python',
    'SQL',
    'learning platform',
    'labs',
    'career roadmaps',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
