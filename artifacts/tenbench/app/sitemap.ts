import type { MetadataRoute } from 'next';
import { articles } from '../components/blog-data';
import { absoluteUrl, pagePaths, type PageKey } from '../lib/seo';
import { getSeo } from '../lib/settings';

const priority: Record<PageKey, number> = { home: 1, offerings: 0.9, contact: 0.9, about: 0.7, gallery: 0.7, blogs: 0.6 };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSeo();
  const now = new Date();
  const pages = (Object.keys(pagePaths) as PageKey[])
    .filter(key => !seo.pages[key].noindex)
    .map(key => ({ url: absoluteUrl(seo, pagePaths[key]), lastModified: now, changeFrequency: 'monthly' as const, priority: priority[key] }));
  const posts = articles.map(article => ({ url: absoluteUrl(seo, `/blogs/${article.slug}/`), lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 }));
  return [...pages, ...posts];
}
