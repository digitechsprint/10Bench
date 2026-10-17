import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/seo';
import { getSeo } from '../lib/settings';

// AI search and assistant crawlers. Allowing them lets ChatGPT, Perplexity, Claude, Gemini and
// others read and cite the site (GEO); the admin can switch this off.
const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'meta-externalagent', 'Amazonbot', 'DuckAssistBot', 'cohere-ai'];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeo();
  const privatePaths = ['/admin', '/api/'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: privatePaths },
      seo.ai.allowAiCrawlers
        ? { userAgent: aiCrawlers, allow: '/', disallow: privatePaths }
        : { userAgent: aiCrawlers, disallow: '/' },
    ],
    sitemap: absoluteUrl(seo, '/sitemap.xml'),
  };
}
