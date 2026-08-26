/**
 * The clinical team, as published on icubedental.com.
 *
 * Each member is tagged with the branch they practise at, so a branch page can
 * introduce its own two doctors rather than a shared list of four. `image` is
 * empty where no photograph has been supplied — the card renders a monogram
 * rather than a stock portrait of an unrelated person.
 */
export type TeamMember = {
  name: string;
  /** Degree line exactly as the practice publishes it. */
  credentials: string;
  /** What this specialist actually does day to day. */
  role: string;
  /** Training pedigree — the strongest trust signal on the card. */
  pedigree: string;
  /** Two or three sentences for the about-page card. */
  bio: string;
  /** Which branch this specialist practises at. */
  branch: 'ludhiana' | 'chandigarh';
  image: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: 'Dr. Chandan Jain',
    credentials: 'BDS, MDS (Prosthodontics)',
    role: 'Digital smile makeovers & full-mouth implants',
    pedigree: 'MDS from MAMC New Delhi · Diplomate, WCOI Japan',
    bio: 'Dr. Chandan Jain plans every implant case in 3D on the clinic’s own CBCT before any surgery begins, and places it in a dedicated operatory built for the purpose. Over 10 years of practice in implant and restorative dentistry, with a Diplomate in implantology from WCOI Japan.',
    branch: 'ludhiana',
    image: '/doctors/dr-chandan-jain.webp',
    initials: 'CJ',
  },
  {
    name: 'Dr. Deepika Jain',
    credentials: 'BDS, MDS (Endodontics)',
    role: 'Single-sitting painless RCT & microendodontics',
    pedigree: 'Laser specialist · 10+ years in practice',
    bio: 'Dr. Deepika Jain handles root canals, retreatment of failed canals and the curved, calcified cases other clinics refer out — most of them finished in a single sitting, under magnification and with laser disinfection.',
    branch: 'ludhiana',
    image: '/doctors/dr-deepika-jain.webp',
    initials: 'DJ',
  },
  {
    name: 'Dr. Gaurav Varshney',
    credentials: 'MDS (Prosthodontics)',
    role: 'Implantology, crowns & cosmetic dentistry',
    pedigree: 'Ex PU Chandigarh · PGI Rohtak',
    bio: 'Dr. Gaurav Varshney leads the Sector 35 practice, working across implants, crowns and full-mouth rehabilitation. Cases are scanned digitally and milled on in-house CAD/CAM, so a crown can be fitted and checked in the same visit.',
    branch: 'chandigarh',
    image: '/Dr.-Gaurav-Varshney.webp',
    initials: 'GV',
  },
  {
    name: 'Dr. Priyanka Sharma',
    credentials: 'MDS (Periodontics)',
    role: 'Periodontics & implant placement',
    pedigree: 'Ex PGI Chandigarh · PU Chandigarh · GDC Amritsar',
    bio: 'Dr. Priyanka Sharma treats gum disease and places implants, including the grafting and soft-tissue work a compromised site needs before an implant can be loaded safely.',
    branch: 'chandigarh',
    // ⚠️ No photograph supplied yet — renders a monogram.
    image: '',
    initials: 'PS',
  },
];

/** The specialists who practise at a given branch, in published order. */
export function doctorsFor(slug: string): TeamMember[] {
  return team.filter((m) => m.branch === slug);
}

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
