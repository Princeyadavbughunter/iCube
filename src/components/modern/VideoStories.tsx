'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Play, VolumeX } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

interface Story {
  src: string;
  poster: string;
  /** Runtime, shown as a pill so a visitor knows what they are committing to. */
  length: string;
  /** Only set where the patient is named on screen — used for the label a
   *  screen reader announces, never inferred. */
  name?: string;
}

const stories: Story[] = [
  {
    src: '/testimonal/Video-26644.mp4',
    poster: '/testimonal/Video-26644-poster.webp',
    length: '0:57',
    name: 'Tajinder Singh',
  },
  {
    src: '/testimonal/Video-30229.mp4',
    poster: '/testimonal/Video-30229-poster.webp',
    length: '0:34',
  },
  {
    src: '/testimonal/Video-49993.mp4',
    poster: '/testimonal/Video-49993-poster.webp',
    length: '1:07',
  },
  {
    src: '/testimonal/Video-67544.mp4',
    poster: '/testimonal/Video-67544-poster.webp',
    length: '1:41',
  },
];

/**
 * Filmed patient testimonials, sitting just above the written Google reviews.
 *
 * The four films loop muted, so the row reads as four people mid-sentence
 * rather than four still frames. Muted is not a compromise — it is the only
 * way a browser autoplays at all, and four unannounced voices at once would
 * be unbearable.
 *
 * They only start once the section is near the viewport, and pause the moment
 * it leaves. Four files come to roughly 16 MB; `preload="none"` plus that
 * gate means a visitor who never scrolls this far downloads none of it, and
 * nothing keeps decoding off-screen.
 *
 * Sound is one tap away. Taking it restarts that film from the beginning and
 * pauses the other three, so two patients never talk over each other, and the
 * native controls take over from there rather than being reinvented.
 */
export default function VideoStories({
  kicker = 'PATIENT VIDEOS',
  heading = 'Hear It In Their Own Words',
  disclaimer,
  children,
}: {
  kicker?: string;
  heading?: string;
  /** Small print under the row — patient footage needs a results-vary line. */
  disclaimer?: string;
  /** Slot under the row, used for the implant page's repeating CTA. */
  children?: ReactNode;
} = {}) {
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

  return (
    <section
      ref={sectionRef}
      className="px-4 py-20 sm:px-6 md:py-28 lg:px-10 bg-[var(--accent-pink-soft)]"
      id="patient-videos"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-bold tracking-wider mb-4">
            {kicker}
          </div>
          <h2 className="font-poppins text-3xl md:text-[2.5rem] font-bold leading-tight text-[var(--brand-teal-deep)]">
            {heading}
          </h2>
          <p className="mt-4 text-gray-500">Tap any story to play it with sound</p>
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
                  poster={story.poster}
                  playsInline
                  muted={!isActive}
                  loop={!isActive}
                  // Nothing is fetched until the observer asks for play().
                  preload="none"
                  controls={isActive}
                  onEnded={() => reset(index)}
                  aria-label={
                    story.name
                      ? `${story.name} — patient testimonial`
                      : `Patient testimonial ${index + 1}`
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
                        ? `Play ${story.name}'s testimonial with sound`
                        : `Play patient testimonial ${index + 1} with sound`
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
