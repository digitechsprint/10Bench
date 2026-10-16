import type { Metadata } from 'next';
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
