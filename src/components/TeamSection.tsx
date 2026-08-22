import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import { team } from '@/config/team';
import type { BranchConfig } from '@/config/branch-configs';

interface TeamSectionProps {
  branch: BranchConfig;
}

/**
 * The full specialist team, with this branch's lead called out first.
 *
 * Patients name Dr. Deepika Jain and Dr. Priyanka Sharma in the Google reviews
 * shown further down the page, so the team has to be visible here or those
 * reviews read as being about someone else's practice.
 */
export default function TeamSection({ branch }: TeamSectionProps) {
  const leadName = branch.doctors[0]?.name;
  // Lead first, the rest in their published order.
  const ordered = [...team].sort((a, b) => Number(b.name === leadName) - Number(a.name === leadName));

  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-28" id="team">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="badge-pink inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
            Our Specialists
          </span>
          <h2 className="mt-4 font-poppins text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
            Treated by <span className="text-gradient-logo">MDS specialists</span>
          </h2>
          <p className="mt-3 text-lg font-medium text-[var(--brand-teal)] md:text-xl" lang="pa">
            ਹਰ ਇਲਾਜ MDS ਸਪੈਸ਼ਲਿਸਟ ਡਾਕਟਰ ਵੱਲੋਂ
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-gray-500 md:text-lg">
            Every case is diagnosed and delivered by a specialist in that field — not handed to a
            general practitioner and not referred out of the practice.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ordered.map((member, i) => {
            const isLead = member.name === leadName;
            return (
              <article
                key={member.name}
                className={`fade-up stagger-${i + 1} group relative overflow-hidden rounded-[22px] border bg-white/90 backdrop-blur-sm transition-shadow depth-stack ${
                  isLead ? 'border-[var(--accent-gold)]/60 ring-1 ring-[var(--accent-gold)]/30' : 'border-white/80'
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    /* No photograph on file — a monogram, never a stock portrait
                       of an unrelated person. */
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(150deg, var(--brand-teal) 0%, var(--brand-teal-ink) 100%)' }}
                    >
                      <span className="font-poppins text-5xl font-bold tracking-tight text-[var(--accent-gold)]">
                        {member.initials}
                      </span>
                      <span className="px-6 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        Photograph coming soon
                      </span>
                    </div>
                  )}

                  {isLead && (
                    <span className="absolute left-3 top-3 rounded-full bg-[var(--accent-gold)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--brand-teal-ink)] shadow">
                      {branch.name} Lead
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-poppins text-lg font-bold leading-tight text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--brand-teal)]">
                    {member.credentials}
                  </p>
                  <p className="mt-2.5 text-[13.5px] leading-snug text-gray-600">{member.role}</p>
                  <p className="mt-3 flex items-start gap-1.5 border-t border-gray-100 pt-3 text-[11.5px] leading-snug text-gray-500">
                    <GraduationCap size={13} className="mt-0.5 shrink-0 text-[var(--accent-gold-deep)]" />
                    {member.pedigree}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
