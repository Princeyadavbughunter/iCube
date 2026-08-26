import Image from 'next/image';
import { GraduationCap, Stethoscope } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { doctorsFor } from '@/config/team';
import { SectionLabel, SectionHeading, PaLine } from './Primitives';

/**
 * The specialists who actually practise at this branch, side by side.
 *
 * Ludhiana gets Dr. Chandan Jain and Dr. Deepika Jain, Chandigarh gets
 * Dr. Gaurav Varshney and Dr. Priyanka Sharma — the pairing patients name in
 * the reviews further down the page.
 *
 * Each card carries the name over the portrait rather than under it: the scrim
 * that makes the name legible also stops the photograph competing with the
 * body copy below, so two cards side by side stay calm rather than busy.
 */
export default function AboutSection({ branch }: { branch: BranchConfig }) {
  const doctors = doctorsFor(branch.slug);
  if (doctors.length === 0) return null;

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="about">
      <div className="mx-auto max-w-6xl">
        <div className="mb-11 flex flex-col items-center text-center">
          <SectionLabel>About Us</SectionLabel>
          <SectionHeading className="max-w-2xl">
            Caring for your smile at every stage of life
          </SectionHeading>
          <PaLine>ਹਰ ਉਮਰ ਵਿੱਚ ਤੁਹਾਡੇ ਦੰਦਾਂ ਦੀ ਪੂਰੀ ਸੰਭਾਲ</PaLine>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-500">
            {branch.name} is led by {doctors.length} MDS specialists working in one practice, so a
            case that needs more than one discipline never leaves the building.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-7">
          {doctors.map((doc, i) => {
            const isLead = i === 0;
            return (
              <article
                key={doc.name}
                className="group overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_18px_50px_-30px_rgba(16,17,36,0.4)] transition-shadow hover:shadow-[0_28px_64px_-30px_rgba(16,17,36,0.45)]"
              >
                {/* ---- Portrait with the name laid over it ---- */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                  {doc.image ? (
                    <Image
                      src={doc.image}
                      alt={`${doc.name} — I Cube Dental ${branch.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      priority={isLead}
                    />
                  ) : (
                    /* No photograph on file — a monogram, never a stock portrait
                       of an unrelated person. */
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                      style={{
                        background:
                          'linear-gradient(150deg, var(--brand-teal) 0%, var(--brand-teal-ink) 100%)',
                      }}
                    >
                      <span className="font-poppins text-6xl font-bold tracking-tight text-[var(--accent-gold)]">
                        {doc.initials}
                      </span>
                      <span className="px-6 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
                        Photograph coming soon
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0e1c] via-[#0d0e1c]/25 to-transparent" />

                  {isLead && (
                    <span className="absolute left-4 top-4 rounded-full bg-[var(--accent-gold)] px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--brand-teal-ink)]">
                      {branch.name} Lead
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="font-poppins text-2xl font-bold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                      {doc.name}
                    </h3>
                    <p className="mt-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--accent-gold)]">
                      {doc.credentials}
                    </p>
                  </div>
                </div>

                {/* ---- Detail ---- */}
                <div className="p-5 sm:p-6">
                  <p className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-snug text-[var(--brand-teal-deep)]">
                    <Stethoscope size={15} className="mt-0.5 shrink-0 text-[var(--accent-gold-deep)]" />
                    {doc.role}
                  </p>

                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-gray-500">{doc.bio}</p>

                  <p className="mt-4 flex items-start gap-2 border-t border-gray-100 pt-4 text-[12.5px] leading-snug text-gray-500">
                    <GraduationCap size={14} className="mt-0.5 shrink-0 text-[var(--accent-gold-deep)]" />
                    {doc.pedigree}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 border-l-2 border-[var(--accent-gold)] pl-4 text-[14.5px] leading-relaxed text-gray-500">
          {branch.doctors[0].footer}
        </p>
      </div>
    </section>
  );
}
