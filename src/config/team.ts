/**
 * The clinical team, as published on icubedental.com.
 *
 * Shared across both branch pages: patients name Dr. Deepika Jain and
 * Dr. Priyanka Sharma in the Google reviews we display, so leaving them off
 * the page would read as a mismatch. `image` is empty where no photograph has
 * been supplied — the card renders a monogram rather than a stock portrait.
 */
export type TeamMember = {
  name: string;
  /** Degree line exactly as the practice publishes it. */
  credentials: string;
  /** What this specialist actually does day to day. */
  role: string;
  /** Training pedigree — the strongest trust signal on the card. */
  pedigree: string;
  image: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Dr. Chandan Jain",
    credentials: "BDS, MDS (Prosthodontics)",
    role: "Digital smile makeovers & full-mouth implants",
    pedigree: "MDS from MAMC New Delhi · Diplomate, WCOI Japan",
    image: "/Dr.-Chandan-Jain.webp",
    initials: "CJ",
  },
  {
    name: "Dr. Deepika Jain",
    credentials: "BDS, MDS (Endodontics)",
    role: "Single-sitting painless RCT & microendodontics",
    pedigree: "Laser specialist · 10+ years in practice",
    // ⚠️ No photograph supplied yet — renders a monogram.
    image: "",
    initials: "DJ",
  },
  {
    name: "Dr. Gaurav Varshney",
    credentials: "MDS (Prosthodontics)",
    role: "Implantology, crowns & cosmetic dentistry",
    pedigree: "Ex PU Chandigarh · PGI Rohtak",
    image: "/Dr.-Gaurav-Varshney.webp",
    initials: "GV",
  },
  {
    name: "Dr. Priyanka Sharma",
    credentials: "MDS (Periodontics)",
    role: "Periodontics & implant placement",
    pedigree: "Ex PGI Chandigarh · PU Chandigarh · GDC Amritsar",
    // ⚠️ No photograph supplied yet — renders a monogram.
    image: "",
    initials: "PS",
  },
];

/**
 * Group photographs of the whole practice, shot at the clinic.
 *
 * All four doctors appear together in `team-doctors`, so these are brand-level
 * images rather than one branch's premises — which is why they run on both
 * branch pages.
 */
export const teamPhotos = {
  doctors: {
    src: '/team/team-doctors.webp',
    alt: 'The iCube Dental specialists and clinical staff at the practice reception',
  },
  full: {
    src: '/team/team-full.webp',
    alt: 'The full iCube Dental team — doctors, nurses and front-desk staff',
  },
  support: {
    src: '/team/team-support.webp',
    alt: 'The iCube Dental nursing and support staff',
  },
} as const;
