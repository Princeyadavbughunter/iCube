'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { useLang } from '@/components/LanguageProvider';
import ConsultCta from './ConsultCta';

/**
 * The questions people actually type before booking an implant.
 *
 * The clinical answers are deliberately unglamorous. This page is allowed to
 * sell the practice; it is not allowed to promise a surgical outcome, so the
 * risk and pain answers say what is true — local anaesthesia during, soreness
 * after, and a real if small chance an implant does not integrate. A page that
 * admits that is more convincing at the point of booking than one that does
 * not, and it is the only version a medical practice should publish.
 *
 * Cost, CBCT and location answers come from this branch's own config, so each
 * branch quotes its own address, hours and pricing.
 */
export default function ImplantFaq({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const { t } = useLang();
  const f = t.faq;

  // The last three answers are branch-specific — this clinic's own CBCT, price
  // and hours — so they come from config rather than the shared copy tree.
  const faqs = [
    f.procedure,
    f.candidate,
    f.painful,
    f.risks,
    f.recovery,
    { q: f.cbct.q, a: branch.copy.faqCbct },
    { q: f.cost.q, a: branch.copy.faqPricing },
    { q: f.where.q, a: branch.copy.faqTimingsLocation },
  ];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-11 text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          {f.heading}
        </h2>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[var(--brand-teal)]/40 bg-white shadow-[0_8px_30px_-14px_rgba(48,49,81,0.2)]'
                    : 'border-gray-200 bg-[var(--bg-surface-soft)] hover:border-[var(--brand-teal)]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span
                    className={`font-poppins text-[14.5px] font-bold leading-snug transition-colors ${
                      isOpen ? 'text-[var(--brand-teal)]' : 'text-[var(--brand-teal-deep)]'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'bg-[var(--brand-teal)] text-white' : 'bg-gray-200/70 text-gray-500'
                    }`}
                  >
                    {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="border-t border-gray-100 pt-4 text-[13.5px] leading-relaxed text-gray-500">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-11">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
