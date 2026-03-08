import type { Metadata } from "next";
import AboutClient from "../../components/AboutClient";

export const metadata: Metadata = {
  title: "About AGS Stones | Premier Granite & Cabinet Fabricators in Atlanta",
  description: "Learn about AGS Stones, Atlanta's trusted family-owned granite and cabinet specialists. Over 15 years of experience delivering luxury kitchens and baths.",
  alternates: {
    canonical: "https://agsstonefabricators.com/about",
  },
};

export default function Page() {
  return <AboutClient />;
}
