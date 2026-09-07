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
  /**
   * Credential bullets, worded as the practice publishes them on
   * icubedental.com. These are claims about a real clinician's
   * qualifications — do not paraphrase or embellish them.
   */
  credits: string[];
  /** Which branch this specialist practises at. */
  branch: 'ludhiana' | 'chandigarh';
  image: string;
  initials: string;
  /**
   * Punjabi for the two fields the About cards show. Everything else on a
   * member — the photograph, the initials — is language-neutral, and the
   * qualifications keep their published Latin abbreviations (BDS, MDS) because
   * that is how the degrees are awarded and how patients recognise them.
   */
  pa: { name: string; credits: string[] };
};

export const team: TeamMember[] = [
  {
    name: 'Dr. Chandan Jain',
    credentials: 'BDS, MDS (Prosthodontics)',
    role: 'Digital smile makeovers & full-mouth implants',
    pedigree: 'MDS from MAMC New Delhi · Diplomate, WCOI Japan',
    credits: [
      'BDS, MDS (Prosthodontics)',
      'MDS from India’s No. 1 college — MAMC New Delhi',
      'Diplomate from the prestigious WCOI Japan (Implants)',
      '14+ years’ experience in full-mouth implants',
      'Digital smile makeover specialist (CAD/CAM)',
      'Ex: Medical Officer, PCMS-1',
    ],
    pa: {
      name: 'ਡਾ. ਚੰਦਨ ਜੈਨ',
      credits: [
        'BDS, MDS (ਪ੍ਰੌਸਥੋਡੌਂਟਿਕਸ)',
        'ਭਾਰਤ ਦੇ ਨੰਬਰ 1 ਕਾਲਜ — MAMC ਨਵੀਂ ਦਿੱਲੀ ਤੋਂ MDS',
        'ਨਾਮਵਰ WCOI ਜਪਾਨ ਤੋਂ ਡਿਪਲੋਮੇਟ (ਇੰਪਲਾਂਟ)',
        'ਫੁੱਲ-ਮਾਊਥ ਇੰਪਲਾਂਟ ਵਿੱਚ 14+ ਸਾਲ ਦਾ ਤਜਰਬਾ',
        'ਡਿਜੀਟਲ ਸਮਾਈਲ ਮੇਕਓਵਰ ਮਾਹਰ (CAD/CAM)',
        'ਸਾਬਕਾ: ਮੈਡੀਕਲ ਅਫਸਰ, PCMS-1',
      ],
    },
    branch: 'ludhiana',
    image: '/doctors/dr-chandan-jain.webp',
    initials: 'CJ',
  },
  {
    name: 'Dr. Deepika Jain',
    credentials: 'BDS, MDS (Endodontics)',
    role: 'Single-sitting painless RCT & microendodontics',
    pedigree: 'Laser specialist · 14+ years in practice',
    credits: [
      'BDS, MDS (Endodontics)',
      'Ex: SGRD Amritsar',
      'Laser specialist',
      '14+ years’ experience in single-sitting RCT & microendodontics',
      'Veneer specialist',
      'Pre-bridal buildups & makeovers',
    ],
    pa: {
      name: 'ਡਾ. ਦੀਪਿਕਾ ਜੈਨ',
      credits: [
        'BDS, MDS (ਐਂਡੋਡੌਂਟਿਕਸ)',
        'ਸਾਬਕਾ: SGRD ਅੰਮਿਰਤਸਰ',
        'ਲੇਜ਼ਰ ਮਾਹਰ',
        'ਇੱਕੋ ਬੈਠਕ ਵਿੱਚ ਰੂਟ ਕੈਨਾਲ ਤੇ ਮਾਈਕ੍ਰੋਐਂਡੋਡੌਂਟਿਕਸ ਵਿੱਚ 14+ ਸਾਲ ਦਾ ਤਜਰਬਾ',
        'ਵਿਨੀਅਰ ਮਾਹਰ',
        'ਵਿਆਹ ਤੋਂ ਪਹਿਲਾਂ ਦੰਦਾਂ ਦਾ ਬਿਲਡਅੱਪ ਤੇ ਮੇਕਓਵਰ',
      ],
    },
    branch: 'ludhiana',
    image: '/doctors/dr-deepika-jain.webp',
    initials: 'DJ',
  },
  {
    name: 'Dr. Gaurav Varshney',
    credentials: 'MDS (Prosthodontics)',
    role: 'Implantology, crowns & cosmetic dentistry',
    pedigree: 'Ex PU Chandigarh · PGI Rohtak',
    credits: [
      'MDS (Prosthodontics) — Implantologist & Cosmetic Dentist',
      'Ex: PU Chandigarh',
      'Ex: PGI Rohtak',
      'Implants, crowns & full-mouth rehabilitation',
      'In-house CAD/CAM same-visit crowns',
    ],
    pa: {
      name: 'ਡਾ. ਗੌਰਵ ਵਰਸ਼ਨੇ',
      credits: [
        'MDS (ਪ੍ਰੌਸਥੋਡੌਂਟਿਕਸ) — ਇੰਪਲਾਂਟੋਲੋਜਿਸਟ ਤੇ ਕੋਸਮੈਟਿਕ ਡੈਂਟਿਸਟ',
        'ਸਾਬਕਾ: PU ਚੰਡੀਗੜ੍ਹ',
        'ਸਾਬਕਾ: PGI ਰੋਹਤਕ',
        'ਇੰਪਲਾਂਟ, ਕਰਾਊਨ ਤੇ ਫੁੱਲ-ਮਾਊਥ ਰਿਹੈਬਿਲਿਟੇਸ਼ਨ',
        'ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CAD/CAM ਉਸੇ ਦਿਨ ਕਰਾਊਨ',
      ],
    },
    branch: 'chandigarh',
    image: '/Dr.-Gaurav-Varshney.webp',
    initials: 'GV',
  },
  {
    name: 'Dr. Priyanka Sharma',
    credentials: 'MDS (Periodontics)',
    role: 'Periodontics & implant placement',
    pedigree: 'Ex PGI Chandigarh · PU Chandigarh · GDC Amritsar',
    credits: [
      'MDS (Periodontics) — Periodontist & Implantologist',
      'Ex: PGI Chandigarh',
      'Ex: PU Chandigarh',
      'Ex: GDC Amritsar',
      'Gum treatment, grafting & implant placement',
    ],
    pa: {
      name: 'ਡਾ. ਪ੍ਰਿਯੰਕਾ ਸ਼ਰਮਾ',
      credits: [
        'MDS (ਪੀਰੀਓਡੌਂਟਿਕਸ) — ਪੀਰੀਓਡੌਂਟਿਸਟ ਤੇ ਇੰਪਲਾਂਟੋਲੋਜਿਸਟ',
        'ਸਾਬਕਾ: PGI ਚੰਡੀਗੜ੍ਹ',
        'ਸਾਬਕਾ: PU ਚੰਡੀਗੜ੍ਹ',
        'ਸਾਬਕਾ: GDC ਅੰਮਿਰਤਸਰ',
        'ਮਸੂੜਿਆਂ ਦਾ ਇਲਾਜ, ਗ੍ਰਾਫਟਿੰਗ ਤੇ ਇੰਪਲਾਂਟ ਲਗਾਉਣਾ',
      ],
    },
    branch: 'chandigarh',
    image: '/Dr.-Priyanka-Sharma.webp',
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
