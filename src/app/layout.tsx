import type { Metadata, Viewport } from 'next';
import { Fraunces, Schibsted_Grotesk } from 'next/font/google';
import Providers from '@/components/Providers';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const display = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
});

const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-schibsted',
  display: 'swap',
});

const title = 'Fomenko — custom-coded websites for UK businesses';
const description =
  'Premium, scroll-driven websites hand-coded by Alex Fomenko. No page builders, fixed quotes, live in weeks. Landing pages from £1,500.';

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: title, template: '%s — Fomenko' },
  description,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: `${SITE_URL}/`,
    siteName: 'Fomenko',
    title,
    description,
    images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: 'Fomenko web studio' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}/og.jpg`] },
};

export const viewport: Viewport = {
  themeColor: '#12110e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
