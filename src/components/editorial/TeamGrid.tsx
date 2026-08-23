import Image from 'next/image';
import { teamPhotos } from '@/config/team';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine } from './Primitives';

/**
 * The practice, shown through its own group photographs.
 *
 * The per-doctor cards this used to carry were dropped: only two of the four
 * specialists have a portrait on file, so half the grid was a "photograph
 * coming soon" placeholder. The group shots are real and complete, so they
 * carry the section on their own.
 *
 * All four doctors appear together in the first photograph, which is why these
 * run on both branch pages rather than being scoped to one.
 */
export default function TeamGrid({ branch }: { branch: BranchConfig }) {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="team">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <SectionLabel>Our Team</SectionLabel>
          <SectionHeading className="max-w-2xl">
            A team of {branch.copy.teamSize}, under one roof
          </SectionHeading>
          <PaLine>ਹਰ ਇਲਾਜ MDS ਸਪੈਸ਼ਲਿਸਟ ਡਾਕਟਰ ਵੱਲੋਂ</PaLine>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
            Every case is diagnosed and delivered by a specialist in that field — not handed to a
            general practitioner and not referred out of the practice.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <figure className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100 lg:col-span-2">
            <Image
              src={teamPhotos.doctors.src}
              alt={teamPhotos.doctors.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[teamPhotos.full, teamPhotos.support].map((photo) => (
              <figure
                key={photo.src}
                className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100 lg:aspect-auto lg:h-full lg:min-h-[120px]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
