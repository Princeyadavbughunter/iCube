import type { BranchConfig } from '@/config/branch-configs';
import VslPlayer from '@/components/VslPlayer';
import ConsultCta from './ConsultCta';

/**
 * The film, and who is in it.
 *
 * This is the page's centre of gravity: everything above says a tooth is
 * missing, everything below is proof, and this is the one block where the
 * surgeon explains the method in their own voice. The credential line sits
 * under the player rather than over it, so the film is what gets watched
 * first and the qualifications answer the question it raises.
 */
export default function ImplantPlanning({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  if (!branch.vsl.src) return null;

  const lead = branch.doctors[0];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="implant-planning">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          How Dental Implants Are Planned for Long-Term Success
        </h2>

        <VslPlayer branch={branch} />

        {lead && (
          <div className="mt-8 text-center">
            <h3 className="font-poppins text-[1.25rem] font-bold tracking-tight text-[var(--brand-teal-deep)]">
              {lead.name}
            </h3>
            <p className="mx-auto mt-1.5 max-w-xl text-[13.5px] italic leading-relaxed text-gray-500">
              {lead.title}
            </p>
          </div>
        )}

        <div className="mt-9">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
