
import type { Metadata } from 'next';
import { Inter, Rajdhani } from 'next/font/google';
import './globals.css';
import ApolloWrapper from '@/lib/apollo-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TradePulse | Real-Time Trading Analytics Hub',
    template: '%s | TradePulse',
  },
  description:
    'Advanced real-time trading analytics platform with live market data, portfolio tracking, and comprehensive risk management.',
  keywords: [
    'trading analytics',
    'real-time market data',
    'portfolio management',
    'risk management',
    'financial dashboard',
    'trading platform',
  ],
  authors: [{ name: 'TradePulse' }],
  creator: 'TradePulse',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tradepulse.com',
    siteName: 'TradePulse',
    title: 'TradePulse | Real-Time Trading Analytics Hub',
    description:
      'Advanced real-time trading analytics platform with live market data, portfolio tracking, and comprehensive risk management.',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TradePulse Trading Analytics Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TradePulse | Real-Time Trading Analytics Hub',
    description:
      'Advanced real-time trading analytics platform with live market data, portfolio tracking, and comprehensive risk management.',
    images: ['/assets/twitter-image.png'],
    creator: '@tradepulse',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${rajdhani.variable} antialiased bg-primary-dark`}
        suppressHydrationWarning
      >
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}