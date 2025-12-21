'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { useAuthStore } from '@/store';

interface GuestGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Guard component for guest-only routes (login, register, etc.).
 * Redirects authenticated users to the specified path (default: /dashboard).
 */
export function GuestGuard({
  children,
  redirectTo = '/dashboard',
}: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  console.log('GuestGuard rendered');
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);
  console.log('isLoading', isLoading);
  console.log('isAuthenticated', isAuthenticated);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
