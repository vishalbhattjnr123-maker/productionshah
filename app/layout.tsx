import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://shahscenes.com'),
  title: 'SHAH SCENES — Luxury Wedding & Portrait Photography',
  description:
    'SHAH SCENES is a premium wedding photography and cinematic films studio. We document weddings, fine art portraits, destination celebrations, and bridal portraits with artistry and intention.',
  keywords: [
    'luxury wedding photographer',
    'cinematic wedding films',
    'fine art couple photographer',
    'destination wedding photographer',
    'bridal portrait photography',
    'Shah Scenes',
    'wedding photography India',
    'editorial wedding photography',
  ],
  openGraph: {
    title: 'SHAH SCENES — Luxury Wedding & Portrait Photography',
    description:
      'Premium wedding photography and cinematic films. Honest moments. Artful storytelling. Timeless memories.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Shah Scenes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHAH SCENES — Luxury Wedding & Portrait Photography',
    description: 'Premium wedding photography and cinematic films. Timeless memories, captured with intention.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://shahscenes.com',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://shahscenes.com',
  name: 'Shah Scenes',
  description:
    'Luxury wedding photography and cinematic wedding films. Documentation of ceremonies, fine art portraits, destination weddings, and bridal portraits.',
  url: 'https://shahscenes.com',
  image: 'https://shahscenes.com/og-image.jpg',
  priceRange: '₹₹₹₹',
  telephone: '+91 81464 86537',
  areaServed: ['India', 'International'],
  sameAs: [
    'https://www.instagram.com/shahscenes',
    'https://www.pinterest.com/shahscenes',
    'https://www.youtube.com/@shahscenes',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Manrope:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
