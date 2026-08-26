import Image from 'next/image';
import { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine } from '@/components/editorial/Primitives';

/**
 * Clinic-supplied result photos, per branch (see `beforeAfter` in
 * branch-configs). Each file is already a composed before/after pair with its
 * own labels burnt in, so this renders them whole — no split, divider or
 * overlay labels.
 *
 * The row scrolls continuously rather than sitting in a grid. The track holds
 * the set twice and travels exactly -50%, which puts the second copy where the
 * first began, so the loop has no seam. Hovering pauses it so a case can
 * actually be read, and `prefers-reduced-motion` stops it outright.
 */
interface BeforeAfterSliderProps {
  branch: BranchConfig;
}

export default function BeforeAfterSlider({ branch }: BeforeAfterSliderProps) {
  const { aspect, images } = branch.beforeAfter;

  if (images.length === 0) return null;

  // Pace the loop by how much film there is, so four cases do not race past
  // while eight crawl. Roughly 11s of travel per case.
  const duration = `${images.length * 11}s`;

  return (
    <section className="bg-white py-16 md:py-24" id="transformations">
      <div className="mx-auto mb-10 max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>Patient Results</SectionLabel>
          <SectionHeading className="max-w-2xl">Real smiles, real transformations</SectionHeading>
          <PaLine>ਸਾਡੇ ਮਰੀਜ਼ਾਂ ਦੇ ਅਸਲੀ ਨਤੀਜੇ</PaLine>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
            Actual before &amp; after results from specialist-led dentistry in {branch.city} — the
            clinic&apos;s own cases, not stock photography.
          </p>
        </div>
      </div>

      {/* Full-bleed: the row should run off both edges rather than stopping at
          the content column, which is what makes it read as continuous. */}
      <div
        className="results-marquee relative overflow-hidden"
        style={{
          // Fade the ends so cases enter and leave instead of being clipped.
          maskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div
          className="results-marquee-track flex w-max gap-4 md:gap-5"
          style={{ ['--marquee-duration' as string]: duration }}
        >
          {/* The set twice. The copy is aria-hidden so a screen reader is not
              read the same four cases over again. */}
          {[0, 1].map((copy) =>
            images.map((c) => (
              <figure
                key={`${copy}-${c.src}`}
                aria-hidden={copy === 1}
                className="shrink-0 rounded-2xl border border-gray-200 bg-white p-2.5"
              >
                <div
                  className="relative h-[220px] overflow-hidden rounded-xl bg-gray-100 sm:h-[260px] md:h-[300px]"
                  style={{ aspectRatio: aspect }}
                >
                  <Image
                    src={c.src}
                    alt={copy === 1 ? '' : c.alt}
                    fill
                    draggable={false}
                    className="object-cover"
                    sizes="(max-width: 640px) 80vw, 40vw"
                  />
                </div>
              </figure>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
