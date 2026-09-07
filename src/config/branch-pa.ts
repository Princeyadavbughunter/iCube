import type { BranchConfig } from './branch-configs';
import type { Lang } from './i18n';

/**
 * Punjabi for the branch-specific prose the landing page renders.
 *
 * The static UI copy lives in `i18n.ts`; this file covers the text that comes
 * out of `branch-configs.ts` instead — the credentials bar, the doctor's
 * closing line, the three branch-specific FAQ answers, opening hours and the
 * footer blurb.
 *
 * Deliberately NOT translated, and left in the Latin script the clinic
 * publishes them in:
 *
 * - **The street address.** A mistranslated landmark sends a patient to the
 *   wrong building. Punjabi readers here navigate by these names as written.
 * - **Phone numbers and email.**
 * - **Google reviews.** They are real patients' own words. Rewriting a signed
 *   review in another language misrepresents the person who wrote it.
 * - **Photo alt text**, which is not visible copy and is read by search
 *   engines that only ever see the English page.
 */
type BranchPa = {
  name: string;
  city: string;
  experience: string;
  leadDoctor: string;
  leadDoctorCreds: string;
  implantPrice: string;
  timings: string;
  daysLine: string;
  implantStats: { value: string; label: string }[];
  /** One per `clinicTour` clip, in the same order. */
  clinicTourLabels: string[];
  /** The line under the doctor cards — `doctors[0].footer`. */
  doctorFooter: string;
  faqCbct: string;
  faqPricing: string;
  faqTimingsLocation: string;
  footerBlurb: string;
  vslKicker: string;
  vslCreds?: string;
  vslFlashLine?: string;
};

const PA: Record<string, BranchPa> = {
  ludhiana: {
    name: 'ਲੁਧਿਆਣਾ',
    city: 'ਲੁਧਿਆਣਾ',
    experience: '14+ ਸਾਲ',
    leadDoctor: 'ਡਾ. ਚੰਦਨ ਜੈਨ',
    leadDoctorCreds: 'ਇੰਪਲਾਂਟੋਲੋਜਿਸਟ · BDS, MDS ਪ੍ਰੌਸਥੋਡੌਂਟਿਕਸ · MAMC ਨਵੀਂ ਦਿੱਲੀ',
    implantPrice: '₹25,000 ਤੋਂ*',
    timings: 'ਸੋਮ–ਐਤ: ਸਵੇਰੇ 10 – ਰਾਤ 8 ਵਜੇ',
    daysLine: 'ਹਫ਼ਤੇ ਦੇ ਸੱਤੇ ਦਿਨ ਖੁੱਲ੍ਹਾ',
    implantStats: [
      { value: '14+ ਸਾਲ', label: 'ਇੰਪਲਾਂਟ ਦਾ ਮਾਹਰ ਤਜਰਬਾ' },
      { value: '1000+', label: 'ਫੁੱਲ-ਮਾਊਥ ਇੰਪਲਾਂਟ ਪੂਰੇ ਕੀਤੇ' },
      { value: 'MDS · MAMC', label: 'ਭਾਰਤ ਦਾ ਨੰਬਰ 1 ਡੈਂਟਲ ਕਾਲਜ' },
      { value: 'WCOI ਜਪਾਨ', label: 'ਇੰਪਲਾਂਟੋਲੋਜੀ ਵਿੱਚ ਡਿਪਲੋਮੇਟ' },
      { value: '7 ਮਾਹਰ', label: 'ਇੱਕੋ ਛੱਤ, ਇੱਕੋ ਇਲਾਜ ਯੋਜਨਾ' },
      { value: 'ਪੁਰਸਕਾਰ ਜੇਤੂ', label: 'ਡੈਂਟਲ ਚੇਨ, VOH ਵੱਲੋਂ ਸਨਮਾਨਿਤ' },
    ],
    clinicTourLabels: [
      'ਰਿਸੈਪਸ਼ਨ ਅਤੇ ਉਡੀਕ ਵਾਲਾ ਕਮਰਾ',
      'CBCT ਸਕੈਨ ਵਾਲਾ ਕਮਰਾ',
      'ਸਾਡਾ ਆਪਣਾ CBCT ਸਕੈਨਰ',
      'ਇਲਾਜ ਵਾਲਾ ਓਪਰੇਟਰੀ',
    ],
    doctorFooter:
      'I Cube Dental ਵਿੱਚ ਹਰ ਕੇਸ ਦੀ ਜਾਂਚ, ਯੋਜਨਾ ਅਤੇ ਇਲਾਜ ਭਾਰਤ ਦੇ ਮੋਹਰੀ ਡੈਂਟਲ ਕਾਲਜਾਂ ਤੋਂ ਸਿਖਲਾਈ ਲੈ ਚੁੱਕੇ MDS ਮਾਹਰ ਕਰਦੇ ਹਨ — 7 ਜਣਿਆਂ ਦੀ ਟੀਮ ਇੱਕੋ ਆਧੁਨਿਕ ਕਲੀਨਿਕ ਵਿੱਚ ਕੰਮ ਕਰਦੀ ਹੈ, ਇਸ ਲਈ ਪਹਿਲੇ ਸਕੈਨ ਤੋਂ ਲੈ ਕੇ ਆਖ਼ਰੀ ਕਰਾਊਨ ਤੱਕ ਤੁਹਾਡਾ ਇਲਾਜ ਮਾਹਰ ਦੀ ਨਿਗਰਾਨੀ ਹੇਠ ਹੀ ਰਹਿੰਦਾ ਹੈ।',
    faqCbct:
      'CBCT ਤੁਹਾਡੇ ਜਬਾੜੇ ਦਾ 3D ਸਕੈਨ ਹੈ ਜੋ ਹੱਡੀ ਦੀ ਬਿਲਕੁਲ ਸਹੀ ਉਚਾਈ, ਚੌੜਾਈ ਅਤੇ ਨਸਾਂ ਤੇ ਸਾਈਨਸ ਦੀ ਥਾਂ ਦਿਖਾਉਂਦਾ ਹੈ — ਇੰਨੀ ਬਾਰੀਕੀ ਆਮ X-ray ਨਹੀਂ ਦੇ ਸਕਦੀ। ਸਾਡਾ CBCT ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ ਹੋਣ ਕਰਕੇ ਤੁਹਾਡਾ ਸਕੈਨ, ਜਾਂਚ ਅਤੇ ਇਲਾਜ ਦੀ ਯੋਜਨਾ ਇੱਕੋ ਵਿਜ਼ਿਟ ਵਿੱਚ ਹੋ ਜਾਂਦੇ ਹਨ, ਅਤੇ ਡਾ. ਚੰਦਨ ਜੈਨ ਸਰਜਰੀ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਹੀ 3D ਵਿੱਚ ਇੰਪਲਾਂਟ ਦੀ ਸਹੀ ਥਾਂ ਤੈਅ ਕਰ ਲੈਂਦੇ ਹਨ।',
    faqPricing:
      'ਡੈਂਟਲ ਇੰਪਲਾਂਟ ₹25,000 ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੇ ਹਨ। ਅੰਤਿਮ ਖ਼ਰਚਾ ਇੰਪਲਾਂਟ ਸਿਸਟਮ, ਕਿੰਨੇ ਦੰਦ ਬਦਲਣੇ ਹਨ, ਹੱਡੀ ਦੀ ਗ੍ਰਾਫਟਿੰਗ ਦੀ ਲੋੜ ਹੈ ਜਾਂ ਨਹੀਂ, ਅਤੇ ਕਿਹੜਾ ਕਰਾਊਨ ਚੁਣਿਆ ਗਿਆ ਹੈ — ਇਹਨਾਂ ਉੱਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ। ਹਰ ਕੇਸ ਦੀ ਜਾਂਚ CBCT ਉੱਤੇ ਵੱਖਰੇ ਤੌਰ ’ਤੇ ਹੁੰਦੀ ਹੈ ਅਤੇ ਇਲਾਜ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਸਾਫ਼, ਇੱਕ-ਇੱਕ ਚੀਜ਼ ਲਿਖੀ ਹੋਈ ਕੀਮਤ ਮਿਲਦੀ ਹੈ — ਕਾਊਂਟਰ ਉੱਤੇ ਕੋਈ ਹੈਰਾਨੀ ਨਹੀਂ।',
    faqTimingsLocation:
      'ਅਸੀਂ ਸੋਮਵਾਰ ਤੋਂ ਐਤਵਾਰ, ਸਵੇਰੇ 10:00 ਤੋਂ ਰਾਤ 8:00 ਵਜੇ ਤੱਕ — ਸੱਤੇ ਦਿਨ ਖੁੱਲ੍ਹੇ ਰਹਿੰਦੇ ਹਾਂ। ਕਲੀਨਿਕ 1533, New Prem Nagar, Ludhiana ਵਿੱਚ ਹੈ, Las Vegas Club ਦੇ ਨੇੜੇ, PAU ਗੇਟ ਨੰ. 4 ਅਤੇ Akaash Institute ਦੇ ਕੋਲ। ਸਲਾਹ ਬੁੱਕ ਕਰਨ ਲਈ 9077700021 ’ਤੇ ਕਾਲ ਕਰੋ।',
    footerBlurb:
      'ਲੁਧਿਆਣਾ ਵਿੱਚ ਮਾਹਰ-ਅਗਵਾਈ ਵਾਲਾ, ਤਕਨੀਕ ਨਾਲ ਚੱਲਣ ਵਾਲਾ ਡੈਂਟਲ ਸੈਂਟਰ। ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT, CAD/CAM ਤੇ ਡਿਜੀਟਲ ਸਕੈਨਰ, ਇੰਪਲਾਂਟ ਲਈ ਵੱਖਰਾ ਓਪਰੇਟਰੀ ਅਤੇ MDS ਮਾਹਰਾਂ ਦੀ ਟੀਮ — ਅਗਵਾਈ ਡਾ. ਚੰਦਨ ਜੈਨ ਵੱਲੋਂ, ਜੋ 14 ਸਾਲ ਤੋਂ ਵੱਧ ਤਜਰਬੇ ਵਾਲੇ ਇੰਪਲਾਂਟੋਲੋਜਿਸਟ ਹਨ।',
    vslKicker: 'ਵੇਖੋ: ਅਸੀਂ CBCT ਉੱਤੇ ਇੰਪਲਾਂਟ ਦੀ ਯੋਜਨਾ ਕਿਵੇਂ ਬਣਾਉਂਦੇ ਹਾਂ',
    vslCreds: 'ਚੀਫ਼ ਇੰਪਲਾਂਟੋਲੋਜਿਸਟ | MDS | WCOI ਜਪਾਨ',
    vslFlashLine: 'ਪਦਮ ਸ਼੍ਰੀ ਡਾ. ਮਹੇਸ਼ ਵਰਮਾ ਦੀ ਅਗਵਾਈ ਹੇਠ ਸਿਖਲਾਈ',
  },

  chandigarh: {
    name: 'ਚੰਡੀਗੜ੍ਹ',
    city: 'ਚੰਡੀਗੜ੍ਹ',
    experience: '13+ ਸਾਲ',
    leadDoctor: 'ਡਾ. ਗੌਰਵ ਵਰਸ਼ਨੇ',
    leadDoctorCreds: 'ਇੰਪਲਾਂਟੋਲੋਜਿਸਟ · MDS ਪ੍ਰੌਸਥੋਡੌਂਟਿਕਸ · ਕਰਾਊਨ ਮਾਹਰ',
    implantPrice: '₹25,000 ਤੋਂ*',
    timings: 'ਸੋਮ–ਸ਼ਨਿੱਚਰ: ਸਵੇਰੇ 9:45 – ਰਾਤ 8 ਵਜੇ',
    daysLine: 'ਸੋਮਵਾਰ ਤੋਂ ਸ਼ਨਿੱਚਰਵਾਰ ਖੁੱਲ੍ਹਾ',
    implantStats: [
      { value: '13+ ਸਾਲ', label: 'ਇੰਪਲਾਂਟ ਦਾ ਮਾਹਰ ਤਜਰਬਾ' },
      { value: 'MDS ਪ੍ਰੌਸਥੋਡੌਂਟਿਕਸ', label: 'ਇੰਪਲਾਂਟੋਲੋਜਿਸਟ ਤੇ ਕਰਾਊਨ ਮਾਹਰ' },
      { value: '6 ਸਪੈਸ਼ਲਿਟੀਆਂ', label: 'ਇੱਕੋ ਛੱਤ ਹੇਠ' },
      { value: 'ਵੱਖਰਾ ਸੂਟ', label: 'ਸਿਰਫ਼ ਇੰਪਲਾਂਟ ਸਰਜਰੀ ਲਈ' },
    ],
    clinicTourLabels: [],
    doctorFooter:
      'ਚੰਡੀਗੜ੍ਹ ਪੂਰਾ ਮਲਟੀ-ਸਪੈਸ਼ਲਿਟੀ ਸੈਂਟਰ ਹੈ: ਪ੍ਰੌਸਥੋਡੌਂਟਿਸਟ, ਪੀਰੀਓਡੌਂਟਿਸਟ, ਐਂਡੋਡੌਂਟਿਸਟ, ਆਰਥੋਡੌਂਟਿਸਟ, ਪੀਡੋਡੌਂਟਿਸਟ ਅਤੇ ਓਰਲ ਤੇ ਮੈਕਸੀਲੋਫੇਸ਼ੀਅਲ ਸਰਜਨ — ਸਾਰੇ ਇੱਕੋ ਛੱਤ ਹੇਠ, 7 ਜਣਿਆਂ ਦੀ ਟੀਮ ਅਤੇ ਚਾਰ ਵੱਖਰੇ ਓਪਰੇਟਰੀਆਂ ਨਾਲ — ਇਸ ਲਈ ਔਖੇ ਤੋਂ ਔਖਾ ਕੇਸ ਵੀ ਕਿਤੇ ਹੋਰ ਭੇਜਣ ਦੀ ਲੋੜ ਨਹੀਂ ਪੈਂਦੀ।',
    faqCbct:
      'CBCT ਤੁਹਾਡੇ ਜਬਾੜੇ ਦਾ 3D ਸਕੈਨ ਹੈ ਜੋ ਹੱਡੀ ਦੀ ਬਿਲਕੁਲ ਸਹੀ ਉਚਾਈ, ਚੌੜਾਈ ਅਤੇ ਨਸਾਂ ਤੇ ਸਾਈਨਸ ਦੀ ਥਾਂ ਦਿਖਾਉਂਦਾ ਹੈ — ਇੰਨੀ ਬਾਰੀਕੀ ਆਮ X-ray ਨਹੀਂ ਦੇ ਸਕਦੀ। ਸਾਡਾ CBCT ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ ਹੋਣ ਕਰਕੇ ਤੁਹਾਡਾ ਸਕੈਨ, ਜਾਂਚ ਅਤੇ ਇਲਾਜ ਦੀ ਯੋਜਨਾ ਇੱਕੋ ਵਿਜ਼ਿਟ ਵਿੱਚ ਹੋ ਜਾਂਦੇ ਹਨ।',
    faqPricing:
      'ਡੈਂਟਲ ਇੰਪਲਾਂਟ ₹25,000 ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੇ ਹਨ। ਅੰਤਿਮ ਖ਼ਰਚਾ ਇੰਪਲਾਂਟ ਸਿਸਟਮ, ਕਿੰਨੇ ਦੰਦ ਬਦਲਣੇ ਹਨ, ਗ੍ਰਾਫਟਿੰਗ ਦੀ ਲੋੜ ਅਤੇ ਕਰਾਊਨ ਦੀ ਕਿਸਮ ਉੱਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ। ਇਲਾਜ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਸਾਫ਼, ਇੱਕ-ਇੱਕ ਚੀਜ਼ ਲਿਖੀ ਹੋਈ ਕੀਮਤ ਮਿਲਦੀ ਹੈ।',
    faqTimingsLocation:
      'ਅਸੀਂ ਸੋਮਵਾਰ ਤੋਂ ਸ਼ਨਿੱਚਰਵਾਰ, ਸਵੇਰੇ 9:45 ਤੋਂ ਰਾਤ 8:00 ਵਜੇ ਤੱਕ ਖੁੱਲ੍ਹੇ ਰਹਿੰਦੇ ਹਾਂ। ਕਲੀਨਿਕ SCO 103, First Floor, Sector 35-C, Chandigarh ਵਿੱਚ ਹੈ। ਸਲਾਹ ਬੁੱਕ ਕਰਨ ਲਈ 9077700020 ’ਤੇ ਕਾਲ ਕਰੋ।',
    footerBlurb:
      'ਚੰਡੀਗੜ੍ਹ ਦੇ ਸੈਕਟਰ 35-C ਵਿੱਚ ਪ੍ਰੀਮੀਅਮ, ਤਕਨੀਕ ਨਾਲ ਚੱਲਣ ਵਾਲਾ ਮਲਟੀ-ਸਪੈਸ਼ਲਿਟੀ ਡੈਂਟਲ ਸੈਂਟਰ। ਕਲੀਨਿਕ ਵਿੱਚ ਹੀ CBCT, ਡਿਜੀਟਲ ਸਕੈਨਰ, ਚਾਰ ਓਪਰੇਟਰੀਆਂ ਅਤੇ ਇੰਪਲਾਂਟ ਲਈ ਵੱਖਰਾ ਸਰਜੀਕਲ ਸੂਟ — ਅਗਵਾਈ ਡਾ. ਗੌਰਵ ਵਰਸ਼ਨੇ ਵੱਲੋਂ।',
    vslKicker: 'ਵੇਖੋ: ਅਸੀਂ ਤੁਹਾਡੇ ਇਲਾਜ ਦੀ ਯੋਜਨਾ ਕਿਵੇਂ ਬਣਾਉਂਦੇ ਹਾਂ',
  },
};

/**
 * The branch config as this language renders it.
 *
 * Returns the config untouched for English, and for Punjabi a shallow copy
 * with the prose swapped. Everything the overlay does not name — URLs, phone
 * numbers, images, reviews, the street address — is carried through unchanged,
 * so a field added to `branch-configs.ts` can never silently vanish here.
 */
export function localizeBranch(branch: BranchConfig, lang: Lang): BranchConfig {
  const o = lang === 'pa' ? PA[branch.slug] : undefined;
  if (!o) return branch;

  return {
    ...branch,
    name: o.name,
    city: o.city,
    implantStats: o.implantStats,
    pricing: { ...branch.pricing, implant: o.implantPrice },
    clinicTour: branch.clinicTour.map((clip, i) => ({
      ...clip,
      label: o.clinicTourLabels[i] ?? clip.label,
    })),
    // Only the first doctor's `footer` renders on this page, but mapping every
    // entry keeps the array shape honest rather than leaving one odd one out.
    doctors: branch.doctors.map((doc, i) => (i === 0 ? { ...doc, footer: o.doctorFooter } : doc)),
    contact: { ...branch.contact, timings: o.timings, daysLine: o.daysLine },
    vsl: {
      ...branch.vsl,
      kicker: o.vslKicker,
      creds: o.vslCreds ?? branch.vsl.creds,
      flashLine: o.vslFlashLine ?? branch.vsl.flashLine,
    },
    copy: {
      ...branch.copy,
      leadDoctor: o.leadDoctor,
      leadDoctorCreds: o.leadDoctorCreds,
      experience: o.experience,
      faqCbct: o.faqCbct,
      faqPricing: o.faqPricing,
      faqTimingsLocation: o.faqTimingsLocation,
      footerBlurb: o.footerBlurb,
    },
  };
}
