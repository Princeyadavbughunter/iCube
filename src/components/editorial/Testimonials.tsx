import { Star, Quote } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { SectionLabel, SectionHeading, PaLine } from './Primitives';

/** Real Google reviews for this branch, quoted verbatim (typos included). */
export default function Testimonials({ branch }: { branch: BranchConfig }) {
  if (branch.reviews.length === 0) return null;

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="reviews">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <SectionLabel>Testimonials</SectionLabel>
          <SectionHeading>What our patients say about us</SectionHeading>
          <PaLine>ਸਾਡੇ ਮਰੀਜ਼ ਕੀ ਕਹਿੰਦੇ ਹਨ</PaLine>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {branch.reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-[0_18px_50px_-28px_rgba(16,17,36,0.35)]"
            >
              <Quote size={22} className="mb-4 text-[var(--accent-gold)]" />

              <blockquote className="flex-1 text-[14.5px] leading-relaxed text-gray-600">
                {review.review}
              </blockquote>

              <figcaption className="mt-6 border-t border-gray-100 pt-4">
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="fill-[var(--accent-gold-deep)] text-[var(--accent-gold-deep)]"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-teal)] text-[13px] font-bold text-white">
                    {review.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-poppins text-[14px] font-bold text-[var(--brand-teal-deep)]">
                      {review.name}
                    </div>
                    <div className="truncate text-[11.5px] text-gray-400">{review.meta}</div>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href={branch.contact.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-bold text-[var(--brand-teal)] underline-offset-4 hover:underline"
        >
          Read every review on Google →
        </a>
      </div>
    </section>
  );
}
