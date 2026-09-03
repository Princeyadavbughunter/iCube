import Image from 'next/image';
import type { BranchConfig } from '@/config/branch-configs';
import { PhotoPending } from '@/components/editorial/Primitives';
import ConsultCta from './ConsultCta';

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
  const photo = branch.clinicImages[0];

  return (
    <section className="bg-[var(--accent-pink-soft)] px-4 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-36 lg:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-poppins text-[2.1rem] font-bold leading-[1.1] tracking-tight text-[var(--brand-teal-deep)] sm:text-5xl">
          Missing Teeth?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-600 sm:text-[17.5px]">
          Explore {branch.city}&rsquo;s specialist-led dental implant centre — every case planned on
          in-house CBCT and placed by MDS specialists.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[22px] shadow-[0_28px_70px_-32px_rgba(16,17,36,0.55)] ring-1 ring-black/5">
        <div className="relative aspect-[16/9] w-full bg-gray-100">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          ) : (
            <PhotoPending label="Clinic photograph awaited" ratio="aspect-[16/9]" />
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl text-center">
        <h2 className="font-poppins text-[1.5rem] font-bold leading-snug tracking-tight text-[var(--brand-teal)] sm:text-[1.9rem]">
          Specialist-Led Implantology &middot; CBCT-Planned &amp; Digitally Guided Care
        </h2>
        <div className="mt-8">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
