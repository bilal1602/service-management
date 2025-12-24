'use client';

import { ThemeToggle } from '@/components';
import { GuestGuard } from '@/components/guards';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <ThemeToggle />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md px-4">{children}</div>
      </div>
    </GuestGuard>
  );
}
