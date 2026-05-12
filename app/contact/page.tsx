import type { Metadata } from "next";
import ContactClient from "../../components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Free Granite & Cabinet Estimates | AGS Stones",
  description: "Get a free quote for your kitchen or bathroom project. Visit our showroom in Duluth, GA or contact us for an in-home consultation.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "HomeAndConstructionBusiness",
    "name": "AGS Stones",
    "telephone": "+14049524534",
    "email": "agsstonesandcabinets@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4579 Abbotts Bridge Rd Suite -10",
      "addressLocality": "Duluth",
      "addressRegion": "GA",
      "postalCode": "30097",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+14049524534",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": ["English", "Spanish", "Portuguese"]
    }
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactClient />
    </>
  );
}
