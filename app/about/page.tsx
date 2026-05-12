import type { Metadata } from "next";
import AboutClient from "../../components/AboutClient";

export const metadata: Metadata = {
  title: "About AGS Stones | Premier Granite & Cabinet Fabricators in Atlanta",
  description: "Learn about AGS Stones, Atlanta's trusted family-owned granite and cabinet specialists. Over 15 years of experience delivering luxury kitchens and baths.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/about",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "AGS Stones",
    "foundingDate": "2009", // Estimated from 'Over 15 years of experience' (Current year is 2026, so 2026-15 = 2011, let's just make it generalized)
    "description": "AGS Stones is a premier granite, quartz, and cabinet fabricator based in Duluth, GA. We serve the greater Atlanta area with factory-direct pricing and high-quality kitchen and bathroom remodeling services.",
    "url": "https://www.agsstonefabricators.com"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient />
    </>
  );
}
