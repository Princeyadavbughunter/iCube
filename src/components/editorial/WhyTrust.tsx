import Image from 'next/image';
import { Check } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine, MediaFrame, PhotoPending } from './Primitives';
import { Stagger, StaggerItem } from '@/components/motion/Motion';

/** Image left, reasons right — the mirror of the services block above it. */
export default function WhyTrust({ branch }: { branch: BranchConfig }) {
  const photo = branch.clinicImages[1];

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="why-us">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <MediaFrame offset="tl" className="order-2 lg:order-1">
          {photo ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <PhotoPending label={`${branch.name} operatory photo`} />
          )}
        </MediaFrame>

        <div className="order-1 lg:order-2">
          <SectionLabel>Why Choose Us</SectionLabel>
          <SectionHeading>Dental care you can actually rely on</SectionHeading>
          <PaLine>{branch.pa.trust}</PaLine>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-gray-500">
            Choosing where to have an implant placed is a decision worth getting right. Here is what
            is different about this practice.
          </p>

          <Stagger className="mt-7 space-y-3.5" gap={0.06}>
            {branch.usps.map((usp) => (
              <StaggerItem key={usp} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[var(--brand-teal)]">
                  <Check size={12} strokeWidth={3.2} className="text-white" />
                </span>
                <span className="text-[15px] leading-snug text-gray-700">{usp}</span>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Punjabi restates the same reasons rather than translating the list
              item by item — a local reader gets the argument in one pass. */}
          <ul lang="pa" className="mt-5 space-y-2 border-t border-gray-200 pt-5">
            {branch.pa.usps.map((usp) => (
              <li key={usp} className="flex items-start gap-2.5 text-[14px] leading-snug text-gray-500">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent-gold-deep)]" />
                {usp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
