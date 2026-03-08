import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  title: "Granite Countertops Near Me | Atlanta & Duluth's #1 Local Fabricator | AGS Stones",
  description: "Looking for granite countertops near you? AGS Stones is your local factory-direct fabricator in Duluth, GA. Serving Atlanta, Alpharetta, and Roswell. Save 30% today.",
  alternates: {
    canonical: "https://agsstonefabricators.com",
  },
};

export default function Home() {
  return <HomeClient />;
}
