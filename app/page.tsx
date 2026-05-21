import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  title: "Quartz & Granite Countertops in Atlanta, GA | AGS Stones",
  description: "Looking for premium granite or quartz countertops? AGS Stones is your local factory-direct fabricator in Duluth, GA. Serving Atlanta, Alpharetta, and Roswell with flawless installation.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com",
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.agsstonefabricators.com/#website",
      "url": "https://www.agsstonefabricators.com",
      "name": "AGS Stones & Cabinets",
      "alternateName": ["AGS Stones", "AGS Stone Fabricators", "AGS Stones and Cabinets"],
      "description": "Premium Granite & Quartz Countertops in Atlanta",
      "publisher": {
        "@id": "https://www.agsstonefabricators.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.agsstonefabricators.com/#webpage",
      "url": "https://www.agsstonefabricators.com",
      "name": "Local Granite Countertops Near You | AGS Stones",
      "isPartOf": {
        "@id": "https://www.agsstonefabricators.com/#website"
      },
      "about": {
        "@id": "https://www.agsstonefabricators.com"
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
