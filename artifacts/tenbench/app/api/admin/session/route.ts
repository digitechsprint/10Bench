import { adminConfigured, checkPassword, clearSessionCookie, isAuthenticated, setSessionCookie } from '../../../../lib/admin-auth';
import { storageMode } from '../../../../lib/seo-store';

export const dynamic = 'force-dynamic';

// Best-effort brute-force protection (per server instance).
const failures = new Map<string, { count: number; until: number }>();

export async function GET() {
  return Response.json({ configured: adminConfigured(), authenticated: await isAuthenticated(), storage: storageMode() });
}

export async function POST(request: Request) {
  if (!adminConfigured()) return Response.json({ error: 'Admin is not set up. Add ADMIN_PASSWORD to the environment variables.' }, { status: 503 });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const record = failures.get(ip);
  if (record && record.until > Date.now()) return Response.json({ error: 'Too many attempts. Try again in a few minutes.' }, { status: 429 });

  const body = await request.json().catch(() => ({})) as { password?: unknown };
  const password = typeof body.password === 'string' ? body.password : '';
  if (!checkPassword(password)) {
    const count = (record?.count ?? 0) + 1;
    failures.set(ip, { count, until: count >= 5 ? Date.now() + 10 * 60_000 : 0 });
    await new Promise(resolve => setTimeout(resolve, 600));
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }
  failures.delete(ip);
  await setSessionCookie();
  return Response.json({ ok: true });
}

export async function DELETE() {
  await clearSessionCookie();
  return Response.json({ ok: true });
}
