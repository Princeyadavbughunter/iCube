'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';

interface FaqEditorialProps {
  branch: BranchConfig;
  onBookAppointment: () => void;
}

export default function FaqEditorial({ branch, onBookAppointment }: FaqEditorialProps) {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { q: 'What is a CBCT scan, and why does it matter?', a: branch.copy.faqCbct },
    { q: 'Who will actually treat me?', a: branch.copy.faqSpecialist },
    { q: 'Do you do root canals here, or refer them out?', a: branch.copy.faqRootCanal },
    { q: 'What does an implant cost?', a: branch.copy.faqPricing },
    { q: 'Where are you, and when are you open?', a: branch.copy.faqTimingsLocation },
  ];

  return (
    <section className="bg-[var(--bg-medical-light)] px-4 py-20 sm:px-6 md:py-28 lg:px-10" id="faq">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-bold tracking-wider mb-4">
            FAQs
          </div>
          <h2 className="font-poppins text-3xl md:text-[2.5rem] font-bold leading-tight text-[var(--brand-teal-deep)]">
            Common Questions
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Still unsure about something? Book a consultation — you&apos;ll speak directly to the clinic, not a call centre.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[var(--brand-teal)]/40 bg-white shadow-[0_8px_30px_-12px_rgba(48,49,81,0.15)]'
                    : 'border-gray-200 bg-white hover:border-[var(--brand-teal)]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className={`font-poppins text-[15.5px] font-bold leading-snug transition-colors ${isOpen ? 'text-[var(--brand-teal)]' : 'text-[var(--brand-teal-deep)]'}`}>
                    {faq.q}
                  </span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? 'bg-[var(--brand-teal)] text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 -mt-2">
                    <p className="text-[14.5px] leading-relaxed text-gray-500 border-t border-gray-100 pt-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onBookAppointment}
            className="btn-primary inline-flex items-center gap-2"
          >
            Book a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}


