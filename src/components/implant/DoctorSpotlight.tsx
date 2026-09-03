import Image from 'next/image';
import type { BranchConfig } from '@/config/branch-configs';
import ConsultCta from './ConsultCta';

/**
 * The surgeon, at length.
 *
 * By this point in the page a visitor has watched them explain the method and
 * read what other patients said. This is where the question becomes "who is
 * actually going to do this to me" — so the copy is the practice's own
 * published wording about a real clinician's qualifications, quoted rather
 * than paraphrased.
 */
export default function DoctorSpotlight({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  const doctor = branch.doctors[0];
  if (!doctor) return null;

  return (
    <section className="bg-[var(--accent-pink-soft)] px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="doctor">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-11 text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          {doctor.name} — Implantologist &amp; Prosthodontist
        </h2>

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,300px)_1fr] md:gap-11">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[22px] bg-gray-100 shadow-[0_24px_60px_-30px_rgba(16,17,36,0.6)]">
            {doctor.image ? (
              <Image
                src={doctor.image}
                alt={`${doctor.name} — I Cube Dental ${branch.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[var(--brand-teal)] font-poppins text-5xl font-bold text-[var(--accent-gold)]">
                {doctor.initials}
              </div>
            )}
          </div>

          <div>
            <p className="text-[14.5px] leading-relaxed text-gray-600">{doctor.description}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {doctor.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-gold-deep)]" />
                  <span className="text-[13.5px] leading-snug text-[var(--brand-teal-deep)]">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-l-2 border-[var(--accent-gold)] pl-4 text-[13.5px] leading-relaxed text-gray-500">
              {doctor.footer}
            </p>
          </div>
        </div>

        <div className="mt-11">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
