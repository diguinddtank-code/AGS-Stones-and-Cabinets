import React from 'react';
import { Layers, Box, Hammer, Droplet, ChefHat, Grid, Bath } from 'lucide-react';

export interface ServiceDetail {
  icon: React.ReactNode;
  title: string;
  slug: string;
  shortDesc: string;
  image: string;
  longDesc: string;
  features: string[];
  keywords: string[];
}

export const services: ServiceDetail[] = [
  {
    icon: <Layers size={24} />,
    title: "Granite & Quartz Countertops",
    slug: "countertops",
    shortDesc: "Factory-direct fabrication of premium stone surfaces.",
    image: "https://dam.thdstatic.com/content/production/3sJNZBkk31xe9nTrYrToTw/Y6t8wIWPcudCaKjiS8Z74g/Original%20file/quartz-vs-granite-countertops-section-6.jpg", 
    longDesc: "As Atlanta's premier stone fabricator, we import slabs directly to save you money. Whether you want the natural beauty of Granite or the zero-maintenance appeal of Quartz, we precision-cut everything in our Duluth facility using laser templating.",
    features: ["Factory Direct Pricing (No Middlemen)", "Laser Templating Precision", "In-House Fabrication", "15-Year Stain Protection"],
    keywords: ["granite countertops atlanta", "quartz installers duluth", "marble fabricator near me"]
  },
  {
    icon: <Box size={24} />,
    title: "Custom Kitchen Cabinets",
    slug: "cabinets",
    shortDesc: "Solid wood cabinetry tailored to your space.",
    image: "https://21stcenturycd.com/wp-content/uploads/2025/02/Aspen-kitchen-2-1.webp",
    longDesc: "Don't settle for big-box store quality. Our custom and semi-custom kitchen cabinets feature solid wood construction, dovetail drawers, and soft-close hardware. We design layouts that maximize storage and workflow.",
    features: ["Solid Wood & Plywood (No Particle Board)", "Soft-Close Hinges & Slides", "3D Kitchen Design Service", "Custom Colors & Finishes"],
    keywords: ["custom cabinets atlanta", "kitchen cabinet replacement", "shaker style cabinets"]
  },
  {
    icon: <ChefHat size={24} />,
    title: "Full Kitchen Remodeling",
    slug: "kitchen-remodeling",
    shortDesc: "Complete turnkey renovation from demo to done.",
    image: "https://hamishmurray.com/wp-content/uploads/2021/06/shutterstock_1315328237-1.jpeg",
    longDesc: "We handle your entire kitchen renovation project. From demolition and disposal to plumbing, electrical, and backsplash installation. Get a chef-worthy kitchen in weeks, not months.",
    features: ["Project Management (A-Z)", "Demolition & Haul Away", "Plumbing & Electrical Prep", "Backsplash & Lighting Installation"],
    keywords: ["kitchen remodel contractors", "turnkey kitchen renovation", "kitchen design atlanta"]
  },
  {
    icon: <Bath size={24} />,
    title: "Bathroom Renovations",
    slug: "bathroom-remodeling",
    shortDesc: "Spa-like master bath retreats and vanities.",
    image: "https://www.dfwimproved.com/wp-content/uploads/2021/12/How-to-plan-a-bathroom-remodel-scaled.jpg",
    longDesc: "Upgrade your master bathroom or powder room. We specialize in walk-in shower conversions, freestanding tub installations, and custom double vanities with stone tops.",
    features: ["Shower Conversions", "Freestanding Tub Install", "Custom Tile Work", "Double Vanity Fabrication"],
    keywords: ["bathroom remodel alpharetta", "master bath renovation", "custom shower installers"]
  },
  {
    icon: <Droplet size={24} />,
    title: "Vanity Tops & Remnants",
    slug: "vanity-tops",
    shortDesc: "Affordable stone upgrades for smaller spaces.",
    image: "https://images.squarespace-cdn.com/content/v1/5fa9e7629998b469eb3ba0f7/53e67296-7237-4d9c-bf9a-deeb86d0f740/5929239-1.jpg",
    longDesc: "Looking for a budget-friendly upgrade? Visit our 'Bone Yard' in Duluth to pick from hundreds of high-quality stone remnants perfect for bathroom vanities, laundry rooms, and fireplaces.",
    features: ["Discounted Stone Remnants", "Quick Turnaround", "Perfect for Small Projects", "Undermount Sink Included"],
    keywords: ["bathroom vanity tops", "cheap granite remnants", "quartz vanity top"]
  },
  {
    icon: <Hammer size={24} />,
    title: "Outdoor Kitchens",
    slug: "outdoor-kitchens",
    shortDesc: "Durable granite for your patio or BBQ station.",
    image: "https://rtaoutdoorliving.com/wp-content/uploads/2022/07/mike-pyles-u-shaped-outdoor-kitchen-with-pizza-oven-refrigerator-and-two-grills.png",
    longDesc: "Take the party outside. We fabricate UV-resistant stone countertops like Granite and Dekton that withstand Georgia summers. Perfect for BBQ islands and patio bars.",
    features: ["UV & Weather Resistant Stone", "Built-in Grill Cutouts", "Outdoor Bar Tops", "Leathered & Honed Finishes"],
    keywords: ["outdoor kitchen builder", "granite bbq countertops", "patio kitchen design"]
  },
  {
    icon: <Grid size={24} />,
    title: "Backsplash & Tile",
    slug: "backsplash-tile",
    shortDesc: "Expert installation of subway, mosaic, and floor tile.",
    image: "https://howtonestforless.com/wp-content/uploads/2014/10/kitchen-backsplash-tutorial.jpg",
    longDesc: "Complete the look with professional tile installation. Whether you want a classic subway tile backsplash or a complex herringbone floor pattern, our tile setters deliver perfection.",
    features: ["Kitchen Backsplash", "Shower Walls & Floors", "Large Format Porcelain", "Custom Mosaics"],
    keywords: ["backsplash installers", "kitchen tile installation", "tile contractors duluth"]
  }
];
