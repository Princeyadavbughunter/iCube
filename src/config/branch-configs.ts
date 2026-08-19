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
  heroVideo: string;
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
        title: "Implantologist | MDS Prosthodontics | MDS Endodontics — I Cube Dental",
        image: "/Dr.-Chandan-Jain.webp",
        initials: "CJ",
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
    // ⚠️ Awaiting real clinic photography — the /images/clinic-*.jpeg files in this
    // repo are a previous client's premises and must not be used here.
    clinicImages: [],
    contact: {
      phones: ["7011993633", "9077700021"],
      timings: "Mon–Sun: 10 AM – 8 PM",
      daysLine: "Open all 7 days",
      address: "1533, New Prem Nagar | Near Las Vegas Club · PAU Gate No. 4 · Akaash Institute | Ludhiana, Punjab – 141001",
      email: "drcjain1@gmail.com",
      googleMapEmbed: "https://www.google.com/maps?q=I+Cube+Dental+New+Prem+Nagar+Ludhiana&output=embed",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=I+Cube+Dental+New+Prem+Nagar+Ludhiana"
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
    heroVideo: "/clinic4.mp4",
    copy: {
      leadDoctor: "Dr. Chandan Jain",
      leadDoctorCreds: "Implantologist · MDS Prosthodontics · MDS Endodontics",
      experience: "14 years",
      teamSize: 7,
      footerBlurb: "A specialist-led, technology-driven dental centre in Ludhiana. In-house CBCT, CAD/CAM and digital scanners, a dedicated implant operatory and a team of MDS specialists — led by Dr. Chandan Jain, Implantologist with 14 years of experience.",
      heroChipLine: "Dedicated Implant Operatory · From ₹25,000 · Ludhiana",
      oneRoofLine: "No more being referred from clinic to clinic across Ludhiana. From routine checkups to CBCT-guided implants, full-mouth rehabilitation and root canal therapy, our implantologist, prosthodontist and endodontist work together within one advanced facility — sharing the same scans, the same records and the same treatment plan.",
      faqCbct: "A CBCT is a 3D scan of your jaw that shows exact bone height, width and the position of nerves and sinuses — detail an ordinary X-ray cannot give. Because our CBCT is in-house, your scan, diagnosis and treatment plan happen in the same visit, and Dr. Chandan Jain can plan the precise implant position in 3D before any surgery begins.",
      faqSpecialist: "MDS is a three-year postgraduate specialisation completed after the general BDS dental degree. Dr. Chandan Jain holds MDS qualifications in both Prosthodontics and Endodontics, and our team are MDS specialists trained at India's leading dental colleges. In practice it means your root canal is done by an endodontist and your crown by a prosthodontist — not by a generalist doing a bit of everything.",
      faqPricing: "Dental implants start from ₹25,000. The final cost depends on the implant system, the number of teeth being replaced, whether bone grafting is needed and the type of crown chosen. Every case is assessed individually on CBCT and you receive a clear, itemised quote before treatment begins — no surprises at the counter.",
      faqRootCanal: "Yes. Endodontics is one of our core specialisations — Dr. Chandan Jain is MDS in Endodontics, so root canal treatment, retreatment of failed root canals and complex or curved-canal cases are all handled in-house. If that tooth then needs a crown, the same team completes it with CAD/CAM, so nothing gets referred out or delayed.",
      faqTimingsLocation: "We are open Monday to Sunday, 10:00 AM to 8:00 PM — all seven days. The clinic is at 1533, New Prem Nagar, Ludhiana, near Las Vegas Club, close to PAU Gate No. 4 and Akaash Institute. Call 7011993633 or 9077700021 to book a consultation.",
    },
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
        // ⚠️ No photograph supplied for the Chandigarh branch yet — a monogram is
        // rendered until one is added to /public. Do not substitute a stock image.
        image: "",
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
    contact: {
      phones: ["9077700020"],
      timings: "Mon–Sat: 9:45 AM – 8 PM",
      daysLine: "Open Monday to Saturday",
      address: "SCO 103, First Floor, Sector 35-C | Above Swarn Ganga / Sunder Jewellers Block | Chandigarh – 160022",
      email: "icubedentalchd@gmail.com",
      googleMapEmbed: "https://www.google.com/maps?q=iCube+Dental+SCO+103+Sector+35C+Chandigarh&output=embed",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=iCube+Dental+SCO+103+Sector+35C+Chandigarh"
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
    heroVideo: "",
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
    // ⚠️ PLACEHOLDER REVIEWS — the Chandigarh GMB profile exists but its real reviews
    // have not been supplied. Replace these with genuine Google reviews before launch.
    reviews: [
      {
        name: "Ankit Sharma",
        initials: "A",
        title: "Implant Planned on In-House CBCT",
        meta: "Local Guide · 11 reviews · 1 month ago",
        review: "Consulted a few places in Sector 35 before choosing iCube Dental. Dr. Gaurav Varshney did the CBCT right there in the clinic and showed me the bone and nerve position on screen before planning the implant. The implant surgery happens in a separate operatory, which reassured me a lot. Painless procedure and a crown that fits perfectly."
      },
      {
        name: "Neha Bansal",
        initials: "N",
        title: "Single-Day Crown — Done in One Sitting",
        meta: "Local Guide · 6 reviews · 2 months ago",
        review: "I needed a crown and was expecting two or three visits. The digital scanner meant no messy impressions, and the crown was ready and fitted the same day. Dr. Gaurav Varshney explained every step and the pricing was clear upfront. The clinic is genuinely well-equipped — easily among the best setups in Chandigarh."
      },
      {
        name: "Rajeev Khanna",
        initials: "R",
        title: "Full Mouth Rehab — Every Specialist In One Place",
        meta: "8 reviews · 3 months ago",
        review: "My case needed a periodontist, an endodontist and a prosthodontist. At iCube Dental all three were in the same practice, so nothing got handed off or delayed and everyone worked off the same scans. Four operatories means appointments actually run on time. Very happy with the result and the follow-up care."
      }
    ]
  }
};

/** Display order for the branch chooser and footers. */
export const branchList: BranchConfig[] = [branches.ludhiana, branches.chandigarh];
