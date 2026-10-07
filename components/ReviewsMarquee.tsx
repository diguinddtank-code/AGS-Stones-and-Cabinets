import React from 'react';
import { Star, User } from 'lucide-react';
import { reviews as allReviews, type Review } from '@/lib/reviewsData';

export const ReviewCard: React.FC<{ review: Review; className?: string }> = ({ review, className = 'w-[300px] md:w-[360px]' }) => (
  <article className={`${className} shrink-0 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm select-none`}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex text-[#FBBC05]" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <span className="text-[11px] font-medium text-primary bg-primary/5 border border-primary/10 px-2.5 py-0.5 rounded-full">
        {review.label}
      </span>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed mb-5">{review.text}</p>
    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
      <span className="w-9 h-9 rounded-full bg-[#FAF7F0] border border-[#EAE4D6] flex items-center justify-center shrink-0">
        <User size={16} className="text-[#8F703E]" />
      </span>
      <div className="leading-tight">
        <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
        <p className="text-xs text-gray-500">{review.location}</p>
      </div>
    </div>
  </article>
);

const MarqueeRow: React.FC<{ items: Review[]; reverse?: boolean; className?: string }> = ({ items, reverse, className = '' }) => {
  // Four copies = two identical halves wide enough for 1920px screens; the track
  // slides by exactly one half for a seamless loop. Copies 2-4 are hidden when
  // the visitor prefers reduced motion.
  return (
    <div className={`marquee-viewport ${className}`}>
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        {[0, 1, 2, 3].map(copy =>
          items.map((r, i) => (
            <div
              key={`${copy}-${i}`}
              className={`marquee-item ${copy > 0 ? 'marquee-dup' : ''}`}
              aria-hidden={copy > 0 ? true : undefined}
            >
              <ReviewCard review={r} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

interface ReviewsMarqueeProps {
  items?: Review[];
  eyebrow?: string;
  heading?: string;
  intro?: string;
  className?: string;
}

const ReviewsMarquee: React.FC<ReviewsMarqueeProps> = ({
  items = allReviews,
  eyebrow = 'Client Reviews',
  heading = 'What Homeowners Say',
  intro = 'Homeowners in Duluth, Alpharetta, Johns Creek and across Metro Atlanta on working with our team.',
  className = 'bg-gray-50',
}) => (
  <section className={`py-20 md:py-24 overflow-hidden ${className}`}>
    <div className="container mx-auto px-4 max-w-3xl text-center mb-10 md:mb-14">
      <h2 className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm mb-3">{eyebrow}</h2>
      <p className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">{heading}</p>
      <p className="text-gray-500 md:text-lg">{intro}</p>
    </div>

    <div className="marquee flex flex-col gap-6">
      <MarqueeRow items={items} />
      <MarqueeRow items={[...items].reverse()} reverse className="marquee-second-row hidden md:block" />
    </div>
  </section>
);

export default ReviewsMarquee;
