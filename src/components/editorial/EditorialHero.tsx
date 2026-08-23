'use client';

import { Star, Phone } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import VslPlayer from '@/components/VslPlayer';
import HeroVideo from '@/components/HeroVideo';
import ImplantShowcase from '@/components/ImplantShowcase';
import { PaLine, PrimaryButton, GhostButton } from './Primitives';

interface EditorialHeroProps {
  branch: BranchConfig;
  onBookAppointment: () => void;
}

/**
 * Hero: claim on the left, film on the right.
 *
 * The eyebrow line is set in the accent colour and italic, so the headline
 * beneath it reads as the single loudest thing on the page. No entrance
 * animation — this is above the fold and an animation would only delay it.
 */
export default function EditorialHero({ branch, onBookAppointment }: EditorialHeroProps) {
  const phone = branch.contact.phones[0];
  const reviewCount = branch.reviews.length;

  return (
    <section className="relative px-4 pt-24 pb-14 sm:px-6 md:pt-28 md:pb-20 lg:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-14">
        {/* ---- Claim ---- */}
        <div>
          <p className="font-poppins text-2xl font-semibold italic leading-tight text-[var(--accent-gold-deep)] sm:text-[28px]">
            Healthy Smiles
          </p>
          <h1 className="mt-2 font-poppins text-[2.4rem] font-bold leading-[1.08] tracking-tight text-[var(--brand-teal-deep)] sm:text-5xl lg:text-[3.4rem]">
            {branch.heroTitle}
          </h1>

          <PaLine>{branch.pa.heroTitle}</PaLine>

          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-gray-500">
            In-house CBCT, digital scanners and CAD/CAM, with every case diagnosed and delivered by
            MDS specialists — so nothing is guessed at and nothing is referred out.
          </p>
          <p lang="pa" className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-gray-500">
            {branch.pa.heroSub}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={onBookAppointment}>
              Book an Appointment
              <span lang="pa" className="font-normal opacity-75">· ਬੁੱਕ ਕਰੋ</span>
            </PrimaryButton>
            <GhostButton href={`tel:${phone.replace(/\s/g, '')}`}>
              <Phone size={15} />
              {phone}
            </GhostButton>
          </div>

          {/* Rating row. The count is the number of reviews actually shown on
              this page, so it can never overstate what we can evidence. */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-[var(--accent-gold-deep)] text-[var(--accent-gold-deep)]" />
              ))}
            </div>
            <span className="text-[13px] text-gray-500">
              <strong className="font-bold text-[var(--brand-teal-deep)]">5.0</strong> from{' '}
              {reviewCount} Google reviews
            </span>
          </div>
        </div>

        {/* ---- Film ---- */}
        <div className="relative">
          <span
            aria-hidden
            className="absolute -right-4 -top-4 -z-10 h-28 w-28 rounded-2xl bg-[var(--accent-gold)] opacity-90 sm:h-36 sm:w-36"
          />
          {branch.vsl.src ? (
            <VslPlayer branch={branch} />
          ) : branch.heroVideo ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] shadow-[0_18px_50px_-24px_rgba(16,17,36,0.4)]">
              <HeroVideo src={branch.heroVideo} poster={branch.heroPoster} label={branch.name} />
            </div>
          ) : (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] shadow-[0_18px_50px_-24px_rgba(16,17,36,0.4)]">
              <ImplantShowcase />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
