'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Play, VolumeX, Globe } from 'lucide-react';
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
}

/**
 * A handful of hand-drawn flags, not the Unicode flag emoji.
 *
 * The regional-indicator trick ("AU" -> 🇦🇺) renders as an actual flag on
 * most phones, but Windows' Segoe UI Emoji has historically shown the bare
 * two-letter code instead, and Firefox on every OS does this on purpose. A
 * flag that only sometimes looks like a flag is worse than a simplified one
 * that always does, so these are drawn once as SVG rather than left to the
 * platform's font. `viewBox="0 0 3 2"` matches the real flags' 3:2 ratio;
 * the badge crops that to a circle, so exact proportions past the centre
 * don't matter.
 */
function Flag({ country, className }: { country: string; className?: string }) {
  switch (country) {
    case 'AU':
      return (
        <svg viewBox="0 0 3 2" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="3" height="2" fill="#00247D" />
          {/* Union Jack canton */}
          <g clipPath="url(#au-canton)">
            <rect width="1.5" height="1" fill="#00247D" />
            <path d="M0,0 1.5,1 M1.5,0 0,1" stroke="#fff" strokeWidth="0.2" />
            <path d="M0,0 1.5,1 M1.5,0 0,1" stroke="#C8102E" strokeWidth="0.08" />
            <path d="M0.75,0 V1 M0,0.5 H1.5" stroke="#fff" strokeWidth="0.3" />
            <path d="M0.75,0 V1 M0,0.5 H1.5" stroke="#C8102E" strokeWidth="0.14" />
          </g>
          <defs>
            <clipPath id="au-canton"><rect width="1.5" height="1" /></clipPath>
          </defs>
          {/* Commonwealth Star */}
          <circle cx="0.75" cy="1.5" r="0.16" fill="#fff" />
          {/* Southern Cross (simplified) */}
          <circle cx="2.2" cy="0.5" r="0.13" fill="#fff" />
          <circle cx="2.4" cy="1" r="0.16" fill="#fff" />
          <circle cx="2.15" cy="1.45" r="0.13" fill="#fff" />
          <circle cx="1.85" cy="1.15" r="0.1" fill="#fff" />
        </svg>
      );
    case 'CA':
      return (
        <svg viewBox="0 0 3 2" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="3" height="2" fill="#fff" />
          <rect width="0.75" height="2" fill="#D80621" />
          <rect x="2.25" width="0.75" height="2" fill="#D80621" />
          {/* A single closed outline (3 lobes a side + stem) reads as a leaf at
              this size — the earlier symmetric star-burst path did not. */}
          <path
            fill="#D80621"
            d="M1.5,0.15 1.6,0.4 1.85,0.35 1.72,0.55 1.95,0.7 1.75,0.8 1.85,1.05 1.6,0.95 1.65,1.25 1.5,1.1 1.35,1.25 1.4,0.95 1.15,1.05 1.25,0.8 1.05,0.7 1.28,0.55 1.15,0.35 1.4,0.4 Z M1.46,1.15 H1.54 L1.58,1.7 H1.42 Z"
          />
        </svg>
      );
    case 'US':
      return (
        <svg viewBox="0 0 3 2" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="3" height="2" fill="#fff" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} y={(i * 2 * 2) / 13} width="3" height={2 / 13} fill="#B22234" />
          ))}
          <rect width="1.2" height={(2 * 7) / 13} fill="#3C3B6E" />
          {Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={i}
              cx={0.15 + (i % 3) * 0.4}
              cy={0.15 + Math.floor(i / 3) * 0.4}
              r="0.06"
              fill="#fff"
            />
          ))}
        </svg>
      );
    default:
      return <Globe className={className} strokeWidth={2.2} />;
  }
}

/**
 * Filmed patient testimonials, sitting just above the written Google reviews.
 *
 * `stories` is branch-specific (see `videoTestimonials` in branch-configs) —
 * Ludhiana runs its own four clinic-shot films, Chandigarh runs the case
 * films patients sent back after flying in for treatment, flagged with the
 * country they travelled from.
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
 * start several of at once on mobile data. Cards are at most ~300px wide, so
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
  /** Small print under the row — patient footage needs a results-vary line. */
  disclaimer?: string;
  /** Slot under the row, used for the implant page's repeating CTA. */
  children?: ReactNode;
}) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  /** The one film playing with sound, if any. */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  /** Autoplay was refused (some browsers still do, even muted) — offer taps. */
  const [needsTap, setNeedsTap] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="px-4 py-20 sm:px-6 md:py-28 lg:px-10 bg-[var(--accent-pink-soft)]"
      id={id}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-bold tracking-wider mb-4">
            {kicker ?? t.videos.kicker}
          </div>
          <h2 className="font-poppins text-3xl md:text-[2.5rem] font-bold leading-tight text-[var(--brand-teal-deep)]">
            {heading ?? t.videos.heading}
          </h2>
          <p className="mt-4 text-gray-500">{t.videos.sub}</p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-4 md:gap-8 lg:gap-10">
          {stories.map((story, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={story.src}
                className="group relative aspect-[9/16] overflow-hidden rounded-[20px] bg-[var(--brand-teal-ink)] ring-1 ring-black/5 shadow-[0_18px_45px_-22px_rgba(18,19,36,0.55)] transition-transform duration-300 hover:-translate-y-1"
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

                {story.country && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/90 text-[var(--brand-teal)] shadow-[0_2px_8px_rgba(0,0,0,0.35)] ring-1 ring-black/10 backdrop-blur-sm md:left-3 md:top-3 md:h-8 md:w-8"
                  >
                    <Flag country={story.country} className="h-full w-full" />
                  </span>
                )}

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

                    {/* Muted-speaker + runtime. Bottom-right is the one corner
                        all four films leave to decoration — the clinic logo
                        sits top, captions and names run down the centre. */}
                    <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-black/75 md:bottom-3 md:right-3 md:text-[11px]">
                      <VolumeX size={11} />
                      {story.length}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
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
