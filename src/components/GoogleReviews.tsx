import Image from "next/image";
import { BranchConfig } from "@/config/branch-configs";

interface GoogleReviewsProps {
  branch?: BranchConfig;
}

export default function GoogleReviews({ branch }: GoogleReviewsProps) {
  const reviews = branch?.reviews || [];

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
           style={{ background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20"
           style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto">
        <span className="inline-flex items-center gap-2 badge-pink px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
          Testimonials
        </span>
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <Image
            src="/images/google.png"
            alt="Google"
            width={112}
            height={38}
            className="object-contain opacity-90"
          />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Patient <span className="text-gradient-logo">Experiences</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 mb-12">
          <span className="text-[#f5b400] text-lg tracking-tight">★★★★★</span>
          <span className="text-sm font-semibold text-gray-600">5.0 rating from verified Google reviews</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {reviews.map((review, index) => (
            <div key={index} className={`relative bg-white/95 backdrop-blur-sm p-7 md:p-8 rounded-[24px] depth-stack card-3d-tilt border border-white/80 flex flex-col overflow-hidden fade-up stagger-${(index % 3) + 1}`}>
              <div aria-hidden className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none"
                   style={{ background: index % 2 === 0 ? 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' : 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }} />

              {/* Top row: stars + quote mark */}
              <div className="relative flex items-start justify-between mb-5">
                <span className="text-[#f5b400] text-base tracking-tight">★★★★★</span>
                <span className="shrink-0 w-9 h-9 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] flex items-center justify-center text-xl font-serif leading-none">&rdquo;</span>
              </div>

              {/* Title */}
              <h3 className="relative font-bold text-lg text-gray-900 mb-3 leading-snug">{review.title}</h3>

              {/* Body */}
              <p className="relative text-gray-600 leading-relaxed font-light text-[15px] mb-6">{review.review}</p>

              {/* Footer: avatar + name + Google meta */}
              <div className="relative mt-auto pt-5 border-t border-gray-100 flex items-center gap-3">
                <div className={`w-11 h-11 shrink-0 text-white rounded-full flex items-center justify-center font-bold text-base ${
                  index % 2 === 0
                    ? 'bg-gradient-to-br from-[var(--brand-teal)] to-[var(--brand-teal-deep)]'
                    : 'bg-gradient-to-br from-[var(--accent-pink)] to-[var(--accent-pink-dark)]'
                } shadow-md`}>
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-[15px] text-gray-900 leading-tight truncate">{review.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white shadow-sm border border-gray-100 text-[9px] font-black text-[#4285F4]">G</span>
                    <span className="truncate">{review.meta}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
