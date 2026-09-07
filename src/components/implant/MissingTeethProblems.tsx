'use client';

import { Check } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';

/**
 * What a missing tooth actually costs you, day to day.
 *
 * This is the page's qualifying block: a visitor recognises two or three of
 * these and has effectively diagnosed themselves. Every item is a documented
 * consequence of tooth loss rather than a claim about this clinic, which is
 * why it reads the same on either branch.
 *
 * Headings only — the explanatory line each item used to carry was cut, so the
 * block scans in a glance rather than asking to be read.
 */
export default function MissingTeethProblems() {
  const { t } = useLang();
  const problems = t.problems.items;

  return (
    <section className="bg-[var(--accent-pink-soft)] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="mx-auto mb-12 max-w-2xl text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          {t.problems.heading}
        </h2>

        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem} className="flex items-center gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-teal)] text-white">
                <Check size={14} strokeWidth={3} />
              </span>
              <h3 className="font-poppins text-[15px] font-bold leading-snug text-[var(--brand-teal-deep)]">
                {problem}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
