'use client';

import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface HeroVideoProps {
  /** Path to the branch's clinic video, e.g. "/hero-ludhiana.mp4". */
  src: string;
  /** Still frame shown before the video is ready — avoids a black hole in the hero. */
  poster?: string;
  /** Branch name, used for the accessible label. */
  label: string;
}

/**
 * Clinic walkthrough video for the hero media frame.
 *
 * Muted + looping + inline so it behaves as ambient motion rather than a player:
 * there is no audio track to miss and no controls to fight with on mobile. If the
 * visitor prefers reduced motion, or the file fails to load, the poster still
 * shows and the video never autoplays.
 */
export default function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--brand-teal-ink)]">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        poster={poster}
        // autoPlay is deliberately tied to the motion preference — a looping
        // clinic video is decoration, so it should not override that choice.
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        // The hero is above the fold but the video is not the LCP element, so
        // metadata-only keeps it off the critical path.
        preload="metadata"
        aria-label={`${label} clinic walkthrough`}
        onError={() => setFailed(true)}
      />
      {/* Bottom scrim so any overlaid corner glow keeps contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: 'linear-gradient(to top, rgba(16,24,32,0.45), transparent)' }}
      />
    </div>
  );
}
