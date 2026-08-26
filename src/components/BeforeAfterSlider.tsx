'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine } from '@/components/editorial/Primitives';

/**
 * Clinic-supplied result photos, per branch (see `beforeAfter` in
 * branch-configs). Each file is already a composed before/after pair with its
 * own labels burnt in, so this renders them whole — no split, divider or
 * overlay labels.
 *
 * The row drifts on its own and can also be driven by hand: arrows, a swipe,
 * or the arrow keys. It is a real scroll container rather than a CSS
 * transform, which is what makes all three work at once — the drift nudges
 * scrollLeft, and anything the visitor does moves the same value.
 *
 * The track holds the set twice. When the drift passes the halfway mark the
 * scroll position jumps back by exactly half, landing on the identical frame,
 * so the loop never shows a seam or a rewind.
 */
interface BeforeAfterSliderProps {
  branch: BranchConfig;
}

/**
 * Edge ramp. Wide on purpose: a narrow fade reads as a crop, a wide one reads
 * as the row continuing past the page.
 */
const FADE =
  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 7%, #000 20%, #000 80%, rgba(0,0,0,0.35) 93%, transparent 100%)';

/** Pixels per frame. Slow — the row is decoration, not a demand for attention. */
const DRIFT = 0.45;

/** How long a hand-driven move holds the drift off before it resumes. */
const RESUME_MS = 2600;

export default function BeforeAfterSlider({ branch }: BeforeAfterSliderProps) {
  const { aspect, images } = branch.beforeAfter;
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduceMotion) return;

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);

      const half = track.scrollWidth / 2;
      // Wrap first, so the jump happens whether or not the drift is running —
      // a visitor can swipe past the halfway mark too.
      if (half > 0 && track.scrollLeft >= half) track.scrollLeft -= half;
      if (half > 0 && track.scrollLeft <= 0) track.scrollLeft += half;

      if (hovering.current || performance.now() < pausedUntil.current) return;
      track.scrollLeft += DRIFT;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  const nudge = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    // One card plus its gap, so a press lands the next case in the same place
    // the last one occupied rather than part-way between two.
    const card = track.querySelector('figure');
    const step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
    pausedUntil.current = performance.now() + RESUME_MS;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  if (images.length === 0) return null;

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

      <div
        className="relative"
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
      >
        {/* Full-bleed: the row runs off both edges rather than stopping at the
            content column, which is what makes it read as continuous. */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label={`Before and after cases from I Cube Dental ${branch.name}`}
          onFocus={() => (hovering.current = true)}
          onBlur={() => (hovering.current = false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
          }}
          onPointerDown={() => (pausedUntil.current = performance.now() + RESUME_MS)}
          className="flex gap-5 overflow-x-auto overscroll-x-contain px-4 py-1 [scrollbar-width:none] focus:outline-none md:gap-7 [&::-webkit-scrollbar]:hidden"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        >
          {/* The set twice. The copy is aria-hidden with its alt emptied, so a
              screen reader is not read the same cases over again. */}
          {[0, 1].map((copy) =>
            images.map((c) => (
              <figure
                key={`${copy}-${c.src}`}
                aria-hidden={copy === 1}
                className="shrink-0 rounded-[20px] border border-gray-200 bg-white p-3 shadow-[0_14px_40px_-28px_rgba(16,17,36,0.4)]"
              >
                <div
                  className="relative h-[280px] overflow-hidden rounded-xl bg-gray-100 sm:h-[360px] md:h-[440px]"
                  style={{ aspectRatio: aspect }}
                >
                  <Image
                    src={c.src}
                    alt={copy === 1 ? '' : c.alt}
                    fill
                    draggable={false}
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, 46vw"
                  />
                </div>
              </figure>
            )),
          )}
        </div>

        {/* Controls sit outside the masked track so the fade does not eat them. */}
        {[
          { dir: -1 as const, Icon: ChevronLeft, side: 'left-3 md:left-6', label: 'Previous case' },
          { dir: 1 as const, Icon: ChevronRight, side: 'right-3 md:right-6', label: 'Next case' },
        ].map(({ dir, Icon, side, label }) => (
          <button
            key={label}
            type="button"
            onClick={() => nudge(dir)}
            aria-label={label}
            className={`absolute ${side} top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-[var(--brand-teal-deep)] shadow-[0_8px_24px_-10px_rgba(16,17,36,0.45)] backdrop-blur-sm transition-colors hover:bg-[var(--brand-teal)] hover:text-white md:h-12 md:w-12`}
          >
            <Icon size={20} strokeWidth={2.4} />
          </button>
        ))}
      </div>
    </section>
  );
}
