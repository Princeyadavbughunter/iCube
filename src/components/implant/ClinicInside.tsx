'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { BranchConfig } from '@/config/branch-configs';
import ConsultCta from './ConsultCta';

/**
 * The premises, filmed.
 *
 * Four rooms rather than one wide photograph: someone deciding where to have
 * surgery wants to see the room the surgery happens in, the scanner their jaw
 * goes into, and what they will be sitting in beforehand. A still of the
 * reception answers none of that.
 *
 * These are silent b-roll, so they loop muted with no controls and no
 * tap-for-sound affordance — there is nothing to hear, and offering sound that
 * does not exist is worse than offering none. They only start once the section
 * is near the viewport and pause when it leaves, so a visitor who never
 * scrolls this far downloads none of it.
 */
export default function ClinicInside({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  const clips = branch.clinicTour;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || clips.length === 0 || reduceMotion) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '250px 0px',
      threshold: 0.05,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [clips.length, reduceMotion]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      if (inView) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [inView]);

  if (clips.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--bg-medical-light)] px-4 py-16 sm:px-6 md:py-24 lg:px-10"
      id="clinic"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-11 max-w-2xl text-center">
          <h2 className="font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
            Inside I Cube Dental {branch.city}
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-gray-500">
            The rooms your treatment actually happens in — in-house CBCT and digital scanning, and
            an operatory kept for implant surgery.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {clips.map((clip, index) => (
            <figure key={clip.src} className="group">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-[var(--brand-teal-ink)] ring-1 ring-black/5 shadow-[0_18px_45px_-22px_rgba(18,19,36,0.55)]">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="h-full w-full object-cover"
                  src={clip.src}
                  poster={clip.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={`${clip.label} at I Cube Dental ${branch.name}`}
                />
              </div>
              <figcaption className="mt-3 text-center text-[12px] font-semibold text-[var(--brand-teal-deep)] sm:text-[12.5px]">
                {clip.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-11">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
