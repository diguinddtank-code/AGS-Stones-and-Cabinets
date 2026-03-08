import type { Metadata } from "next";
import FaqClient from "../../components/FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Granite & Cabinet Installation | AGS Stones",
  description: "Find answers to common questions about granite countertops, quartz installation, cabinet refacing, and more. AGS Stones is here to help.",
  alternates: {
    canonical: "https://agsstonefabricators.com/faq",
  },
};

export default function Page() {
  return <FaqClient />;
}
