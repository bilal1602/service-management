'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { setAuthorizationHeader } from '@/lib/api';
import { useAuthStore } from '@/store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setSession, setLoading, reset } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    // ... initializeAuth stays the same ...
    // Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
        setAuthorizationHeader(session?.access_token ?? null);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setAuthorizationHeader(session?.access_token ?? null);

      switch (event) {
        case 'SIGNED_IN':
          // Uncomment when you have protected routes:
          // router.push('/dashboard');
          break;

        case 'SIGNED_OUT':
          // queryClient.clear();
          // reset();
          // router.push('/');
          break;

        case 'TOKEN_REFRESHED':
          // Already handled above
          break;

        case 'USER_UPDATED':
          // queryClient.invalidateQueries({ queryKey: ['user'] });
          break;
      }
    });

    return () => subscription.unsubscribe();
  }, [setSession, setLoading, reset, queryClient, router]);

  return <>{children}</>;
}
