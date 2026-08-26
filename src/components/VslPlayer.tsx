'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import type { BranchConfig } from '@/config/branch-configs';

interface VslPlayerProps {
  branch: BranchConfig;
}

/**
 * The sales film in the hero.
 *
 * It starts on its own, muted and looping, so a visitor sees the clinic and
 * the doctor moving the moment the page opens. Muted is not a compromise
 * here — it is the only way a browser will autoplay at all, and an
 * unannounced voice on a phone would be hostile.
 *
 * Sound is one tap away. Taking it restarts the film from the beginning: a
 * sales film's argument depends on its opening, and by the time someone
 * reaches for the sound they have usually missed it.
 *
 * Two cases fall back to a play button instead of autoplaying: a visitor who
 * has asked for reduced motion, and a browser that refuses the autoplay
 * outright (some still do, even muted). Either way the poster is showing, so
 * the frame is never empty.
 */
export default function VslPlayer({ branch }: VslPlayerProps) {
  const { vsl } = branch;
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !vsl.src) return;

    if (reduceMotion) {
      setNeedsTap(true);
      return;
    }

    // play() rejects when the browser declines the autoplay; surface the play
    // button rather than leaving a frame that looks broken.
    const attempt = video.play();
    if (attempt) {
      attempt.catch(() => setNeedsTap(true));
    }
  }, [reduceMotion, vsl.src]);

  if (!vsl.src) return null;

  const startWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video.loop = false;
    void video.play();
    setMuted(false);
    setNeedsTap(false);
  };

  const startMuted = () => {
    void videoRef.current?.play();
    setNeedsTap(false);
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--accent-gold)]" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-teal)]">
          {vsl.kicker}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--accent-gold)]" />
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-[var(--brand-teal-ink)] shadow-[0_28px_70px_-28px_rgba(16,17,36,0.6)] ring-1 ring-black/5">
        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={vsl.src}
            poster={vsl.poster || undefined}
            // Muted + inline is what makes autoplay permitted at all.
            autoPlay={!reduceMotion}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            controls={!muted}
            aria-label={`I Cube Dental ${branch.name} film`}
          />

          {/* Autoplay refused, or motion turned down — offer the film directly. */}
          {needsTap && (
            <button
              type="button"
              onClick={startMuted}
              className="group absolute inset-0 flex items-center justify-center bg-[#0d0e1c]/30 transition-colors hover:bg-[#0d0e1c]/20"
              aria-label={`Play the I Cube Dental ${branch.name} film`}
            >
              <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                <Play size={26} className="ml-1 fill-[var(--brand-teal)] text-[var(--brand-teal)]" />
              </span>
            </button>
          )}

          {/* Sound. Sits over the corner while muted, so it never covers the
              speaker, and disappears once the native controls take over. */}
          {muted && !needsTap && (
            <button
              type="button"
              onClick={startWithSound}
              className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-3.5 py-2 text-[12px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <VolumeX size={14} />
              Tap for sound
              <span lang="pa" className="font-normal opacity-75">· ਆਵਾਜ਼</span>
            </button>
          )}

          {!muted && (
            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
              <Volume2 size={11} />
              Sound on
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
