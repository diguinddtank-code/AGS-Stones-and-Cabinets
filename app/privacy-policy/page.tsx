import type { Metadata } from "next";
import PrivacyPolicyClient from "../../components/PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | AGS Stones & Cabinets",
  description: "Privacy Policy for AGS Stones & Cabinets. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/privacy-policy",
  },
};

export default function Page() {
  return <PrivacyPolicyClient />;
}
