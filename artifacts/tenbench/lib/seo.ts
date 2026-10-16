import type { Metadata } from 'next';
import seoData from '../content/seo.json';

// All SEO / AEO / GEO settings live in content/seo.json and are edited from /admin.
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
};

export const seo = seoData as SeoSettings;

export const pagePaths: Record<PageKey, string> = { home: '/', about: '/about/', offerings: '/offerings/', gallery: '/gallery/', blogs: '/blogs/', contact: '/contact/' };

export const siteUrl = () => seo.site.url.replace(/\/+$/, '');
export const absoluteUrl = (path: string) => /^https?:\/\//.test(path) ? path : `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
export const fullAddress = () => [seo.business.streetAddress, seo.business.locality, seo.business.region, seo.business.postalCode].filter(Boolean).join(', ');

/** Metadata for one of the main pages, built from the admin-editable settings. */
export function pageMetadata(key: PageKey): Metadata {
  const page = seo.pages[key];
  const path = pagePaths[key];
  const image = absoluteUrl(page.ogImage || seo.site.ogImage);
  return {
    title: key === 'home' ? { absolute: `${page.title} | ${seo.site.name}` } : page.title,
    description: page.description,
    alternates: { canonical: path },
    robots: page.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title: page.title, description: page.description, url: path, images: [{ url: image, width: 1280, height: 720, alt: page.title }] },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [image] },
  };
}

/* ---------- Structured data (JSON-LD) ---------- */

export function businessSchema() {
  const b = seo.business;
  const geo = b.latitude && b.longitude ? { '@type': 'GeoCoordinates', latitude: Number(b.latitude), longitude: Number(b.longitude) } : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': b.type || 'LocalBusiness',
    '@id': `${siteUrl()}/#business`,
    name: b.name,
    description: b.description,
    url: `${siteUrl()}/`,
    logo: absoluteUrl(b.logo),
    image: [absoluteUrl('/images/workspace-reception.jpeg'), absoluteUrl('/images/workspace-lounge.jpeg'), absoluteUrl('/images/workspace-meeting.jpeg')],
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
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`,
    areaServed: b.areaServed.map(name => ({ '@type': 'Place', name })),
    ...(b.openingHours.length ? { openingHours: b.openingHours } : {}),
    ...(b.priceRange ? { priceRange: b.priceRange } : {}),
    ...(b.sameAs.length ? { sameAs: b.sameAs } : {}),
    amenityFeature: ['Meeting room with presentation screen', 'Breakout lounge', 'Coffee counter', 'Reception'].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl()}/#website`,
    url: `${siteUrl()}/`,
    name: seo.site.name,
    description: seo.site.defaultDescription,
    inLanguage: seo.site.locale.replace('_', '-'),
    publisher: { '@id': `${siteUrl()}/#business` },
  };
}

export function faqSchema(faqs: Faq[] = seo.faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}

export function serviceListSchema(services: { name: string; description: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `Workspaces at ${seo.business.name}`,
    itemListElement: services.map(service => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.name, description: service.description, provider: { '@id': `${siteUrl()}/#business` }, areaServed: seo.business.locality },
    })),
  };
}
