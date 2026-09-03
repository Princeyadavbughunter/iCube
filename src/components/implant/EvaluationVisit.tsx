import { Check } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import ConsultCta from './ConsultCta';

/**
 * What the first appointment actually contains.
 *
 * The reason this block converts is that it removes the unknown: someone
 * putting off an implant consultation is usually not afraid of the implant,
 * they are afraid of walking in and being sold to. Listing the visit turns it
 * into something with a known shape and a known end point.
 *
 * Every line here is a step the practice already documents — the CBCT scan,
 * the 3D read of bone and nerve position, the itemised quote before treatment.
 */
const included = [
  'Personal consultation with the implantologist',
  'In-house CBCT 3D scan of your jaw — taken and read in the same visit',
  'Assessment of bone height, width, and nerve and sinus position',
  'Check of your gums and remaining teeth',
  'Your implant options, and the phases the treatment runs in',
  'A clear, itemised written quote before any treatment begins',
];

export default function EvaluationVisit({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          What&rsquo;s included in your implant evaluation visit
        </h2>

        <ul className="rounded-[22px] border border-gray-200 bg-[var(--bg-surface-soft)] p-6 sm:p-9">
          {included.map((item, i) => (
            <li
              key={item}
              className={`flex items-start gap-3.5 py-3.5 ${
                i === 0 ? 'pt-0' : ''
              } ${i === included.length - 1 ? 'pb-0' : 'border-b border-gray-200/70'}`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-teal)] text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="text-[14px] leading-relaxed text-gray-600">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
