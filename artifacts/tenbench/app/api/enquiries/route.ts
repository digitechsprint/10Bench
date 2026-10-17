import { insertEnquiry, parseEnquiry } from '../../../lib/enquiries';
import { supabaseConfigured } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

// Public contact-form endpoint. Best-effort per-instance rate limit: 5 enquiries per 10 minutes per IP.
const recent = new Map<string, number[]>();

export async function POST(request: Request) {
  if (!supabaseConfigured()) return Response.json({ error: 'Online enquiries aren’t switched on yet.' }, { status: 503 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter(time => now - time < 10 * 60_000);
  if (times.length >= 5) return Response.json({ error: 'You’ve sent a few enquiries already. Please try again later.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return Response.json({ error: 'Something went wrong with the form.' }, { status: 400 });
  const { row, error, spam } = parseEnquiry(body as Record<string, unknown>);
  if (spam) return Response.json({ ok: true }); // Pretend success so bots don't retry.
  if (error || !row) return Response.json({ error }, { status: 422 });

  try {
    await insertEnquiry(row);
  } catch (failure) {
    console.error('[enquiries] insert failed:', (failure as Error).message);
    return Response.json({ error: 'Sorry, your enquiry could not be sent right now.' }, { status: 502 });
  }
  recent.set(ip, [...times, now]);
  return Response.json({ ok: true });
}
