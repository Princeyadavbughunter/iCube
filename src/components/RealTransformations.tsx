'use client';

import Image from 'next/image';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef, useState } from 'react';

type TransformationItem = {
  type: 'transformation';
  before?: string;
  after: string;
  title: string;
  description: string;
  badgeText?: string;
};

type KidsItem = {
  type: 'kids';
  image: string;
  title: string;
  badge: string;
};

type Item = TransformationItem | KidsItem;

const TRANSFORMATION_ITEMS: Item[] = [
  {
    type: 'transformation',
    before: '/images/before-after/pair1-before.jpeg',
    after: '/images/before-after/pair1-after.jpeg',
    title: 'Full mouth crown & bridge',
    description: ''
  },
  {
    type: 'transformation',
    before: '/images/before-after/pair2-before.jpeg',
    after: '/images/before-after/pair2-after.jpeg',
    title: 'All-on-implants full arch',
    description: ''
  },
  {
    type: 'transformation',
    before: '/images/before-after/pair3-before.jpeg',
    after: '/images/before-after/pair3-after.jpeg',
    title: 'Front teeth replacement',
    description: ''
  },
  {
    type: 'transformation',
    before: '/images/before-after/pair4-before.jpeg',
    after: '/images/before-after/pair4-after.jpeg',
    title: 'Complete denture smile',
    description: ''
  },
  {
    type: 'transformation',
    before: '/images/ba3-before.jpeg',
    after: '/images/ba3-after.jpeg',
    title: 'Cleaning & Restoration',
    description: 'Professional clean-up for a healthy finish'
  }
];

export default function RealTransformations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Interaction tracking
  const [isHovered, setIsHovered] = useState(false);
  const lastInteractionTime = useRef(0);
  const resumeDelay = 2000; // 2 seconds

  // Auto-scroll logic
  // Auto-scroll logic (tuned for 'toothstory' speed)
  const baseVelocity = -2.8; // Calibrated for roughly 2s per 340px slide transition
  
  useAnimationFrame((time, delta) => {
    const timeSinceInteraction = Date.now() - lastInteractionTime.current;
    if (!isHovered && timeSinceInteraction > resumeDelay) {
      // Smoothly move by velocity adjusted for frame time (delta)
      const moveBy = baseVelocity * (delta / 16);
      x.set(x.get() + moveBy);
    }

    // Infinite wrap logic
    if (containerRef.current) {
      const singleSetWidth = containerRef.current.scrollWidth / 2;
      const currentX = x.get();
      
      // If we've scrolled past one full set to the left
      if (currentX <= -singleSetWidth) {
        x.set(currentX + singleSetWidth);
      } 
      // If we've scrolled to the right (manual trackpad)
      else if (currentX > 0) {
        x.set(currentX - singleSetWidth);
      }
    }
  });

  // Trackpad / Scroll support
  const handleWheel = (e: React.WheelEvent) => {
    lastInteractionTime.current = Date.now();
    // Support horizontal and vertical scrolling (some trackpads use vertical for horizontal scroll)
    const delta = e.deltaX || e.deltaY;
    x.set(x.get() - delta);
  };

  // Drag support starts here (via motion.div drag props)
  const handleDragStart = () => {
    lastInteractionTime.current = Date.now();
  };

  const handleDrag = () => {
    lastInteractionTime.current = Date.now();
  };

  // Flatten into individual full-bleed slides (before & after become separate cards)
  const slides = TRANSFORMATION_ITEMS.flatMap((item) => {
    if (item.type === 'kids') {
      return [{ src: item.image, label: item.badge, title: item.title }];
    }
    if (item.before) {
      return [
        { src: item.before, label: 'Before', title: item.title },
        { src: item.after, label: 'After', title: item.title },
      ];
    }
    const label = item.badgeText === 'none' ? '' : (item.badgeText || 'Result');
    return [{ src: item.after, label, title: item.title }];
  });

  // Double the slides for seamless loop
  const allItems = [...slides, ...slides];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="transformations">
      <div aria-hidden className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
           style={{ background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-25"
           style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 badge-pink px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
              Patient Results
            </span>
            <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6 tracking-tight text-gray-900 leading-tight">
              Real Smiles, <span className="text-gradient-logo">Real Transformations</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-poppins font-light leading-relaxed">
              From single-tooth implants to full-mouth rehabilitation, see the impact of specialist-led implant dentistry.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative w-full py-10">
        {/* Edge Blurs for Premium Feel */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent z-30 pointer-events-none" />

        <div 
          className="flex overflow-hidden active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onWheel={handleWheel}
        >
          <motion.div 
            ref={containerRef}
            className="flex gap-6 px-3 py-4 cursor-grab"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -10000, right: 10000 }} // Effectively infinite
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={() => { lastInteractionTime.current = Date.now(); }}
          >
            {allItems.map((slide, idx) => (
              <div
                key={`${slide.title}-${slide.label}-${idx}`}
                className="flex-shrink-0 w-[260px] md:w-[320px] aspect-[3/4]"
                onDragStart={(e) => e.preventDefault()} // Prevent native ghost image
              >
                <div className="relative w-full h-full rounded-[24px] overflow-hidden depth-stack card-3d-tilt border border-white/80 bg-gray-100 group select-none pointer-events-none md:pointer-events-auto">
                  <Image
                    draggable={false}
                    src={slide.src}
                    alt={slide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 768px) 260px, 320px"
                    quality={100}
                    priority={idx < 4}
                  />
                  {slide.label && (
                    <div className="absolute top-3 left-3 bg-[var(--brand-teal)] text-white text-[11px] px-3 py-1 rounded-full font-poppins font-bold uppercase tracking-wider shadow-lg z-10">
                      {slide.label}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 pt-12 pb-4 z-10">
                    <h4 className="text-white font-poppins font-bold text-sm md:text-base leading-snug">
                      {slide.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-12 text-center overflow-hidden">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full depth-stack border border-white/80"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-br from-[var(--accent-pink-soft)] to-[var(--brand-teal)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--brand-teal-deep)]">{i}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm font-poppins font-medium">
            <span className="text-gray-900 font-bold">1,000+</span> Happy Patients
          </p>
        </motion.div>
      </div>
    </section>
  );
}
