import Image from 'next/image';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine, MediaFrame, PhotoPending } from './Primitives';

/**
 * "Caring for your smile at every stage of life" — the practice, briefly.
 *
 * The lead doctor's portrait stands in for a clinic interior until real
 * premises photography is supplied.
 */
export default function AboutSection({ branch }: { branch: BranchConfig }) {
  const lead = branch.doctors[0];
  const photo = branch.clinicImages[0]?.src || lead.image;

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="about">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel>About Us</SectionLabel>
          <SectionHeading>Caring for your smile at every stage of life</SectionHeading>
          <PaLine>ਹਰ ਉਮਰ ਵਿੱਚ ਤੁਹਾਡੇ ਦੰਦਾਂ ਦੀ ਪੂਰੀ ਸੰਭਾਲ</PaLine>
          <p className="mt-6 text-[15.5px] leading-relaxed text-gray-500">{lead.description}</p>
          <p className="mt-4 border-l-2 border-[var(--accent-gold)] pl-4 text-[14.5px] leading-relaxed text-gray-500">
            {lead.footer}
          </p>
        </div>

        <MediaFrame offset="bl">
          {photo ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photo}
                alt={`${lead.name} at I Cube Dental ${branch.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <PhotoPending label={`${branch.name} clinic photo`} />
          )}
        </MediaFrame>
      </div>
    </section>
  );
}
