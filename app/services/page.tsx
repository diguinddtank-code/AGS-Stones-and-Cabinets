import type { Metadata } from "next";
import ServicesClient from "../../components/ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Granite, Quartz & Cabinets in Atlanta | AGS Stones",
  description: "Explore our full range of services including granite and quartz countertop fabrication, custom kitchen cabinets, and bathroom remodeling in Atlanta.",
  alternates: {
    canonical: "https://agsstonefabricators.com/services",
  },
};

export default function Page() {
  return <ServicesClient />;
}
