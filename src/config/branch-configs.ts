export type DoctorConfig = {
  name: string;
  title: string;
  image: string;
  description: string;
  highlights: string[];
  footer: string;
};

export type BranchConfig = {
  slug: string;
  name: string;
  doctors: DoctorConfig[];
  clinicImages: { src: string; alt: string }[];
  contact: {
    phones: string[];
    timings: string;
    address: string;
    email: string;
    googleMapEmbed: string;
    googleMapsLink: string;
  };
  usps: string[];
  pricing: {
    implant: string;
  };
  heroTitle: string;
  heroVideo: string;
  reviews: { name: string; initials: string; title: string; review: string; meta: string }[];
};

export const branches: Record<string, BranchConfig> = {
  ludhiana: {
    slug: 'ludhiana',
    name: 'Ludhiana',
    doctors: [
      {
        name: "Dr. Chandan Jain",
        title: "Implantologist | MDS Prosthodontics | MDS Endodontics — I Cube Dental",
        image: "/Dr.-Chandan-Jain.webp",
        description: "Dr. Chandan Jain is a specialist Implantologist with dual MDS qualifications in Prosthodontics and Endodontics and 14 years of clinical experience in advanced implant and restorative dentistry. He leads I Cube Dental in New Prem Nagar, Ludhiana — a technology-driven, specialist-led dental centre equipped with in-house CBCT, CAD/CAM and digital intraoral scanners, plus a dedicated implant operatory built specifically for surgical precision and sterility.",
        highlights: [
          "14 years of specialist clinical experience",
          "MDS Prosthodontics & MDS Endodontics",
          "In-house CBCT + digital intraoral scanning",
          "Dedicated, purpose-built implant operatory",
        ],
        footer: "Every case at I Cube Dental is diagnosed, planned and delivered by MDS specialists trained at India's top dental colleges — a team of 7 working within one advanced facility, so your treatment stays under specialist supervision from the first scan to the final restoration."
      }
    ],
    clinicImages: [
      { src: "/clinic1.jpeg", alt: "Specialised Implant Operatory" },
      { src: "/clinic2.jpeg", alt: "Digital Dental Chair Setup" },
      { src: "/clinic3.jpeg", alt: "Sterilisation & Equipment Bay" }
    ],
    contact: {
      phones: ["7011993633", "9077700021"],
      timings: "Mon–Sun: 10 AM – 8 PM",
      address: "1533, New Prem Nagar | Near Las Vegas Club · PAU Gate No. 4 · Akaash Institute | Ludhiana, Punjab – 141001",
      email: "drcjain1@gmail.com",
      googleMapEmbed: "https://www.google.com/maps?q=I+Cube+Dental+New+Prem+Nagar+Ludhiana&output=embed",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=I+Cube+Dental+New+Prem+Nagar+Ludhiana"
    },
    usps: [
      "In-house CBCT & 3D digital scanning",
      "Dedicated specialised implant operatory",
      "MDS specialists from India's top dental colleges",
      "CAD/CAM precision crowns & restorations",
      "Complete multi-specialty care under one roof"
    ],
    pricing: {
      implant: "₹25,000 onwards*"
    },
    heroTitle: "Advanced Implant & Specialist Dental Care in Ludhiana",
    heroVideo: "/clinic4.mp4",
    // ⚠️ PLACEHOLDER REVIEWS — replace with the clinic's real Google reviews before launch.
    reviews: [
      {
        name: "Harpreet Singh",
        initials: "H",
        title: "Implant Planned on CBCT — Flawless Result",
        meta: "Local Guide · 14 reviews · 2 months ago",
        review: "I had a dental implant done by Dr. Chandan Jain at I Cube Dental. What stood out was how thorough the planning was — the CBCT scan was done in-house and he showed me exactly where the implant would sit before starting. The implant operatory is separate and spotless. The procedure was painless and the crown fitted perfectly on the first try. Genuinely a specialist-level setup in Ludhiana."
      },
      {
        name: "Simran Kaur",
        initials: "S",
        title: "Root Canal Done by an MDS Endodontist",
        meta: "Local Guide · 7 reviews · 1 month ago",
        review: "I had been putting off a root canal for months out of fear. Dr. Chandan Jain is an MDS in Endodontics and it showed — the treatment was completed comfortably and he explained every step as he went. The digital scanner meant no messy impressions for the crown either. The staff are professional and the clinic is very hygienic. Highly recommend I Cube Dental."
      },
      {
        name: "Rohit Mehta",
        initials: "R",
        title: "Full Mouth Rehab — Specialist Team Under One Roof",
        meta: "9 reviews · 3 months ago",
        review: "After consulting a few clinics in Ludhiana, I chose I Cube Dental for my full mouth rehabilitation. The deciding factor was that every specialist — implantology, prosthodontics, endodontics — is in the same practice, so nothing got handed off or delayed. The CAD/CAM crowns look completely natural. Dr. Chandan Jain gave me a clear plan and timeline upfront and stuck to it. Excellent experience."
      }
    ]
  }
};
