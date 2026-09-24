'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Play, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useLang } from '@/components/LanguageProvider';

interface Story {
  src: string;
  /** First frame to show before playback. Omit and the frame stays dark until
   *  the observer starts the film. */
  poster?: string;
  /** Runtime, shown as a pill so a visitor knows what they are committing to. */
  length: string;
  /** Only set where the patient is named on screen — used for the label a
   *  screen reader announces, never inferred. */
  name?: string;
  /** ISO 3166-1 alpha-2 code (e.g. "AU") for the patient's home country,
   *  shown as a flag badge. Omit where that was not supplied. */
  country?: string;
  /** How many years this patient has been with the practice, for the
   *  long-term follow-up films. Shown as a gold badge; omit where unknown. */
  years?: number;
}

/** How long the row rests on a card before sliding to the next. */
const ADVANCE_MS = 4000;

/** How long a hand-driven move (arrow, swipe) holds the auto-advance off. */
const RESUME_MS = 6000;

/**
 * Filmed patient testimonials, sitting just above the written Google reviews.
 *
 * `stories` is branch-specific (see `videoTestimonials` in branch-configs) —
 * Ludhiana runs its own four clinic-shot films, Chandigarh runs the case
 * films patients sent back after flying in for treatment, flagged with the
 * country they travelled from.
 *
 * One sliding row rather than a grid: it advances itself a card at a time,
 * and can be driven by hand with the arrows, a swipe, or the arrow keys.
 * It is a real scroll container, so all three move the same value. The
 * drift pauses on hover, while a film is playing with sound, and for anyone
 * who has asked for reduced motion. A row short enough to fit (Ludhiana on
 * desktop) neither drifts nor shows arrows — there is nowhere to go.
 *
 * The flags are the `flag-icons` SVG set, copied to `public/flags` (MIT,
 * licence alongside). Not the Unicode flag emoji: Windows' Segoe UI Emoji
 * has historically shown the bare two-letter code instead, and Firefox on
 * every OS does this on purpose. Any ISO alpha-2 code in the config works
 * without further wiring.
 *
 * The films loop muted, so the row reads as people mid-sentence rather than
 * still frames. Muted is not a compromise — it is the only way a browser
 * autoplays at all, and several unannounced voices at once would be
 * unbearable.
 *
 * They only start once the section is near the viewport, and pause the moment
 * it leaves. `preload="none"` plus that gate means a visitor who never
 * scrolls this far downloads none of it, and nothing keeps decoding
 * off-screen.
 *
 * The files are re-encodes at 720x1280 — clinics supply straight camera
 * exports, which run 1080p or 4K at several Mbps and are far too heavy to
 * start several of at once on mobile data. Cards are at most ~260px wide, so
 * 720px still leaves headroom. Replacements need the same treatment; the
 * recipe is H.264 CRF 26 with `-movflags +faststart`, so playback can begin
 * before the file has finished arriving.
 *
 * Sound is one tap away. Taking it restarts that film from the beginning and
 * pauses the others, so two patients never talk over each other, and the
 * native controls take over from there rather than being reinvented.
 */
export default function VideoStories({
  stories,
  id = 'patient-videos',
  kicker,
  heading,
  sub,
  disclaimer,
  children,
}: {
  /** This branch's films — see `videoTestimonials` in branch-configs. */
  stories: Story[];
  /** Section id, for anchor links. A page rendering more than one of these
   *  (full-mouth cases, long-term follow-ups, general stories) needs a
   *  distinct id per instance — duplicate ids break in-page navigation. */
  id?: string;
  kicker?: string;
  heading?: string;
  /** Line under the heading. Defaults to the tap-for-sound hint. */
  sub?: string;
  /** Small print under the row — patient footage needs a results-vary line. */
  disclaimer?: string;
  /** Slot under the row, used for the implant page's repeating CTA. */
  children?: ReactNode;
}) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);
  const reduceMotion = useReducedMotion();

  /** The one film playing with sound, if any. */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  /** Autoplay was refused (some browsers still do, even muted) — offer taps. */
  const [needsTap, setNeedsTap] = useState(false);
  /** The row overflows its container, so arrows and the drift have somewhere to go. */
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion means no looping wallpaper: the films wait to be asked.
    if (reduceMotion) {
      setNeedsTap(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // A little lead time so the first frames are ready by the time the
      // row is actually on screen.
      { rootMargin: '200px 0px', threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video || index === activeIndex) return;

      // While one film has sound, the rest hold still.
      if (inView && activeIndex === null) {
        video.muted = true;
        video.play().catch(() => setNeedsTap(true));
      } else {
        video.pause();
      }
    });
  }, [inView, activeIndex]);

  // Whether there is anything to slide to, re-checked as the viewport changes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => setCanScroll(track.scrollWidth > track.clientWidth + 8);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [stories.length]);

  /**
   * One card plus its gap, measured rather than hardcoded — the gap changes
   * at the md breakpoint, and a wrong step lands the next card half-way.
   */
  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = track.querySelectorAll<HTMLElement>('[data-card]');
    return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth * 0.8;
  }, []);

  const nudge = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;
      pausedUntil.current = performance.now() + RESUME_MS;
      track.scrollBy({ left: direction * step(), behavior: 'smooth' });
    },
    [step],
  );

  // The drift: one card at a time, back to the start after the last.
  useEffect(() => {
    if (!canScroll || !inView || reduceMotion || activeIndex !== null) return;

    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      if (hovering.current || document.hidden) return;
      if (performance.now() < pausedUntil.current) return;

      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: step(), behavior: 'smooth' });
    }, ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [canScroll, inView, reduceMotion, activeIndex, step]);

  const start = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });

    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = false;
    video.loop = false;
    // A testimonial's opening is the part that sells it, and by the time
    // someone reaches for the sound they have usually missed it.
    video.currentTime = 0;
    void video.play();
    setActiveIndex(index);
    setNeedsTap(false);
  };

  // Back to the muted loop once a story finishes.
  const reset = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = true;
      video.loop = true;
      video.currentTime = 0;
    }
    setActiveIndex((current) => (current === index ? null : current));
  };

  if (stories.length === 0) return null;

  const rowLabel = kicker ?? t.videos.kicker;

  return (
    <section
      ref={sectionRef}
      className="px-4 py-20 sm:px-6 md:py-28 lg:px-10 bg-[var(--accent-pink-soft)]"
      id={id}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-bold tracking-wider mb-4">
            {rowLabel}
          </div>
          <h2 className="font-poppins text-3xl md:text-[2.5rem] font-bold leading-tight text-[var(--brand-teal-deep)]">
            {heading ?? t.videos.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">{sub ?? t.videos.sub}</p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
        >
          <div
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label={rowLabel}
            onFocus={() => (hovering.current = true)}
            onBlur={() => (hovering.current = false)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
              if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
            }}
            onPointerDown={() => (pausedUntil.current = performance.now() + RESUME_MS)}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 py-3 [scrollbar-width:none] focus:outline-none md:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {stories.map((story, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={story.src}
                  data-card
                  className="group relative aspect-[9/16] w-[200px] shrink-0 snap-center overflow-hidden rounded-[20px] bg-[var(--brand-teal-ink)] ring-1 ring-black/5 shadow-[0_18px_45px_-22px_rgba(18,19,36,0.55)] transition-transform duration-300 hover:-translate-y-1 sm:w-[230px] md:w-[250px] lg:w-[260px]"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="h-full w-full object-cover"
                    src={story.src}
                    poster={story.poster || undefined}
                    playsInline
                    muted={!isActive}
                    loop={!isActive}
                    // Nothing is fetched until the observer asks for play().
                    preload="none"
                    controls={isActive}
                    onEnded={() => reset(index)}
                    aria-label={
                      story.name
                        ? t.videos.namedLabel(story.name)
                        : t.videos.testimonialLabel(index + 1)
                    }
                  >
                    Your browser does not support the video tag.
                  </video>

                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => start(index)}
                      className="absolute inset-0 flex items-center justify-center transition-colors hover:bg-[#121324]/10"
                      aria-label={
                        story.name
                          ? t.videos.namedPlayLabel(story.name)
                          : t.videos.playLabel(index + 1)
                      }
                    >
                      {/* While the loop runs, the affordance is about sound, not
                          play — a play disc over moving footage reads as broken. */}
                      {needsTap && (
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-110 md:h-[58px] md:w-[58px]">
                          <Play
                            size={20}
                            className="ml-0.5 fill-[var(--brand-teal)] text-[var(--brand-teal)] md:size-6"
                          />
                        </span>
                      )}

                      {/* Muted-speaker + runtime, tucked in the top-right so the
                          flag below has the bottom edge to itself. */}
                      <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-black/75 md:right-3 md:top-3 md:text-[11px]">
                        <VolumeX size={11} />
                        {story.length}
                      </span>
                    </button>
                  )}

                  {/* Badges sit centred on the bottom edge and stay put while
                      the film plays with sound: the years pill (same gold
                      sweep as the mentor credit under the VSL) above the
                      framed flag, whichever of the two the film has. */}
                  {(story.years || story.country) && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-4"
                    >
                      {story.years && (
                        <span className="flash-credit inline-block whitespace-nowrap rounded-full bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-gold-deep)] to-[var(--accent-gold)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--brand-teal-deep)] shadow-[0_6px_18px_rgba(0,0,0,0.35)] md:text-[11px]">
                          {t.videos.yearsLabel(story.years)}
                        </span>
                      )}
                      {story.country && (
                        <span className="overflow-hidden rounded-lg border-2 border-white shadow-[0_6px_18px_rgba(0,0,0,0.45)] ring-1 ring-[var(--accent-gold)]">
                          <Image
                            src={`/flags/${story.country.toLowerCase()}.svg`}
                            alt=""
                            width={64}
                            height={48}
                            unoptimized
                            className="block h-[42px] w-14 object-cover md:h-12 md:w-16"
                          />
                        </span>
                      )}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {canScroll &&
            [
              { dir: -1 as const, Icon: ChevronLeft, side: 'left-0 md:-left-5', label: t.results.previous },
              { dir: 1 as const, Icon: ChevronRight, side: 'right-0 md:-right-5', label: t.results.next },
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

        {(disclaimer || children) && (
          <div className="mt-9 text-center">
            {disclaimer && <p className="mb-7 text-[12px] italic text-gray-400">{disclaimer}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
