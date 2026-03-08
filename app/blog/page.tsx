import type { Metadata } from "next";
import BlogClient from "../../components/BlogClient";

export const metadata: Metadata = {
  title: "Our Work in Your Neighborhood | AGS Stones Portfolio",
  description: "Browse our portfolio of stone countertops and custom cabinets completed across Metro Atlanta. Real results from recent months.",
  alternates: {
    canonical: "https://agsstonefabricators.com/blog",
  },
};

export default function Page() {
  return <BlogClient />;
}
