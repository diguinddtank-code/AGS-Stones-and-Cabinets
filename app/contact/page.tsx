import type { Metadata } from "next";
import ContactClient from "../../components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Free Granite & Cabinet Estimates | AGS Stones",
  description: "Get a free quote for your kitchen or bathroom project. Visit our showroom in Duluth, GA or contact us for an in-home consultation.",
  alternates: {
    canonical: "https://agsstonefabricators.com/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}
