import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a 60-Second Fast Quote Online | AGS Stones",
  description: "Calculate estimates for your custom kitchen countertops, vanity tops, or solid wood cabinets in under a minute with our automated estimator.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/fast-quote",
  },
};

export default function FastQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
