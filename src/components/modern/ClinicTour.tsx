import Image from 'next/image';
import type { BranchConfig } from '@/config/branch-configs';

export default function ClinicTour({ branch }: { branch: BranchConfig }) {
  const images = branch.clinicImages;
  if (images.length === 0) return null;

  // Fill up to 5 photos by repeating if needed
  const displayed = [...images, ...images, ...images].slice(0, 5);

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--bg-medical-light)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-bold tracking-wider mb-4">
            OUR CLINIC
          </div>
          <h2 className="font-poppins text-3xl md:text-[2.5rem] font-bold leading-tight text-[var(--brand-teal-deep)]">
            A Clinic Built for <span className="text-[var(--brand-teal)]">Your Comfort</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Step inside our state-of-the-art facility designed for a premium, stress-free dental experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 fade-up stagger-2">
          {displayed.map((img, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden bg-gray-100 hover:scale-[1.02] transition-transform duration-300 ${
                i === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
