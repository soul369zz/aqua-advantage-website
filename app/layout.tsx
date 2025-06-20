import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StructuredData from './components/StructuredData'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://aquaadvantage.com'),
  title: 'Aqua Advantage Spas - Premium Hot Tubs & Swim Spas',
  description: 'Discover luxury hot tubs and swim spas from Aqua Advantage. Island Series, Garden Series, and innovative TidalFit technology for the ultimate relaxation experience.',
  keywords: ['hot tubs', 'swim spas', 'luxury spas', 'TidalFit', 'Island Series', 'Garden Series', 'aqua spas', 'hydrotherapy', 'relaxation', 'wellness'],
  authors: [{ name: 'Aqua Advantage Spas' }],
  creator: 'Aqua Advantage Spas',
  publisher: 'Aqua Advantage Spas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aquaadvantage.com',
    siteName: 'Aqua Advantage Spas',
    title: 'Aqua Advantage Spas - Premium Hot Tubs & Swim Spas',
    description: 'Discover luxury hot tubs and swim spas from Aqua Advantage. Island Series, Garden Series, and innovative TidalFit technology for the ultimate relaxation experience.',
    images: [
      {
        url: '/images/logo/logo-400.png',
        width: 1200,
        height: 630,
        alt: 'Aqua Advantage Spas Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqua Advantage Spas - Premium Hot Tubs & Swim Spas',
    description: 'Discover luxury hot tubs and swim spas from Aqua Advantage. Island Series, Garden Series, and innovative TidalFit technology.',
    images: ['/images/logo/logo-400.png'],
    creator: '@AquaAdvantage',
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://aquaadvantage.com',
  },
  category: 'business',
  classification: 'Spa and Pool Equipment Manufacturer',
  icons: {
    icon: [
      { url: '/images/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo/favicon.ico', sizes: 'any' }
    ],
    apple: '/images/logo/apple-touch-icon.png',
    shortcut: '/images/logo/favicon.ico'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <link rel="icon" type="image/x-icon" href="/images/logo/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/images/logo/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
