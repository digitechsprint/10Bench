import type { Metadata } from 'next';
import seoData from '../content/seo.json';

// SEO / AEO / GEO settings. Read them on the server with getSeo() from lib/settings.ts;
// content/seo.json is the default used when nothing has been saved in Supabase yet.
export type PageKey = 'home' | 'about' | 'offerings' | 'gallery' | 'blogs' | 'contact';
export type PageSeo = { title: string; description: string; ogImage: string; noindex: boolean };
export type Faq = { question: string; answer: string };
export type SeoSettings = {
  site: {
    name: string; url: string; titleTemplate: string; defaultTitle: string; defaultDescription: string;
    keywords: string[]; ogImage: string; locale: string; twitterHandle: string; googleVerification: string; bingVerification: string;
  };
  business: {
    name: string; type: string; description: string; phone: string; email: string; whatsapp: string;
    streetAddress: string; locality: string; region: string; regionCode: string; postalCode: string; country: string;
    latitude: string; longitude: string; areaServed: string[]; openingHours: string[]; priceRange: string; logo: string; sameAs: string[];
  };
  pages: Record<PageKey, PageSeo>;
  faqs: Faq[];
  aeo: { summary: string; keyFacts: string[] };
  ai: { allowAiCrawlers: boolean; llmsIntro: string };
  pricing: { note: string; plans: PricePlan[] };
};

/** One price card. `price` is in rupees; `plusGst` shows "+ GST" after it. */
export type PricePlan = {
  id: string; name: string; price: number; unit: string; plusGst: boolean;
  description: string; detail: string; features: string[]; badge: string;
};

export const formatRupees = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

export const defaultSeo = seoData as SeoSettings;

/** Fills any missing fields from the defaults, so older saved settings never break the site. */
export function withDefaults(saved: Partial<SeoSettings> | null | undefined): SeoSettings {
  const d = defaultSeo;
  if (!saved) return d;
  return {
    site: { ...d.site, ...saved.site },
    business: { ...d.business, ...saved.business },
    pages: Object.fromEntries((Object.keys(d.pages) as PageKey[]).map(key => [key, { ...d.pages[key], ...saved.pages?.[key] }])) as SeoSettings['pages'],
    faqs: Array.isArray(saved.faqs) ? saved.faqs : d.faqs,
    aeo: { ...d.aeo, ...saved.aeo },
    ai: { ...d.ai, ...saved.ai },
    pricing: { ...d.pricing, ...saved.pricing, plans: Array.isArray(saved.pricing?.plans) ? saved.pricing.plans : d.pricing.plans },
  };
}

export const pagePaths: Record<PageKey, string> = { home: '/', about: '/about/', offerings: '/offerings/', gallery: '/gallery/', blogs: '/blogs/', contact: '/contact/' };

export const siteUrl = (s: SeoSettings) => s.site.url.replace(/\/+$/, '');
export const absoluteUrl = (s: SeoSettings, path: string) => /^https?:\/\//.test(path) ? path : `${siteUrl(s)}${path.startsWith('/') ? path : `/${path}`}`;
export const fullAddress = (s: SeoSettings) => [s.business.streetAddress, s.business.locality, s.business.region, s.business.postalCode].filter(Boolean).join(', ');

/** Metadata for one of the main pages, built from the admin-editable settings. */
export function pageMetadata(s: SeoSettings, key: PageKey): Metadata {
  const page = s.pages[key];
  const path = pagePaths[key];
  const image = absoluteUrl(s, page.ogImage || s.site.ogImage);
  return {
    title: key === 'home' ? { absolute: `${page.title} | ${s.site.name}` } : page.title,
    description: page.description,
    alternates: { canonical: path },
    robots: page.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title: page.title, description: page.description, url: path, images: [{ url: image, width: 1280, height: 720, alt: page.title }] },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [image] },
  };
}

/* ---------- Structured data (JSON-LD) ---------- */

export function businessSchema(s: SeoSettings) {
  const b = s.business;
  const geo = b.latitude && b.longitude ? { '@type': 'GeoCoordinates', latitude: Number(b.latitude), longitude: Number(b.longitude) } : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': b.type || 'LocalBusiness',
    '@id': `${siteUrl(s)}/#business`,
    name: b.name,
    description: b.description,
    url: `${siteUrl(s)}/`,
    logo: absoluteUrl(s, b.logo),
    image: ['/images/workspace-reception.jpeg', '/images/workspace-lounge.jpeg', '/images/workspace-meeting.jpeg'].map(path => absoluteUrl(s, path)),
    telephone: b.phone,
    email: b.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.streetAddress,
      addressLocality: b.locality,
      addressRegion: b.region,
      ...(b.postalCode ? { postalCode: b.postalCode } : {}),
      addressCountry: b.country,
    },
    ...(geo ? { geo } : {}),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(s))}`,
    areaServed: b.areaServed.map(name => ({ '@type': 'Place', name })),
    ...(b.openingHours.length ? { openingHours: b.openingHours } : {}),
    ...(b.priceRange ? { priceRange: b.priceRange } : {}),
    ...(b.sameAs.length ? { sameAs: b.sameAs } : {}),
    amenityFeature: ['Meeting room with presentation screen', 'Breakout lounge', 'Coffee counter', 'Reception'].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  };
}

export function websiteSchema(s: SeoSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl(s)}/#website`,
    url: `${siteUrl(s)}/`,
    name: s.site.name,
    description: s.site.defaultDescription,
    inLanguage: s.site.locale.replace('_', '-'),
    publisher: { '@id': `${siteUrl(s)}/#business` },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
}

export function breadcrumbSchema(s: SeoSettings, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(s, item.path) })),
  };
}

/** Price list as structured data, so search and AI answers can quote real prices. */
export function pricingSchema(s: SeoSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `Coworking prices at ${s.business.name}`,
    itemListElement: s.pricing.plans.map(plan => ({
      '@type': 'Offer',
      name: plan.name,
      description: plan.description,
      price: plan.price,
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.price,
        priceCurrency: 'INR',
        unitText: plan.unit,
        billingDuration: 'P1M',
        valueAddedTaxIncluded: !plan.plusGst,
      },
      seller: { '@id': `${siteUrl(s)}/#business` },
      areaServed: s.business.locality,
    })),
  };
}

export function serviceListSchema(s: SeoSettings, services: { name: string; description: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `Workspaces at ${s.business.name}`,
    itemListElement: services.map(service => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.name, description: service.description, provider: { '@id': `${siteUrl(s)}/#business` }, areaServed: s.business.locality },
    })),
  };
}
