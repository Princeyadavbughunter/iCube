'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
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

  const faqs = [
    {
      q: 'What does the dental implant procedure involve?',
      a: 'It runs in stages. First your jaw is scanned on CBCT and the implant position is planned in 3D. The implant — a titanium post that stands in for the tooth root — is then placed into the bone under local anaesthesia. It is left to integrate with the bone over the following weeks, and once it has, the crown is made and fitted onto it.',
    },
    {
      q: 'Am I a suitable candidate for dental implants?',
      a: 'That depends on how much bone is available at the site, the health of your gums and your general medical history. The CBCT scan answers the first question precisely — it shows exact bone height and width — and where bone is insufficient, grafting is often an option. Some medical conditions and heavy smoking affect healing, which is why the assessment covers your history as well as the scan.',
    },
    {
      q: 'Is the implant procedure painful?',
      a: 'The placement itself is done under local anaesthesia, so the area is numb throughout. Afterwards it is normal to have some soreness and swelling for a few days, which is managed with the medication you are sent home with. Most patients describe it as more comfortable than they expected — but you should plan for a few quiet days rather than none.',
    },
    {
      q: 'Are there risks or complications with dental implants?',
      a: 'As with any surgical procedure, yes. The main ones are infection, delayed healing, and an implant that does not integrate with the bone and has to be removed and replaced. Planning the case on CBCT reduces risk by mapping nerve and sinus positions before surgery rather than during it, and your medical history is reviewed for anything that affects healing. Your specific risks are discussed with you before you consent to treatment.',
    },
    {
      q: 'What is the recovery like, and how do I care for the implant?',
      a: 'Expect a soft diet and no smoking for the first few days, and to keep the site clean as instructed. The implant then needs an integration period before the final crown is fitted — the length depends on the site and your healing. Once restored, it is looked after like a natural tooth: brushing, cleaning between the teeth, and regular reviews so the surrounding bone and gum can be checked.',
    },
    {
      q: 'What is a CBCT scan, and why does it matter?',
      a: branch.copy.faqCbct,
    },
    {
      q: 'What does a dental implant cost?',
      a: branch.copy.faqPricing,
    },
    {
      q: 'Where are you, and when are you open?',
      a: branch.copy.faqTimingsLocation,
    },
  ];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-11 text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          Frequently asked questions about dental implants
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
