import { isAuthenticated } from '../../../../lib/admin-auth';
import { deleteEnquiry, listEnquiries, updateEnquiry } from '../../../../lib/enquiries';
import { supabaseConfigured } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

const guard = async () => {
  if (!(await isAuthenticated())) return Response.json({ error: 'Please sign in again.' }, { status: 401 });
  if (!supabaseConfigured()) return Response.json({ error: 'Supabase is not connected.', configured: false }, { status: 503 });
  return null;
};

const fail = (error: unknown) => Response.json({ error: (error as Error).message }, { status: 502 });

export async function GET(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;
  try {
    return Response.json({ enquiries: await listEnquiries(new URL(request.url).searchParams.get('status') ?? undefined) });
  } catch (error) { return fail(error); }
}

export async function PATCH(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;
  const body = await request.json().catch(() => ({})) as { id?: string; status?: unknown; notes?: unknown };
  try {
    const [enquiry] = await updateEnquiry(String(body.id ?? ''), body);
    return Response.json({ enquiry });
  } catch (error) { return fail(error); }
}

export async function DELETE(request: Request) {
  const blocked = await guard();
  if (blocked) return blocked;
  try {
    await deleteEnquiry(new URL(request.url).searchParams.get('id') ?? '');
    return Response.json({ ok: true });
  } catch (error) { return fail(error); }
}
