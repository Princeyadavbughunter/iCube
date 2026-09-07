'use client';

import type { BranchConfig } from '@/config/branch-configs';
import { PhotoPending } from '@/components/editorial/Primitives';
import ConsultCta from './ConsultCta';
import HeroCarousel from './HeroCarousel';
import { useLang } from '@/components/LanguageProvider';

/**
 * Opening block: the question, the premises, the positioning line.
 *
 * The question comes first and alone. Someone who has lost a tooth is not
 * browsing dentistry in general, and naming their situation in two words does
 * more work than any headline about the clinic could.
 *
 * The claim underneath is deliberately about method rather than size. We can
 * evidence specialist qualifications, in-house CBCT and a dedicated operatory;
 * we cannot evidence being the biggest or the safest, so the page does not
 * say it.
 */
export default function ImplantHero({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  const { t } = useLang();

  // The branch's own hero shoot when it has one; otherwise the first clinic
  // photograph, so a branch still gets a real picture of its own premises
  // rather than the placeholder, and never another practice's.
  const fallback = branch.clinicImages[0];
  const slides = branch.heroSlides.length > 0 ? branch.heroSlides : fallback ? [fallback] : [];

  return (
    <section className="bg-[var(--accent-pink-soft)] px-4 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-36 lg:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-poppins text-[2.1rem] font-bold leading-[1.1] tracking-tight text-[var(--brand-teal-deep)] sm:text-5xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-600 sm:text-[17.5px]">
          {t.hero.sub(branch.city)}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        {slides.length > 0 ? (
          <HeroCarousel slides={slides} />
        ) : (
          <PhotoPending label={t.hero.photoPending} ratio="aspect-[16/9]" />
        )}
      </div>

      <div className="mx-auto mt-12 max-w-3xl text-center">
        <h2 className="font-poppins text-[1.5rem] font-bold leading-snug tracking-tight text-[var(--brand-teal)] sm:text-[1.9rem]">
          {t.hero.positioning}
        </h2>
        <div className="mt-8">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
