'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine, PrimaryButton } from './Primitives';

interface FaqEditorialProps {
  branch: BranchConfig;
  onBookAppointment: () => void;
}

/** Heading left, accordion right — the reference's FAQ arrangement. */
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
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="faq">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionLabel>FAQs</SectionLabel>
          <SectionHeading>Frequently asked questions</SectionHeading>
          <PaLine>ਆਮ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ</PaLine>
          <p className="mt-5 text-[15px] leading-relaxed text-gray-500">
            Still unsure about something? Ask us on the phone — you will speak to the clinic, not a
            call centre.
          </p>
          <PrimaryButton onClick={onBookAppointment} className="mt-6">
            Book a Consultation
          </PrimaryButton>
        </div>

        <dl className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-poppins text-[16px] font-bold leading-snug text-[var(--brand-teal-deep)]">
                      {faq.q}
                    </span>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-300 text-[var(--brand-teal)]">
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                </dt>
                {isOpen && (
                  <dd className="-mt-1 pb-5 pr-10 text-[14.5px] leading-relaxed text-gray-500">
                    {faq.a}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
