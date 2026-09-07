'use client';

import type { BranchConfig } from '@/config/branch-configs';
import { useLang } from '@/components/LanguageProvider';

/**
 * The branch's credentials, stated plainly.
 *
 * Read from `implantStats` so each branch states its own — qualifications,
 * training, team, and any treatment-volume figure the practice has confirmed.
 * A number on a medical page is a claim a clinic has to be able to stand
 * behind, so nothing is added here that the branch has not supplied.
 *
 * Six stats lay out three per row, four lay out four across; both fall back to
 * two columns on mobile.
 */
export default function ImplantTrustBar({ branch }: { branch: BranchConfig }) {
  const { t } = useLang();
  const stats = branch.implantStats;
  if (stats.length === 0) return null;

  return (
    <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mx-auto mb-10 max-w-2xl text-center text-[14.5px] leading-relaxed text-gray-500">
          {t.trustBar.leadIn}
          <span className="font-bold text-[var(--brand-teal-deep)]">{t.trustBar.emphasis}</span>
          {t.trustBar.tail}
        </p>

        <div
          className={`grid grid-cols-2 gap-4 md:gap-5 ${
            stats.length % 3 === 0 ? 'md:grid-cols-3' : 'md:grid-cols-4'
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[var(--bg-surface-soft)] p-5 text-center transition-colors hover:border-[var(--accent-gold)]/60 sm:p-6"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)' }}
              />
              <div className="font-poppins text-[1.15rem] font-bold leading-tight tracking-tight text-[var(--brand-teal-deep)] sm:text-[1.4rem]">
                {stat.value}
              </div>
              <p className="mt-2 text-[11.5px] font-medium leading-snug text-gray-500 sm:text-[12.5px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
