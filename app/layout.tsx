import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agsstonefabricators.com"),
  title: {
    default: "Quartz & Granite Countertops in Atlanta, GA | AGS Stones",
    template: "%s | AGS Stones",
  },
  description: "Get factory-direct kitchen countertops and premium cabinetry. AGS Stones is the top custom fabricator in Duluth, GA. Serving Atlanta, Alpharetta, Roswell, and Johns Creek.",
  keywords: ["granite countertops near me", "granite fabricators near me", "quartz countertops near me", "stone suppliers atlanta", "duluth granite company", "ags stones", "kitchen remodeling", "bathroom vanities"],
  authors: [{ name: "AGS Stones & Cabinets" }],
  creator: "AGS Stones & Cabinets",
  publisher: "AGS Stones & Cabinets",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.agsstonefabricators.com",
    title: "AGS Stones & Cabinets | Local Granite Countertops Near You",
    description: "Stop searching. You found the best granite countertops near you. Buy direct from our Duluth factory and save.",
    siteName: "AGS Stones & Cabinets",
    images: [
      {
        url: "https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "AGS Stones Kitchen Countertops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGS Stones & Cabinets | Local Granite Countertops Near You",
    description: "Stop searching. You found the best granite countertops near you. Buy direct from our Duluth factory and save.",
    images: ["https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.agsstonefabricators.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="https://i.imgur.com/B0ZaBpN.png" />
        <link rel="apple-touch-icon" href="https://i.imgur.com/B0ZaBpN.png" />
        <link rel="preload" as="image" href="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg" fetchPriority="high" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "AGS Stones",
              "legalName": "AGS Stones and Cabinets",
              "image": "https://www.agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png",
              "logo": "https://i.imgur.com/B0ZaBpN.png",
              "@id": "https://www.agsstonefabricators.com",
              "url": "https://www.agsstonefabricators.com",
              "telephone": "+14049524534",
              "priceRange": "$$",
              "hasMap": "https://maps.google.com/?q=AGS+STONES+%26+CABINETS,+4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097,+United+States",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4579 Abbotts Bridge Rd Suite -10",
                "addressLocality": "Duluth",
                "addressRegion": "GA",
                "postalCode": "30097",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 34.0322319,
                "longitude": -84.1795749
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "128"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday"],
                  "opens": "09:00",
                  "closes": "15:00"
                }
              ],
              "areaServed": [
                { "@type": "City", "name": "Atlanta", "sameAs": "https://en.wikipedia.org/wiki/Atlanta" },
                { "@type": "City", "name": "Duluth", "sameAs": "https://en.wikipedia.org/wiki/Duluth,_Georgia" },
                { "@type": "City", "name": "Alpharetta", "sameAs": "https://en.wikipedia.org/wiki/Alpharetta,_Georgia" },
                { "@type": "City", "name": "Marietta", "sameAs": "https://en.wikipedia.org/wiki/Marietta,_Georgia" },
                { "@type": "City", "name": "Sandy Springs", "sameAs": "https://en.wikipedia.org/wiki/Sandy_Springs,_Georgia" },
                { "@type": "City", "name": "Roswell", "sameAs": "https://en.wikipedia.org/wiki/Roswell,_Georgia" },
                { "@type": "City", "name": "Johns Creek", "sameAs": "https://en.wikipedia.org/wiki/Johns_Creek,_Georgia" },
                { "@type": "City", "name": "Lawrenceville", "sameAs": "https://en.wikipedia.org/wiki/Lawrenceville,_Georgia" },
                { "@type": "City", "name": "Suwanee", "sameAs": "https://en.wikipedia.org/wiki/Suwanee,_Georgia" },
                { "@type": "City", "name": "Brookhaven", "sameAs": "https://en.wikipedia.org/wiki/Brookhaven,_Georgia" }
              ],
              "sameAs": [
                "https://www.facebook.com/agsstones",
                "https://www.instagram.com/agsstones",
                "https://twitter.com/agsstones"
              ]
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-800 antialiased overflow-x-hidden selection:bg-secondary selection:text-white font-sans" suppressHydrationWarning>
        {/* Google Tag Manager (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16885125181"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16885125181');
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1660874861583892');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1660874861583892&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <Script id="conversion-tracking" strategy="lazyOnload">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-',
                  'event_callback': callback
              });
              return false;
            }

            document.addEventListener('DOMContentLoaded', function() {
              document.body.addEventListener('click', function(e) {
                var target = e.target.closest('a[href^="tel:"]');
                if (target) {
                  e.preventDefault();
                  gtag_report_conversion(target.href);
                }
              });
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
