import 'server-only';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath, revalidateTag } from 'next/cache';
import { defaultSeo, withDefaults, type SeoSettings } from './seo';
import { SEO_ROW_ID, SEO_TAG } from './settings';
import { supabaseConfigured, supabaseRest, TABLES } from './supabase';

// Where the admin saves SEO settings, in order of preference:
// - Supabase: stored in the tenbench_settings table; pages refresh within seconds, no rebuild.
// - GitHub: committed to the repo, which triggers a Vercel rebuild (about a minute).
// - Local development: written straight to content/seo.json.
const github = () => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  return {
    token,
    repo: process.env.GITHUB_REPO || 'digitechsprint/10Bench',
    branch: process.env.GITHUB_BRANCH || 'main',
    file: process.env.GITHUB_SEO_PATH || 'artifacts/tenbench/content/seo.json',
  };
};

const localFile = () => path.join(process.cwd(), 'content', 'seo.json');
const isDev = process.env.NODE_ENV !== 'production';

export type StorageMode = 'supabase' | 'github' | 'local' | 'none';

export function storageMode(): StorageMode {
  if (supabaseConfigured()) return 'supabase';
  if (github()) return 'github';
  return isDev ? 'local' : 'none';
}

async function githubRequest(url: string, init: RequestInit = {}) {
  const config = github()!;
  return fetch(url, {
    ...init,
    cache: 'no-store',
    headers: { Authorization: `Bearer ${config.token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...init.headers },
  });
}

const contentsUrl = () => {
  const config = github()!;
  return `https://api.github.com/repos/${config.repo}/contents/${config.file}`;
};

type SettingsRow = { data: SeoSettings; updated_at: string };

export async function readSettings(): Promise<{ settings: SeoSettings; version: string | null }> {
  const mode = storageMode();
  if (mode === 'supabase') {
    const rows = await supabaseRest<SettingsRow[]>(`${TABLES.settings}?id=eq.${SEO_ROW_ID}&select=data,updated_at`, { cache: 'no-store' });
    // Nothing saved yet: start from content/seo.json; the first save creates the row.
    return rows[0] ? { settings: withDefaults(rows[0].data), version: rows[0].updated_at } : { settings: defaultSeo, version: null };
  }
  if (mode === 'github') {
    const response = await githubRequest(`${contentsUrl()}?ref=${encodeURIComponent(github()!.branch)}`);
    if (!response.ok) throw new Error(`GitHub read failed (${response.status}). Check GITHUB_TOKEN, GITHUB_REPO and GITHUB_SEO_PATH.`);
    const file = await response.json() as { content: string; sha: string };
    return { settings: withDefaults(JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'))), version: file.sha };
  }
  if (mode === 'local') return { settings: withDefaults(JSON.parse(await readFile(localFile(), 'utf8'))), version: null };
  return { settings: defaultSeo, version: null };
}

const conflict = () => new Error('These settings were changed somewhere else since you opened them. Reload the admin and try again.');

/** Refresh every page, the sitemap, robots.txt and llms.txt after settings change. */
function refreshSite() {
  revalidateTag(SEO_TAG, { expire: 0 });
  revalidatePath('/', 'layout');
  for (const file of ['/sitemap.xml', '/robots.txt', '/llms.txt']) revalidatePath(file);
}

export async function saveSettings(settings: SeoSettings, version: string | null): Promise<{ message: string; version: string | null }> {
  const mode = storageMode();
  if (mode === 'supabase') {
    const now = new Date().toISOString();
    let rows: SettingsRow[];
    if (version) {
      // Only update if nobody else saved since this copy was loaded.
      rows = await supabaseRest<SettingsRow[]>(`${TABLES.settings}?id=eq.${SEO_ROW_ID}&updated_at=eq.${encodeURIComponent(version)}&select=data,updated_at`, {
        method: 'PATCH', cache: 'no-store', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ data: settings, updated_at: now }),
      });
      if (!rows.length) throw conflict();
    } else {
      try {
        rows = await supabaseRest<SettingsRow[]>(`${TABLES.settings}?select=data,updated_at`, {
          method: 'POST', cache: 'no-store', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ id: SEO_ROW_ID, data: settings, updated_at: now }),
        });
      } catch (error) {
        if (/\(409\)/.test((error as Error).message)) throw conflict();
        throw error;
      }
    }
    refreshSite();
    return { message: 'Saved. The website updates within a few seconds.', version: rows[0]?.updated_at ?? now };
  }
  const body = `${JSON.stringify(settings, null, 2)}\n`;
  if (mode === 'github') {
    const config = github()!;
    const response = await githubRequest(contentsUrl(), {
      method: 'PUT',
      body: JSON.stringify({
        message: 'Update SEO settings from admin',
        content: Buffer.from(body, 'utf8').toString('base64'),
        branch: config.branch,
        ...(version ? { sha: version } : {}),
      }),
    });
    if (response.status === 409 || response.status === 422) throw conflict();
    if (!response.ok) throw new Error(`GitHub save failed (${response.status}). Check the token has "Contents: read and write" access.`);
    const result = await response.json() as { content: { sha: string } };
    return { message: 'Saved. The site is redeploying and changes will be live in about a minute.', version: result.content.sha };
  }
  if (mode === 'local') {
    await writeFile(localFile(), body, 'utf8');
    refreshSite();
    return { message: 'Saved to content/seo.json. Refresh the site to see the changes.', version: null };
  }
  throw new Error('Saving is not set up on this server. Add the Supabase (or GitHub) environment variables and redeploy.');
}
