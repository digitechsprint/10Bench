import { articles } from '../../components/blog-data';
import { spaces } from '../../components/site-content';
import { absoluteUrl as toAbsolute, fullAddress, pagePaths, type PageKey } from '../../lib/seo';
import { getSeo } from '../../lib/settings';

// llms.txt (https://llmstxt.org): a plain-text summary AI assistants can read and cite.
export const dynamic = 'force-static';

export async function GET() {
  const seo = await getSeo();
  const { site, business, aeo, faqs } = seo;
  const absoluteUrl = (path: string) => toAbsolute(seo, path);
  const lines = [
    `# ${business.name}`,
    '',
    `> ${aeo.summary}`,
    '',
    seo.ai.llmsIntro,
    '',
    '## Key facts',
    ...aeo.keyFacts.map(fact => `- ${fact}`),
    '',
    '## Contact',
    `- Address: ${fullAddress(seo)}, India`,
    `- Phone: ${business.phone}`,
    `- Email: ${business.email}`,
    `- WhatsApp: https://wa.me/${business.whatsapp.replace(/\D/g, '')}`,
    ...(business.openingHours.length ? [`- Opening hours: ${business.openingHours.join('; ')}`] : []),
    `- Areas served: ${business.areaServed.join(', ')}`,
    '',
    '## Workspaces',
    ...spaces.map(space => `- ${space.name}: ${space.text} Ideal for: ${space.ideal}.`),
    '',
    '## Frequently asked questions',
    ...faqs.flatMap(faq => [`### ${faq.question}`, faq.answer, '']),
    '## Pages',
    ...(Object.keys(pagePaths) as PageKey[]).filter(key => !seo.pages[key].noindex).map(key => `- [${seo.pages[key].title}](${absoluteUrl(pagePaths[key])}): ${seo.pages[key].description}`),
    '',
    '## Journal',
    ...articles.map(article => `- [${article.title}](${absoluteUrl(`/blogs/${article.slug}/`)}): ${article.excerpt}`),
    '',
    `Website: ${absoluteUrl('/')} · ${site.name}`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
