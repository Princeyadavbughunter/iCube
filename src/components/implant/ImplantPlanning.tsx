'use client';

import type { BranchConfig } from '@/config/branch-configs';
import VslPlayer from '@/components/VslPlayer';
import ConsultCta from './ConsultCta';
import { useLang } from '@/components/LanguageProvider';

/**
 * The film, and who is in it.
 *
 * This is the page's centre of gravity: everything above says a tooth is
 * missing, everything below is proof, and this is the one block where the
 * surgeon explains the method in their own voice. The credential line sits
 * under the player rather than over it, so the film is what gets watched
 * first and the qualifications answer the question it raises.
 *
 * A branch can override that line with `vsl.creds` — the profile card's full
 * title is often too long here — and add one `vsl.flashLine` beneath it for a
 * credential that earns its own emphasis.
 */
export default function ImplantPlanning({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  if (!branch.vsl.src) return null;

  const { t } = useLang();
  const lead = branch.doctors[0];
  const { creds, flashLine } = branch.vsl;
  const credentials = creds || lead?.title;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="implant-planning">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          {t.planning.heading}
        </h2>

        <VslPlayer branch={branch} />

        {lead && (
          <div className="mt-8 text-center">
            <h3 className="font-poppins text-[1.25rem] font-bold tracking-tight text-[var(--brand-teal-deep)]">
              {lead.name}
            </h3>
            {credentials && (
              <p className="mx-auto mt-1.5 max-w-xl text-[13.5px] italic leading-relaxed text-gray-500">
                {credentials}
              </p>
            )}
            {flashLine && (
              <p className="mt-4 flex justify-center">
                <span className="flash-credit inline-block rounded-full bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-gold-deep)] to-[var(--accent-gold)] px-4 py-2 text-center text-[11.5px] font-black uppercase leading-snug tracking-[0.13em] text-[var(--brand-teal-deep)] sm:text-[12.5px] sm:tracking-[0.16em]">
                  {flashLine}
                </span>
              </p>
            )}
          </div>
        )}

        <div className="mt-9">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
