import type { PageKey, SeoSettings } from './seo';

// Rebuilds settings from known fields only, so a save can never inject unexpected keys
// or break the site with the wrong types.
const pageKeys: PageKey[] = ['home', 'about', 'offerings', 'gallery', 'blogs', 'contact'];

const str = (value: unknown, max = 600) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const list = (value: unknown, max = 40, itemMax = 300) =>
  (Array.isArray(value) ? value : []).map(item => str(item, itemMax)).filter(Boolean).slice(0, max);
const obj = (value: unknown): Record<string, unknown> => (value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {});

export function sanitizeSeo(input: unknown): { settings: SeoSettings; errors: string[] } {
  const root = obj(input);
  const site = obj(root.site);
  const business = obj(root.business);
  const pages = obj(root.pages);
  const aeo = obj(root.aeo);
  const ai = obj(root.ai);
  const errors: string[] = [];

  const url = str(site.url, 200).replace(/\/+$/, '');
  if (!/^https:\/\/[^\s/]+\.[^\s/]+/.test(url)) errors.push('Site URL must start with https:// and be a full domain.');
  const titleTemplate = str(site.titleTemplate, 120);
  if (!titleTemplate.includes('%s')) errors.push('Title template must contain %s (where the page title goes).');
  const latitude = str(business.latitude, 20);
  const longitude = str(business.longitude, 20);
  if ((latitude || longitude) && (Number.isNaN(Number(latitude)) || Number.isNaN(Number(longitude)) || !latitude || !longitude)) errors.push('Latitude and longitude must both be numbers (or both empty).');
  const sameAs = list(business.sameAs, 20, 300);
  if (sameAs.some(link => !/^https?:\/\//.test(link))) errors.push('Social profile links must start with https://.');

  const settings: SeoSettings = {
    site: {
      name: str(site.name, 120),
      url,
      titleTemplate,
      defaultTitle: str(site.defaultTitle, 160),
      defaultDescription: str(site.defaultDescription, 320),
      keywords: list(site.keywords, 40, 80),
      ogImage: str(site.ogImage, 300),
      locale: str(site.locale, 10) || 'en_IN',
      twitterHandle: str(site.twitterHandle, 40),
      googleVerification: str(site.googleVerification, 120),
      bingVerification: str(site.bingVerification, 120),
    },
    business: {
      name: str(business.name, 120),
      type: str(business.type, 60) || 'LocalBusiness',
      description: str(business.description, 800),
      phone: str(business.phone, 40),
      email: str(business.email, 120),
      whatsapp: str(business.whatsapp, 20).replace(/\D/g, ''),
      streetAddress: str(business.streetAddress, 200),
      locality: str(business.locality, 80),
      region: str(business.region, 80),
      regionCode: str(business.regionCode, 10),
      postalCode: str(business.postalCode, 12),
      country: str(business.country, 4) || 'IN',
      latitude,
      longitude,
      areaServed: list(business.areaServed, 30, 80),
      openingHours: list(business.openingHours, 14, 60),
      priceRange: str(business.priceRange, 40),
      logo: str(business.logo, 300),
      sameAs,
    },
    pages: Object.fromEntries(pageKeys.map(key => {
      const page = obj(pages[key]);
      const title = str(page.title, 120);
      if (!title) errors.push(`The ${key} page needs a title.`);
      return [key, { title, description: str(page.description, 320), ogImage: str(page.ogImage, 300), noindex: page.noindex === true }];
    })) as SeoSettings['pages'],
    faqs: (Array.isArray(root.faqs) ? root.faqs : []).map(item => {
      const faq = obj(item);
      return { question: str(faq.question, 300), answer: str(faq.answer, 1500) };
    }).filter(faq => faq.question && faq.answer).slice(0, 40),
    aeo: { summary: str(aeo.summary, 1500), keyFacts: list(aeo.keyFacts, 20, 300) },
    ai: { allowAiCrawlers: ai.allowAiCrawlers !== false, llmsIntro: str(ai.llmsIntro, 500) },
  };

  if (!settings.site.name) errors.push('Site name is required.');
  if (!settings.business.name) errors.push('Business name is required.');
  if (!settings.business.phone) errors.push('Business phone is required.');
  return { settings, errors };
}
