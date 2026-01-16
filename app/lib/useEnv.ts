import { useMatches } from 'react-router';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

export async function loader() {
  const env: Env = {
    SUPABASE_URL: process.env.SUPABASE_URL ?? '',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? '',
  };

  return {
    env,
  };
}

export function useEnv() {
  const matches = useMatches();
  const root = matches[0]; // root route match
  return (root?.data as any)?.env as Env;
}
