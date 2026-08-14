import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "I Cube Dental | Implant & MDS Specialist Dental Centre in Ludhiana",
    template: "%s | I Cube Dental",
  },
  description:
    "I Cube Dental, Ludhiana — a specialist-led, technology-driven dental centre led by Dr. Chandan Jain (Implantologist, MDS Prosthodontics, MDS Endodontics). In-house CBCT, CAD/CAM, digital scanners and a dedicated implant operatory. Implants from ₹25,000. New Prem Nagar, Ludhiana.",
  keywords:
    "dental implants Ludhiana, implant specialist Ludhiana, Dr. Chandan Jain, I Cube Dental, MDS prosthodontist Ludhiana, MDS endodontist Ludhiana, CBCT dental Ludhiana, root canal Ludhiana, full mouth rehabilitation Ludhiana, best dentist Ludhiana, CAD CAM crowns Ludhiana, New Prem Nagar dentist",
  authors: [{ name: "I Cube Dental" }],
  creator: "I Cube Dental",
  publisher: "I Cube Dental",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "I Cube Dental | Implant & MDS Specialist Dental Centre in Ludhiana",
    description:
      "Specialist-led implant dentistry in Ludhiana. In-house CBCT, CAD/CAM and digital scanners, a dedicated implant operatory and an all-MDS clinical team. Implants from ₹25,000.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: "I Cube Dental",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "I Cube Dental – Ludhiana",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "I Cube Dental | Implant & MDS Specialist Dental Centre in Ludhiana",
    description:
      "Specialist-led implant dentistry in Ludhiana. In-house CBCT, CAD/CAM, dedicated implant operatory and an all-MDS team. Implants from ₹25,000.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Scroll-reveal blocks are server-rendered hidden and revealed by
            framer-motion. Without JS they would never appear, so force them
            visible in that case. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <meta name="theme-color" content="#303151" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
