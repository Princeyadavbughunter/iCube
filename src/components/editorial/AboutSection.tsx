import Image from 'next/image';
import type { BranchConfig } from '@/config/branch-configs';
import { doctorsFor } from '@/config/team';
import { SectionLabel, SectionHeading, PaLine } from './Primitives';

/**
 * The specialists who actually practise at this branch.
 *
 * Ludhiana gets Dr. Chandan Jain and Dr. Deepika Jain, Chandigarh gets
 * Dr. Gaurav Varshney and Dr. Priyanka Sharma — the pairing patients name in
 * the reviews further down the page.
 *
 * Deep navy cards against the page's white sections, with the credentials set
 * in gold. Two things make the treatment work rather than just look dark: the
 * portrait bleeds to the card's edge on the outside, so the pair frames the
 * section rather than facing the same way, and the credential list is the
 * clinic's own wording — these are claims about a real clinician's
 * qualifications, so they are quoted, never paraphrased.
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

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
          {doctors.map((doc, i) => {
            const isLead = i === 0;
            // The second card mirrors the first, so the two portraits sit on
            // the outside edges and frame the pair.
            const photoRight = i % 2 === 0;

            return (
              <article
                key={doc.name}
                className="group relative flex flex-col overflow-hidden rounded-[24px] shadow-[0_26px_60px_-30px_rgba(16,17,36,0.65)]"
                style={{
                  background:
                    'linear-gradient(140deg, #2a2b47 0%, #1c1d33 55%, #121324 100%)',
                }}
              >
                {/* Gold hairline along the top edge. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
                  }}
                />

                <div
                  className={`flex flex-1 flex-col-reverse sm:flex-row sm:items-stretch ${
                    photoRight ? '' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* ---- Credentials ---- */}
                  <div className="flex-1 p-6 sm:p-7">
                    {isLead && (
                      <span className="mb-3 inline-block rounded-full bg-[var(--accent-gold)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--brand-teal-ink)]">
                        {branch.name} Lead
                      </span>
                    )}

                    <h3 className="font-poppins text-[1.65rem] font-bold leading-tight tracking-tight text-white sm:text-[1.8rem]">
                      {doc.name}
                    </h3>

                    <span
                      aria-hidden
                      className="mt-3 block h-[2px] w-12 rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--accent-gold), transparent)' }}
                    />

                    <ul className="mt-5 space-y-2.5">
                      {doc.credits.map((credit) => (
                        <li key={credit} className="flex items-start gap-2.5">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-gold)]" />
                          <span className="text-[13.5px] leading-snug text-white/75">{credit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ---- Portrait, bled to the card edge ---- */}
                  <div className="relative w-full shrink-0 sm:w-[43%]">
                    <div className="relative aspect-[4/5] w-full sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
                      {doc.image ? (
                        <Image
                          src={doc.image}
                          alt={`${doc.name} — I Cube Dental ${branch.name}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.04]"
                          priority={isLead}
                        />
                      ) : (
                        /* No photograph on file — a monogram, never a stock
                           portrait of an unrelated person. */
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/[0.04]">
                          <span className="font-poppins text-5xl font-bold tracking-tight text-[var(--accent-gold)]/70">
                            {doc.initials}
                          </span>
                          <span className="px-6 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                            Photograph coming soon
                          </span>
                        </div>
                      )}

                      {/* Feathers the photo into the card so it reads as inset
                          rather than pasted on. */}
                      <div
                        aria-hidden
                        className={`pointer-events-none absolute inset-0 ${
                          photoRight
                            ? 'bg-gradient-to-r from-[#1c1d33] via-transparent to-transparent'
                            : 'bg-gradient-to-l from-[#1c1d33] via-transparent to-transparent'
                        }`}
                      />
                    </div>
                  </div>
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
