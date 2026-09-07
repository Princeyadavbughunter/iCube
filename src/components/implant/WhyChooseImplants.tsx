'use client';

import { Award, ScanLine, Cpu, ShieldCheck, Users, IndianRupee } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { useLang } from '@/components/LanguageProvider';

/**
 * Six reasons, each tied to something the practice can actually show you.
 *
 * Every card is built from this branch's own config — the lead doctor's
 * qualifications, the team size, the published implant price — so Chandigarh
 * states Dr. Gaurav's thirteen years where Ludhiana states Dr. Chandan's ten,
 * and neither page carries a claim the other's premises would have to honour.
 */
export default function WhyChooseImplants({ branch }: { branch: BranchConfig }) {
  const { copy, city, pricing } = branch;
  const { t } = useLang();
  const w = t.why;

  const reasons = [
    {
      Icon: Award,
      title: w.expertise.title,
      body: w.expertise.body(copy.leadDoctor, copy.leadDoctorCreds, copy.experience),
    },
    { Icon: ScanLine, title: w.planning.title, body: w.planning.body },
    { Icon: Cpu, title: w.technology.title, body: w.technology.body },
    { Icon: ShieldCheck, title: w.operatory.title, body: w.operatory.body },
    { Icon: Users, title: w.specialists.title, body: w.specialists.body(copy.teamSize) },
    {
      Icon: IndianRupee,
      title: w.quote.title,
      body: w.quote.body(pricing.implant.replace(/\*$/, '')),
    },
  ];

  return (
    <section className="bg-[var(--accent-pink-soft)] px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="why-us">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto mb-12 max-w-2xl text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          {w.heading(city)}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold)]/60 hover:shadow-[0_18px_45px_-24px_rgba(16,17,36,0.35)]"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                <Icon size={19} strokeWidth={2.2} />
              </span>
              <h3 className="font-poppins text-[15.5px] font-bold leading-snug text-[var(--brand-teal-deep)]">
                {title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-gray-500">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
