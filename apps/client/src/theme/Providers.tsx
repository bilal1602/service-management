'use client';

import React from 'react';
import { AntdRegistry } from './AntdRegistry';
import { ThemeProvider, ThemeMode } from './ThemeProvider';
import { QueryProvider, AuthProvider } from '@/providers';

interface ProvidersProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

/**
 * Providers component that wraps the application with all necessary providers.
 * This is a client component that handles:
 * - React Query for data fetching
 * - Auth state management with Supabase
 * - Ant Design SSR styling via AntdRegistry
 * - Theme management via ThemeProvider
 */
export function Providers({
  children,
  defaultTheme = 'system',
}: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AntdRegistry>
          <ThemeProvider defaultMode={defaultTheme}>{children}</ThemeProvider>
        </AntdRegistry>
      </AuthProvider>
    </QueryProvider>
  );
}
