import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Estimate | Custom Countertops & Cabinets",
  description: "Get a free in-home estimate for custom granite, quartz, and cabinetry in Metro Atlanta. Fast turnaround, factory-direct pricing.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/promo",
  },
  // This is a dedicated paid-ads landing page (Meta Ads). It's kept out of
  // Google's index so it doesn't compete with /quote and /services for
  // organic rankings or get flagged as thin/duplicate content — the real
  // service pages are the ones we want ranking organically.
  robots: {
    index: false,
    follow: true,
  },
};

export default function PromoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
