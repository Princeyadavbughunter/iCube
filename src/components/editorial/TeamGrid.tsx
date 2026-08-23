import Image from 'next/image';
import { team } from '@/config/team';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine } from './Primitives';

/**
 * The full specialist team, this branch's lead first.
 *
 * The Google reviews further down name Dr. Deepika Jain and Dr. Priyanka
 * Sharma, so leaving them off would make those reviews read as being about
 * some other practice.
 */
export default function TeamGrid({ branch }: { branch: BranchConfig }) {
  const leadName = branch.doctors[0]?.name;
  const ordered = [...team].sort(
    (a, b) => Number(b.name === leadName) - Number(a.name === leadName),
  );

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="team">
      <div className="mx-auto max-w-6xl">
        <div className="mb-11 flex flex-col items-center text-center">
          <SectionLabel>Meet Our Doctors</SectionLabel>
          <SectionHeading className="max-w-2xl">
            Meet our professional dental team
          </SectionHeading>
          <PaLine>ਹਰ ਇਲਾਜ MDS ਸਪੈਸ਼ਲਿਸਟ ਡਾਕਟਰ ਵੱਲੋਂ</PaLine>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
            Every case is diagnosed and delivered by a specialist in that field — not handed to a
            general practitioner and not referred out of the practice.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ordered.map((member) => {
            const isLead = member.name === leadName;
            return (
              <article key={member.name} className="group">
                <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
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
                      <span className="font-poppins text-5xl font-bold tracking-tight text-[var(--accent-gold)]">
                        {member.initials}
                      </span>
                      <span className="px-6 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
                        Photograph coming soon
                      </span>
                    </div>
                  )}

                  {isLead && (
                    <span className="absolute left-3 top-3 rounded-full bg-[var(--accent-gold)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--brand-teal-ink)]">
                      {branch.name} Lead
                    </span>
                  )}
                </div>

                <h3 className="font-poppins text-[16.5px] font-bold leading-tight text-[var(--brand-teal-deep)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-[12.5px] font-bold uppercase tracking-[0.08em] text-[var(--accent-gold-deep)]">
                  {member.credentials}
                </p>
                <p className="mt-2 text-[13.5px] leading-snug text-gray-500">{member.role}</p>
                <p className="mt-2 text-[12px] leading-snug text-gray-400">{member.pedigree}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
