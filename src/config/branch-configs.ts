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
  /**
   * Photographs behind the hero, shown as a slider.
   *
   * One entry renders as a still — the slider only starts moving, and only
   * draws its dots, when there is more than one. Leave the list empty and the
   * hero falls back to the first `clinicImages` entry, then to the awaiting-
   * photography placeholder, so a branch without its own shoot is never
   * illustrated with another practice's premises.
   */
  heroSlides: { src: string; alt: string }[];
  clinicImages: { src: string; alt: string }[];
  /**
   * Clinic-supplied result photos for this branch. Each file is already a
   * composed before/after case, so the section renders them whole — no split,
   * divider or overlay labels. `aspect` is a CSS aspect-ratio matching the
   * supplied files (they differ per branch), so nothing gets cropped.
   */
  beforeAfter: {
    /** Default CSS aspect-ratio for the cards, matching most of the files. */
    aspect: string;
    /**
     * `aspect` overrides the default for a file shot at a different ratio.
     * The cards are cropped to fill, and these composites carry the clinic's
     * logo and caption across the top, so a wrong ratio cuts the branding off.
     */
    images: { src: string; alt: string; aspect?: string }[];
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
  /**
   * The credentials shown in the implant page's trust bar. Four or six — the
   * bar lays out three per row when there are six, four across when there are
   * four, so any other count will leave a ragged last row.
   *
   * Mostly qualifications and team size. Any treatment-volume figure here is
   * one the practice has supplied and must be able to stand behind: a number
   * on a medical page is a claim, so nothing goes in that the clinic has not
   * confirmed.
   */
  implantStats: { value: string; label: string }[];
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
   * Footage of the premises themselves, for the "inside the clinic" section.
   *
   * Deliberately separate from `heroVideo`: Chandigarh's hero runs a case
   * film, and labelling a treatment montage as a tour of the building would be
   * a lie about what the visitor is looking at. An empty list hides the
   * section rather than filling it with something that is not the building.
   */
  clinicTour: { src: string; poster: string; label: string }[];
  /**
   * Filmed patient testimonials for the "Patient Stories" section. Muted,
   * looping cards that play with sound on tap — see VideoStories for the
   * playback behaviour. `country` is an ISO 3166-1 alpha-2 code (e.g. "AU"),
   * shown as a flag badge; omit it for a patient whose home country was not
   * supplied. `name` is only set where the patient is named on screen.
   */
  videoTestimonials: { src: string; poster: string; length: string; name?: string; country?: string }[];
  /**
   * Full-mouth transformation films — its own row because these cases are the
   * headline result, not just one testimonial among several. Same shape and
   * playback behaviour as `videoTestimonials`. Empty hides the section, so
   * this can be wired up ahead of the footage arriving.
   */
  fullMouthCaseVideos: { src: string; poster: string; length: string; name?: string; country?: string }[];
  /**
   * Long-term follow-up films — patients treated years ago, back on camera,
   * proving the work held up rather than just looking good on day one. Same
   * shape as `videoTestimonials`, plus `years`: how long the patient has been
   * with the practice, shown as a gold badge. Only set where the clinic
   * stated it — leave it off rather than guess. Empty hides the section.
   */
  followUpVideos: { src: string; poster: string; length: string; name?: string; country?: string; years?: number }[];
  /**
   * Reasons an out-of-town or international patient would choose this branch
   * specifically, for the dental-tourism section. Empty hides the section —
   * a branch with nothing to say here should say nothing rather than filler.
   */
  dentalTourism: { title: string; body: string }[];
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
    /**
     * Credential line under the player. Falls back to the lead doctor's full
     * title when empty — set it only where the film needs a shorter, punchier
     * line than the doctor's profile card carries.
     */
    creds?: string;
    /**
     * One highlighted line under the credentials, for a credential that earns
     * its own emphasis. Rendered in a gold pill with a slow sweep of light.
     * Empty or omitted hides it — keep it to a single claim, since a second
     * flashing line would cancel out the first.
     */
    flashLine?: string;
  };
  /** Card presentation on the branch chooser. */
  card: {
    /** Corner badge, e.g. "IMPLANT & COSMETIC LEAD". */
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
        image: "/doctors/dr-chandan-jain.webp",
        initials: "CJ",
        description: "Dr. Chandan Jain is a specialist Implantologist and Prosthodontist — MDS from MAMC New Delhi and a Diplomate of WCOI Japan in implantology — with over 14 years of clinical experience in advanced implant and restorative dentistry. He leads I Cube Dental in New Prem Nagar, Ludhiana — a technology-driven, specialist-led dental centre equipped with in-house CBCT, CAD/CAM and digital intraoral scanners, plus a dedicated implant operatory built specifically for surgical precision and sterility.",
        highlights: [
          "14+ years of specialist clinical experience",
          "MDS Prosthodontics — MAMC New Delhi",
          "In-house CBCT + digital intraoral scanning",
          "Dedicated, purpose-built implant operatory",
        ],
        footer: "Every case at I Cube Dental is diagnosed, planned and delivered by MDS specialists trained at India's top dental colleges — a team of 7 working within one advanced facility, so your treatment stays under specialist supervision from the first scan to the final restoration."
      }
    ],
    // Real premises photography. Sections consume this in order, so the first
    // photo supplied lands in the treatment-process block and later ones fill
    // why-us and the closing CTA.
    // ⚠️ The /images/clinic-*.jpeg files in this repo are a previous client's
    // premises (OM Sai Dental) and must never be used here.
    heroSlides: [
      {
        src: '/hero/ldh-hero-01-reception.jpg',
        alt: 'The reception desk at I Cube Dental Ludhiana, beneath the illuminated iC logo',
      },
      {
        src: '/hero/ldh-hero-02-reception-team.jpg',
        alt: 'Dr. Chandan Jain with a patient at the reception area of I Cube Dental Ludhiana',
      },
      {
        src: '/hero/ldh-hero-03-clinic-entrance.jpg',
        alt: 'The clinic entrance at I Cube Dental Ludhiana, beside the treatments wall — implants, Invisalign, in-house CBCT, CAD/CAM and single-sitting RCT',
      },
      {
        src: '/hero/ldh-hero-04-consultation.jpg',
        alt: 'Dr. Chandan Jain with a patient in the consultation room at I Cube Dental Ludhiana',
      },
      {
        src: '/hero/ldh-hero-05-treatment-chair.jpg',
        alt: 'Dr. Chandan Jain with a patient in the treatment chair at I Cube Dental Ludhiana',
      },
      {
        src: '/hero/ldh-hero-06-patient-care.jpg',
        alt: 'Dr. Chandan Jain with a patient at I Cube Dental Ludhiana',
      },
      {
        src: '/hero/ldh-hero-07-award.jpg',
        alt: 'Dr. Chandan Jain accepting an award for I Cube Dental on stage',
      },
      {
        src: '/hero/ldh-hero-08-invisalign.jpg',
        alt: 'Dr. Chandan Jain and team with an Invisalign patient at I Cube Dental Ludhiana',
      },
    ],
    clinicImages: [
      {
        src: '/clinic/consultation-room.webp',
        alt: 'Consultation room at I Cube Dental Ludhiana, beside the treatments wall — implants, Invisalign, in-house CBCT, CAD/CAM and single-sitting RCT',
      },
    ],
    beforeAfter: {
      aspect: '4 / 3',
      images: [
        { src: '/before-after/ldh-01-full-mouth-implants.jpg', alt: 'Full-mouth dental implant result at I Cube Dental Ludhiana — badly worn, decayed upper and lower teeth restored to a complete smile' },
        { src: '/before-after/ldh-02-full-mouth-implants-opg.jpg', aspect: '1 / 1', alt: 'Full-mouth implant rehabilitation at I Cube Dental Ludhiana, shown with the patient’s OPG scan of the placed implants and fixed bridges' },
        { src: '/before-after/ldh-03-implants.jpg', alt: 'Dental implant result at I Cube Dental Ludhiana — an elderly patient with missing upper teeth restored to a full smile' },
        { src: '/before-after/ldh-04-implants.jpg', alt: 'Dental implant result at I Cube Dental Ludhiana — missing front teeth replaced with fixed implant teeth' },
        { src: '/before-after/ldh-05-implants.jpg', aspect: '5 / 4', alt: 'Dental implant result at I Cube Dental Ludhiana — gaps from missing teeth closed with fixed implant teeth' },
        { src: '/before-after/ldh-06-implants.jpg', alt: 'Dental implant result at I Cube Dental Ludhiana — a patient with missing upper teeth restored to an even, natural smile' },
        { src: '/before-after/ldh-07-implants.jpg', alt: 'Dental implant result at I Cube Dental Ludhiana — an elderly patient who could not show her teeth, restored to a full smile' },
        { src: '/before-after/ldh-08-implants.jpg', alt: 'Dental implant result at I Cube Dental Ludhiana — worn and missing front teeth rebuilt' },
        { src: '/before-after/ldh-09-implants.jpg', aspect: '1 / 1', alt: 'Dental implant result at I Cube Dental Ludhiana — an elderly patient with missing upper teeth restored to a confident smile' },
        { src: '/before-after/ldh-10-smile-makeover.jpg', alt: 'Smile makeover at I Cube Dental Ludhiana — discoloured, uneven front teeth restored to an even, natural smile' },
        { src: '/before-after/ldh-11-smile-makeover.jpg', aspect: '1 / 1', alt: 'Smile makeover at I Cube Dental Ludhiana — a patient’s smile restored to a natural, even set of teeth' },
        { src: '/before-after/ldh-12-full-mouth-rehab.jpg', alt: 'Full-mouth rehabilitation at I Cube Dental Ludhiana — an elderly patient with missing and worn teeth restored to a complete smile' },
        { src: '/before-after/ldh-13-implants-opg.jpg', alt: 'Dental implant result at I Cube Dental Ludhiana, shown with the patient’s OPG scan of the placed implants' },
        { src: '/before-after/ldh-14-full-mouth-implants.jpg', alt: 'Full-mouth dental implant result at I Cube Dental Ludhiana — badly worn and missing teeth restored to a complete smile' },
        { src: '/before-after/ldh-15-implants-opg-2.jpg', alt: 'Full-mouth dental implant result at I Cube Dental Ludhiana, shown with the patient’s OPG scan of the placed implants' },
        { src: '/before-after/ldh-16-smile-makeover.png', aspect: '4 / 5', alt: 'Smile makeover at I Cube Dental Ludhiana — an elderly patient’s missing and worn front teeth restored to a full, confident smile' },
      ],
    },
    contact: {
      phones: ["9077700021"],
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
    implantStats: [
      { value: "14+ Years", label: "Specialist implant experience" },
      { value: "1000+", label: "Full-mouth implants completed" },
      { value: "MDS · MAMC", label: "India's No. 1 dental college" },
      { value: "WCOI Japan", label: "Diplomate in implantology" },
      { value: "7 Specialists", label: "One roof, one treatment plan" },
      { value: "Award-Winning", label: "Dental chain, awarded by VOH" },
    ],
    pricing: {
      implant: "₹25,000 onwards*"
    },
    heroTitle: "Advanced Implant & Specialist Dental Care in Ludhiana",
    heroVideo: "/hero-ludhiana.mp4",
    heroPoster: "/hero-ludhiana-poster.webp",
    // Shot at the Ludhiana premises. The camera recorded these sideways, so
    // the web copies in public/clinic are rotated upright and re-encoded from
    // ~270 MB of camera originals; the originals stay out of the repo.
    clinicTour: [
      {
        src: "/clinic/clinic-reception.mp4",
        poster: "/clinic/clinic-reception-poster.webp",
        label: "Reception and waiting lounge",
      },
      {
        src: "/clinic/clinic-cbct-room.mp4",
        poster: "/clinic/clinic-cbct-room-poster.webp",
        label: "The CBCT scan room",
      },
      {
        src: "/clinic/clinic-cbct-machine.mp4",
        poster: "/clinic/clinic-cbct-machine-poster.webp",
        label: "Our in-house CBCT scanner",
      },
      {
        src: "/clinic/clinic-treatment-room.mp4",
        poster: "/clinic/clinic-treatment-room-poster.webp",
        label: "A treatment operatory",
      },
    ],
    videoTestimonials: [
      {
        src: '/testimonal/testimonial-01.mp4',
        poster: '/testimonal/testimonial-01-poster.webp',
        length: '0:35',
      },
      {
        src: '/testimonal/testimonial-02.mp4',
        poster: '/testimonal/testimonial-02-poster.webp',
        length: '0:51',
      },
      {
        src: '/testimonal/testimonial-03.mp4',
        poster: '/testimonal/testimonial-03-poster.webp',
        length: '0:57',
      },
      {
        src: '/testimonal/testimonial-04.mp4',
        poster: '/testimonal/testimonial-04-poster.webp',
        length: '0:59',
      },
    ],
    fullMouthCaseVideos: [],
    followUpVideos: [],
    dentalTourism: [],
    // Brand VSL — Dr. Chandan Jain to camera, with CAD/CAM and implant b-roll.
    // The end card names both cities, so the same film runs on both branches.
    vsl: {
      src: "/vsl-icube.mp4",
      poster: "/vsl-icube-poster.webp",
      kicker: "Watch: how we plan an implant on CBCT",
      creds: "Chief Implantologist | MDS | WCOI Japan",
      flashLine: "Mentored by Padma Shri Dr. Mahesh Verma",
    },
    card: {
      badge: "IMPLANT & COSMETIC LEAD",
      image: "/doctors/dr-chandan-jain.webp",
      stats: [
        { value: "14+", label: "YEARS" },
        { value: "MAMC", label: "NEW DELHI" },
        { value: "7 Days", label: "OPEN" },
      ],
      chips: ["Implants", "Painless RCT", "Crowns", "Veneers", "Aligners", "Full-mouth"],
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
      experience: "14+ years",
      teamSize: 7,
      footerBlurb: "A specialist-led, technology-driven dental centre in Ludhiana. In-house CBCT, CAD/CAM and digital scanners, a dedicated implant operatory and a team of MDS specialists — led by Dr. Chandan Jain, Implantologist with over 14 years of experience.",
      heroChipLine: "Dedicated Implant Operatory · From ₹25,000 · Ludhiana",
      oneRoofLine: "No more being referred from clinic to clinic across Ludhiana. From routine checkups to CBCT-guided implants, full-mouth rehabilitation and root canal therapy, our implantologist, prosthodontist and endodontist work together within one advanced facility — sharing the same scans, the same records and the same treatment plan.",
      faqCbct: "A CBCT is a 3D scan of your jaw that shows exact bone height, width and the position of nerves and sinuses — detail an ordinary X-ray cannot give. Because our CBCT is in-house, your scan, diagnosis and treatment plan happen in the same visit, and Dr. Chandan Jain can plan the precise implant position in 3D before any surgery begins.",
      faqSpecialist: "MDS is a three-year postgraduate specialisation completed after the general BDS dental degree. Dr. Chandan Jain holds MDS qualifications in both Prosthodontics and Endodontics, and our team are MDS specialists trained at India's leading dental colleges. In practice it means your root canal is done by an endodontist and your crown by a prosthodontist — not by a generalist doing a bit of everything.",
      faqPricing: "Dental implants start from ₹25,000. The final cost depends on the implant system, the number of teeth being replaced, whether bone grafting is needed and the type of crown chosen. Every case is assessed individually on CBCT and you receive a clear, itemised quote before treatment begins — no surprises at the counter.",
      faqRootCanal: "Yes. Endodontics is one of our core specialisations — Dr. Chandan Jain is MDS in Endodontics, so root canal treatment, retreatment of failed root canals and complex or curved-canal cases are all handled in-house. If that tooth then needs a crown, the same team completes it with CAD/CAM, so nothing gets referred out or delayed.",
      faqTimingsLocation: "We are open Monday to Sunday, 10:00 AM to 8:00 PM — all seven days. The clinic is at 1533, New Prem Nagar, Ludhiana, near Las Vegas Club, close to PAU Gate No. 4 and Akaash Institute. Call 9077700021 to book a consultation.",
    },
    // Real Google reviews from the Ludhiana GMB profile, quoted verbatim
    // (including the reviewers' own typos) — do not tidy the wording.
    reviews: [
      {
        name: "Tarun Bhattia",
        initials: "T",
        title: "Every Procedure Painless and Hassle-Free",
        meta: "4 reviews · 9 months ago",
        review: "The best dental treatment experience with Dr.Chandan & Dr.Deepika was amazing ..... i got my total procedures painless and hustle free ... kudos to the team of doctors and staff . On my personal experience i highly recommend I-Cube Dental Ludhiana."
      },
      {
        name: "Ishu",
        initials: "I",
        title: "Implants for My Mother — Natural-Looking Results",
        meta: "5 reviews · 10 months ago",
        review: "My mother got her dental implants done from Dr. Chandan Jain, and the experience was simply amazing. He was kind, patient, and explained all the do's and don'ts after surgery. The entire team at iCube Dental was supportive and caring. The results look natural we couldn't be happier!"
      },
      {
        name: "Jyoti Jain",
        initials: "J",
        title: "Professional, Organised and Spotlessly Clean",
        meta: "2 reviews · 2 weeks ago",
        review: "I visited here from Google with my parents for regular checkup, The ambience the staff, cleanliness, everything seemed so professional and organised ...I was extremely thrilled by there experience...I would highly recommend everyone to do visit I cube dental for any dental issue .."
      },
      {
        name: "Talim ansari",
        initials: "T",
        title: "Second Opinion That Changed the Outcome",
        meta: "3 reviews · 10 months ago",
        review: "After a bad experience at another clinic, I came to iCube Dental for an implant consultation with Dr. Chandan Jain. The difference was huge - he listened carefully, explained all options, and used advanced technology during treatment. The entire process was smooth and painless. I would recommend him to everyone who wants a reliable and long-lasting implant."
      },
      {
        name: "Prabhudayal Prabhudayal",
        initials: "P",
        title: "Economical, and So Beautifully Made",
        meta: "1 review · 6 months ago",
        review: "I had great experience here,what an amazing clinic and so beautifully made 👍😍🤩\nI would highly recommend and they are quite economical as par their standards, 👌😍🤩\nHats off dr chandan and dr deepika for building such an amazing dental clinic,I took many pics here it's hard not click this beauty,👍😍\nAttaching one of them 😍👍😍🥰🤩"
      },
      {
        name: "Abhinav Parasher",
        initials: "A",
        title: "3 Implants for My Doctor Father — Flawless From Start to End",
        meta: "Local Guide · 25 reviews · 3 weeks ago",
        review: "My dad, a doctor himself, needed 3 implants. After consulting a few very well known names in the field in Ludhiana he took a consultation at ICube dental. I was accompanying him during this time.\n\nThe experience at iCube was fabulous from start to the end. Xrays were taken, in-house CBCT was a blessing and finally a treatment plan was finalised. Things progressed according to the flow and 3 xray's were taken, one before, one during and one after the procedure which were shown to us once the first part (implanting) of the procedure was done. The implants were flawlessly placed by Dr. Jain. My dad also needed bone grafting and that too was done during the implant process.\n\nLuckily and ofcourse due to the skill of the doctor, there was no abscess, infection or drainage post procedure which sometimes does happen due to the bone grafting process.\n\nIn the end, the various types of dental crowns were very patiently explained to us, the materials, pros and cons of each and the cost which was very important in the decision making process on our end. A 3D scan of the interiors of the mouth was taken to ensure that the crowns fir perfectly.\n\nIn the end, all went smoothly, the clinic was nice, the staff were decent and Dr. Jain himself was extremely courteous, friendly and professional. His way of dealing went a very long way in ensuring our trust in him. A comparatively young doctor, but one that easily matches and even outshines much older peers in his field.\n\nWish you the best, Dr. Jain."
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
      },
      {
        name: "Dr. Priyanka Sharma",
        title: "Endodontist | Root Canal Specialist — iCube Dental Chandigarh",
        image: "/Dr.-Priyanka-Sharma.webp",
        initials: "PS",
        description: "Dr. Priyanka Sharma is our in-house Endodontist and Root Canal Specialist at iCube Dental Chandigarh. Known for her calm, patient-centred approach, she takes time to explain every step of the treatment — helping anxious patients feel at ease throughout the procedure. Her expertise covers routine root canal therapy, retreatment of failed root canals and complex multi-canal cases, all handled in-house with the latest rotary instrumentation.",
        highlights: [
          "Root canal treatment & retreatment specialist",
          "Calm, patient-centred approach",
          "Complex & curved-canal case expertise",
          "Single-sitting RCT with latest rotary instruments",
        ],
        footer: "Patients consistently commend Dr. Priyanka for her ability to make even anxious patients feel comfortable and informed — turning what is often a dreaded procedure into a smooth, painless experience."
      }
    ],
    // ⚠️ Awaiting real clinic photography from the Chandigarh Google Drive folder.
    heroSlides: [
      {
        src: '/chdHero/chd-hero-01-invisalign.webp',
        alt: 'Dr. Priyanka Sharma and Dr. Gaurav Varshney with an Invisalign patient at iCube Dental Chandigarh',
      },
      {
        src: '/chdHero/chd-hero-02-entrance.jpg',
        alt: 'Dr. Priyanka Sharma with a patient’s family at the entrance of iCube Dental Chandigarh',
      },
      {
        src: '/chdHero/chd-hero-03-team.jpg',
        alt: 'The team at iCube Dental Chandigarh, beneath the illuminated iC logo',
      },
      {
        src: '/chdHero/chd-hero-04-doctors-patient.jpg',
        alt: 'Dr. Gaurav Varshney and Dr. Priyanka Sharma with a patient at iCube Dental Chandigarh',
      },
      {
        src: '/chdHero/chd-hero-05-procedure.jpg',
        alt: 'The clinical team performing a procedure at iCube Dental Chandigarh',
      },
      {
        src: '/chdHero/chd-hero-06-team-treatment.jpg',
        alt: 'Dr. Gaurav Varshney and the clinical team with a patient in the treatment room at iCube Dental Chandigarh',
      },
    ],
    clinicImages: [],
    // Cases supplied by the Chandigarh clinic, composed into before/after pairs.
    beforeAfter: {
      aspect: '3 / 2',
      images: [
        { src: '/before-afterchd/chd-01-veneers.jpg', alt: 'Crown restoration at iCube Dental Chandigarh — decayed, blackened teeth restored to a clean, even smile' },
        { src: '/before-afterchd/chd-02-full-mouth-rehab.jpg', alt: 'Full-mouth rehabilitation at iCube Dental Chandigarh — an elderly patient with missing teeth restored to a complete smile' },
        { src: '/before-afterchd/chd-03-smile-makeover.jpg', alt: 'Smile makeover at iCube Dental Chandigarh — crowded, discoloured teeth restored to an even, natural smile' },
        { src: '/before-afterchd/chd-04-full-mouth-restoration.jpg', alt: 'Full-mouth restoration at iCube Dental Chandigarh — badly worn and damaged teeth restored to a complete smile' },
        { src: '/before-afterchd/chd-05-implants.jpg', alt: 'Dental implant result at iCube Dental Chandigarh — missing upper front teeth restored to a full, confident smile' },
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
    implantStats: [
      { value: "13+ Years", label: "Specialist implant experience" },
      { value: "MDS Prosthodontics", label: "Implantologist & crown specialist" },
      { value: "6 Specialities", label: "Practising under one roof" },
      { value: "Separate Suite", label: "Used only for implant surgery" },
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
    // No premises footage supplied for Chandigarh. The hero film above is a
    // treatment montage, not a tour, so the clinic section stays hidden rather
    // than passing it off as one.
    clinicTour: [],
    // Filmed by patients abroad who flew in for treatment, so these lean on
    // where they travelled from rather than a premises shoot.
    videoTestimonials: [
      {
        src: '/testimonialchd/chd-testimonial-01-australia-hitesh.mp4',
        poster: '/testimonialchd/chd-testimonial-01-australia-hitesh-poster.webp',
        length: '0:55',
        name: 'Hitesh',
        country: 'AU',
      },
      {
        src: '/testimonialchd/chd-testimonial-02-australia-inderjeet.mp4',
        poster: '/testimonialchd/chd-testimonial-02-australia-inderjeet-poster.webp',
        length: '0:29',
        name: 'Inderjeet',
        country: 'AU',
      },
      {
        src: '/testimonialchd/chd-testimonial-03-canada-kawal.mp4',
        poster: '/testimonialchd/chd-testimonial-03-canada-kawal-poster.webp',
        length: '0:42',
        name: 'Kawal',
        country: 'CA',
      },
      {
        src: '/testimonialchd/chd-testimonial-04-canada-ontario-michela.mp4',
        poster: '/testimonialchd/chd-testimonial-04-canada-ontario-michela-poster.webp',
        length: '1:09',
        name: 'Michela',
        country: 'CA',
      },
      {
        src: '/testimonialchd/chd-testimonial-05-canada-toronto-pankaj.mp4',
        poster: '/testimonialchd/chd-testimonial-05-canada-toronto-pankaj-poster.webp',
        length: '1:17',
        name: 'Pankaj',
        country: 'CA',
      },
      {
        src: '/testimonialchd/chd-testimonial-06-usa-maryland.mp4',
        poster: '/testimonialchd/chd-testimonial-06-usa-maryland-poster.webp',
        length: '0:21',
        country: 'US',
      },
      {
        src: '/testimonialchd/chd-testimonial-07-usa-avneet.mp4',
        poster: '/testimonialchd/chd-testimonial-07-usa-avneet-poster.webp',
        length: '0:18',
        name: 'Avneet',
        country: 'US',
      },
      {
        src: '/testimonialchd/chd-testimonial-08-usa-california.mp4',
        poster: '/testimonialchd/chd-testimonial-08-usa-california-poster.webp',
        length: '0:37',
        country: 'US',
      },
    ],
    // Pending: California (Satwinder) and USA (Aneesh) full-mouth case films —
    // not yet on the drive. Add each as { src, poster, length, name, country }
    // once encoded (see videoTestimonials above for the re-encode recipe).
    fullMouthCaseVideos: [],
    // Years are as the clinic stated them for each film.
    followUpVideos: [
      {
        src: '/chdOldPatent/chd-followup-02-rama-thukral-10yr.mp4',
        poster: '/chdOldPatent/chd-followup-02-rama-thukral-10yr-poster.webp',
        length: '0:47',
        name: 'Rama Thukral',
        years: 10,
      },
      {
        src: '/chdOldPatent/chd-followup-01-ravneet-kakria-8yr.mp4',
        poster: '/chdOldPatent/chd-followup-01-ravneet-kakria-8yr-poster.webp',
        length: '0:40',
        name: 'Ravneet Kakria',
        years: 8,
      },
      {
        src: '/chdOldPatent/chd-followup-03-raminder-bassi-6yr.mp4',
        poster: '/chdOldPatent/chd-followup-03-raminder-bassi-6yr-poster.webp',
        length: '0:31',
        name: 'Raminder Bassi',
        years: 6,
      },
      {
        src: '/chdOldPatent/chd-followup-04-brar-ji.mp4',
        poster: '/chdOldPatent/chd-followup-04-brar-ji-poster.webp',
        length: '0:21',
        name: 'Brar ji',
        years: 5,
      },
    ],
    dentalTourism: [
      {
        title: 'Six Specialities, One Visit',
        body: 'Prosthodontics, periodontics, endodontics, orthodontics, pedodontics and oral & maxillofacial surgery all practise in the same centre, with a team of 7 — so a case needing more than one specialist never means a second clinic.',
      },
      {
        title: 'Diagnosis and Plan, Same Day',
        body: 'Your CBCT scan is taken and read in-house, and the implant position planned in 3D on screen, all in one appointment — built for a patient whose trip has a fixed number of days.',
      },
      {
        title: 'Single-Day Crowns',
        body: 'Digital intraoral scanning and CAD/CAM restorations are done on-site, so a crown does not sit waiting on an outside lab while your visit runs out.',
      },
      {
        title: 'A Separate Implant Surgical Suite',
        body: 'Implant surgery happens in an operatory built for that one purpose, across 4 designated operatories in total — not a general chair between routine appointments.',
      },
      {
        title: 'A Clear Quote, in Rupees',
        body: 'Implants from ₹25,000, with an itemised written quote after CBCT before anything begins — and an 80/20 part-payment plan for treatment booked in advance.',
      },
      {
        title: 'Patients Have Already Made the Trip',
        body: 'Patients from Australia, Canada and the USA have flown in for treatment here — their own accounts are in the patient stories below.',
      },
    ],
    // Chandigarh runs the full-mouth case film in the hero instead of the VSL,
    // so the two branches do not open with the same video. Leaving `src` empty
    // is what hands the slot to `heroVideo` above — the case film is a silent
    // montage, so it belongs in the muted autoplay frame rather than behind a
    // play button meant for a film with narration.
    vsl: {
      src: "",
      poster: "",
      kicker: "Watch: how we plan your treatment",
    },
    card: {
      badge: "IMPLANT & COSMETIC LEAD",
      image: "/Dr.-Gaurav-Varshney.webp",
      stats: [
        { value: "13+", label: "YEARS" },
        { value: "7", label: "SPECIALITIES" },
        { value: "4 Ops", label: "OPERATORIES" },
      ],
      chips: ["Implants", "Painless RCT", "Crowns", "Veneers", "Aligners", "Full-mouth"],
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
