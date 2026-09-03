import type { BranchConfig } from '@/config/branch-configs';

/**
 * Four credentials, stated plainly.
 *
 * The reference page runs implants-placed and patients-treated counts here.
 * We have no audited figure for either, and a number on a medical page is a
 * claim a clinic has to be able to stand behind, so this carries what the
 * practice can actually evidence: qualifications, training and team — read
 * from `implantStats` so each branch states its own.
 */
export default function ImplantTrustBar({ branch }: { branch: BranchConfig }) {
  const stats = branch.implantStats;
  if (stats.length === 0) return null;

  return (
    <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mx-auto mb-10 max-w-2xl text-center text-[14.5px] leading-relaxed text-gray-500">
          Backed by specialist MDS training, in-house CBCT planning and a dedicated implant
          operatory — a single-facility approach to{' '}
          <span className="font-bold text-[var(--brand-teal-deep)]">fixed teeth replacement</span>.
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
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
