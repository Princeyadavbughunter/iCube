import Image from 'next/image';
import { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine } from '@/components/editorial/Primitives';

/**
 * Clinic-supplied result photos, per branch (see `beforeAfter` in
 * branch-configs). Each file is already a composed before/after pair with its
 * own labels burnt in, so this renders them whole — no split, divider or
 * overlay labels. The aspect ratio comes from config because each branch
 * supplies a different frame size.
 */
interface BeforeAfterSliderProps {
  branch: BranchConfig;
}

export default function BeforeAfterSlider({ branch }: BeforeAfterSliderProps) {
  const { aspect, images } = branch.beforeAfter;

  if (images.length === 0) return null;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="transformations">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <SectionLabel>Patient Results</SectionLabel>
          <SectionHeading className="max-w-2xl">Real smiles, real transformations</SectionHeading>
          <PaLine>ਸਾਡੇ ਮਰੀਜ਼ਾਂ ਦੇ ਅਸਲੀ ਨਤੀਜੇ</PaLine>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
            Actual before &amp; after results from specialist-led dentistry in {branch.city} — the
            clinic&apos;s own cases, not stock photography.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {images.map((c) => (
            <figure
              key={c.src}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2.5"
            >
              <div
                className="relative w-full overflow-hidden rounded-xl bg-gray-100"
                style={{ aspectRatio: aspect }}
              >
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  draggable={false}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
