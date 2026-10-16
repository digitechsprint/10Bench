import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteShell } from '../components/site-shell';

export const metadata: Metadata = {
  applicationName: '10Bench Coworking Spaces',
  title: { default: '10Bench Coworking Spaces | Room to do your best work', template: '%s | 10Bench Coworking Spaces' },
  description: 'A welcoming coworking environment for independent professionals and growing teams. Find focus, meet well, and make room for good work at 10Bench.',
  openGraph: {
    title: '10Bench Coworking Spaces',
    description: 'A welcoming coworking environment for independent professionals and growing teams.',
    siteName: '10Bench Coworking Spaces',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '10Bench Coworking Spaces',
    description: 'A welcoming coworking environment for independent professionals and growing teams.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#102338',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap" />
    </head>
    <body><SiteShell>{children}</SiteShell></body>
  </html>;
}
