'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export interface ProjectImage {
  id: number;
  src: string;
  category: 'Kitchen' | 'Bathroom' | 'Cabinets' | 'Fireplace';
  title: string;
  alt: string;
}

export const projects: ProjectImage[] = [
  // Kitchen - Navy cabinets, white quartz waterfall island
  { id: 1, category: 'Kitchen', src: '/images/projects/kitchen-navy-cabinets-white-quartz-waterfall-island-atlanta.jpg', title: 'Navy Cabinets & Waterfall Island', alt: 'Navy blue kitchen cabinets with white quartz waterfall island countertop, Atlanta, GA' },
  { id: 2, category: 'Kitchen', src: '/images/projects/kitchen-island-white-quartz-waterfall-edge-atlanta.jpg', title: 'Waterfall Island Edge Detail', alt: 'White quartz waterfall edge on kitchen island with navy cabinets, Atlanta, GA' },
  { id: 3, category: 'Kitchen', src: '/images/projects/kitchen-stainless-sink-quartz-countertop-detail-atlanta.jpg', title: 'Undermount Sink Detail', alt: 'Stainless steel undermount sink set in white quartz island countertop, Atlanta, GA' },
  { id: 4, category: 'Kitchen', src: '/images/projects/kitchen-navy-cabinets-subway-tile-backsplash-range-atlanta.jpg', title: 'Navy Cabinets & Subway Tile', alt: 'Navy kitchen cabinets with subway tile backsplash and gas range, Atlanta, GA' },
  { id: 5, category: 'Kitchen', src: '/images/projects/kitchen-navy-cabinets-pendant-lighting-island-atlanta.jpg', title: 'Navy Kitchen with Pendant Lighting', alt: 'Navy blue kitchen cabinets and quartz island under pendant lighting, Atlanta, GA' },

  // Kitchen - Honey oak cabinets, black subway tile
  { id: 6, category: 'Kitchen', src: '/images/projects/kitchen-honey-oak-cabinets-black-subway-tile-backsplash-atlanta.jpg', title: 'Oak Cabinets & Black Subway Tile', alt: 'Honey oak kitchen cabinets with black subway tile backsplash and quartz countertops, Atlanta, GA' },
  { id: 7, category: 'Kitchen', src: '/images/projects/kitchen-quartz-countertop-stainless-sink-detail-atlanta.jpg', title: 'Quartz Countertop Sink Detail', alt: 'Stainless steel sink set in white quartz countertop with oak cabinets, Atlanta, GA' },
  { id: 8, category: 'Kitchen', src: '/images/projects/kitchen-oak-cabinets-double-wall-oven-gas-cooktop-atlanta.jpg', title: 'Oak Cabinets & Double Wall Oven', alt: 'Honey oak cabinets with stainless double wall oven and gas cooktop, Atlanta, GA' },
  { id: 9, category: 'Kitchen', src: '/images/projects/kitchen-oak-island-quartz-countertop-detail-atlanta.jpg', title: 'Oak Island Countertop Detail', alt: 'Quartz countertop detail on honey oak kitchen island, Atlanta, GA' },
  { id: 10, category: 'Kitchen', src: '/images/projects/kitchen-oak-cabinets-full-view-quartz-countertops-atlanta.jpg', title: 'Oak Kitchen Full View', alt: 'Full view of honey oak kitchen cabinets with quartz countertops, Atlanta, GA' },

  // Kitchen - White cabinets, dark hardwood
  { id: 11, category: 'Kitchen', src: '/images/projects/kitchen-white-cabinets-dark-hardwood-floor-full-view-atlanta.jpg', title: 'White Kitchen & Dark Hardwood', alt: 'White kitchen cabinets with quartz island over dark hardwood flooring, Atlanta, GA' },
  { id: 12, category: 'Kitchen', src: '/images/projects/kitchen-white-cabinets-island-quartz-countertop-atlanta.jpg', title: 'White Cabinets & Quartz Island', alt: 'White shaker kitchen cabinets with quartz-top island, Atlanta, GA' },
  { id: 13, category: 'Kitchen', src: '/images/projects/kitchen-white-cabinets-island-open-concept-living-room-atlanta.jpg', title: 'Open Concept Kitchen Island', alt: 'Quartz kitchen island in open concept living space with white cabinets, Atlanta, GA' },

  // Kitchen - Farmhouse in-progress, vaulted ceiling
  { id: 14, category: 'Kitchen', src: '/images/projects/kitchen-vaulted-ceiling-wood-beams-quartz-island-atlanta.jpg', title: 'Vaulted Ceiling Kitchen Remodel', alt: 'Kitchen remodel with wood beam vaulted ceiling and quartz island installation, Atlanta, GA' },
  { id: 15, category: 'Kitchen', src: '/images/projects/kitchen-gas-cooktop-stainless-hood-quartz-backsplash-atlanta.jpg', title: 'Gas Cooktop & Quartz Backsplash', alt: 'Gas cooktop with stainless steel range hood and quartz backsplash, Atlanta, GA' },

  // Kitchen - Black appliance white kitchen
  { id: 16, category: 'Kitchen', src: '/images/projects/kitchen-white-raised-panel-cabinets-black-appliances-atlanta.jpg', title: 'White Cabinets & Black Appliances', alt: 'White raised-panel kitchen cabinets with black appliances and quartz countertops, Atlanta, GA' },
  { id: 17, category: 'Kitchen', src: '/images/projects/kitchen-quartz-waterfall-island-black-fixtures-atlanta.jpg', title: 'Quartz Waterfall Island', alt: 'White quartz waterfall island with black faucet and undermount sink, Atlanta, GA' },
  { id: 18, category: 'Kitchen', src: '/images/projects/kitchen-open-concept-island-black-appliances-staircase-atlanta.jpg', title: 'Open Concept Kitchen with Staircase', alt: 'Quartz kitchen island open to staircase and living area, black appliances, Atlanta, GA' },
  { id: 19, category: 'Kitchen', src: '/images/projects/kitchen-white-cabinets-pendant-lighting-black-appliances-atlanta.jpg', title: 'White Kitchen with Pendant Lighting', alt: 'White kitchen cabinets under glass pendant lighting with black appliances, Atlanta, GA' },

  // Bathroom - Navy vanity
  { id: 20, category: 'Bathroom', src: '/images/projects/bathroom-navy-cabinets-white-quartz-double-vanity-atlanta.jpg', title: 'Navy Double Vanity', alt: 'Navy blue double vanity with white quartz countertop and framed mirror, Atlanta, GA' },
  { id: 21, category: 'Bathroom', src: '/images/projects/bathroom-white-quartz-undermount-sink-detail-atlanta.jpg', title: 'Quartz Vanity Sink Detail', alt: 'Undermount sink detail in white quartz bathroom vanity countertop, Atlanta, GA' },
  { id: 22, category: 'Bathroom', src: '/images/projects/bathroom-navy-vanity-sconce-lighting-atlanta.jpg', title: 'Navy Vanity with Sconce Lighting', alt: 'Navy blue bathroom vanity with white quartz counter under sconce lighting, Atlanta, GA' },
  { id: 23, category: 'Bathroom', src: '/images/projects/bathroom-black-granite-trough-sink-fabrication.jpg', title: 'Custom Black Granite Sink', alt: 'Custom trough sink fabricated from black leathered granite slab' },

  // Bathroom - Gray cabinets suite
  { id: 24, category: 'Bathroom', src: '/images/projects/bathroom-gray-cabinets-quartz-vanity-wood-tile-wall-atlanta.jpg', title: 'Gray Vanity & Wood-Look Tile', alt: 'Gray double vanity with quartz countertop and wood-look wall tile, Atlanta, GA' },
  { id: 25, category: 'Bathroom', src: '/images/projects/bathroom-kohler-undermount-sink-quartz-countertop-atlanta.jpg', title: 'Kohler Sink & Quartz Countertop', alt: 'Kohler undermount sink set in quartz bathroom vanity countertop, Atlanta, GA' },
  { id: 26, category: 'Bathroom', src: '/images/projects/bathroom-charcoal-marble-shower-rainfall-head-atlanta.jpg', title: 'Charcoal Marble Shower', alt: 'Walk-in shower with charcoal marble-look tile and rainfall shower head, Atlanta, GA' },
  { id: 27, category: 'Bathroom', src: '/images/projects/bathroom-built-in-bench-linen-tower-quartz-top-atlanta.jpg', title: 'Built-In Bench & Linen Tower', alt: 'Built-in shower bench with quartz top beside gray linen tower cabinet, Atlanta, GA' },
  { id: 28, category: 'Bathroom', src: '/images/projects/bathroom-custom-pull-out-laundry-hamper-cabinet-atlanta.jpg', title: 'Pull-Out Laundry Hamper Cabinet', alt: 'Custom pull-out laundry hamper drawers in bathroom vanity cabinetry, Atlanta, GA' },

  // Bathroom - Marble shower
  { id: 29, category: 'Bathroom', src: '/images/projects/bathroom-calacatta-marble-shower-lighted-niche-atlanta.jpg', title: 'Calacatta Marble Shower Niche', alt: 'Calacatta marble-look shower surround with lighted recessed niche, Atlanta, GA' },

  // Bathroom - Walnut + blue quartzite
  { id: 30, category: 'Bathroom', src: '/images/projects/bathroom-walnut-vanity-blue-quartzite-backsplash-atlanta.jpg', title: 'Walnut Vanity & Blue Quartzite', alt: 'Walnut double vanity with blue quartzite backsplash and backlit mirrors, Atlanta, GA' },
  { id: 31, category: 'Bathroom', src: '/images/projects/bathroom-blue-quartzite-countertop-sink-detail-atlanta.jpg', title: 'Blue Quartzite Countertop Detail', alt: 'Undermount sink detail in blue quartzite bathroom countertop, Atlanta, GA' },
  { id: 32, category: 'Bathroom', src: '/images/projects/bathroom-marble-basketweave-floor-tile-detail-atlanta.jpg', title: 'Basketweave Marble Floor Tile', alt: 'Basketweave marble mosaic floor tile beside walnut vanity legs, Atlanta, GA' },
  { id: 33, category: 'Bathroom', src: '/images/projects/bathroom-freestanding-tub-glass-shower-walnut-vanity-atlanta.jpg', title: 'Freestanding Tub & Walnut Vanity', alt: 'Freestanding soaking tub and glass shower beside walnut vanity, Atlanta, GA' },
  { id: 34, category: 'Bathroom', src: '/images/projects/bathroom-freestanding-tub-black-tile-surround-atlanta.jpg', title: 'Freestanding Tub & Black Tile', alt: 'Freestanding soaking tub with black tile surround and backlit niche, Atlanta, GA' },
  { id: 35, category: 'Bathroom', src: '/images/projects/bathroom-floating-toilet-black-tile-powder-room-atlanta.jpg', title: 'Black Tile Powder Room', alt: 'Wall-hung toilet in black tile powder room with backlit ledge, Atlanta, GA' },

  // Cabinets
  { id: 36, category: 'Cabinets', src: '/images/projects/cabinets-wet-bar-marble-backsplash-wine-storage-atlanta.jpg', title: 'Wet Bar & Marble Backsplash', alt: 'Custom wet bar cabinetry with marble backsplash, gold fixtures and wine storage, Atlanta, GA' },
  { id: 37, category: 'Cabinets', src: '/images/projects/cabinets-floating-shelves-wine-fridge-nook-atlanta.jpg', title: 'Floating Shelves & Wine Fridge', alt: 'Built-in cabinetry with floating wood shelves and dual-zone wine fridge, Atlanta, GA' },
  { id: 38, category: 'Cabinets', src: '/images/projects/cabinets-glass-front-hutch-built-in-atlanta.jpg', title: 'Glass-Front Built-In Hutch', alt: 'Custom glass-front hutch cabinetry with quartz countertop, Atlanta, GA' },

  // Fireplace
  { id: 39, category: 'Fireplace', src: '/images/projects/fireplace-black-granite-surround-white-mantle-atlanta.jpg', title: 'Black Granite Fireplace Surround', alt: 'Black granite fireplace surround and hearth with white mantle, Atlanta, GA' },
];

const categories = ['All', 'Kitchen', 'Bathroom', 'Cabinets', 'Fireplace'];

const ProjectsGallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-neutral-900 relative border-b border-neutral-800">
          {/* Dark Ambient Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] mix-blend-screen"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 md:gap-8 border-b border-neutral-800 pb-8">
              <div className="max-w-xl">
                <h2 className="text-secondary font-bold tracking-[0.2em] uppercase mb-3 text-xs md:text-sm flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-secondary"></span>
                  Our Work
                </h2>
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">Real Projects, Real Results</h1>
                <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                  Photos from kitchens, bathrooms, and cabinetry we&apos;ve fabricated and installed for
                  homeowners across Atlanta and Duluth, GA. No stock photos, just finished work.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-sm md:text-base font-medium transition-all duration-300 pb-1 relative group whitespace-nowrap ${
                      filter === cat ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {cat}
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-secondary transition-all duration-300 ${
                        filter === cat ? 'w-full' : 'w-0 group-hover:w-1/2'
                      }`}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            {/*
                LAYOUT LOGIC:
                Mobile: Flexbox with horizontal scroll (overflow-x-auto) + Snap
                Desktop: Grid (md:grid)
            */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedImage(project)}
                  className="group cursor-pointer relative min-w-[85vw] md:min-w-0 snap-center"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-800 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-neutral-700/50 group-hover:border-secondary/50">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>

                    <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-300">
                      <div className="translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block text-secondary text-[10px] font-bold uppercase tracking-widest mb-2 border border-secondary/30 px-2 py-0.5 rounded backdrop-blur-sm">
                          {project.category}
                        </span>
                        <h4 className="text-xl font-serif text-white font-medium">{project.title}</h4>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full text-white md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-[-10px] md:group-hover:translate-y-0">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="md:hidden flex items-center justify-center gap-2 mt-4 text-neutral-500 text-xs">
              Swipe to see more projects
            </div>
          </div>

          {/* Lightbox */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full z-50 hover:rotate-90 duration-300"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image"
              >
                <X size={24} className="md:w-8 md:h-8" />
              </button>

              <div
                className="relative w-full h-full max-w-4xl max-h-[85vh] animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="object-contain"
                  fill
                  sizes="90vw"
                />
                <div className="absolute -bottom-12 left-0 w-full text-center">
                  <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-white font-serif text-lg">{selectedImage.title}</h3>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsGallery;
