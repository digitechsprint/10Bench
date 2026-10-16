import { isAuthenticated } from '../../../../lib/admin-auth';
import { readSettings, saveSettings, storageMode } from '../../../../lib/seo-store';
import { sanitizeSeo } from '../../../../lib/seo-validate';

export const dynamic = 'force-dynamic';

const unauthorized = () => Response.json({ error: 'Please sign in again.' }, { status: 401 });

export async function GET() {
  if (!(await isAuthenticated())) return unauthorized();
  try {
    const { settings, version } = await readSettings();
    return Response.json({ settings, version, storage: storageMode() });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 502 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();
  const body = await request.json().catch(() => null) as { settings?: unknown; version?: unknown } | null;
  if (!body?.settings) return Response.json({ error: 'Nothing to save.' }, { status: 400 });
  const { settings, errors } = sanitizeSeo(body.settings);
  if (errors.length) return Response.json({ error: 'Please fix the highlighted problems.', errors }, { status: 422 });
  try {
    const result = await saveSettings(settings, typeof body.version === 'string' ? body.version : null);
    return Response.json({ ...result, settings });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 409 });
  }
}
