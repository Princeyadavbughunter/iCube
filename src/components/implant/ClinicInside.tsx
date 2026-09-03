'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import type { BranchConfig } from '@/config/branch-configs';
import ConsultCta from './ConsultCta';

/**
 * The premises, shown with the walkthrough rather than a repeated still.
 *
 * The obvious build here was a photo grid, but this branch has supplied one
 * interior photograph. A grid would have had to repeat it, and five copies of
 * the same room reads as a mistake rather than a tour. The clinic's own
 * walkthrough film covers the space properly, so it leads and the still sits
 * beside it.
 *
 * The film is silent b-roll, so it loops muted with no controls — and, at
 * ~5 MB, only starts loading once the section is close, the same gate the
 * patient videos use.
 */
export default function ClinicInside({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  const photo = branch.clinicImages[0];
  const hasVideo = Boolean(branch.clinicTourVideo);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !hasVideo || reduceMotion) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '250px 0px',
      threshold: 0.05,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [hasVideo, reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  if (!hasVideo && !photo) return null;

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

        <div className="grid gap-5 md:grid-cols-[1.55fr_1fr]">
          {hasVideo && (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-[var(--brand-teal-ink)] shadow-[0_24px_60px_-32px_rgba(16,17,36,0.6)] ring-1 ring-black/5">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={branch.clinicTourVideo}
                poster={branch.clinicTourPoster || undefined}
                muted
                loop
                playsInline
                preload="none"
                aria-label={`Walkthrough of I Cube Dental ${branch.name}`}
              />
            </div>
          )}

          {photo && (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-gray-100 shadow-[0_24px_60px_-32px_rgba(16,17,36,0.5)] ring-1 ring-black/5 md:aspect-auto">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="mt-11">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
