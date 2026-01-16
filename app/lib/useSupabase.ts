import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { useEnv } from './useEnv';

let browserClient: SupabaseClient | null = null;

function getSupabaseBrowserClient({
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
}: {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}): SupabaseClient | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = SUPABASE_URL;
  const supabaseAnonKey = SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      'Supabase client could not be initialised. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured.'
    );
    return null;
  }

  browserClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

  return browserClient;
}

export function useSupabase() {
  const env = useEnv();
  return getSupabaseBrowserClient(env);
}
