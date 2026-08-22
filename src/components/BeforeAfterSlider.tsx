import Image from 'next/image';
import { BranchConfig } from '@/config/branch-configs';

/* Clinic-supplied result photos, per branch (see `beforeAfter` in
   branch-configs). Each file is already a composed before/after pair with its
   own labels burnt in, so this component renders them whole — no split,
   divider or overlay labels. The aspect ratio comes from the config because
   each branch supplies a different frame size. */
interface BeforeAfterSliderProps {
  branch: BranchConfig;
}

export default function BeforeAfterSlider({ branch }: BeforeAfterSliderProps) {
  const { aspect, images } = branch.beforeAfter;

  if (images.length === 0) return null;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="transformations">
      <div aria-hidden className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
           style={{ background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-25"
           style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 badge-pink px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            Patient Results
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900 leading-tight">
            Real Smiles, <span className="text-gradient-logo">Real Transformations</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Actual before &amp; after results from specialist-led implant dentistry in {branch.city}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
          {images.map((c, i) => (
            <div
              key={c.src}
              className={`bg-white/90 backdrop-blur-sm p-3 rounded-[22px] depth-stack card-3d-tilt border border-white/80 fade-up stagger-${i + 1}`}
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden bg-gray-100"
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
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full depth-stack border border-white/80">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--accent-pink-soft)] to-[var(--brand-teal)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--brand-teal-deep)]">{i}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm font-medium">
              <span className="text-gray-900 font-bold">1,000+</span> Happy Patients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
