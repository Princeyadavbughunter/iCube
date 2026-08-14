import type { Metadata } from "next";
import { branches } from "@/config/branch-configs";
import BranchPageClient from "@/components/BranchPageClient";

const branch = branches.ludhiana;

export const metadata: Metadata = {
  title: `${branch.heroTitle} | I Cube Dental`,
  description: `${branch.doctors.map((d) => d.name).join(" & ")} at I Cube Dental, ${branch.name}. Implantologist with MDS Prosthodontics & MDS Endodontics — in-house CBCT, CAD/CAM, digital scanners and a dedicated implant operatory. Implants from ₹25,000. ${branch.contact.timings}.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${branch.heroTitle} | I Cube Dental`,
    description: `Specialist-led implant dentistry by ${branch.doctors[0].name} in ${branch.name}. In-house CBCT, CAD/CAM and a dedicated implant operatory. Implants from ₹25,000.`,
    url: "/",
    siteName: "I Cube Dental",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `I Cube Dental – ${branch.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${branch.heroTitle} | I Cube Dental`,
    description: `Specialist-led implant dentistry by ${branch.doctors[0].name} in ${branch.name}. In-house CBCT, CAD/CAM and a dedicated implant operatory. Implants from ₹25,000.`,
    images: ["/og-image.png"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "I Cube Dental",
    image: "/og-image.png",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    telephone: branch.contact.phones[0],
    email: branch.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1533, New Prem Nagar, Near Las Vegas Club (PAU Gate No. 4)",
      addressLocality: "Ludhiana",
      addressRegion: "PB",
      postalCode: "141001",
      addressCountry: "IN",
    },
    priceRange: "₹₹",
    openingHours: "Mo-Su 10:00-20:00",
    sameAs: [branch.contact.googleMapsLink],
    medicalSpecialty: [
      "Dentistry",
      "DentalImplants",
      "Prosthodontics",
      "Endodontics",
      "CosmeticDentistry",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BranchPageClient branch={branch} />
    </>
  );
}
