import type { Metadata } from "next";
import Script from "next/script";
import ServicesClient from "../../components/ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Granite, Quartz & Cabinets in Atlanta | AGS Stones",
  description: "Explore our full range of services including granite and quartz countertop fabrication, custom kitchen cabinets, and bathroom remodeling in Atlanta.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/services",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Granite Countertop Fabrication & Installation",
        "description": "Premium natural stone fabrication and installation for kitchens and bathrooms.",
        "provider": {
          "@type": "HomeAndConstructionBusiness",
          "name": "AGS Stones"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Quartz Countertop Installation",
        "description": "Durable, non-porous engineered quartz surfaces for modern homes.",
        "provider": {
          "@type": "HomeAndConstructionBusiness",
          "name": "AGS Stones"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Custom Kitchen & Bathroom Cabinets",
        "description": "High-quality semi-custom and custom cabinetry solutions tailored to your space.",
        "provider": {
          "@type": "HomeAndConstructionBusiness",
          "name": "AGS Stones"
        }
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <ServicesClient />
    </>
  );
}
