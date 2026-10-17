import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { defaultSeo, withDefaults, type SeoSettings } from './seo';
import { supabaseConfigured, supabaseRest, TABLES } from './supabase';

export const SEO_TAG = 'seo';
export const SEO_ROW_ID = 'seo';

/**
 * Current SEO settings for rendering pages.
 * - Supabase (when configured): cached and tagged, so saving in the admin refreshes pages in seconds.
 * - Local development: content/seo.json, read fresh each time.
 * - Otherwise: content/seo.json as bundled at build time.
 */
export const getSeo = cache(async (): Promise<SeoSettings> => {
  if (supabaseConfigured()) {
    try {
      const rows = await supabaseRest<{ data: SeoSettings }[]>(`${TABLES.settings}?id=eq.${SEO_ROW_ID}&select=data`, { cache: 'force-cache', next: { tags: [SEO_TAG] } });
      if (rows?.[0]?.data) return withDefaults(rows[0].data);
    } catch (error) {
      console.error('[settings] Falling back to content/seo.json:', (error as Error).message);
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    try { return withDefaults(JSON.parse(await readFile(path.join(process.cwd(), 'content', 'seo.json'), 'utf8'))); } catch {}
  }
  return defaultSeo;
});
