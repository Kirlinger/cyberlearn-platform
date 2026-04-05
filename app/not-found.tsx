'use client';

import Link from 'next/link';
import { IconShield } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center animate-fade-in">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-cyber-500/20">
          <IconShield className="h-10 w-10 text-brand-500" />
        </div>
        <p className="text-7xl font-extrabold tracking-tight text-slate-200 dark:text-slate-800">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
        <p className="mt-2 text-slate-500">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
