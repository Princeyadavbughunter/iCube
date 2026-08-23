import Image from 'next/image';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine, MediaFrame, PhotoPending } from './Primitives';

/** What actually happens across a course of treatment, in order. */
const STEPS = [
  {
    title: 'Consultation & CBCT scan',
    pa: 'ਸਲਾਹ ਤੇ CBCT ਸਕੈਨ',
    body: 'Your scan is taken in the clinic and read with you on screen in the same visit.',
  },
  {
    title: 'Diagnosis & itemised plan',
    pa: 'ਜਾਂਚ ਤੇ ਪੂਰਾ ਖ਼ਰਚਾ',
    body: 'You leave knowing what is being done, in what order, and what each part costs.',
  },
  {
    title: 'Treatment by a specialist',
    pa: 'ਸਪੈਸ਼ਲਿਸਟ ਵੱਲੋਂ ਇਲਾਜ',
    body: 'The MDS specialist in that field carries out the work — nothing is referred out.',
  },
  {
    title: 'Aftercare & follow-up',
    pa: 'ਬਾਅਦ ਦੀ ਸੰਭਾਲ',
    body: 'Reviews are scheduled, and the same team that treated you is the team you come back to.',
  },
];

export default function ProcessSteps({ branch }: { branch: BranchConfig }) {
  const photo = branch.clinicImages[2]?.src || branch.beforeAfter.images[2]?.src;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="process">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel>Treatment Process</SectionLabel>
          <SectionHeading>Simple, safe and comfortable</SectionHeading>
          <PaLine>ਸੌਖਾ, ਸੁਰੱਖਿਅਤ ਤੇ ਆਰਾਮਦਾਇਕ ਇਲਾਜ</PaLine>

          <ol className="mt-8 space-y-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-gray-200 bg-[var(--bg-surface-soft)] p-4 transition-colors hover:border-[var(--accent-gold)]"
              >
                <div className="flex gap-3.5">
                  <span className="mt-0.5 shrink-0 font-poppins text-[13px] font-bold tabular-nums text-[var(--accent-gold-deep)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-poppins text-[15.5px] font-bold leading-snug text-[var(--brand-teal-deep)]">
                      {step.title}
                    </h3>
                    <p lang="pa" className="mt-0.5 text-[13px] font-medium text-[var(--brand-teal)]">
                      {step.pa}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">{step.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <MediaFrame offset="br">
          {photo ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photo}
                alt={`Treatment at I Cube Dental ${branch.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <PhotoPending label="CBCT / consultation photo" />
          )}
        </MediaFrame>
      </div>
    </section>
  );
}
