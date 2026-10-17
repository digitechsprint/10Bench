import 'server-only';

// Minimal Supabase REST (PostgREST) client for server code only. The service-role key bypasses
// row-level security, so it must never reach the browser; RLS stays on with no public policies.
export const supabaseConfigured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

// The Supabase project is shared with other websites (Fovestta, Mysticz), which already have
// tables such as site_settings, so every 10Bench table is prefixed to keep the data separate.
export const TABLES = { settings: 'tenbench_settings', enquiries: 'tenbench_enquiries' } as const;

type SupabaseInit = RequestInit & { next?: { tags?: string[]; revalidate?: number | false } };

export async function supabaseRest<T = unknown>(path: string, init: SupabaseInit = {}): Promise<T> {
  const base = process.env.SUPABASE_URL!.replace(/\/+$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  // Legacy service_role keys are JWTs and go in Authorization too; new sb_secret_ keys only use apikey.
  const auth: Record<string, string> = key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {};
  const response = await fetch(`${base}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, ...auth, 'Content-Type': 'application/json', ...init.headers },
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Supabase request failed (${response.status}) ${detail.slice(0, 200)}`);
  }
  if (response.status === 204) return null as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}
