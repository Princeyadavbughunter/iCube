'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Clinic-supplied 3D implant renders, in the order a patient escalates. */
const TYPES = [
  { src: '/images/implant/single.png', label: 'Single Tooth Implant', note: 'One missing tooth, one titanium root' },
  { src: '/images/implant/Multiple.png', label: 'Multiple Tooth Implants', note: 'Several gaps restored individually' },
  { src: '/images/implant/supported.png', label: 'Implant-Supported Bridge', note: 'A fixed bridge carried on implants' },
  { src: '/images/implant/all_in.png', label: 'All-on-4 Full Arch', note: 'A full arch on four implants' },
] as const;

const HOLD_MS = 3800;

/**
 * Rotating implant-type showcase for the hero.
 *
 * Replaces what used to be a `<video>` pointing at a file that was never in
 * `public/`. Cross-fades through the four implant treatments the clinic
 * offers, which reads as motion without shipping a multi-megabyte video.
 */
export default function ImplantShowcase() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reduced motion: hold on the first render, no auto-advance.
    if (reduceMotion) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TYPES.length);
    }, HOLD_MS);

    return () => clearInterval(id);
  }, [reduceMotion]);

  const active = TYPES[index];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-5 py-6 overflow-hidden">
      {/* Soft brand wash behind the render */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(220,190,141,0.28) 0%, transparent 62%), linear-gradient(160deg, #ffffff 0%, #f6f3ec 55%, #eceaf2 100%)',
        }}
      />

      <div className="relative flex-1 w-full min-h-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.src}
            className="relative w-full h-full"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={active.src}
              alt={active.label}
              fill
              priority={index === 0}
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 90vw, 300px"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption */}
      <div className="relative w-full text-center shrink-0 min-h-[62px] flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.label}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[13px] sm:text-sm font-black text-[var(--brand-teal-deep)] leading-tight">
              {active.label}
            </p>
            <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium mt-0.5 leading-snug">
              {active.note}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="relative flex items-center gap-1.5 mt-3 shrink-0">
        {TYPES.map((t, i) => (
          <button
            key={t.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${t.label}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index
                ? 'w-6 bg-[var(--brand-teal)]'
                : 'w-1.5 bg-[var(--brand-teal)]/25 hover:bg-[var(--brand-teal)]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
