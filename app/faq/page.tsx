import type { Metadata } from "next";
import FaqClient from "../../components/FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Granite & Cabinet Installation | AGS Stones",
  description: "Find answers to common questions about granite countertops, quartz installation, cabinet refacing, and more. AGS Stones is here to help.",
  alternates: {
    canonical: "https://agsstonefabricators.com/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do Granite countertops cost in Atlanta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Granite prices vary by level (rarity) and thickness. At AGS Stones in Duluth, we offer factory-direct pricing starting as low as $35/sqft installed for Level 1 granite. We service all of Metro Atlanta including Johns Creek, Alpharetta, and Roswell with competitive rates."
      }
    },
    {
      "@type": "Question",
      "name": "Do you install Kitchen Cabinets near me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We are a full-service kitchen remodeling company. We install custom and semi-custom cabinets throughout the Atlanta area. Whether you need a simple vanity replacement in Suwanee or a full chef's kitchen in Sandy Springs, our team handles the design and installation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Quartz and Granite?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Granite is a 100% natural stone cut from the earth, offering unique patterns and heat resistance. Quartz is an engineered stone (typically 93% natural quartz and 7% resin), which makes it non-porous and maintenance-free."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to seal my Quartz countertops?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, one of the main benefits of Quartz is that it is non-porous and does not require sealing. Natural stones like Granite and Marble, however, should be sealed. We apply a 15-year industrial-grade sealer to all our natural stone installations."
      }
    },
    {
      "@type": "Question",
      "name": "How long does countertop installation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once we have your template, fabrication typically takes 3-5 days. The actual installation in your home is usually completed in just one day, often within 4-6 hours."
      }
    },
    {
      "@type": "Question",
      "name": "What areas in Georgia do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are based in Duluth but serve the entire Metro Atlanta area, including Alpharetta, Roswell, Johns Creek, Milton, Suwanee, Sandy Springs, Dunwoody, Norcross, and Lawrenceville."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  );
}
