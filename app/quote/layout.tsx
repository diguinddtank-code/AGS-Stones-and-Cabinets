import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Quote | Granite Countertops & Custom Cabinets | AGS Stones",
  description: "Request a free, no-obligation estimate for your kitchen or bathroom remodel. Factory-direct pricing on granite, quartz, and custom cabinets in Atlanta & Duluth.",
  alternates: {
    canonical: "https://agsstonefabricators.com/quote",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
