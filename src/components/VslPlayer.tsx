'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';

interface VslPlayerProps {
  branch: BranchConfig;
}

/**
 * The sales film, sitting inside the hero.
 *
 * Unlike the ambient clinic clip beside it, this one carries the argument, so
 * it has sound and waits for a deliberate press of play — autoplaying a voice
 * on a phone is hostile. Renders nothing until a film is supplied, so a branch
 * without one simply shows a hero with no gap in it.
 */
export default function VslPlayer({ branch }: VslPlayerProps) {
  const { vsl } = branch;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!vsl.src) return null;

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
            controls={playing}
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {!playing && (
            <button
              type="button"
              onClick={() => videoRef.current?.play()}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0d0e1c]/30 transition-colors hover:bg-[#0d0e1c]/20"
              aria-label={`Play the I Cube Dental ${branch.name} film`}
            >
              <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                <Play size={26} className="ml-1 fill-[var(--brand-teal)] text-[var(--brand-teal)]" />
              </span>
              <span
                lang="pa"
                className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm"
              >
                ਵੀਡੀਓ ਵੇਖੋ
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
