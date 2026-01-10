import React from 'react';
import { Star, Quote, Phone, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

const reviews: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    location: "Duluth, GA",
    text: "AGS transformed our outdated kitchen into a modern masterpiece. The quartz countertops are flawless, and the team was incredibly professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&fm=webp&fit=crop"
  },
  {
    name: "Michael Ross",
    location: "Alpharetta, GA",
    text: "Best prices in Atlanta hands down. I got quotes from 4 other places and AGS beat them all without sacrificing quality. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&fm=webp&fit=crop"
  },
  {
    name: "Emily Dao",
    location: "Johns Creek, GA",
    text: "Love my new vanity! They helped me pick the perfect marble slab. The installation was quick and clean.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fm=webp&fit=crop"
  },
  {
    name: "David Thompson",
    location: "Roswell, GA",
    text: "The 3D templating was impressive. The fit was perfect against our uneven walls. True professionals.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&fm=webp&fit=crop"
  },
  {
    name: "Jessica Alverez",
    location: "Suwanee, GA",
    text: "Fantastic selection of quartz. They installed everything in one day and left the place spotless.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&fm=webp&fit=crop"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-secondary font-bold tracking-widest uppercase mb-4">Social Proof</h2>
        <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Trusted by Georgia Homeowners</h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We pride ourselves on 5-star service. Here is what our neighbors in Metro Atlanta are saying.
        </p>
      </div>
      
      {/* 
        Infinite Marquee Wrapper 
        - We duplicate the reviews array to ensure seamless looping
        - 'group-hover:paused' allows users to stop and read
      */}
      <div className="relative w-full mb-16">
        {/* Left fade */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        {/* Right fade */}
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-6 animate-scroll group hover:[animation-play-state:paused] w-max px-4">
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div 
              key={i} 
              className="w-[300px] md:w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group/card shrink-0"
            >
               {/* Quote Icon */}
               <div className="absolute top-6 right-6 text-gray-100 group-hover/card:text-secondary/10 transition-colors">
                  <Quote size={40} fill="currentColor" />
               </div>

               {/* Rating */}
               <div className="flex text-secondary mb-4 relative z-10">
                {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={16} className="mr-0.5" />)}
               </div>

               {/* Text */}
               <p className="text-gray-700 italic mb-6 leading-relaxed relative z-10 text-sm md:text-base flex-grow">
                 "{review.text}"
               </p>

               {/* Profile */}
               <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-4">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                       {review.location}
                    </p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        NEW CTA SECTION 
        Placed directly below testimonials to convert interest into action
      */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <h4 className="text-2xl font-serif font-bold text-primary mb-2">Ready to start your project?</h4>
                <p className="text-gray-500">Join hundreds of happy customers in Atlanta today.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <a 
                    href="#contact" 
                    className="w-full sm:w-auto bg-secondary hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group whitespace-nowrap"
                >
                    <span>Request Free Estimate</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a 
                    href="tel:4049524534" 
                    className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary font-bold py-4 px-8 rounded-full border border-gray-200 hover:border-secondary transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <Phone size={20} className="text-secondary" />
                    <span>Get Fast Quote</span>
                </a>
            </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6 animate-pulse">
            No obligation. 100% Free Consultation.
        </p>
      </div>

    </section>
  );
};

export default Testimonials;