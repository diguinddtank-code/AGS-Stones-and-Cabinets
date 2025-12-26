import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

const reviews: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    location: "Duluth, GA",
    text: "AGS transformed our outdated kitchen into a modern masterpiece. The quartz countertops are flawless, and the team was incredibly professional.",
    rating: 5
  },
  {
    name: "Michael Ross",
    location: "Alpharetta, GA",
    text: "Best prices in Atlanta hands down. I got quotes from 4 other places and AGS beat them all without sacrificing quality. Highly recommend!",
    rating: 5
  },
  {
    name: "Emily Dao",
    location: "Johns Creek, GA",
    text: "Love my new vanity! They helped me pick the perfect marble slab. The installation was quick and clean.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-16">What Our Clients Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="flex text-secondary mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
              <p className="text-gray-700 italic mb-6 flex-grow">"{review.text}"</p>
              <div>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
