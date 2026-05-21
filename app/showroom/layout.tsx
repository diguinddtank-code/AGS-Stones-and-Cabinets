import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Digital Showroom | Premium Stones & Slab Selection | AGS Stones",
  description: "Browse our gorgeous, hand-picked inventory of premium Quartz, Granite, and Marble slabs virtually. Get custom styling suggestions and direct fabrication pricing instantly.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/showroom",
  },
};

export default function ShowroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
