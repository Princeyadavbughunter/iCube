import type { Metadata } from "next";
import { branchList } from "@/config/branch-configs";
import BranchSelect from "@/components/BranchSelect";
import SmoothScroll from "@/components/motion/SmoothScroll";

const cities = branchList.map((b) => b.name).join(" & ");

const title = `I Cube Dental | Implant & Specialist Dental Centres in ${cities}`;
const description = `I Cube Dental runs specialist-led implant centres in ${cities}. In-house CBCT, digital scanners, CAD/CAM crowns and a dedicated implant operatory at both branches. Implants from ₹25,000. Choose your city to book.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "I Cube Dental",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `I Cube Dental – ${cities}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // One Organization node that owns both branches, so search engines connect
  // the two Dentist listings to a single brand rather than treating them as
  // unrelated practices.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "I Cube Dental",
    url: siteUrl,
    logo: `${siteUrl}/icube-logo.avif`,
    department: branchList.map((branch) => ({
      "@type": "Dentist",
      name: `I Cube Dental — ${branch.name}`,
      url: `${siteUrl}/${branch.slug}`,
      telephone: branch.contact.phones[0],
      email: branch.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.schema.streetAddress,
        addressLocality: branch.schema.addressLocality,
        addressRegion: branch.schema.addressRegion,
        postalCode: branch.schema.postalCode,
        addressCountry: "IN",
      },
      priceRange: "₹₹",
      openingHours: branch.schema.openingHours,
      sameAs: [branch.contact.googleMapsLink],
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />
      <BranchSelect branches={branchList} />
    </>
  );
}
