import 'server-only';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import bundled from '../content/seo.json';
import type { SeoSettings } from './seo';

// Where SEO settings are saved:
// - Production: committed to GitHub (GITHUB_TOKEN etc.), which triggers a Vercel redeploy so every
//   page is rebuilt with the new metadata and structured data.
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

export function storageMode(): 'github' | 'local' | 'none' {
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

export async function readSettings(): Promise<{ settings: SeoSettings; version: string | null }> {
  const mode = storageMode();
  if (mode === 'github') {
    const response = await githubRequest(`${contentsUrl()}?ref=${encodeURIComponent(github()!.branch)}`);
    if (!response.ok) throw new Error(`GitHub read failed (${response.status}). Check GITHUB_TOKEN, GITHUB_REPO and GITHUB_SEO_PATH.`);
    const file = await response.json() as { content: string; sha: string };
    return { settings: JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')), version: file.sha };
  }
  if (mode === 'local') return { settings: JSON.parse(await readFile(localFile(), 'utf8')), version: null };
  return { settings: bundled as SeoSettings, version: null };
}

export async function saveSettings(settings: SeoSettings, version: string | null): Promise<{ message: string; version: string | null }> {
  const body = `${JSON.stringify(settings, null, 2)}\n`;
  const mode = storageMode();
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
    if (response.status === 409 || response.status === 422) throw new Error('These settings were changed somewhere else since you opened them. Reload the admin and try again.');
    if (!response.ok) throw new Error(`GitHub save failed (${response.status}). Check the token has "Contents: read and write" access.`);
    const result = await response.json() as { content: { sha: string } };
    return { message: 'Saved. The site is redeploying and changes will be live in about a minute.', version: result.content.sha };
  }
  if (mode === 'local') {
    await writeFile(localFile(), body, 'utf8');
    return { message: 'Saved to content/seo.json. Refresh the site to see the changes.', version: null };
  }
  throw new Error('Saving is not set up on this server. Add GITHUB_TOKEN in the hosting environment variables.');
}
