import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RootLayoutClient from '@/components/layout/root-layout-client'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const GA_ID = 'G-EV4B742RBC'
const CLARITY_ID = 'wrk1ugf3t5'

export const metadata: Metadata = {
  title: 'CashFlow Guardian — Blinda tus proyectos. Cobra siempre.',
    <meta property="og:title" content="CashFlow Guardian — Cobra todo lo que trabajas" />
    <meta property="og:description" content="Si no cobras, te pagamos nosotros. Blindaje de proyectos para freelancers." />
    <meta property="og:image" content="https://cashflowguardian.com/og-image.png" />
    <meta property="og:url" content="https://cashflowguardian.com" />
  description: 'El único sistema que bloquea tu trabajo hasta que el cliente paga. Factura, recuerda y defiende tu dinero sin mover un dedo.',
  openGraph: {
    title: 'CashFlow Guardian — Blinda tus proyectos. Cobra siempre.',
    <meta property="og:title" content="CashFlow Guardian — Cobra todo lo que trabajas" />
    <meta property="og:description" content="Si no cobras, te pagamos nosotros. Blindaje de proyectos para freelancers." />
    <meta property="og:image" content="https://cashflowguardian.com/og-image.png" />
    <meta property="og:url" content="https://cashflowguardian.com" />
    description: 'El único sistema que bloquea tu trabajo hasta que el cliente paga. 14 días gratis sin tarjeta.',
    url: 'https://cashflowguardian.com',
    siteName: 'CashFlow Guardian',
    images: [{ url: 'https://cashflowguardian.com/og-image.png', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CashFlow Guardian — Blinda tus proyectos. Cobra siempre.',
    <meta property="og:title" content="CashFlow Guardian — Cobra todo lo que trabajas" />
    <meta property="og:description" content="Si no cobras, te pagamos nosotros. Blindaje de proyectos para freelancers." />
    <meta property="og:image" content="https://cashflowguardian.com/og-image.png" />
    <meta property="og:url" content="https://cashflowguardian.com" />
    description: 'El único sistema que bloquea tu trabajo hasta que el cliente paga.',
    images: ['https://cashflowguardian.com/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "name": "CashFlow Guardian", "url": "https://cashflowguardian.com", "description": "Blinda tus proyectos. Cobra siempre. Garantizado.", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "226" } }) }} />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
