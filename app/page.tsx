import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  title: "Granite Countertops Near Me | Atlanta & Duluth's #1 Local Fabricator | AGS Stones",
  description: "Looking for granite countertops near you? AGS Stones is your local factory-direct fabricator in Duluth, GA. Serving Atlanta, Alpharetta, and Roswell. Save 30% today.",
  alternates: {
    canonical: "https://agsstonefabricators.com",
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://agsstonefabricators.com/#website",
      "url": "https://agsstonefabricators.com",
      "name": "AGS Stones",
      "description": "Premium Granite & Quartz Countertops in Atlanta",
      "publisher": {
        "@id": "https://agsstonefabricators.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://agsstonefabricators.com/#webpage",
      "url": "https://agsstonefabricators.com",
      "name": "Local Granite Countertops Near You | AGS Stones",
      "isPartOf": {
        "@id": "https://agsstonefabricators.com/#website"
      },
      "about": {
        "@id": "https://agsstonefabricators.com"
      },
      "description": "Looking for granite countertops near you? AGS Stones is your local factory-direct fabricator in Duluth, GA. Serving Atlanta, Alpharetta, and Roswell."
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomeClient />
    </>
  );
}
