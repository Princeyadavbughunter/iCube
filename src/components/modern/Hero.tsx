'use client';

import { Phone } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import VslPlayer from '@/components/VslPlayer';
import HeroVideo from '@/components/HeroVideo';
import ImplantShowcase from '@/components/ImplantShowcase';

interface HeroProps {
  branch: BranchConfig;
  onBookAppointment: () => void;
}

export default function Hero({ branch, onBookAppointment }: HeroProps) {
  const phone = branch.contact.phones[0];

  return (
    <section className="relative px-4 pt-32 pb-14 sm:px-6 md:pt-40 md:pb-24 lg:px-10 overflow-hidden bg-gradient-to-b from-[var(--bg-medical-light)] to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-40 mix-blend-multiply pointer-events-none"></div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 z-10">
        
        {/* ---- Left: Content ---- */}
        <div className="max-w-xl fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-[var(--glass-border)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-teal)] animate-pulse"></span>
            <span className="text-xs font-bold text-[var(--brand-teal)] tracking-wider uppercase">{branch.name}</span>
          </div>

          <h1 className="font-poppins text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--brand-teal-deep)] sm:text-5xl lg:text-[3.5rem] mb-6">
            Premium Painless Dentistry in <span className="text-[var(--brand-teal)]">{branch.name}</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            {branch.pa.heroSub} Experience expert care with advanced technology, ensuring your comfort and a healthy smile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBookAppointment}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Book Your Consultation
            </button>
            <a 
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="px-8 py-3.5 rounded-full font-bold text-[var(--brand-teal)] border-2 border-[var(--brand-teal)] hover:bg-[var(--brand-teal)] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call {phone}
            </a>
          </div>
        </div>

        {/* ---- Right: Visual ---- */}
        <div className="relative fade-up stagger-2 lg:ml-auto w-full max-w-lg">
          {branch.vsl.src ? (
            /* The film is 16:9 and already carries its own rounded frame and
               shadow. Putting it inside the portrait media frame below left a
               third of that frame empty under the video, so it gets the column
               on its own terms instead. */
            <div className="relative z-10">
              <VslPlayer branch={branch} />
            </div>
          ) : (
            /* Main Image Container — portrait, for the stills and the showcase. */
            <div className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] w-full bg-gray-100">
              {branch.heroVideo ? (
                <HeroVideo src={branch.heroVideo} poster={branch.heroPoster} label={branch.name} />
              ) : (
                <ImplantShowcase />
              )}
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--brand-teal)]/5 rounded-full blur-3xl"></div>
        </div>

      </div>
    </section>
  );
}
