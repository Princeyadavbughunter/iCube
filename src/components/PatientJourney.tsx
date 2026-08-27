'use client';

import Image from 'next/image';

const PATIENT_PHOTOS = [
  { src: '/patent/invi01-1.webp', alt: 'Invisalign patient at iCube Dental — happy smile after treatment' },
  { src: '/patent/invi02-1.webp', alt: 'Invisalign patient at iCube Dental — confident smile' },
  { src: '/patent/invi03-1.webp', alt: 'Invisalign patient journey at iCube Dental' },
  { src: '/patent/invi04-1.webp', alt: 'Patient with doctor at iCube Dental after Invisalign' },
  { src: '/patent/invi05-1.webp', alt: 'iCube Dental Invisalign patient celebrating results' },
  { src: '/patent/invi06-1.webp', alt: 'Happy Invisalign patient at iCube Dental clinic' },
  { src: '/patent/invi07-1.webp', alt: 'Patient and doctor at iCube Dental — Invisalign success' },
];

// Duplicate for seamless infinite loop
const PHOTOS = [...PATIENT_PHOTOS, ...PATIENT_PHOTOS];

export default function PatientJourney() {
  return (
    <section className="relative bg-[#f8f8f6] py-14 md:py-20 overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-10 px-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-teal)] mb-3">
          Our Invisalign Patients&apos; Journey
        </p>
        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--brand-teal-deep)] max-w-2xl mx-auto leading-tight">
          Expert Invisalign Treatment For Straighter Teeth And A Confident Smile
        </h2>
      </div>

      {/* Infinite scrolling photo strip */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #f8f8f6 0%, transparent 100%)' }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #f8f8f6 0%, transparent 100%)' }}
        />

        <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="relative shrink-0 rounded-2xl overflow-hidden shadow-md"
              style={{ width: 360, height: 300 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="360px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inject marquee keyframe via style tag */}
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
