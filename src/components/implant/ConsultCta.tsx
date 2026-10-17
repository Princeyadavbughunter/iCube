'use client';

import type { BranchConfig } from '@/config/branch-configs';
import { useLang } from '@/components/LanguageProvider';

/**
 * The repeating ask.
 *
 * The reference page puts this same button after almost every block, which is
 * the whole mechanic of a long implant landing page: a visitor decides at
 * different points depending on what convinced them, and the button has to be
 * wherever they land.
 *
 * The sub-line carries opening hours rather than a consultation fee — this
 * practice has not quoted one, and inventing a price on a medical page is not
 * a thing to guess at.
 */
export default function ConsultCta({
  branch,
  onBookAppointment,
  note,
  dark = false,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
  /** Overrides the default hours line under the button. */
  note?: string;
  dark?: boolean;
}) {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onBookAppointment}
        className={`inline-flex items-center justify-center gap-2 rounded-lg ${
          dark
            ? 'bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-gold-deep)] to-[var(--accent-gold)] text-[var(--brand-teal-deep)] shadow-[0_10px_28px_-10px_rgba(220,190,141,0.5)] hover:brightness-105'
            : 'bg-[var(--brand-teal)] text-white shadow-[0_10px_28px_-14px_rgba(48,49,81,0.8)] hover:bg-[var(--brand-teal-dark)]'
        } px-8 py-3.5 text-[14px] font-bold transition-all hover:-translate-y-0.5 active:scale-[0.98]`}
      >
        {t.cta.book}
      </button>
      <p className={`mt-2.5 text-[11.5px] font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        {note ?? `${branch.contact.daysLine} · ${branch.contact.timings}`}
      </p>
    </div>
  );
}
