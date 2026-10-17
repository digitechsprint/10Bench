import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteShell } from '../components/site-shell';
import { JsonLd } from '../components/json-ld';
import { buildContact } from '../components/site-content';
import { absoluteUrl, businessSchema, fullAddress, siteUrl, websiteSchema } from '../lib/seo';
import { getSeo } from '../lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSeo();
  const { site, business } = s;
  const hasGeo = Boolean(business.latitude && business.longitude);
  const image = absoluteUrl(s, site.ogImage);
  return {
    metadataBase: new URL(siteUrl(s)),
    applicationName: site.name,
    title: { default: site.defaultTitle, template: site.titleTemplate },
    description: site.defaultDescription,
    keywords: site.keywords,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    category: 'Coworking space',
    alternates: { canonical: '/' },
    formatDetection: { telephone: true, email: true, address: true },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      title: site.defaultTitle,
      description: site.defaultDescription,
      images: [{ url: image, width: 1280, height: 720, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.defaultTitle,
      description: site.defaultDescription,
      images: [image],
      ...(site.twitterHandle ? { site: site.twitterHandle, creator: site.twitterHandle } : {}),
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: {
      ...(site.googleVerification ? { google: site.googleVerification } : {}),
      ...(site.bingVerification ? { other: { 'msvalidate.01': site.bingVerification } } : {}),
    },
    // Local geo tags help regional search and AI answers place the business.
    other: {
      'geo.region': business.regionCode,
      'geo.placename': `${business.streetAddress}, ${business.locality}`,
      ...(hasGeo ? { 'geo.position': `${business.latitude};${business.longitude}`, ICBM: `${business.latitude}, ${business.longitude}` } : {}),
      'business:contact_data:street_address': business.streetAddress,
      'business:contact_data:locality': business.locality,
      'business:contact_data:region': business.region,
      'business:contact_data:country_name': 'India',
      'business:contact_data:phone_number': business.phone,
      'business:contact_data:email': business.email,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#102338',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const s = await getSeo();
  return <html lang="en-IN">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" />
      <link rel="alternate" type="text/plain" href="/llms.txt" title={`${s.site.name} for AI assistants (${fullAddress(s)})`} />
    </head>
    <body>
      <JsonLd data={[businessSchema(s), websiteSchema(s)]} />
      <SiteShell contact={buildContact(s.business)}>{children}</SiteShell>
    </body>
  </html>;
}
