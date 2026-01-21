import React, { useEffect, useState, useRef } from 'react';
import { Star, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';

const reviews: (Testimonial & { date: string, label: string })[] = [
  {
    name: "Sarah Jenkins",
    location: "Duluth, GA",
    text: "AGS transformed our outdated kitchen into a modern masterpiece. The quartz countertops are flawless, and the team was incredibly professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&fm=webp&fit=crop",
    date: "2 days ago",
    label: "Kitchen Remodel"
  },
  {
    name: "Michael Ross",
    location: "Alpharetta, GA",
    text: "Best prices in Atlanta hands down. I got quotes from 4 other places and AGS beat them all without sacrificing quality. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&fm=webp&fit=crop",
    date: "1 week ago",
    label: "Granite Install"
  },
  {
    name: "Emily Dao",
    location: "Johns Creek, GA",
    text: "Love my new vanity! They helped me pick the perfect marble slab. The installation was quick and clean. Will definitely use them again.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fm=webp&fit=crop",
    date: "3 weeks ago",
    label: "Bathroom Vanity"
  },
  {
    name: "David Thompson",
    location: "Roswell, GA",
    text: "The 3D templating was impressive. The fit was perfect against our uneven walls. True professionals who know their stone.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&fm=webp&fit=crop",
    date: "1 month ago",
    label: "Quartzite Countertops"
  },
  {
    name: "Jessica Alverez",
    location: "Suwanee, GA",
    text: "Fantastic selection of quartz. They installed everything in one day and left the place spotless. My kitchen looks twice as big now!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&fm=webp&fit=crop",
    date: "2 months ago",
    label: "Full Kitchen Reno"
  }
];

// Helper component for animated numbers
const Counter: React.FC<{ end: number; duration?: number; decimals?: number }> = ({ end, duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(progress * end);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count.toFixed(decimals)}</span>;
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden relative">
      
      {/* Dynamic Header Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left max-w-2xl">
                <h2 className="text-secondary font-bold tracking-widest uppercase mb-4 flex items-center justify-center md:justify-start gap-2">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                        alt="Google G Logo" 
                        className="w-5 h-5" 
                    />
                    Verified Reviews
                </h2>
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Atlanta's Favorite Fabricator</h3>
                <p className="text-gray-500 text-lg">
                    Real stories from homeowners in Duluth, Alpharetta, and beyond. We don't just build kitchens; we build relationships.
                </p>
            </div>

            {/* Live Stats Box */}
            <div className="flex gap-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform rotate-1 md:rotate-0 hover:rotate-0 transition-transform duration-300">
                <div className="text-center px-4 border-r border-gray-100">
                    <p className="text-4xl font-bold text-primary mb-1">
                        <Counter end={5.0} decimals={1} />
                    </p>
                    <div className="flex justify-center mb-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-[#FBBC05] text-[#FBBC05]" />)}
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Average Rating</p>
                </div>
                <div className="text-center px-4">
                    <p className="text-4xl font-bold text-primary mb-1">
                        <Counter end={128} />+
                    </p>
                    <p className="text-sm font-medium text-green-600 mb-1">100% Recommended</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Total Reviews</p>
                </div>
            </div>
        </div>
      </div>
      
      {/* 
        Marquee Wrapper - Styled to look like Google Maps cards
      */}
      <div className="relative w-full mb-20">
        {/* Fade gradients */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-6 animate-scroll group hover:[animation-play-state:paused] w-max px-4">
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div 
              key={i} 
              className="w-[320px] md:w-[380px] bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col hover:shadow-xl transition-all duration-300 relative shrink-0 select-none cursor-default"
            >
               {/* Header: User & Google Logo */}
               <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                      <img 
                        src={review.image} 
                        alt={`${review.name} - AGS Stones Customer`} 
                        className="w-10 h-10 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                          <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                          <p className="text-[10px] text-gray-500">{review.date}</p>
                      </div>
                  </div>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                    alt="Posted on Google" 
                    className="w-6 h-6 opacity-50" 
                  />
               </div>

               {/* Stars & Tag */}
               <div className="flex items-center justify-between mb-3">
                   <div className="flex text-[#FBBC05]">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={14} className="mr-0.5" />)}
                   </div>
                   <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium border border-gray-200">
                       {review.label}
                   </span>
               </div>

               {/* Text */}
               <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                 {review.text}
               </p>

               {/* Footer: Verified Badge */}
               <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-1.5 text-blue-600">
                  <CheckCircle2 size={14} className="fill-blue-50" />
                  <span className="text-xs font-semibold">Verified Customer</span>
                  <span className="text-[10px] text-gray-400 ml-auto">{review.location}</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        CTA SECTION 
      */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="text-center md:text-left relative z-10">
                <h4 className="text-3xl font-serif font-bold mb-2">Join 120+ Happy Neighbors</h4>
                <p className="text-gray-300 mb-6">Start your project with the team Atlanta trusts. No middlemen, just quality.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a 
                        href="#contact" 
                        className="bg-secondary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-yellow-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group whitespace-nowrap"
                    >
                        <span>Request Free Estimate</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <a 
                        href="tel:4049524534" 
                        onClick={(e) => {
                          e.preventDefault();
                          (window as any).gtag_report_conversion('tel:4049524534');
                        }}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-3 px-8 rounded-full border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Phone size={18} />
                        <span>(404) 952-4534</span>
                    </a>
                </div>
            </div>

            {/* Trust Badge Visual */}
            <div className="relative z-10 hidden md:block">
                 <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-secondary/20 animate-pulse">
                     <div className="text-center">
                         <span className="block text-3xl font-bold text-primary leading-none">A+</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Quality</span>
                     </div>
                 </div>
            </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
            100% Free Consultation. No Obligation. 5-Year Warranty on Installs.
        </p>
      </div>

    </section>
  );
};

export default Testimonials;