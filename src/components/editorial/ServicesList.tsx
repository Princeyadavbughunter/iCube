import Image from 'next/image';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine, MediaFrame, PhotoPending } from './Primitives';
import { Stagger, StaggerItem } from '@/components/motion/Motion';

/** The treatments the practice actually runs, numbered as in the reference. */
const SERVICES = [
  {
    title: 'Dental Implants',
    pa: 'ਡੈਂਟਲ ਇੰਪਲਾਂਟ',
    body: 'Single, multiple and full-mouth implants, each planned in 3D on in-house CBCT before any surgery begins.',
  },
  {
    title: 'Painless Root Canal',
    pa: 'ਬਿਨਾਂ ਦਰਦ ਰੂਟ ਕੈਨਾਲ',
    body: 'Single-sitting RCT and retreatment of failed canals, done by an MDS endodontist under magnification.',
  },
  {
    title: 'Crowns, Veneers & Smile Design',
    pa: 'ਕਰਾਊਨ, ਵਿਨੀਅਰ ਤੇ ਸਮਾਈਲ ਡਿਜ਼ਾਈਨ',
    body: 'CAD/CAM crowns cut from a digital scan — no putty impressions, and a fit checked before it is cemented.',
  },
  {
    title: 'Aligners & Orthodontics',
    pa: 'ਅਲਾਈਨਰ ਤੇ ਦੰਦ ਸਿੱਧੇ ਕਰਨਾ',
    body: 'Invisible aligners and fixed braces, with the finish planned digitally so you can see it before you start.',
  },
];

export default function ServicesList({ branch }: { branch: BranchConfig }) {
  const photo = branch.beforeAfter.images[0]?.src;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="services">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel>Our Services</SectionLabel>
          <SectionHeading>Complete dental care under one roof</SectionHeading>
          <PaLine>{branch.copy.oneRoofLine}</PaLine>

          <Stagger className="mt-8">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.title} className="border-t border-gray-200 py-5 first:border-t-0 first:pt-0">
                <div className="flex gap-4">
                  <span className="mt-0.5 shrink-0 font-poppins text-[13px] font-bold tabular-nums text-[var(--accent-gold-deep)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-poppins text-[17px] font-bold leading-snug text-[var(--brand-teal-deep)]">
                      {s.title}
                    </h3>
                    <p lang="pa" className="mt-0.5 text-[13.5px] font-medium text-[var(--brand-teal)]">
                      {s.pa}
                    </p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-gray-500">{s.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <MediaFrame offset="br">
          {photo ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photo}
                alt={`Treatment result at I Cube Dental ${branch.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <PhotoPending label="Treatment photo" />
          )}
        </MediaFrame>
      </div>
    </section>
  );
}
