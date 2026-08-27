'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine, MediaFrame } from './Primitives';
import { Stagger, StaggerItem } from '@/components/motion/Motion';

/** All treatments the practice runs, matching the navbar menu. */
const SERVICES = [
  {
    title: 'Dental Implant',
    pa: 'ਡੈਂਟਲ ਇੰਪਲਾਂਟ',
    body: 'Single, multiple and full-mouth implants, each planned in 3D on in-house CBCT before any surgery begins.',
    image: '/treatment/implant.webp',
  },
  {
    title: 'Invisible Aligners',
    pa: 'ਅਦਿੱਖ ਅਲਾਈਨਰ',
    body: 'Clear, removable aligners straighten teeth discreetly — finish planned digitally so you see the result before you start.',
    image: '/treatment/aliners.webp',
  },
  {
    title: 'Smile Makeover',
    pa: 'ਸਮਾਈਲ ਮੇਕਓਵਰ',
    body: 'Veneers, crowns and composite bonding combined into a single digital plan — designed for your face, not a template.',
    image: '/treatment/smile_04-1.webp',
  },
  {
    title: 'In-House CBCT: 3D Dental Imaging',
    pa: 'ਇਨ-ਹਾਊਸ CBCT 3D ਸਕੈਨ',
    body: 'Our on-site CBCT scanner captures a full 3D map of your jaw — bone depth, nerve paths and sinus position — in one visit.',
    image: '/treatment/cbct-1-1.webp',
  },
  {
    title: 'In-House CAD/CAM: Fast Dental Caps',
    pa: 'CAD/CAM ਕੈਪ ਅਤੇ ਕਰਾਊਨ',
    body: 'Crowns designed and milled in-house from a digital scan — no putty impressions, natural shade, fitted the same day.',
    image: '/treatment/cad-cam-01-1.webp',
  },
  {
    title: 'Laser and Cosmetic Dental Treatments',
    pa: 'ਲੇਜ਼ਰ ਅਤੇ ਕੋਸਮੈਟਿਕ ਟ੍ਰੀਟਮੈਂਟ',
    body: 'Laser-assisted gum reshaping, teeth whitening and cosmetic procedures with minimal discomfort and faster healing.',
    image: '/treatment/cosm-1-1.webp',
  },
  {
    title: 'Digital Scanners: Fast & Accurate',
    pa: 'ਡਿਜੀਟਲ ਸਕੈਨਰ',
    body: 'Intraoral scanners replace messy impressions — a precise digital model of your teeth captured in minutes.',
    image: '/treatment/scanner_01-1.webp',
  },
  {
    title: 'Single Sitting Painless RCT',
    pa: 'ਬਿਨਾਂ ਦਰਦ ਰੂਟ ਕੈਨਾਲ',
    body: 'Root canal completed in one visit by an MDS endodontist under magnification — no pain, no multiple appointments.',
    image: '/treatment/rct-1-2.webp',
  },
  {
    title: 'Wisdom Tooth Removal',
    pa: 'ਅਕਲ ਦਾੜ੍ਹ ਕੱਢਣਾ',
    body: 'Surgical and simple wisdom tooth extractions performed under local anaesthesia by our oral surgeon — quick recovery.',
    image: '/treatment/wisdom-1-1.webp',
  },
];

const HOLD_MS = 3200;

/** Auto-sliding treatment image carousel used on the right of ServicesList. */
function TreatmentSlider({ activeIndex }: { activeIndex: number }) {
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [animating, setAnimating] = useState(false);
  const prevIndex = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex === prevIndex.current) return;
    setAnimating(true);
    const t = setTimeout(() => {
      setDisplayIndex(activeIndex);
      prevIndex.current = activeIndex;
      setAnimating(false);
    }, 220);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const svc = SERVICES[displayIndex];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[20px]">
      {/* Soft background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(220,190,141,0.28) 0%, transparent 62%), linear-gradient(160deg, #ffffff 0%, #f6f3ec 55%, #eceaf2 100%)',
        }}
      />

      {/* Treatment image */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center transition-all duration-[220ms]"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'scale(0.96) translateY(8px)' : 'scale(1) translateY(0)' }}
      >
        <div className="relative w-full h-full">
          <Image
            src={svc.image}
            alt={svc.title}
            fill
            className="object-contain drop-shadow-xl p-6"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Caption overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-5 py-3 border-t border-gray-100 transition-all duration-[220ms]"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <p className="text-[13px] font-black text-[var(--brand-teal-deep)] leading-tight">{svc.title}</p>
        <p lang="pa" className="text-[11px] text-[var(--brand-teal)] font-medium mt-0.5">{svc.pa}</p>
      </div>

      {/* Dot indicator */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
        {SERVICES.map((_, i) => (
          <span
            key={i}
            className="block h-1 rounded-full transition-all duration-500"
            style={{
              width: i === displayIndex ? 20 : 6,
              background: i === displayIndex ? 'var(--brand-teal)' : 'rgba(0,0,0,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ServicesList({ branch }: { branch: BranchConfig }) {
  const [activeService, setActiveService] = useState(0);

  // Auto-advance the slider
  useEffect(() => {
    const id = setInterval(() => {
      setActiveService((i) => (i + 1) % SERVICES.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="services">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — treatment list */}
        <div>
          <SectionLabel>Our Services</SectionLabel>
          <SectionHeading>Complete dental care under one roof</SectionHeading>
          <PaLine>{branch.copy.oneRoofLine}</PaLine>

          <Stagger className="mt-8">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.title}>
                <button
                  type="button"
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left border-t border-gray-200 py-4 first:border-t-0 first:pt-0 flex gap-4 group transition-colors duration-200 ${
                    activeService === i ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span
                    className="mt-0.5 shrink-0 font-poppins text-[13px] font-bold tabular-nums transition-colors duration-200"
                    style={{ color: activeService === i ? 'var(--brand-teal)' : 'var(--accent-gold-deep)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3
                      className="font-poppins text-[16px] font-bold leading-snug transition-colors duration-200"
                      style={{ color: activeService === i ? 'var(--brand-teal)' : 'var(--brand-teal-deep)' }}
                    >
                      {s.title}
                    </h3>
                    <p lang="pa" className="mt-0.5 text-[12.5px] font-medium text-[var(--brand-teal)]">
                      {s.pa}
                    </p>
                    {activeService === i && (
                      <p className="mt-2 text-[13.5px] leading-relaxed text-gray-500 animate-fadeIn">
                        {s.body}
                      </p>
                    )}
                  </div>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Right — sliding treatment image */}
        <div className="lg:sticky lg:top-24">
          <MediaFrame offset="br">
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <TreatmentSlider activeIndex={activeService} />
            </div>
          </MediaFrame>
        </div>
      </div>
    </section>
  );
}
