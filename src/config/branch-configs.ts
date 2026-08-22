export type DoctorConfig = {
  name: string;
  title: string;
  /** Path to the doctor's photo. Empty string renders a monogram placeholder instead. */
  image: string;
  /** Fallback monogram shown when `image` is empty. */
  initials: string;
  description: string;
  highlights: string[];
  footer: string;
};

export type BranchConfig = {
  slug: string;
  /** Display name of the branch, e.g. "Ludhiana". */
  name: string;
  /** City the branch sits in — used in body copy. Usually the same as `name`. */
  city: string;
  /** One-line positioning statement shown on the branch chooser. */
  tagline: string;
  /** Compact address for cards and lists (the long form lives in contact.address). */
  shortAddress: string;
  /**
   * Photo for this branch's panel on the branch chooser. Leave empty to render
   * the designed gradient panel instead — do NOT point this at a stock photo or
   * at another practice's premises.
   */
  cardImage: string;
  /** CSS colour driving this branch's accent on the chooser. */
  accent: string;
  doctors: DoctorConfig[];
  clinicImages: { src: string; alt: string }[];
  /**
   * Clinic-supplied result photos for this branch. Each file is already a
   * composed before/after case, so the section renders them whole — no split,
   * divider or overlay labels. `aspect` is a CSS aspect-ratio matching the
   * supplied files (they differ per branch), so nothing gets cropped.
   */
  beforeAfter: {
    aspect: string;
    images: { src: string; alt: string }[];
  };
  contact: {
    phones: string[];
    timings: string;
    /** Short "which days" line, e.g. "Open all 7 days". */
    daysLine: string;
    address: string;
    email: string;
    googleMapEmbed: string;
    googleMapsLink: string;
  };
  /**
   * Social profiles for this branch. Each branch runs its own handles — leave a
   * field empty and the footer hides that icon rather than rendering a dead link.
   */
  social: {
    instagram: string;
    facebook: string;
  };
  /** Structured address + hours, used to emit schema.org LocalBusiness JSON-LD. */
  schema: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    /** schema.org openingHours string, e.g. "Mo-Su 10:00-20:00". */
    openingHours: string;
  };
  usps: string[];
  pricing: {
    implant: string;
  };
  heroTitle: string;
  /**
   * Clinic walkthrough shown in the hero media frame. Empty falls back to the
   * rotating implant renders. Keep the file web-sized — it autoplays.
   */
  heroVideo: string;
  /** Still frame for `heroVideo`, shown before playback starts. */
  heroPoster: string;
  /**
   * Sales video (VSL) that opens the branch page. Unlike `heroVideo` this one
   * has sound and does not autoplay — the visitor presses play. Empty hides
   * the whole block, so the page stays correct until the film is supplied.
   */
  vsl: {
    src: string;
    poster: string;
    /** Overline above the player, e.g. "Watch: how we plan an implant". */
    kicker: string;
  };
  /** Card presentation on the branch chooser. */
  card: {
    /** Corner badge, e.g. "IMPLANT LEAD". */
    badge: string;
    /** Photo behind the card. Falls back to the accent gradient when empty. */
    image: string;
    /** Up to three stat pills, shown top-right. */
    stats: { value: string; label: string }[];
    /** Treatment chips above the branch name. */
    chips: string[];
    /** Days line under the name, e.g. "MONDAY–SATURDAY". */
    daysUpper: string;
  };
  /**
   * Punjabi copy for the sections that carry the offer. English stays the
   * primary voice (it is what the branch ranks on); Punjabi runs alongside it
   * so a local reader gets the substance in their own language.
   */
  pa: {
    heroTitle: string;
    heroSub: string;
    usps: string[];
    offer: string;
    trust: string;
  };
  /** Branch-specific copy interpolated into shared sections (header, footer, FAQs). */
  copy: {
    leadDoctor: string;
    leadDoctorCreds: string;
    experience: string;
    teamSize: number;
    footerBlurb: string;
    heroChipLine: string;
    oneRoofLine: string;
    faqCbct: string;
    faqSpecialist: string;
    faqRootCanal: string;
    faqPricing: string;
    faqTimingsLocation: string;
  };
  reviews: { name: string; initials: string; title: string; review: string; meta: string }[];
};

export const branches: Record<string, BranchConfig> = {
  ludhiana: {
    slug: 'ludhiana',
    name: 'Ludhiana',
    city: 'Ludhiana',
    tagline: 'Specialist-led implant dentistry with in-house CBCT and a dedicated implant operatory.',
    shortAddress: '1533, New Prem Nagar, Ludhiana – 141001',
    // ⚠️ /images/clinic-front.jpeg is a previous client's signage (OM Sai Dental)
    // — not this practice. Left empty until real Ludhiana photos are supplied.
    cardImage: '',
    accent: '#303151',
    doctors: [
      {
        name: "Dr. Chandan Jain",
        title: "Implantologist | BDS, MDS Prosthodontics — I Cube Dental",
        image: "/Dr.-Chandan-Jain.webp",
        initials: "CJ",
        description: "Dr. Chandan Jain is a specialist Implantologist and Prosthodontist — MDS from MAMC New Delhi and a Diplomate of WCOI Japan in implantology — with over 10 years of clinical experience in advanced implant and restorative dentistry. He leads I Cube Dental in New Prem Nagar, Ludhiana — a technology-driven, specialist-led dental centre equipped with in-house CBCT, CAD/CAM and digital intraoral scanners, plus a dedicated implant operatory built specifically for surgical precision and sterility.",
        highlights: [
          "10+ years of specialist clinical experience",
          "MDS Prosthodontics — MAMC New Delhi",
          "In-house CBCT + digital intraoral scanning",
          "Dedicated, purpose-built implant operatory",
        ],
        footer: "Every case at I Cube Dental is diagnosed, planned and delivered by MDS specialists trained at India's top dental colleges — a team of 7 working within one advanced facility, so your treatment stays under specialist supervision from the first scan to the final restoration."
      }
    ],
    // ⚠️ Awaiting real clinic photography — the /images/clinic-*.jpeg files in this
    // repo are a previous client's premises and must not be used here.
    clinicImages: [],
    beforeAfter: {
      aspect: '558 / 382',
      images: [
        { src: '/before-after/01-1.webp', alt: 'Before and after dental treatment result at I Cube Dental Ludhiana — patient 1' },
        { src: '/before-after/03-1-1.webp', alt: 'Before and after dental treatment result at I Cube Dental Ludhiana — patient 2' },
        { src: '/before-after/06-1-1.webp', alt: 'Before and after dental treatment result at I Cube Dental Ludhiana — patient 3' },
        { src: '/before-after/07-1-1.webp', alt: 'Before and after dental treatment result at I Cube Dental Ludhiana — patient 4' },
      ],
    },
    contact: {
      phones: ["7011993633", "9077700021"],
      timings: "Mon–Sun: 10 AM – 8 PM",
      daysLine: "Open all 7 days",
      address: "1533, New Prem Nagar | Near Las Vegas Club · PAU Gate No. 4 · Akaash Institute | Ludhiana, Punjab – 141001",
      email: "drcjain1@gmail.com",
      googleMapEmbed: "https://www.google.com/maps?q=I+Cube+Dental+New+Prem+Nagar+Ludhiana&output=embed",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=I+Cube+Dental+New+Prem+Nagar+Ludhiana"
    },
    social: {
      instagram: "https://www.instagram.com/icube_dental/",
      // ⚠️ No Facebook page supplied for Ludhiana yet — the icon stays hidden
      // until a real URL is added. Do not point this at the Chandigarh page.
      facebook: "",
    },
    schema: {
      streetAddress: "1533, New Prem Nagar, Near Las Vegas Club (PAU Gate No. 4)",
      addressLocality: "Ludhiana",
      addressRegion: "PB",
      postalCode: "141001",
      openingHours: "Mo-Su 10:00-20:00",
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
    heroVideo: "/hero-ludhiana.mp4",
    heroPoster: "/hero-ludhiana-poster.webp",
    // ⚠️ Awaiting the VSL film. Empty keeps the block off the page entirely.
    vsl: {
      src: "",
      poster: "",
      kicker: "Watch: how we plan an implant on CBCT",
    },
    card: {
      badge: "IMPLANT LEAD",
      image: "/Dr.-Chandan-Jain.webp",
      stats: [
        { value: "10+", label: "YEARS" },
        { value: "MAMC", label: "NEW DELHI" },
        { value: "7 Days", label: "OPEN" },
      ],
      chips: ["Implants", "Painless RCT", "Crowns", "Veneers"],
      daysUpper: "MONDAY–SUNDAY",
    },
    pa: {
      heroTitle: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਮਾਹਰ ਡਾਕਟਰਾਂ ਤੋਂ ਦੰਦਾਂ ਦਾ ਇੰਪਲਾਂਟ ਇਲਾਜ",
      heroSub: "ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT ਸਕੈਨ, ਡਿਜੀਟਲ ਸਕੈਨਰ ਅਤੇ ਵੱਖਰਾ ਇੰਪਲਾਂਟ ਓਪਰੇਟਰੀ — ਸਭ ਕੁਝ ਇੱਕੋ ਛੱਤ ਹੇਠਂ।",
      usps: [
        "ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT 3D ਸਕੈਨ",
        "ਇੰਪਲਾਂਟ ਲਈ ਵੱਖਰਾ ਓਪਰੇਟਰੀ",
        "MDS ਸਪੈਸ਼ਲਿਸਟ ਡਾਕਟਰਾਂ ਦੀ ਟੀਮ",
        "ਇੱਕੋ ਦਿਨ ਵਿੱਚ ਬਿਨਾਂ ਦਰਦ ਰੂਟ ਕੈਨਾਲ",
      ],
      offer: "ਡੈਂਟਲ ਇੰਪਲਾਂਟ ₹25,000 ਤੋਂ ਸ਼ੁਰੂ",
      trust: "ਹਫ਼ਤੇ ਦੇ ਸੱਤੇ ਦਿਨ ਖੁੱਲ੍ਹਾ · ਸਵੇਰੇ 10 ਤੋਂ ਰਾਤ 8 ਵਜੇ ਤੱਕ",
    },
    copy: {
      leadDoctor: "Dr. Chandan Jain",
      leadDoctorCreds: "Implantologist · BDS, MDS Prosthodontics · MAMC New Delhi",
      experience: "10+ years",
      teamSize: 7,
      footerBlurb: "A specialist-led, technology-driven dental centre in Ludhiana. In-house CBCT, CAD/CAM and digital scanners, a dedicated implant operatory and a team of MDS specialists — led by Dr. Chandan Jain, Implantologist with over 10 years of experience.",
      heroChipLine: "Dedicated Implant Operatory · From ₹25,000 · Ludhiana",
      oneRoofLine: "No more being referred from clinic to clinic across Ludhiana. From routine checkups to CBCT-guided implants, full-mouth rehabilitation and root canal therapy, our implantologist, prosthodontist and endodontist work together within one advanced facility — sharing the same scans, the same records and the same treatment plan.",
      faqCbct: "A CBCT is a 3D scan of your jaw that shows exact bone height, width and the position of nerves and sinuses — detail an ordinary X-ray cannot give. Because our CBCT is in-house, your scan, diagnosis and treatment plan happen in the same visit, and Dr. Chandan Jain can plan the precise implant position in 3D before any surgery begins.",
      faqSpecialist: "MDS is a three-year postgraduate specialisation completed after the general BDS dental degree. Dr. Chandan Jain holds MDS qualifications in both Prosthodontics and Endodontics, and our team are MDS specialists trained at India's leading dental colleges. In practice it means your root canal is done by an endodontist and your crown by a prosthodontist — not by a generalist doing a bit of everything.",
      faqPricing: "Dental implants start from ₹25,000. The final cost depends on the implant system, the number of teeth being replaced, whether bone grafting is needed and the type of crown chosen. Every case is assessed individually on CBCT and you receive a clear, itemised quote before treatment begins — no surprises at the counter.",
      faqRootCanal: "Yes. Endodontics is one of our core specialisations — Dr. Chandan Jain is MDS in Endodontics, so root canal treatment, retreatment of failed root canals and complex or curved-canal cases are all handled in-house. If that tooth then needs a crown, the same team completes it with CAD/CAM, so nothing gets referred out or delayed.",
      faqTimingsLocation: "We are open Monday to Sunday, 10:00 AM to 8:00 PM — all seven days. The clinic is at 1533, New Prem Nagar, Ludhiana, near Las Vegas Club, close to PAU Gate No. 4 and Akaash Institute. Call 7011993633 or 9077700021 to book a consultation.",
    },
    // Real Google reviews from the Ludhiana GMB profile, quoted verbatim
    // (including the reviewers' own typos) — do not tidy the wording.
    reviews: [
      {
        name: "Talim ansari",
        initials: "T",
        title: "Second Opinion That Changed the Outcome",
        meta: "3 reviews · 9 months ago",
        review: "After a bad experience at another clinic, I came to iCube Dental for an implant consultation with Dr. Chandan Jain. The difference was huge - he listened carefully, explained all options, and used advanced technology during treatment. The entire process was smooth and painless. I would recommend him to everyone who wants a reliable and long-lasting implant."
      },
      {
        name: "Ishu",
        initials: "I",
        title: "Implants for My Mother — Natural-Looking Results",
        meta: "4 reviews · 9 months ago",
        review: "My mother got her dental implants done from Dr. Chandan Jain, and the experience was simply amazing. He was kind, patient, and explained all the do's and don'ts after surgery. The entire team at iCube Dental was supportive and caring. The results look natural we couldn't be happier!"
      },
      {
        name: "Tarun Bhattia",
        initials: "T",
        title: "Every Procedure Painless and Hassle-Free",
        meta: "4 reviews · 8 months ago",
        review: "The best dental treatment experience with Dr.Chandan & Dr.Deepika was amazing ..... i got my total procedures painless and hustle free ... kudos to the team of doctors and staff . On my personal experience i highly recommend I-Cube Dental Ludhiana."
      }
    ]
  },

  chandigarh: {
    slug: 'chandigarh',
    name: 'Chandigarh',
    city: 'Chandigarh',
    tagline: 'A complete implant ecosystem — in-house CBCT, six specialities and a separate implant surgical suite.',
    shortAddress: 'SCO 103, First Floor, Sector 35-C, Chandigarh – 160022',
    // ⚠️ Awaiting real Chandigarh clinic photography (Google Drive assets pending).
    cardImage: '',
    accent: '#8f6b2c',
    doctors: [
      {
        name: "Dr. Gaurav Varshney",
        title: "Implantologist | MDS Prosthodontics | Crown & Cosmetic Specialist — iCube Dental",
        image: "/Dr.-Gaurav-Varshney.webp",
        initials: "GV",
        description: "Dr. Gaurav Varshney is an MDS Prosthodontist, Implantologist and Cosmetic Dentist with over 13 years of clinical experience in implant, crown and full-mouth rehabilitation. He leads iCube Dental in Sector 35-C, Chandigarh — a premium, technology-driven multi-speciality centre built around in-house CBCT, digital intraoral scanners, four designated operatories and a separate surgical operatory used only for implant placement.",
        highlights: [
          "13+ years of specialist clinical experience",
          "MDS Prosthodontics · Implantologist · Crown specialist",
          "In-house CBCT + digital intraoral scanning",
          "Separate implant surgical operatory",
        ],
        footer: "Chandigarh is a full multi-speciality centre: prosthodontist, periodontist, endodontist, orthodontist, pedodontist and oral & maxillofacial surgeon all practise under one roof, supported by a team of 7 across four designated operatories — so a complex case never has to be referred elsewhere."
      }
    ],
    // ⚠️ Awaiting real clinic photography from the Chandigarh Google Drive folder.
    clinicImages: [],
    // Cases supplied by the Chandigarh clinic — square, already branded.
    beforeAfter: {
      aspect: '1 / 1',
      images: [
        { src: '/before-afterchd/chd-01-veneers.jpg', alt: 'Veneers case at iCube Dental Chandigarh — smile before and after treatment' },
        { src: '/before-afterchd/chd-02-veneers-full-mouth.jpg', alt: 'Full upper veneers case at iCube Dental Chandigarh — worn, discoloured teeth restored' },
        { src: '/before-afterchd/chd-03-crowns.jpg', alt: 'Crown and cosmetic rehabilitation at iCube Dental Chandigarh — before and after' },
        { src: '/before-afterchd/chd-04-implants.jpg', alt: 'Full mouth dental implant rehabilitation at iCube Dental Chandigarh — before and after with OPG scan' },
      ],
    },
    contact: {
      phones: ["9077700020"],
      timings: "Mon–Sat: 9:45 AM – 8 PM",
      daysLine: "Open Monday to Saturday",
      address: "SCO 103, First Floor, Sector 35-C | Above Swarn Ganga / Sunder Jewellers Block | Chandigarh – 160022",
      email: "icubedentalchd@gmail.com",
      googleMapEmbed: "https://www.google.com/maps?q=iCube+Dental+SCO+103+Sector+35C+Chandigarh&output=embed",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=iCube+Dental+SCO+103+Sector+35C+Chandigarh"
    },
    // Handles taken from the practice's own site footer (icubedental.com).
    // Kept separate from Ludhiana's @icube_dental, whose bio reads
    // "iCube Dental | Ludhiana" — the two branches run different accounts.
    social: {
      instagram: "https://www.instagram.com/icubedentalchd/",
      facebook: "https://www.facebook.com/icubedentalchd",
    },
    schema: {
      streetAddress: "SCO 103, First Floor, Sector 35-C",
      addressLocality: "Chandigarh",
      addressRegion: "CH",
      postalCode: "160022",
      openingHours: "Mo-Sa 09:45-20:00",
    },
    usps: [
      "In-house CBCT — not charged if you proceed with the implant",
      "Separate implant surgical operatory",
      "Six dental specialities under one roof",
      "Single-day crowns with digital scanners & CAD/CAM",
      "GBT machine for advanced, comfortable scaling"
    ],
    pricing: {
      implant: "₹25,000 onwards*"
    },
    heroTitle: "Advanced Implant & Multi-Speciality Dental Care in Chandigarh",
    // Brand-level case film, shown here at the client's direction until
    // Chandigarh supplies its own. Note the surgeon on screen is Dr. Chandan
    // Jain (Ludhiana), not Dr. Gaurav Varshney — the film's own end card names
    // both cities, so it runs as iCube brand content rather than branch footage.
    heroVideo: "/icube-full-mouth-case.mp4",
    heroPoster: "/icube-full-mouth-case-poster.webp",
    // ⚠️ Awaiting the VSL film. Empty keeps the block off the page entirely.
    vsl: {
      src: "",
      poster: "",
      kicker: "Watch: inside our Sector 35 implant suite",
    },
    card: {
      badge: "COSMETIC LEAD",
      image: "/Dr.-Gaurav-Varshney.webp",
      stats: [
        { value: "13+", label: "YEARS" },
        { value: "6", label: "SPECIALITIES" },
        { value: "4 Ops", label: "OPERATORIES" },
      ],
      chips: ["Implants", "Veneers", "Aligners", "Full-mouth"],
      daysUpper: "MONDAY–SATURDAY",
    },
    pa: {
      heroTitle: "ਚੰਡੀਗੜ੍ਹ ਵਿੱਚ ਲਜ਼ਰੀ ਡੈਂਟਲ ਕੇਅਰ ਅਤੇ ਇੰਪਲਾਂਟ ਸੈਂਟਰ",
      heroSub: "ਸੈਕਟਰ 35-C ਵਿੱਚ ਛੇ ਸਪੈਸ਼ਲਿਟੀਆਂ, ਚਾਰ ਓਪਰੇਟਰੀਆਂ ਅਤੇ ਇੰਪਲਾਂਟ ਲਈ ਵੱਖਰਾ ਸਰਜੀਕਲ ਸੂਟ।",
      usps: [
        "ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT 3D ਸਕੈਨ",
        "ਇੰਪਲਾਂਟ ਲਈ ਵੱਖਰੀ ਸਰਜੀਕਲ ਓਪਰੇਟਰੀ",
        "6 ਸਪੈਸ਼ਲਟੀਆਂ ਇੱਕੋ ਛੱਤ ਹੇਠ",
        "CBCT ਇੰਪਲਾਂਟ ਕਰਾਉਣ ਤੇ ਮੁਫ਼ਤ",
      ],
      offer: "ਡੈਂਟਲ ਇੰਪਲਾਂਟ ₹25,000 ਤੋਂ ਸ਼ੁਰੂ · 80/20 ਕਿਸ਼ਤਾਂ ਸਹੂਲਤ",
      trust: "ਸੋਮਵਾਰ ਤੋਂ ਸ਼ਨੀਵਾਰ · ਸਵੇਰੇ 9:45 ਤੋਂ ਰਾਤ 8 ਵਜੇ ਤੱਕ",
    },
    copy: {
      leadDoctor: "Dr. Gaurav Varshney",
      leadDoctorCreds: "Implantologist · MDS Prosthodontics · Crown Specialist",
      experience: "13+ years",
      teamSize: 7,
      footerBlurb: "A premium, technology-driven multi-speciality implant centre in Sector 35-C, Chandigarh. In-house CBCT, digital scanners, a GBT machine, four designated operatories and a separate implant surgical suite — led by Dr. Gaurav Varshney, MDS Prosthodontist and Implantologist with 13+ years of experience.",
      heroChipLine: "Separate Implant Surgical Suite · From ₹25,000 · Chandigarh",
      oneRoofLine: "No more being referred from clinic to clinic across Chandigarh. Prosthodontics, periodontics, endodontics, orthodontics, pedodontics and oral & maxillofacial surgery all practise in the same centre — sharing the same CBCT scans, the same records and the same treatment plan, across four designated operatories.",
      faqCbct: "A CBCT is a 3D scan of your jaw that shows exact bone height, width and the position of nerves and sinuses — detail an ordinary X-ray cannot give. Because our CBCT is in-house, your scan, diagnosis and treatment plan happen in the same visit, and Dr. Gaurav Varshney can plan the precise implant position in 3D before any surgery begins. If you go ahead with implant treatment, the CBCT taken during the procedure is not charged.",
      faqSpecialist: "MDS is a three-year postgraduate specialisation completed after the general BDS dental degree. Dr. Gaurav Varshney is an MDS Prosthodontist and Implantologist, and the Chandigarh centre has a full specialist team — periodontist, endodontist, orthodontist, pedodontist and an oral & maxillofacial surgeon. In practice it means your root canal is done by an endodontist and your crown by a prosthodontist — not by a generalist doing a bit of everything.",
      faqPricing: "Dental implants start from ₹25,000. The final cost depends on the implant system, the number of teeth being replaced, whether bone grafting is needed and the type of crown chosen. Every case is assessed on CBCT first and you receive a clear, itemised quote before treatment begins. We also offer an 80/20 part-payment plan, and the CBCT taken during your implant procedure is not charged if you go ahead with the treatment.",
      faqRootCanal: "Yes. We have an MDS endodontist in-house, so root canal treatment, retreatment of failed root canals and complex or curved-canal cases are all handled here. If that tooth then needs a crown, our digital scanners and CAD/CAM workflow can deliver it as a single-day crown, so nothing gets referred out or delayed.",
      faqTimingsLocation: "We are open Monday to Saturday, 9:45 AM to 8:00 PM. The clinic is at SCO 103, First Floor, Sector 35-C, Chandigarh – 160022, above the Swarn Ganga / Sunder Jewellers block. Call 9077700020 to book a consultation.",
    },
    // Real Google reviews from the Chandigarh GMB profile, quoted verbatim
    // (including the reviewers' own typos) — do not tidy the wording.
    reviews: [
      {
        name: "Gurpreet Grewal",
        initials: "G",
        title: "Smile Makeover with Implants & Crowns",
        meta: "3 reviews · 3 photos · 3 months ago",
        review: "Smile designing was a dream for me until i met Dr gaurav … I am more confident with my smile makeover using dental implants and beautiful crowns. I have undergone root canal treatment also which was totally painless and so smooth that i didnt feel a thing!! Highly recommended for perfect dental care in tricity. The staff is so overwhelming that overall experience was awesome"
      },
      {
        name: "Tajinder kaur",
        initials: "T",
        title: "Same-Visit Extraction & Implant — Painless",
        meta: "1 review · 1 photo · 3 months ago",
        review: "Immediate tooth removal followed by a dental implant and that too totally painless…RCT and zirconia crowns all went smooth wonderful experi nce best dental clinic for all dental related treatments plus they have latest machines and cbct must visit to experience the difference in latest modern dentistry"
      },
      {
        name: "Saroj Sharma",
        initials: "S",
        title: "Root Canal — Calm, Clearly Explained Care",
        meta: "1 review · 1 photo · 7 months ago",
        review: "My mother recently underwent RCT at this dental clinic, and we are very satisfied with the treatment. Dr. Priyanka was highly skilled, patient, and explained every step clearly, which really helped ease her anxiety. The staff were also caring and supportive throughout the process. The clinic was clean and well-maintained, and we truly appreciate the excellent care provided. I highly recommend it to anyone looking for quality dental treatment. All thanks to Dr. Priyanka and her staff as well 😜🥰"
      }
    ]
  }
};

/** Display order for the branch chooser and footers. */
export const branchList: BranchConfig[] = [branches.ludhiana, branches.chandigarh];
