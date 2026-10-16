import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

// Password login for /admin. Set ADMIN_PASSWORD (and ideally ADMIN_SESSION_SECRET) in the
// hosting environment; the admin stays locked when no password is configured.
export const SESSION_COOKIE = 'tenbench_admin';
const SESSION_HOURS = 8;

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);
const secret = () => process.env.ADMIN_SESSION_SECRET || `${process.env.ADMIN_PASSWORD}::tenbench-admin`;
const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url');

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare fixed-length digests so the check takes the same time whatever the input length.
  return safeEqual(sign(`pw:${password}`), sign(`pw:${expected}`));
}

export function createSessionValue() {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  return `${expires}.${sign(String(expires))}`;
}

export async function setSessionCookie() {
  (await cookies()).set(SESSION_COOKIE, createSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function clearSessionCookie() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAuthenticated() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return false;
  const [expires, signature] = value.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}
