/**
 * English and Punjabi copy for the branch landing page.
 *
 * The page is bilingual by toggle rather than by URL: both languages render
 * from the same route, so the clinic's existing addresses keep their search
 * history. The cost of that choice is that Google only ever indexes the
 * English text — if the Punjabi version needs to rank on its own, this has to
 * move to `/[lang]/…` routing, which is what Next's own i18n guide describes.
 *
 * `en` is the source of truth for the shape: `Copy` is derived from it, so a
 * key added here without a Punjabi counterpart is a type error rather than a
 * sentence that silently stays English.
 *
 * Technical terms the clinic already writes in Latin script — CBCT, MDS,
 * CAD/CAM, I Cube Dental — stay in Latin script in the Punjabi too, matching
 * how the practice's own Punjabi copy is written.
 */
export type Lang = 'en' | 'pa';

/** Every language the toggle offers, in the order it shows them. */
export const LANGS: Lang[] = ['en', 'pa'];

/** What each language is called, always written in that language. */
export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  pa: 'ਪੰਜਾਬੀ',
};

/** Short form for the header toggle, where there is no room for the full name. */
export const LANG_SHORT: Record<Lang, string> = {
  en: 'EN',
  pa: 'ਪੰਜਾਬੀ',
};

const en = {
  header: {
    location: 'Location',
    callSpecialist: 'Call Specialist',
    book: 'Book Appointment',
    bothBranches: 'Both branches',
    languageLabel: 'Language',
  },

  hero: {
    title: 'Missing Teeth?',
    sub: (city: string) =>
      `Explore ${city}’s specialist-led dental implant centre — every case planned on in-house CBCT and placed by MDS specialists.`,
    positioning: 'Award-Winning, Research-Driven, Specialised Digital Implant Care',
    photoPending: 'Clinic photograph awaited',
    carouselLabel: 'Photographs of the clinic',
    goToSlide: (n: number) => `Go to photograph ${n}`,
  },

  trustBar: {
    // Split around the emphasised phrase, which is bolded in the markup.
    leadIn:
      'Backed by specialist MDS training, in-house CBCT planning and a dedicated implant operatory — a single-facility approach to ',
    emphasis: 'fixed teeth replacement',
    tail: '.',
  },

  problems: {
    heading: 'Are you facing any of the following problems due to missing teeth?',
    items: [
      'Aesthetic Concerns',
      'Chewing Difficulty',
      'Speech Issues',
      'Jawbone Loss',
      'Loss of Self-Confidence',
      'Nutritional Challenges',
    ],
  },

  planning: {
    heading: 'How Dental Implants Are Planned for Long-Term Success',
  },

  vsl: {
    tapForSound: 'Tap for sound',
    soundOn: 'Sound on',
    play: (branchName: string) => `Play the I Cube Dental ${branchName} film`,
    filmLabel: (branchName: string) => `I Cube Dental ${branchName} film`,
  },

  results: {
    label: 'Patient Results',
    heading: 'Our patients regained their smiles, confidence and quality of life',
    sub: (city: string) =>
      `Actual before & after results from specialist-led dentistry in ${city} — the clinic’s own cases, not stock photography.`,
    disclaimer: 'Results may vary and depend on the individual case.',
    previous: 'Previous case',
    next: 'Next case',
    regionLabel: (branchName: string) => `Before and after cases from I Cube Dental ${branchName}`,
  },

  clinic: {
    heading: (city: string) => `Inside I Cube Dental ${city}`,
    sub: 'The rooms your treatment actually happens in — in-house CBCT and digital scanning, and an operatory kept for implant surgery.',
  },

  about: {
    label: 'About Us',
    heading: 'Caring for your smile at every stage of life',
    sub: (branchName: string, count: number) =>
      `${branchName} is led by ${count} MDS specialists working in one practice, so a case that needs more than one discipline never leaves the building.`,
    leadBadge: (branchName: string) => `${branchName} Lead`,
  },

  team: {
    label: 'Our Team',
    heading: 'A skilled team delivering precision and comfort',
    sub: 'Every case is diagnosed and delivered by a specialist in that field — not handed to a general practitioner and not referred out of the practice.',
  },

  why: {
    heading: (city: string) => `Why choose I Cube Dental ${city} for your dental implants?`,
    expertise: {
      title: 'Implant-Focused Expertise',
      body: (doctor: string, creds: string, years: string) =>
        `${doctor} — ${creds} — with ${years} of clinical experience in implant and restorative dentistry.`,
    },
    planning: {
      title: 'Advanced Digital Planning',
      body: 'Your jaw is scanned on in-house CBCT, so bone height, width and the position of nerves and sinuses are known — and the implant placed in 3D on screen — before any surgery starts.',
    },
    technology: {
      title: 'In-House Technology, One-Visit Care',
      body: 'CBCT, digital intraoral scanners and CAD/CAM restorations all sit inside the building, so your scan, diagnosis and treatment plan happen in the same appointment.',
    },
    operatory: {
      title: 'A Dedicated Implant Operatory',
      body: 'Implants are placed in a room built for that one purpose — not in a general chair between routine appointments.',
    },
    specialists: {
      title: 'MDS Specialists',
      body: (teamSize: number) =>
        `A team of ${teamSize} MDS specialists trained at India's leading dental colleges. Your root canal is done by an endodontist and your crown by a prosthodontist.`,
    },
    quote: {
      title: 'A Quote Before Treatment',
      body: (price: string) =>
        `Implants from ${price}. Every case is costed individually after CBCT, and you get a clear, itemised quote before anything begins.`,
    },
  },

  evaluation: {
    heading: 'What’s included in your implant evaluation visit',
    items: [
      'Personal consultation with the implantologist',
      'In-house CBCT 3D scan of your jaw — taken and read in the same visit',
      'Assessment of bone height, width, and nerve and sinus position',
      'Check up of your gums and remaining teeth',
      'Your implant options, and the phases the treatment runs in',
      'A clear, itemised written quote before any treatment begins',
    ],
  },

  videos: {
    kicker: 'PATIENT STORIES',
    heading: 'Don’t just take our word for it',
    sub: 'Tap any story to play it with sound',
    testimonialLabel: (n: number) => `Patient testimonial ${n}`,
    playLabel: (n: number) => `Play patient testimonial ${n} with sound`,
    namedLabel: (name: string) => `${name} — patient testimonial`,
    namedPlayLabel: (name: string) => `Play ${name}’s testimonial with sound`,
  },

  reviews: {
    kicker: 'TESTIMONIALS',
    heading: 'What our patients say on Google',
    sub: 'What our patients say about us',
    googleCta: 'Read all reviews on Google',
    more: 'Read more',
    less: 'Show less',
  },

  faq: {
    heading: 'Frequently asked questions about dental implants',
    procedure: {
      q: 'What does the dental implant procedure involve?',
      a: 'It runs in stages. First your jaw is scanned on CBCT and the implant position is planned in 3D. The implant — a titanium post that stands in for the tooth root — is then placed into the bone under local anaesthesia. It is left to integrate with the bone over the following weeks, and once it has, the crown is made and fitted onto it.',
    },
    candidate: {
      q: 'Am I a suitable candidate for dental implants?',
      a: 'That depends on how much bone is available at the site, the health of your gums and your general medical history. The CBCT scan answers the first question precisely — it shows exact bone height and width — and where bone is insufficient, grafting is often an option. Some medical conditions and heavy smoking affect healing, which is why the assessment covers your history as well as the scan.',
    },
    painful: {
      q: 'Is the implant procedure painful?',
      a: 'The placement itself is done under local anaesthesia, so the area is numb throughout. Afterwards it is normal to have some soreness and swelling for a few days, which is managed with the medication you are sent home with. Most patients describe it as more comfortable than they expected — but you should plan for a few quiet days rather than none.',
    },
    risks: {
      q: 'Are there risks or complications with dental implants?',
      a: 'As with any surgical procedure, yes. The main ones are infection, delayed healing, and an implant that does not integrate with the bone and has to be removed and replaced. Planning the case on CBCT reduces risk by mapping nerve and sinus positions before surgery rather than during it, and your medical history is reviewed for anything that affects healing. Your specific risks are discussed with you before you consent to treatment.',
    },
    recovery: {
      q: 'What is the recovery like, and how do I care for the implant?',
      a: 'Expect a soft diet and no smoking for the first few days, and to keep the site clean as instructed. The implant then needs an integration period before the final crown is fitted — the length depends on the site and your healing. Once restored, it is looked after like a natural tooth: brushing, cleaning between the teeth, and regular reviews so the surrounding bone and gum can be checked.',
    },
    cbct: { q: 'What is a CBCT scan, and why does it matter?' },
    cost: { q: 'What does a dental implant cost?' },
    where: { q: 'Where are you, and when are you open?' },
  },

  contact: {
    heading: (branchName: string) => `Visit I Cube Dental ${branchName}`,
    location: 'Location',
    contactUs: 'Contact us',
    hours: 'Clinic hours',
    whatsapp: 'Message us on WhatsApp',
  },

  footer: {
    ourClinics: (city: string) => `Our Clinics in ${city}`,
    directions: 'Directions',
    rights: (year: number) => `© I Cube Dental ${year}. All rights reserved.`,
    madeBy: 'Proudly made by',
    metaDisclaimer:
      'This website is not a part of Facebook or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK Inc.',
  },

  popup: {
    heading: 'Book Your Appointment',
    close: 'Close',
    clinic: 'Clinic',
    includes: 'Includes:',
    includesValue: 'Specialist Consultation & Digital Scan',
    withSpecialist: ' with our MDS specialist',
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email',
    concern: 'Describe Your Dental Concern',
    concernPlaceholder: 'Briefly describe your dental issue',
    submit: 'Book Appointment',
    submitting: 'Booking…',
    dismiss: 'Maybe later — let me browse first',
  },

  cta: {
    book: 'Book a Dental Consultation',
  },

  sticky: {
    title: (branchName: string) =>
      branchName ? `Advanced Dental Implants in ${branchName}` : 'Advanced Dental Implants',
    bookNow: 'Book Now',
    quickActions: 'Quick Actions',
    tagline: 'CBCT-guided · Placed by MDS specialists',
    call: 'Call',
    callNow: 'Call now',
    expand: 'Expand Book Appointment',
    minimise: 'Minimize',
  },

  whatsapp: {
    label: 'Contact via WhatsApp',
    message: (branchName: string) =>
      `Hello! I would like to book an implant consultation at I Cube Dental (${branchName}).`,
  },
};

export type Copy = typeof en;

const pa: Copy = {
  header: {
    location: 'ਟਿਕਾਣਾ',
    callSpecialist: 'ਮਾਹਰ ਨੂੰ ਕਾਲ ਕਰੋ',
    book: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ',
    bothBranches: 'ਦੋਵੇਂ ਬ੍ਰਾਂਚਾਂ',
    languageLabel: 'ਭਾਸ਼ਾ',
  },

  hero: {
    title: 'ਦੰਦ ਗੁਆਚ ਗਏ ਹਨ?',
    sub: (city: string) =>
      `${city} ਦਾ ਮਾਹਰ-ਅਗਵਾਈ ਵਾਲਾ ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਸੈਂਟਰ — ਹਰ ਕੇਸ ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT ਉੱਤੇ ਯੋਜਨਾਬੱਧ ਹੁੰਦਾ ਹੈ ਅਤੇ MDS ਮਾਹਰਾਂ ਵੱਲੋਂ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ।`,
    positioning: 'ਪੁਰਸਕਾਰ ਜੇਤੂ, ਖੋਜ-ਆਧਾਰਿਤ, ਵਿਸ਼ੇਸ਼ ਡਿਜੀਟਲ ਇੰਪਲਾਂਟ ਇਲਾਜ',
    photoPending: 'ਕਲੀਨਿਕ ਦੀ ਫੋਟੋ ਦੀ ਉਡੀਕ ਹੈ',
    carouselLabel: 'ਕਲੀਨਿਕ ਦੀਆਂ ਫੋਟੋਆਂ',
    goToSlide: (n: number) => `ਫੋਟੋ ${n} ਉੱਤੇ ਜਾਓ`,
  },

  trustBar: {
    leadIn:
      'ਮਾਹਰ MDS ਸਿਖਲਾਈ, ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT ਯੋਜਨਾਬੰਦੀ ਅਤੇ ਇੰਪਲਾਂਟ ਲਈ ਵੱਖਰੇ ਓਪਰੇਟਰੀ ਦਾ ਆਧਾਰ — ',
    emphasis: 'ਫਿਕਸਡ ਦੰਦ ਲਗਵਾਉਣ',
    tail: ' ਲਈ ਇੱਕੋ ਛੱਤ ਹੇਠ ਪੂਰਾ ਇਲਾਜ।',
  },

  problems: {
    heading: 'ਕੀ ਦੰਦ ਗੁਆਚਣ ਕਾਰਨ ਤੁਹਾਨੂੰ ਇਹਨਾਂ ਵਿੱਚੋਂ ਕੋਈ ਸਮੱਸਿਆ ਆ ਰਹੀ ਹੈ?',
    items: [
      'ਦਿੱਖ ਦੀ ਚਿੰਤਾ',
      'ਚਬਾਉਣ ਵਿੱਚ ਮੁਸ਼ਕਲ',
      'ਬੋਲਣ ਵਿੱਚ ਦਿੱਕਤ',
      'ਜਬਾੜੇ ਦੀ ਹੱਡੀ ਦਾ ਘਟਣਾ',
      'ਆਤਮ-ਵਿਸ਼ਵਾਸ ਦੀ ਕਮੀ',
      'ਖੁਰਾਕ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ',
    ],
  },

  planning: {
    heading: 'ਲੰਬੇ ਸਮੇਂ ਦੀ ਕਾਮਯਾਬੀ ਲਈ ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਦੀ ਯੋਜਨਾ ਕਿਵੇਂ ਬਣਾਈ ਜਾਂਦੀ ਹੈ',
  },

  vsl: {
    tapForSound: 'ਆਵਾਜ਼ ਲਈ ਟੈਪ ਕਰੋ',
    soundOn: 'ਆਵਾਜ਼ ਚਾਲੂ',
    play: (branchName: string) => `I Cube Dental ${branchName} ਦੀ ਵੀਡੀਓ ਚਲਾਓ`,
    filmLabel: (branchName: string) => `I Cube Dental ${branchName} ਦੀ ਵੀਡੀਓ`,
  },

  results: {
    label: 'ਮਰੀਜ਼ਾਂ ਦੇ ਨਤੀਜੇ',
    heading: 'ਸਾਡੇ ਮਰੀਜ਼ਾਂ ਨੇ ਆਪਣੀ ਮੁਸਕਾਨ, ਆਤਮ-ਵਿਸ਼ਵਾਸ ਅਤੇ ਜ਼ਿੰਦਗੀ ਦੀ ਗੁਣਵੱਤਾ ਮੁੜ ਹਾਸਲ ਕੀਤੀ',
    sub: (city: string) =>
      `${city} ਵਿੱਚ ਮਾਹਰ-ਅਗਵਾਈ ਵਾਲੇ ਇਲਾਜ ਦੇ ਅਸਲੀ ਪਹਿਲਾਂ ਤੇ ਬਾਅਦ ਦੇ ਨਤੀਜੇ — ਕਲੀਨਿਕ ਦੇ ਆਪਣੇ ਕੇਸ, ਕੋਈ ਸਟਾਕ ਫੋਟੋ ਨਹੀਂ।`,
    disclaimer: 'ਨਤੀਜੇ ਹਰ ਵਿਅਕਤੀ ਦੇ ਕੇਸ ਮੁਤਾਬਕ ਵੱਖ-ਵੱਖ ਹੋ ਸਕਦੇ ਹਨ।',
    previous: 'ਪਿਛਲਾ ਕੇਸ',
    next: 'ਅਗਲਾ ਕੇਸ',
    regionLabel: (branchName: string) => `I Cube Dental ${branchName} ਦੇ ਪਹਿਲਾਂ ਤੇ ਬਾਅਦ ਦੇ ਕੇਸ`,
  },

  clinic: {
    heading: (city: string) => `I Cube Dental ${city} ਦੇ ਅੰਦਰ`,
    sub: 'ਉਹ ਕਮਰੇ ਜਿੱਥੇ ਤੁਹਾਡਾ ਇਲਾਜ ਅਸਲ ਵਿੱਚ ਹੁੰਦਾ ਹੈ — ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT ਤੇ ਡਿਜੀਟਲ ਸਕੈਨਿੰਗ, ਅਤੇ ਸਿਰਫ਼ ਇੰਪਲਾਂਟ ਸਰਜਰੀ ਲਈ ਰੱਖਿਆ ਵੱਖਰਾ ਓਪਰੇਟਰੀ।',
  },

  about: {
    label: 'ਸਾਡੇ ਬਾਰੇ',
    heading: 'ਜ਼ਿੰਦਗੀ ਦੇ ਹਰ ਪੜਾਅ ’ਤੇ ਤੁਹਾਡੀ ਮੁਸਕਾਨ ਦੀ ਸੰਭਾਲ',
    sub: (branchName: string, count: number) =>
      `${branchName} ਦੀ ਅਗਵਾਈ ${count} MDS ਮਾਹਰ ਕਰਦੇ ਹਨ ਜੋ ਇੱਕੋ ਕਲੀਨਿਕ ਵਿੱਚ ਕੰਮ ਕਰਦੇ ਹਨ, ਇਸ ਲਈ ਜਿਸ ਕੇਸ ਵਿੱਚ ਇੱਕ ਤੋਂ ਵੱਧ ਮਾਹਰ ਦੀ ਲੋੜ ਹੋਵੇ, ਉਹ ਵੀ ਇੱਥੋਂ ਬਾਹਰ ਨਹੀਂ ਜਾਂਦਾ।`,
    leadBadge: (branchName: string) => `${branchName} ਲੀਡ`,
  },

  team: {
    label: 'ਸਾਡੀ ਟੀਮ',
    heading: 'ਸਟੀਕਤਾ ਅਤੇ ਆਰਾਮ ਦੇਣ ਵਾਲੀ ਹੁਨਰਮੰਦ ਟੀਮ',
    sub: 'ਹਰ ਕੇਸ ਦੀ ਜਾਂਚ ਅਤੇ ਇਲਾਜ ਉਸੇ ਖੇਤਰ ਦਾ ਮਾਹਰ ਕਰਦਾ ਹੈ — ਨਾ ਕਿਸੇ ਜਨਰਲ ਡਾਕਟਰ ਨੂੰ ਸੌਂਪਿਆ ਜਾਂਦਾ ਹੈ ਤੇ ਨਾ ਕਲੀਨਿਕ ਤੋਂ ਬਾਹਰ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ।',
  },

  why: {
    heading: (city: string) => `ਆਪਣੇ ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਲਈ I Cube Dental ${city} ਹੀ ਕਿਉਂ ਚੁਣੋ?`,
    expertise: {
      title: 'ਇੰਪਲਾਂਟ ਵਿੱਚ ਖਾਸ ਮੁਹਾਰਤ',
      body: (doctor: string, creds: string, years: string) =>
        `${doctor} — ${creds} — ਇੰਪਲਾਂਟ ਅਤੇ ਰਿਸਟੋਰੇਟਿਵ ਡੈਂਟਿਸਟਰੀ ਵਿੱਚ ${years} ਦਾ ਕਲੀਨਿਕਲ ਤਜਰਬਾ।`,
    },
    planning: {
      title: 'ਉੱਨਤ ਡਿਜੀਟਲ ਯੋਜਨਾਬੰਦੀ',
      body: 'ਤੁਹਾਡੇ ਜਬਾੜੇ ਦਾ ਸਕੈਨ ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT ਉੱਤੇ ਹੁੰਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਹੱਡੀ ਦੀ ਉਚਾਈ, ਚੌੜਾਈ ਅਤੇ ਨਸਾਂ ਤੇ ਸਾਈਨਸ ਦੀ ਥਾਂ ਪਹਿਲਾਂ ਹੀ ਪਤਾ ਲੱਗ ਜਾਂਦੀ ਹੈ — ਅਤੇ ਸਰਜਰੀ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਇੰਪਲਾਂਟ ਸਕਰੀਨ ਉੱਤੇ 3D ਵਿੱਚ ਰੱਖ ਕੇ ਵੇਖ ਲਿਆ ਜਾਂਦਾ ਹੈ।',
    },
    technology: {
      title: 'ਸਾਰੀ ਤਕਨੀਕ ਇੱਕੋ ਥਾਂ, ਇੱਕੋ ਵਿਜ਼ਿਟ ਵਿੱਚ ਇਲਾਜ',
      body: 'CBCT, ਡਿਜੀਟਲ ਇੰਟਰਾਓਰਲ ਸਕੈਨਰ ਅਤੇ CAD/CAM ਰਿਸਟੋਰੇਸ਼ਨ ਸਭ ਇਸੇ ਇਮਾਰਤ ਵਿੱਚ ਹਨ, ਇਸ ਲਈ ਤੁਹਾਡਾ ਸਕੈਨ, ਜਾਂਚ ਅਤੇ ਇਲਾਜ ਦੀ ਯੋਜਨਾ ਇੱਕੋ ਅਪਾਇੰਟਮੈਂਟ ਵਿੱਚ ਹੋ ਜਾਂਦੇ ਹਨ।',
    },
    operatory: {
      title: 'ਇੰਪਲਾਂਟ ਲਈ ਵੱਖਰਾ ਓਪਰੇਟਰੀ',
      body: 'ਇੰਪਲਾਂਟ ਸਿਰਫ਼ ਉਸੇ ਕੰਮ ਲਈ ਬਣੇ ਕਮਰੇ ਵਿੱਚ ਲਗਾਏ ਜਾਂਦੇ ਹਨ — ਨਾ ਕਿ ਰੋਜ਼ਾਨਾ ਅਪਾਇੰਟਮੈਂਟਾਂ ਵਿਚਕਾਰ ਕਿਸੇ ਆਮ ਚੇਅਰ ਉੱਤੇ।',
    },
    specialists: {
      title: 'MDS ਮਾਹਰ ਡਾਕਟਰ',
      body: (teamSize: number) =>
        `${teamSize} MDS ਮਾਹਰਾਂ ਦੀ ਟੀਮ, ਜਿਨ੍ਹਾਂ ਦੀ ਸਿਖਲਾਈ ਭਾਰਤ ਦੇ ਮੋਹਰੀ ਡੈਂਟਲ ਕਾਲਜਾਂ ਤੋਂ ਹੋਈ ਹੈ। ਤੁਹਾਡਾ ਰੂਟ ਕੈਨਾਲ ਐਂਡੋਡੌਂਟਿਸਟ ਕਰਦਾ ਹੈ ਅਤੇ ਕਰਾਊਨ ਪ੍ਰੌਸਥੋਡੌਂਟਿਸਟ।`,
    },
    quote: {
      title: 'ਇਲਾਜ ਤੋਂ ਪਹਿਲਾਂ ਪੂਰਾ ਖ਼ਰਚਾ',
      body: (price: string) =>
        `ਇੰਪਲਾਂਟ ${price} ਤੋਂ ਸ਼ੁਰੂ। ਹਰ ਕੇਸ ਦਾ ਖ਼ਰਚਾ CBCT ਤੋਂ ਬਾਅਦ ਵੱਖਰੇ ਤੌਰ ’ਤੇ ਤੈਅ ਹੁੰਦਾ ਹੈ, ਅਤੇ ਕੁਝ ਵੀ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਸਾਫ਼, ਇੱਕ-ਇੱਕ ਚੀਜ਼ ਲਿਖੀ ਹੋਈ ਕੀਮਤ ਮਿਲਦੀ ਹੈ।`,
    },
  },

  evaluation: {
    heading: 'ਤੁਹਾਡੀ ਇੰਪਲਾਂਟ ਜਾਂਚ ਵਾਲੀ ਵਿਜ਼ਿਟ ਵਿੱਚ ਕੀ-ਕੀ ਸ਼ਾਮਲ ਹੈ',
    items: [
      'ਇੰਪਲਾਂਟੋਲੋਜਿਸਟ ਨਾਲ ਨਿੱਜੀ ਸਲਾਹ-ਮਸ਼ਵਰਾ',
      'ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ ਜਬਾੜੇ ਦਾ CBCT 3D ਸਕੈਨ — ਉਸੇ ਵਿਜ਼ਿਟ ਵਿੱਚ ਲਿਆ ਤੇ ਪੜ੍ਹਿਆ ਜਾਂਦਾ ਹੈ',
      'ਹੱਡੀ ਦੀ ਉਚਾਈ, ਚੌੜਾਈ ਅਤੇ ਨਸਾਂ ਤੇ ਸਾਈਨਸ ਦੀ ਥਾਂ ਦੀ ਜਾਂਚ',
      'ਤੁਹਾਡੇ ਮਸੂੜਿਆਂ ਅਤੇ ਬਾਕੀ ਦੰਦਾਂ ਦੀ ਜਾਂਚ',
      'ਤੁਹਾਡੇ ਇੰਪਲਾਂਟ ਦੇ ਬਦਲ, ਅਤੇ ਇਲਾਜ ਕਿਹੜੇ-ਕਿਹੜੇ ਪੜਾਵਾਂ ਵਿੱਚ ਚੱਲੇਗਾ',
      'ਕੋਈ ਵੀ ਇਲਾਜ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਸਾਫ਼, ਇੱਕ-ਇੱਕ ਚੀਜ਼ ਲਿਖੀ ਹੋਈ ਕੀਮਤ',
    ],
  },

  videos: {
    kicker: 'ਮਰੀਜ਼ਾਂ ਦੀਆਂ ਕਹਾਣੀਆਂ',
    heading: 'ਸਿਰਫ਼ ਸਾਡੀ ਗੱਲ ’ਤੇ ਹੀ ਨਾ ਜਾਓ',
    sub: 'ਆਵਾਜ਼ ਨਾਲ ਸੁਣਨ ਲਈ ਕਿਸੇ ਵੀ ਕਹਾਣੀ ’ਤੇ ਟੈਪ ਕਰੋ',
    testimonialLabel: (n: number) => `ਮਰੀਜ਼ ਦੀ ਗਵਾਹੀ ${n}`,
    playLabel: (n: number) => `ਮਰੀਜ਼ ਦੀ ਗਵਾਹੀ ${n} ਆਵਾਜ਼ ਨਾਲ ਚਲਾਓ`,
    namedLabel: (name: string) => `${name} — ਮਰੀਜ਼ ਦੀ ਗਵਾਹੀ`,
    namedPlayLabel: (name: string) => `${name} ਦੀ ਗਵਾਹੀ ਆਵਾਜ਼ ਨਾਲ ਚਲਾਓ`,
  },

  reviews: {
    kicker: 'ਪ੍ਰਸੰਸਾ ਪੱਤਰ',
    heading: 'ਸਾਡੇ ਮਰੀਜ਼ Google ’ਤੇ ਕੀ ਕਹਿੰਦੇ ਹਨ',
    sub: 'ਸਾਡੇ ਮਰੀਜ਼ ਸਾਡੇ ਬਾਰੇ ਕੀ ਕਹਿੰਦੇ ਹਨ',
    googleCta: 'Google ’ਤੇ ਸਾਰੀਆਂ ਸਮੀਖਿਆਵਾਂ ਪੜ੍ਹੋ',
    more: 'ਹੋਰ ਪੜ੍ਹੋ',
    less: 'ਘੱਟ ਕਰੋ',
  },

  faq: {
    heading: 'ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਬਾਰੇ ਆਮ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ',
    procedure: {
      q: 'ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਦੀ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ ਕੀ ਹੁੰਦਾ ਹੈ?',
      a: 'ਇਹ ਪੜਾਵਾਂ ਵਿੱਚ ਹੁੰਦੀ ਹੈ। ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਜਬਾੜੇ ਦਾ CBCT ਸਕੈਨ ਹੁੰਦਾ ਹੈ ਅਤੇ ਇੰਪਲਾਂਟ ਦੀ ਥਾਂ 3D ਵਿੱਚ ਤੈਅ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਫਿਰ ਇੰਪਲਾਂਟ — ਇੱਕ ਟਾਈਟੇਨੀਅਮ ਪੋਸਟ ਜੋ ਦੰਦ ਦੀ ਜੜ੍ਹ ਦੀ ਥਾਂ ਲੈਂਦਾ ਹੈ — ਲੋਕਲ ਬੇਹੋਸ਼ੀ ਦੀ ਦਵਾਈ ਹੇਠ ਹੱਡੀ ਵਿੱਚ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ। ਅਗਲੇ ਕੁਝ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਇਹ ਹੱਡੀ ਨਾਲ ਜੁੜ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਜੁੜਨ ਤੋਂ ਬਾਅਦ ਉਸ ਉੱਤੇ ਕਰਾਊਨ ਬਣਾ ਕੇ ਫਿੱਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।',
    },
    candidate: {
      q: 'ਕੀ ਮੈਂ ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਲਈ ਢੁਕਵਾਂ ਹਾਂ?',
      a: 'ਇਹ ਇਸ ਗੱਲ ’ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ ਕਿ ਉਸ ਥਾਂ ਕਿੰਨੀ ਹੱਡੀ ਮੌਜੂਦ ਹੈ, ਤੁਹਾਡੇ ਮਸੂੜੇ ਕਿਹੋ ਜਿਹੇ ਹਨ ਅਤੇ ਤੁਹਾਡਾ ਆਮ ਸਿਹਤ ਇਤਿਹਾਸ ਕੀ ਹੈ। CBCT ਸਕੈਨ ਪਹਿਲੇ ਸਵਾਲ ਦਾ ਸਹੀ ਜਵਾਬ ਦੇ ਦਿੰਦਾ ਹੈ — ਇਹ ਹੱਡੀ ਦੀ ਬਿਲਕੁਲ ਸਹੀ ਉਚਾਈ ਤੇ ਚੌੜਾਈ ਦਿਖਾਉਂਦਾ ਹੈ — ਅਤੇ ਜਿੱਥੇ ਹੱਡੀ ਘੱਟ ਹੋਵੇ, ਉੱਥੇ ਅਕਸਰ ਗ੍ਰਾਫਟਿੰਗ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ। ਕੁਝ ਬਿਮਾਰੀਆਂ ਅਤੇ ਜ਼ਿਆਦਾ ਸਿਗਰਟਨੋਸ਼ੀ ਜ਼ਖ਼ਮ ਭਰਨ ਉੱਤੇ ਅਸਰ ਪਾਉਂਦੀਆਂ ਹਨ, ਇਸੇ ਲਈ ਜਾਂਚ ਵਿੱਚ ਸਕੈਨ ਦੇ ਨਾਲ-ਨਾਲ ਤੁਹਾਡਾ ਸਿਹਤ ਇਤਿਹਾਸ ਵੀ ਵੇਖਿਆ ਜਾਂਦਾ ਹੈ।',
    },
    painful: {
      q: 'ਕੀ ਇੰਪਲਾਂਟ ਲਗਵਾਉਣ ਵਿੱਚ ਦਰਦ ਹੁੰਦਾ ਹੈ?',
      a: 'ਇੰਪਲਾਂਟ ਲਗਾਉਣ ਦਾ ਕੰਮ ਲੋਕਲ ਬੇਹੋਸ਼ੀ ਦੀ ਦਵਾਈ ਹੇਠ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਉਹ ਥਾਂ ਪੂਰਾ ਸਮਾਂ ਸੁੰਨ ਰਹਿੰਦੀ ਹੈ। ਬਾਅਦ ਵਿੱਚ ਕੁਝ ਦਿਨ ਹਲਕੀ ਸੋਜ ਤੇ ਦੁਖਣ ਆਮ ਗੱਲ ਹੈ, ਜਿਸ ਲਈ ਤੁਹਾਨੂੰ ਦਵਾਈ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ। ਬਹੁਤੇ ਮਰੀਜ਼ ਕਹਿੰਦੇ ਹਨ ਕਿ ਇਹ ਉਹਨਾਂ ਦੀ ਉਮੀਦ ਨਾਲੋਂ ਸੌਖਾ ਸੀ — ਪਰ ਕੁਝ ਦਿਨ ਆਰਾਮ ਦੀ ਤਿਆਰੀ ਜ਼ਰੂਰ ਰੱਖੋ।',
    },
    risks: {
      q: 'ਕੀ ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਵਿੱਚ ਕੋਈ ਖ਼ਤਰਾ ਜਾਂ ਦਿੱਕਤ ਹੋ ਸਕਦੀ ਹੈ?',
      a: 'ਹਰ ਸਰਜਰੀ ਵਾਂਗ, ਹਾਂ। ਮੁੱਖ ਖ਼ਤਰੇ ਹਨ ਇਨਫੈਕਸ਼ਨ, ਜ਼ਖ਼ਮ ਦੇਰ ਨਾਲ ਭਰਨਾ, ਅਤੇ ਇੰਪਲਾਂਟ ਦਾ ਹੱਡੀ ਨਾਲ ਨਾ ਜੁੜਨਾ, ਜਿਸ ਹਾਲਤ ਵਿੱਚ ਉਸ ਨੂੰ ਕੱਢ ਕੇ ਦੁਬਾਰਾ ਲਗਾਉਣਾ ਪੈਂਦਾ ਹੈ। CBCT ਉੱਤੇ ਕੇਸ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਨਾਲ ਖ਼ਤਰਾ ਘਟਦਾ ਹੈ, ਕਿਉਂਕਿ ਨਸਾਂ ਤੇ ਸਾਈਨਸ ਦੀ ਥਾਂ ਸਰਜਰੀ ਦੌਰਾਨ ਨਹੀਂ ਸਗੋਂ ਉਸ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਪਤਾ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਤੁਹਾਡਾ ਸਿਹਤ ਇਤਿਹਾਸ ਵੀ ਵੇਖਿਆ ਜਾਂਦਾ ਹੈ। ਇਲਾਜ ਲਈ ਹਾਂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਆਪਣੇ ਕੇਸ ਦੇ ਖ਼ਤਰੇ ਤੁਹਾਡੇ ਨਾਲ ਵਿਚਾਰੇ ਜਾਂਦੇ ਹਨ।',
    },
    recovery: {
      q: 'ਠੀਕ ਹੋਣ ਵਿੱਚ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ, ਅਤੇ ਇੰਪਲਾਂਟ ਦੀ ਸੰਭਾਲ ਕਿਵੇਂ ਕਰਨੀ ਹੈ?',
      a: 'ਪਹਿਲੇ ਕੁਝ ਦਿਨ ਨਰਮ ਖੁਰਾਕ ਲਓ, ਸਿਗਰਟਨੋਸ਼ੀ ਨਾ ਕਰੋ, ਅਤੇ ਦੱਸੇ ਮੁਤਾਬਕ ਥਾਂ ਸਾਫ਼ ਰੱਖੋ। ਫਿਰ ਅੰਤਿਮ ਕਰਾਊਨ ਲੱਗਣ ਤੋਂ ਪਹਿਲਾਂ ਇੰਪਲਾਂਟ ਨੂੰ ਹੱਡੀ ਨਾਲ ਜੁੜਨ ਲਈ ਸਮਾਂ ਚਾਹੀਦਾ ਹੈ — ਇਹ ਸਮਾਂ ਥਾਂ ਅਤੇ ਤੁਹਾਡੀ ਸਿਹਤ ਉੱਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ। ਕਰਾਊਨ ਲੱਗਣ ਤੋਂ ਬਾਅਦ ਇਸ ਦੀ ਸੰਭਾਲ ਆਮ ਦੰਦ ਵਾਂਗ ਹੀ ਹੁੰਦੀ ਹੈ: ਬੁਰਸ਼ ਕਰਨਾ, ਦੰਦਾਂ ਵਿਚਕਾਰ ਸਫ਼ਾਈ, ਅਤੇ ਸਮੇਂ-ਸਮੇਂ ’ਤੇ ਜਾਂਚ ਤਾਂ ਜੋ ਆਲੇ-ਦੁਆਲੇ ਦੀ ਹੱਡੀ ਤੇ ਮਸੂੜੇ ਵੇਖੇ ਜਾ ਸਕਣ।',
    },
    cbct: { q: 'CBCT ਸਕੈਨ ਕੀ ਹੁੰਦਾ ਹੈ, ਅਤੇ ਇਹ ਕਿਉਂ ਜ਼ਰੂਰੀ ਹੈ?' },
    cost: { q: 'ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਦਾ ਖ਼ਰਚਾ ਕਿੰਨਾ ਹੈ?' },
    where: { q: 'ਤੁਸੀਂ ਕਿੱਥੇ ਹੋ, ਅਤੇ ਕਦੋਂ ਖੁੱਲ੍ਹੇ ਹੁੰਦੇ ਹੋ?' },
  },

  contact: {
    heading: (branchName: string) => `I Cube Dental ${branchName} ਆਓ`,
    location: 'ਟਿਕਾਣਾ',
    contactUs: 'ਸੰਪਰਕ ਕਰੋ',
    hours: 'ਕਲੀਨਿਕ ਦਾ ਸਮਾਂ',
    whatsapp: 'WhatsApp ’ਤੇ ਸੰਦੇਸ ਕਰੋ',
  },

  footer: {
    ourClinics: (city: string) => `${city} ਵਿੱਚ ਸਾਡੇ ਕਲੀਨਿਕ`,
    directions: 'ਰਸਤਾ ਵੇਖੋ',
    rights: (year: number) => `© I Cube Dental ${year}. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।`,
    madeBy: 'ਬੜੇ ਮਾਣ ਨਾਲ ਬਣਾਇਆ',
    metaDisclaimer:
      'ਇਹ ਵੈੱਬਸਾਈਟ Facebook ਜਾਂ Facebook Inc. ਦਾ ਹਿੱਸਾ ਨਹੀਂ ਹੈ। ਇਸ ਤੋਂ ਇਲਾਵਾ, Facebook ਵੱਲੋਂ ਇਸ ਸਾਈਟ ਦੀ ਕਿਸੇ ਵੀ ਤਰ੍ਹਾਂ ਪੁਸ਼ਟੀ ਨਹੀਂ ਕੀਤੀ ਗਈ। FACEBOOK, FACEBOOK Inc. ਦਾ ਟ੍ਰੇਡਮਾਰਕ ਹੈ।',
  },

  popup: {
    heading: 'ਆਪਣੀ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ',
    close: 'ਬੰਦ ਕਰੋ',
    clinic: 'ਕਲੀਨਿਕ',
    includes: 'ਸ਼ਾਮਲ ਹੈ:',
    includesValue: 'ਮਾਹਰ ਦੀ ਸਲਾਹ ਅਤੇ ਡਿਜੀਟਲ ਸਕੈਨ',
    withSpecialist: ' ਸਾਡੇ MDS ਮਾਹਰ ਨਾਲ',
    fullName: 'ਪੂਰਾ ਨਾਮ',
    phone: 'ਫ਼ੋਨ ਨੰਬਰ',
    email: 'ਈਮੇਲ',
    concern: 'ਆਪਣੀ ਦੰਦਾਂ ਦੀ ਸਮੱਸਿਆ ਦੱਸੋ',
    concernPlaceholder: 'ਆਪਣੀ ਦੰਦਾਂ ਦੀ ਸਮੱਸਿਆ ਸੰਖੇਪ ਵਿੱਚ ਲਿਖੋ',
    submit: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ',
    submitting: 'ਬੁੱਕ ਹੋ ਰਹੀ ਹੈ…',
    dismiss: 'ਬਾਅਦ ਵਿੱਚ — ਪਹਿਲਾਂ ਵੇਖ ਲੈਣ ਦਿਓ',
  },

  cta: {
    book: 'ਡੈਂਟਲ ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
  },

  sticky: {
    title: (branchName: string) =>
      branchName
        ? `${branchName} ਵਿੱਚ ਉੱਨਤ ਡੈਂਟਲ ਇੰਪਲਾਂਟ`
        : 'ਉੱਨਤ ਡੈਂਟਲ ਇੰਪਲਾਂਟ',
    bookNow: 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ',
    quickActions: 'ਤੁਰੰਤ ਕਾਰਵਾਈ',
    tagline: 'CBCT ਨਾਲ ਯੋਜਨਾਬੱਧ · MDS ਮਾਹਰਾਂ ਵੱਲੋਂ ਲਗਾਏ ਜਾਂਦੇ',
    call: 'ਕਾਲ',
    callNow: 'ਹੁਣੇ ਕਾਲ ਕਰੋ',
    expand: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰਨ ਵਾਲਾ ਹਿੱਸਾ ਖੋਲ੍ਹੋ',
    minimise: 'ਛੋਟਾ ਕਰੋ',
  },

  whatsapp: {
    label: 'WhatsApp ’ਤੇ ਸੰਪਰਕ ਕਰੋ',
    message: (branchName: string) =>
      `ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ I Cube Dental (${branchName}) ਵਿੱਚ ਇੰਪਲਾਂਟ ਲਈ ਸਲਾਹ ਬੁੱਕ ਕਰਨੀ ਚਾਹੁੰਦਾ/ਚਾਹੁੰਦੀ ਹਾਂ।`,
  },
};

export const COPY: Record<Lang, Copy> = { en, pa };
