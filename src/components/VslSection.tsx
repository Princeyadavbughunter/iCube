'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';

interface VslSectionProps {
  branch: BranchConfig;
  onBookAppointment: () => void;
}

/**
 * The sales film that opens the branch page.
 *
 * Unlike the ambient hero clip this one carries the argument, so it has sound
 * and waits for a deliberate press of play — an autoplaying voice would be
 * hostile on a phone. Renders nothing until a film is supplied, which keeps
 * the page honest rather than showing an empty frame.
 */
export default function VslSection({ branch, onBookAppointment }: VslSectionProps) {
  const { vsl } = branch;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!vsl.src) return null;

  const play = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-24" id="vsl">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-7 text-center">
          <span className="badge-pink inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
            {vsl.kicker}
          </span>
          <h2 className="mt-4 font-poppins text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            See how we plan your <span className="text-gradient-logo">treatment</span>
          </h2>
          <p className="mt-3 text-lg font-medium text-[var(--brand-teal)]" lang="pa">
            ਵੇਖੋ ਅਸੀਂ ਤੁਹਾਡਾ ਇਲਾਜ ਕਿਵੇਂ ਪਲਾਨ ਕਰਦੇ ਹਾਂ
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[26px] bg-[var(--brand-teal-ink)] shadow-[0_28px_70px_-28px_rgba(16,17,36,0.6)] ring-1 ring-black/5">
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
                onClick={play}
                className="group absolute inset-0 flex items-center justify-center bg-[#0d0e1c]/35 transition-colors hover:bg-[#0d0e1c]/25"
                aria-label={`Play the I Cube Dental ${branch.name} film`}
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                  <Play size={30} className="ml-1 fill-[var(--brand-teal)] text-[var(--brand-teal)]" />
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-7 text-center">
          <button
            onClick={onBookAppointment}
            className="btn-3d gradient-sheen rounded-2xl bg-[var(--brand-teal)] px-10 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:bg-[var(--brand-teal-dark)] active:scale-95"
          >
            Book Free Consultation
            <span className="ml-2 font-normal opacity-75" lang="pa">· ਬੁੱਕ ਕਰੋ</span>
          </button>
        </div>
      </div>
    </section>
  );
}
