// Customer reviews shown in the ReviewsMarquee and service pages.
// Same reviews already published in components/Testimonials.tsx.
// `services` lists the /services/[slug] pages each review is relevant to.

export interface Review {
  name: string;
  location: string;
  text: string;
  rating: number;
  label: string;
  services: string[];
}

export const reviews: Review[] = [
  {
    name: "Sarah J.",
    location: "Duluth, GA",
    text: "AGS transformed our outdated kitchen into a modern masterpiece. The quartz countertops are flawless, and the team was incredibly professional.",
    rating: 5,
    label: "Kitchen Remodel",
    services: ["countertops", "kitchen-remodeling", "cabinets"]
  },
  {
    name: "Michael R.",
    location: "Alpharetta, GA",
    text: "Best prices in Atlanta hands down. I got quotes from 4 other places and AGS beat them all without sacrificing quality. Highly recommend!",
    rating: 5,
    label: "Granite Install",
    services: ["countertops", "outdoor-kitchens"]
  },
  {
    name: "Emily D.",
    location: "Johns Creek, GA",
    text: "Love my new vanity! They helped me pick the perfect marble slab. The installation was quick and clean. Will definitely use them again.",
    rating: 5,
    label: "Bathroom Vanity",
    services: ["vanity-tops", "bathroom-remodeling"]
  },
  {
    name: "David T.",
    location: "Roswell, GA",
    text: "The 3D templating was impressive. The fit was perfect against our uneven walls. True professionals who know their stone.",
    rating: 5,
    label: "Quartzite Countertops",
    services: ["countertops", "backsplash-tile"]
  },
  {
    name: "Jessica A.",
    location: "Suwanee, GA",
    text: "Fantastic selection of quartz. They installed everything in one day and left the place spotless. My kitchen looks twice as big now!",
    rating: 5,
    label: "Full Kitchen Reno",
    services: ["kitchen-remodeling", "cabinets", "countertops"]
  }
];

/** Reviews for a service: matching ones first, then the rest, capped at `count`. */
export function reviewsForService(slug: string, count = 3): Review[] {
  const matching = reviews.filter(r => r.services.includes(slug));
  const others = reviews.filter(r => !r.services.includes(slug));
  return [...matching, ...others].slice(0, count);
}
