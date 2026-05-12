import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Quote | Granite Countertops & Custom Cabinets | AGS Stones",
  description: "Request a free, no-obligation estimate for your kitchen or bathroom remodel. Factory-direct pricing on granite, quartz, and custom cabinets in Atlanta & Duluth.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/quote",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const quoteSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Get a Free Granite Countertop Quote",
  "description": "Request a free in-home estimate or pricing for your kitchen and bathroom surfaces.",
  "url": "https://www.agsstonefabricators.com/quote",
  "potentialAction": {
    "@type": "QuoteAction",
    "target": "https://www.agsstonefabricators.com/quote",
    "name": "Request a Quote for Countertops and Cabinets"
  }
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quoteSchema) }}
      />
      {children}
    </>
  );
}
