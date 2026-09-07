'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { useLang } from '@/components/LanguageProvider';

interface Slide {
  src: string;
  alt: string;
}

/** How long each photograph holds before the next one slides in. */
const HOLD_MS = 5000;

/** How long a hand-driven move holds the auto-advance off before it resumes. */
const RESUME_MS = 9000;

/**
 * The photographs behind the hero.
 *
 * A slider rather than a single still because the clinic has more than one
 * thing worth showing above the fold — the room you walk into, and the award
 * the headline claims. One frame can only make one of those points.
 *
 * It advances itself, but a visitor's tap always wins: a dot press holds the
 * timer off for long enough to actually look at the frame they asked for,
 * rather than having it slide away mid-glance.
 *
 * Nothing moves on its own for a visitor who has asked for reduced motion, and
 * nothing moves while the tab is hidden — a timer firing against a background
 * tab only burns battery to change a picture nobody is looking at.
 */
export default function HeroCarousel({
  slides,
  className = '',
}: {
  slides: Slide[];
  className?: string;
}) {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);

  const canAdvance = slides.length > 1 && !reduceMotion;

  useEffect(() => {
    if (!canAdvance) return;

    const id = window.setInterval(() => {
      if (hovering.current) return;
      if (document.hidden) return;
      if (performance.now() < pausedUntil.current) return;
      setIndex((i) => (i + 1) % slides.length);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [canAdvance, slides.length]);

  const goTo = useCallback((next: number) => {
    pausedUntil.current = performance.now() + RESUME_MS;
    setIndex(next);
  }, []);

  if (slides.length === 0) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-[22px] shadow-[0_28px_70px_-32px_rgba(16,17,36,0.55)] ring-1 ring-black/5 ${className}`}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.hero.carouselLabel}
    >
      <div className="relative aspect-[16/9] w-full bg-gray-100">
        {/* One rail, moved by transform. A rail of absolutely-positioned frames
            would need each one hidden from assistive tech as it left the
            viewport; sliding the whole strip keeps the DOM order honest. */}
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: reduceMotion ? undefined : 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="relative h-full w-full shrink-0"
              aria-hidden={i !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                // Only the opening frame is worth blocking first paint for.
                priority={i === 0}
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2 sm:bottom-4">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t.hero.goToSlide(i + 1)}
              aria-current={i === index}
              // The hit area is the full 24px square; the visible pill sits
              // inside it, so the control stays tappable without a dot big
              // enough to sit on the photograph.
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full shadow-[0_1px_4px_rgba(16,17,36,0.5)] transition-all duration-300 ${
                  i === index
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/60 group-hover:bg-white/90'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
