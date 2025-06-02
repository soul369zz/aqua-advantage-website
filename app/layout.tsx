import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aqua Advantage - Pool & Spa Services in Burley, ID',
  description: 'Expert pool maintenance, equipment repair, and premium hot tub sales. We keep your aquatic investment crystal clear and running smoothly year-round.',
  keywords: 'pool service, spa repair, hot tub sales, pool maintenance, Burley Idaho, pool cleaning, equipment repair',
  icons: {
    icon: [
      { url: '/images/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo/favicon.ico', sizes: 'any' }
    ],
    apple: '/images/logo/apple-touch-icon.png',
    shortcut: '/images/logo/favicon.ico'
  },
  openGraph: {
    title: 'Aqua Advantage - Pool & Spa Services',
    description: 'Expert pool maintenance, equipment repair, and premium hot tub sales in Burley, ID.',
    type: 'website',
    locale: 'en_US',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/images/logo/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/images/logo/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
