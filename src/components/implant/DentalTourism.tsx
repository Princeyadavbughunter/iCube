'use client';

import { Users, Clock, Sparkles, ShieldCheck, IndianRupee, Plane } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { useLang } from '@/components/LanguageProvider';

/** One icon per `dentalTourism` entry, in the order the branch supplies them. */
const ICONS = [Users, Clock, Sparkles, ShieldCheck, IndianRupee, Plane];

/**
 * Why an out-of-town or international patient would choose this branch
 * specifically, for patients who flew or drove in rather than walked in from
 * the neighbourhood.
 *
 * Entirely data-driven off `branch.dentalTourism` — a branch with nothing to
 * say here (Ludhiana, for now) renders no section rather than reused filler,
 * same convention as the rest of the page.
 */
export default function DentalTourism({ branch }: { branch: BranchConfig }) {
  const { t } = useLang();
  const reasons = branch.dentalTourism;

  if (reasons.length === 0) return null;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="dental-tourism">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto mb-12 max-w-2xl text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          {t.tourism.heading(branch.city)}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ title, body }, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-[var(--bg-medical-light)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold)]/60 hover:shadow-[0_18px_45px_-24px_rgba(16,17,36,0.35)]"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                  <Icon size={19} strokeWidth={2.2} />
                </span>
                <h3 className="font-poppins text-[15.5px] font-bold leading-snug text-[var(--brand-teal-deep)]">
                  {title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-gray-500">{body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
