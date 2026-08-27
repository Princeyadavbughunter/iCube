import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckCircle2, Star } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';

const SERVICES = [
  { title: 'Dental Implant', pa: 'ਡੈਂਟਲ ਇੰਪਲਾਂਟ', image: '/treatment/implant.webp' },
  { title: 'Invisible Aligners', pa: 'ਅਦਿੱਖ ਅਲਾਈਨਰ', image: '/treatment/aliners.webp' },
  { title: 'Smile Makeover', pa: 'ਸਮਾਈਲ ਮੇਕਓਵਰ', image: '/treatment/smile_04-1.webp' },
  { title: 'In-House CBCT', pa: 'ਇਨ-ਹਾਊਸ CBCT 3D ਸਕੈਨ', image: '/treatment/cbct-1-1.webp' },
  { title: 'CAD/CAM Crowns', pa: 'CAD/CAM ਕੈਪ ਅਤੇ ਕਰਾਊਨ', image: '/treatment/cad-cam-01-1.webp' },
  { title: 'Laser Treatments', pa: 'ਲੇਜ਼ਰ ਅਤੇ ਕੋਸਮੈਟਿਕ ਟ੍ਰੀਟਮੈਂਟ', image: '/treatment/cosm-1-1.webp' },
  { title: 'Digital Scanners', pa: 'ਡਿਜੀਟਲ ਸਕੈਨਰ', image: '/treatment/scanner_01-1.webp' },
  { title: 'Single Sitting RCT', pa: 'ਬਿਨਾਂ ਦਰਦ ਰੂਟ ਕੈਨਾਲ', image: '/treatment/rct-1-2.webp' },
  { title: 'Wisdom Tooth', pa: 'ਅਕਲ ਦਾੜ੍ਹ ਕੱਢਣਾ', image: '/treatment/wisdom-1-1.webp' },
];

const HOLD_MS = 3200;

function AutoTreatmentSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % SERVICES.length);
        setAnimating(false);
      }, 220);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, []);

  const svc = SERVICES[activeIndex];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[40px] bg-white">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 38%, rgba(220,190,141,0.28) 0%, transparent 62%), linear-gradient(160deg, #ffffff 0%, #f6f3ec 55%, #eceaf2 100%)',
        }}
      />
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center transition-all duration-[220ms]"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'scale(0.96) translateY(8px)' : 'scale(1) translateY(0)' }}
      >
        <div className="relative w-full h-full">
          <Image src={svc.image} alt={svc.title} fill className="object-contain drop-shadow-xl p-6" sizes="(max-width: 1024px) 100vw, 50vw" priority />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-6 py-4 border-t border-gray-100 transition-all duration-[220ms]" style={{ opacity: animating ? 0 : 1 }}>
        <p className="text-[15px] font-black text-[var(--brand-teal-deep)] leading-tight">{svc.title}</p>
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {SERVICES.map((_, i) => (
          <span key={i} className="block h-1.5 rounded-full transition-all duration-500" style={{ width: i === activeIndex ? 24 : 8, background: i === activeIndex ? 'var(--brand-teal)' : 'rgba(0,0,0,0.15)' }} />
        ))}
      </div>
    </div>
  );
}

export default function TreatmentsOverview({ branch }: { branch: BranchConfig }) {
  const reviewCount = branch.reviews.length;

  return (
    <section className="py-24 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Graphic/Image */}
        <div className="w-full lg:w-1/2 relative fade-up">
          <div className="relative aspect-[4/3] max-w-[500px] mx-auto">
            {/* We use the hero poster as a placeholder if there's no specific clinic graphic */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-medical-light)] to-white rounded-[40px] transform -rotate-6 scale-105 border border-gray-100"></div>
            <div className="absolute inset-0 rounded-[40px] shadow-2xl border-8 border-white bg-gray-100">
               <AutoTreatmentSlider />
            </div>
            
            {/* Floating Review Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-4 animate-[float-slow_8s_ease-in-out_infinite]">
              <div className="flex -space-x-2">
                 <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">G</div>
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-[var(--accent-gold-deep)] text-[var(--accent-gold-deep)]" />
                  ))}
                </div>
                <p className="text-xs font-bold text-gray-800">{reviewCount}+ Google Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 fade-up stagger-2">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-pink-dark)] text-sm font-bold tracking-wider mb-6">
            COMPREHENSIVE CARE
          </div>
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-[var(--brand-teal-deep)] tracking-tight mb-6 leading-tight">
            All Treatments Under <span className="text-[var(--brand-teal)]">One Roof</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            From routine check-ups to full mouth rehabilitations, we provide a complete spectrum of dental services. Our in-house specialists and advanced technology ensure that you receive the highest standard of care without needing multiple referrals.
          </p>

          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
            {[
              'Digital X-Rays & CBCT',
              'Painless Root Canals',
              'Dental Implants',
              'Invisible Aligners',
              'Smile Designing',
              'Kids Dentistry'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--brand-teal)]/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-[var(--brand-teal)]" />
                </div>
                <span className="font-semibold text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary">
            Explore All Services
          </button>
        </div>

      </div>
    </section>
  );
}
