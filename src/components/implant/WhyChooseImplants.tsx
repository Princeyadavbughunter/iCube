import { Award, ScanLine, Cpu, ShieldCheck, Users, IndianRupee } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';

/**
 * Six reasons, each tied to something the practice can actually show you.
 *
 * Every card is built from this branch's own config — the lead doctor's
 * qualifications, the team size, the published implant price — so Chandigarh
 * states Dr. Gaurav's thirteen years where Ludhiana states Dr. Chandan's ten,
 * and neither page carries a claim the other's premises would have to honour.
 */
export default function WhyChooseImplants({ branch }: { branch: BranchConfig }) {
  const { copy, city, pricing } = branch;

  const reasons = [
    {
      Icon: Award,
      title: 'Implant-Focused Expertise',
      body: `${copy.leadDoctor} — ${copy.leadDoctorCreds} — with ${copy.experience} of clinical experience in implant and restorative dentistry.`,
    },
    {
      Icon: ScanLine,
      title: 'Advanced Digital Planning',
      body: 'Your jaw is scanned on in-house CBCT, so bone height, width and the position of nerves and sinuses are known — and the implant placed in 3D on screen — before any surgery starts.',
    },
    {
      Icon: Cpu,
      title: 'In-House Technology, One-Visit Care',
      body: 'CBCT, digital intraoral scanners and CAD/CAM restorations all sit inside the building, so your scan, diagnosis and treatment plan happen in the same appointment.',
    },
    {
      Icon: ShieldCheck,
      title: 'A Dedicated Implant Operatory',
      body: 'Implants are placed in a room built for that one purpose — not in a general chair between routine appointments.',
    },
    {
      Icon: Users,
      title: 'Specialists, Not Generalists',
      body: `A team of ${copy.teamSize} MDS specialists trained at India's leading dental colleges. Your root canal is done by an endodontist and your crown by a prosthodontist.`,
    },
    {
      Icon: IndianRupee,
      title: 'A Quote Before Treatment',
      body: `Implants from ${pricing.implant.replace(/\*$/, '')}. Every case is costed individually after CBCT, and you get a clear, itemised quote before anything begins.`,
    },
  ];

  return (
    <section className="bg-[var(--accent-pink-soft)] px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="why-us">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto mb-12 max-w-2xl text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          Why choose I Cube Dental {city} for your dental implants?
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold)]/60 hover:shadow-[0_18px_45px_-24px_rgba(16,17,36,0.35)]"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                <Icon size={19} strokeWidth={2.2} />
              </span>
              <h3 className="font-poppins text-[15.5px] font-bold leading-snug text-[var(--brand-teal-deep)]">
                {title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-gray-500">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
