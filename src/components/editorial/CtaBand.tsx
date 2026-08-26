'use client';

import Image from 'next/image';
import { Phone } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { teamPhotos } from '@/config/team';
import { PrimaryButton } from './Primitives';

interface CtaBandProps {
  branch: BranchConfig;
  onBookAppointment: () => void;
}

/** Closing ask: copy left, image right, on a soft tinted band. */
export default function CtaBand({ branch, onBookAppointment }: CtaBandProps) {
  const phone = branch.contact.phones[0];
  // A second premises photo belongs here once one exists. Until then the team
  // shot stands in — everyone at the practice, which is the right note for the
  // closing ask, and a real photograph rather than a placeholder panel. It
  // appears as a thumbnail up in the team section, so seeing it large here
  // reads as a return rather than a repeat.
  const photo = branch.clinicImages[1] ?? teamPhotos.full;

  return (
    <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[24px] bg-[var(--accent-pink-soft)] ring-1 ring-[var(--accent-gold)]/30">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-12">
            <h2 className="font-poppins text-[1.85rem] font-bold leading-[1.15] tracking-tight text-[var(--brand-teal-deep)] sm:text-[2.1rem]">
              Ready for a healthier, more confident smile?
            </h2>
            <p lang="pa" className="mt-2.5 text-[17px] font-medium text-[var(--brand-teal)]">
              ਅੱਜ ਹੀ ਆਪਣੀ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-600">
              Book a consultation at {branch.name} and get your case planned on in-house CBCT from
              the very first visit. {branch.pricing.implant} for implants.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton onClick={onBookAppointment}>
                Book an Appointment
                <span lang="pa" className="font-normal opacity-75">· ਬੁੱਕ ਕਰੋ</span>
              </PrimaryButton>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--brand-teal)]/25 bg-white px-7 py-3.5 text-[14px] font-bold text-[var(--brand-teal-deep)] transition-colors hover:border-[var(--brand-teal)]"
              >
                <Phone size={15} />
                {phone}
              </a>
            </div>

            <p className="mt-5 text-[12.5px] text-gray-500">
              {branch.contact.daysLine} · {branch.contact.timings}
            </p>
          </div>

          <div className="relative h-full min-h-[240px] md:min-h-[320px]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
