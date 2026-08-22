import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { branches, branchList } from "@/config/branch-configs";
import BranchPageClient from "@/components/BranchPageClient";

type Params = { branch: string };

/** Prerender both branch pages at build time; anything else 404s. */
export function generateStaticParams(): Params[] {
  return branchList.map((b) => ({ branch: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { branch: slug } = await params;
  const branch = branches[slug];

  if (!branch) return { title: "Not found" };

  const doctorNames = branch.doctors.map((d) => d.name).join(" & ");
  const title = `${branch.heroTitle} | I Cube Dental`;
  const description = `${doctorNames} at I Cube Dental, ${branch.name}. ${branch.copy.leadDoctorCreds} — in-house CBCT, CAD/CAM, digital scanners and a dedicated implant operatory. Implants from ₹25,000. ${branch.contact.timings}.`;
  const shortDescription = `Specialist-led implant dentistry by ${branch.doctors[0].name} in ${branch.name}. In-house CBCT, CAD/CAM and a dedicated implant operatory. Implants from ₹25,000.`;

  return {
    title,
    description,
    alternates: { canonical: `/${branch.slug}` },
    openGraph: {
      title,
      description: shortDescription,
      url: `/${branch.slug}`,
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
      title,
      description: shortDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function BranchPage({ params }: { params: Promise<Params> }) {
  const { branch: slug } = await params;
  const branch = branches[slug];

  if (!branch) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `I Cube Dental — ${branch.name}`,
    image: `${siteUrl}/og-image.png`,
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
    // Only real, branch-owned profiles belong in sameAs — empty handles are dropped.
    sameAs: [branch.contact.googleMapsLink, branch.social.instagram, branch.social.facebook].filter(Boolean),
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
