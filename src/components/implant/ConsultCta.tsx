'use client';

import type { BranchConfig } from '@/config/branch-configs';

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
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
  /** Overrides the default hours line under the button. */
  note?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onBookAppointment}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand-teal)] px-8 py-3.5 text-[14px] font-bold text-white shadow-[0_10px_28px_-14px_rgba(48,49,81,0.8)] transition-all hover:bg-[var(--brand-teal-dark)] hover:-translate-y-0.5 active:scale-[0.98]"
      >
        Book a Dental Consultation
      </button>
      <p className="mt-2.5 text-[11.5px] font-medium text-gray-500">
        {note ?? `${branch.contact.daysLine} · ${branch.contact.timings}`}
      </p>
    </div>
  );
}
