import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Granite Countertops Near Me | Atlanta & Duluth's #1 Local Fabricator | AGS Stones",
  description: "Looking for granite countertops near you? AGS Stones is your local factory-direct fabricator in Duluth, GA. Serving Atlanta, Alpharetta, and Roswell. Save 30% today.",
  keywords: "granite countertops near me, granite fabricators near me, quartz countertops near me, stone suppliers atlanta, duluth granite company, ags stones",
  authors: [{ name: "AGS Stones & Cabinets" }],
  openGraph: {
    type: "website",
    url: "https://agsstonefabricators.com",
    title: "AGS Stones | Local Granite Countertops Near You",
    description: "Stop searching. You found the best granite countertops near you. Buy direct from our Duluth factory and save.",
    images: [
      {
        url: "https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg",
      },
    ],
    siteName: "AGS Stones",
  },
  alternates: {
    canonical: "https://agsstonefabricators.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="https://i.imgur.com/B0ZaBpN.png" />
        <link rel="apple-touch-icon" href="https://i.imgur.com/B0ZaBpN.png" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AGS Stones",
              "alternateName": ["AGS Stones & Cabinets", "AGS Stone Fabricators"],
              "url": "https://agsstonefabricators.com"
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "AGS Stones",
              "legalName": "AGS Stones and Cabinets",
              "image": "https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png",
              "logo": "https://i.imgur.com/B0ZaBpN.png",
              "@id": "https://agsstonefabricators.com",
              "url": "https://agsstonefabricators.com",
              "telephone": "+14049524534",
              "priceRange": "$$",
              "hasMap": "https://maps.google.com/?q=4579+Abbotts+Bridge+Rd,+Duluth,+GA+30097",
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
      <body className="bg-white text-gray-800 antialiased overflow-x-hidden selection:bg-secondary selection:text-white">
        {/* Google Tag Manager (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16885125181"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16885125181');
          `}
        </Script>
        <Script id="conversion-tracking" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16885125181/Au3NCM3fmugbEL2guvM-',
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
