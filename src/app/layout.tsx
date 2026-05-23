import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RootLayoutClient from '@/components/layout/root-layout-client'
import CookieBanner from '@/components/layout/cookie-banner'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const GA_ID = 'G-EV4B742RBC'
const CLARITY_ID = 'wrk1ugf3t5'

export const metadata: Metadata = {
  title: 'CFG — Cobra todo lo que trabajas',
  description: 'Si no cobras, te pagamos nosotros. Blindaje de proyectos para freelancers.',
  openGraph: {
    title: 'CFG — Cobra todo lo que trabajas',
    description: 'Si no cobras, te pagamos nosotros. Blindaje de proyectos para freelancers.',
    url: 'https://cashflowguardian.com',
    siteName: 'CFG',
    images: [{ url: 'https://cashflowguardian.com/og-image.png', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CFG — Cobra todo lo que trabajas',
    description: 'Si no cobras, te pagamos nosotros.',
    images: ['https://cashflowguardian.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://cashflowguardian.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <link rel="preconnect" href="https://cdn.cashflowguardian.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "name": "CFG", "url": "https://cashflowguardian.com", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "226" } }) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "¿Cuánto tarda en funcionar desde que me registro?", "acceptedAnswer": { "@type": "Answer", "text": "3 minutos. Creas tu cuenta, creas un proyecto con hitos, y ya está blindado." } } ] }) }} />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
        <CookieBanner />
      </body>
    </html>
  )
}
