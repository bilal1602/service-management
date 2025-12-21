'use client';

import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config';

export const supabase = createClient(env.supabase.url, env.supabase.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
