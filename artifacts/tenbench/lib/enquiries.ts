import 'server-only';
import { supabaseRest, TABLES } from './supabase';

const table = TABLES.enquiries;

export type EnquiryStatus = 'new' | 'contacted' | 'closed';
export type Enquiry = {
  id: string; created_at: string; name: string; email: string; phone: string | null;
  interest: string | null; message: string; page: string | null; status: EnquiryStatus; notes: string | null;
};

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '');
const cleanMessage = (value: unknown) => (typeof value === 'string' ? value.trim().slice(0, 3000) : '');
const statuses: EnquiryStatus[] = ['new', 'contacted', 'closed'];

/** Validates a public form submission. Returns the row to insert, or an error message for the visitor. */
export function parseEnquiry(input: Record<string, unknown>): { row?: Omit<Enquiry, 'id' | 'created_at' | 'status' | 'notes'>; error?: string; spam?: boolean } {
  if (clean(input.company, 200)) return { spam: true };
  const name = clean(input.name, 120);
  const email = clean(input.email, 160).toLowerCase();
  const phone = clean(input.phone, 30);
  const message = cleanMessage(input.message);
  if (!name) return { error: 'Please add your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: 'Please check your email address.' };
  if (phone && !/^[+\d][\d\s()-]{5,}$/.test(phone)) return { error: 'Please check your phone number.' };
  if (message.length < 2) return { error: 'Please add a short message.' };
  return { row: { name, email, phone: phone || null, interest: clean(input.interest, 80) || null, message, page: clean(input.page, 200) || null } };
}

export const insertEnquiry = (row: NonNullable<ReturnType<typeof parseEnquiry>['row']>) =>
  supabaseRest(table, { method: 'POST', cache: 'no-store', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(row) });

export async function listEnquiries(status?: string) {
  const filter = status && statuses.includes(status as EnquiryStatus) ? `&status=eq.${status}` : '';
  return supabaseRest<Enquiry[]>(`${table}?select=*&order=created_at.desc&limit=500${filter}`, { cache: 'no-store' });
}

export async function updateEnquiry(id: string, changes: { status?: unknown; notes?: unknown }) {
  const patch: Partial<Enquiry> = {};
  if (statuses.includes(changes.status as EnquiryStatus)) patch.status = changes.status as EnquiryStatus;
  if (typeof changes.notes === 'string') patch.notes = changes.notes.slice(0, 2000);
  if (!Object.keys(patch).length || !/^[0-9a-f-]{36}$/i.test(id)) throw new Error('Nothing to update.');
  return supabaseRest<Enquiry[]>(`${table}?id=eq.${id}&select=*`, { method: 'PATCH', cache: 'no-store', headers: { Prefer: 'return=representation' }, body: JSON.stringify(patch) });
}

export async function deleteEnquiry(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error('Invalid enquiry.');
  return supabaseRest(`${table}?id=eq.${id}`, { method: 'DELETE', cache: 'no-store' });
}
