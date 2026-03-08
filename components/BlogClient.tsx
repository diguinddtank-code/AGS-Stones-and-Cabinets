'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Header from './Header';
import MobileBottomNav from './MobileBottomNav';
import StickyCta from './StickyCta';
import Footer from './Footer';
import { MapPin, Calendar, ArrowRight, Box, Ruler, X } from 'lucide-react';

const filters = ['All', 'Alpharetta', 'Duluth', 'Roswell', 'Marietta', 'Johns Creek', 'Suwanee', 'Atlanta'];

const projects = [
  {
    id: 1,
    location: 'Alpharetta, GA',
    city: 'Alpharetta',
    date: 'February 2024',
    category: 'Kitchen Remodel',
    title: 'Luxury Calacatta Quartz Kitchen',
    material: 'Calacatta Laza Quartz',
    scope: '65 Sq. Ft. + Waterfall',
    description: 'Complete kitchen transformation featuring a stunning waterfall island. We removed the old dark granite and installed bright, vein-matched Calacatta quartz to modernize the space.',
    tags: ['#QuartzCountertops', '#WaterfallIsland', '#KitchenDesign'],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80'
  },
  {
    id: 2,
    location: 'Duluth, GA',
    city: 'Duluth',
    date: 'January 2024',
    category: 'Cabinet & Stone',
    title: 'Classic White Shaker & Granite',
    material: 'Dallas White Granite',
    scope: '45 Sq. Ft. + Cabinets',
    description: 'A beautiful pairing of our custom white shaker cabinets with durable Dallas White granite. Included a custom undermount sink cutout and full backsplash installation.',
    tags: ['#WhiteCabinets', '#Granite', '#DuluthHomes'],
    image: 'https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg'
  },
  {
    id: 3,
    location: 'Roswell, GA',
    city: 'Roswell',
    date: 'December 2023',
    category: 'Outdoor Kitchen',
    title: 'Modern Outdoor BBQ Island',
    material: 'Absolute Black Granite',
    scope: '35 Sq. Ft. (Honed)',
    description: 'Designed for outdoor entertaining. We used honed Absolute Black granite for its weather resistance and sleek matte finish, perfectly complementing the brick base.',
    tags: ['#OutdoorKitchen', '#BlackGranite', '#PatioDesign'],
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80'
  },
  {
    id: 4,
    location: 'Marietta, GA',
    city: 'Marietta',
    date: 'November 2023',
    category: 'Bathroom Vanity',
    title: 'Master Bath Marble Oasis',
    material: 'Carrara White Marble',
    scope: '22 Sq. Ft. Double Vanity',
    description: 'Elevated this master bathroom with premium Carrara marble. Features dual undermount sinks and a custom 4-inch backsplash for a timeless, elegant look.',
    tags: ['#MarbleVanity', '#BathroomRemodel', '#Carrara'],
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80'
  },
  {
    id: 5,
    location: 'Johns Creek, GA',
    city: 'Johns Creek',
    date: 'October 2023',
    category: 'Full Kitchen',
    title: 'Taj Mahal Quartzite Upgrade',
    material: 'Taj Mahal Quartzite',
    scope: '85 Sq. Ft.',
    description: 'Replaced outdated countertops with luxurious Taj Mahal Quartzite. Known for its marble-like appearance but granite-like durability, it completely brightened the room.',
    tags: ['#Quartzite', '#LuxuryKitchen', '#JohnsCreek'],
    image: 'https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png'
  },
  {
    id: 6,
    location: 'Suwanee, GA',
    city: 'Suwanee',
    date: 'September 2023',
    category: 'Kitchen Island',
    title: 'Oversized Entertainment Island',
    material: 'Cambria Brittanicca',
    scope: '50 Sq. Ft. Island Only',
    description: 'Created a massive seamless island using premium Cambria quartz. The bold veining serves as the centerpiece of this open-concept Suwanee home.',
    tags: ['#CambriaQuartz', '#KitchenIsland', '#StatementStone'],
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80'
  },
  {
    id: 7,
    location: 'Atlanta, GA',
    city: 'Atlanta',
    date: 'August 2023',
    category: 'Commercial',
    title: 'Boutique Hotel Bar Top',
    material: 'Black Galaxy Granite',
    scope: '120 Linear Ft.',
    description: 'Commercial installation for a downtown Atlanta hotel. Black Galaxy granite was chosen for its striking copper flecks and extreme durability in high-traffic areas.',
    tags: ['#CommercialGranite', '#BarTop', '#AtlantaBusiness'],
    image: 'https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?w=800&q=80'
  },
  {
    id: 8,
    location: 'Alpharetta, GA',
    city: 'Alpharetta',
    date: 'July 2023',
    category: 'Kitchen Remodel',
    title: 'Modern Farmhouse Kitchen',
    material: 'Silestone Calacatta Gold',
    scope: '75 Sq. Ft.',
    description: 'Paired navy blue lower cabinets with crisp white quartz countertops. The subtle gold veining in the stone ties perfectly with the brass hardware.',
    tags: ['#FarmhouseKitchen', '#Silestone', '#TwoToneCabinets'],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'
  },
  {
    id: 9,
    location: 'Duluth, GA',
    city: 'Duluth',
    date: 'June 2023',
    category: 'Bathroom Remodel',
    title: 'Spa-Like Master Retreat',
    material: 'Fantasy Brown Marble',
    scope: '30 Sq. Ft. + Shower Seat',
    description: 'Utilized Fantasy Brown (a hard marble/quartzite) for the dual vanity and matching custom shower bench. The flowing pattern creates a calming, spa-like atmosphere.',
    tags: ['#FantasyBrown', '#SpaBathroom', '#CustomStone'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'
  },
  {
    id: 10,
    location: 'Roswell, GA',
    city: 'Roswell',
    date: 'May 2023',
    category: 'Kitchen Update',
    title: 'Sleek Minimalist Kitchen',
    material: 'Pure White Quartz',
    scope: '40 Sq. Ft.',
    description: 'A minimalist dream. We installed ultra-clean Pure White quartz with a modern eased edge profile to complement the handleless European-style cabinetry.',
    tags: ['#MinimalistDesign', '#WhiteQuartz', '#ModernKitchen'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  }
];

function BlogClient() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.city === activeFilter);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative bg-gray-50">
      <Header />

      <main className="flex-grow pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6 leading-tight">
              Our Work in Your Neighborhood
            </h1>
            <p className="text-lg text-gray-600">
              Real results from recent months. Browse our portfolio of "stone countertops" and "custom cabinets" completed across Metro Atlanta.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeFilter === filter 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article key={project.id} className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                    <MapPin size={12} className="text-secondary" /> {project.location}
                  </div>
                  {/* Date Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-sm">
                    <Calendar size={12} className="text-secondary" /> {project.date}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-2">
                    {project.category}
                  </p>
                  <h2 
                    className="text-2xl font-serif font-bold text-primary mb-5 leading-snug cursor-pointer hover:text-secondary transition-colors"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h2>
                  
                  {/* Material & Scope Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1.5 mb-1">
                        <Box size={12} /> Material
                      </div>
                      <div className="text-sm font-semibold text-primary">{project.material}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1.5 mb-1">
                        <Ruler size={12} /> Scope
                      </div>
                      <div className="text-sm font-semibold text-primary">{project.scope}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[11px] text-gray-500 border border-gray-200 px-2.5 py-1 rounded-md bg-white">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a href="tel:4049524534" className="w-full bg-primary hover:bg-gray-800 text-white text-xs font-bold py-4 rounded-xl flex items-center justify-between px-6 transition-colors uppercase tracking-wider mt-auto">
                    Replicate This Project <ArrowRight size={16} className="text-secondary" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No projects found for this location yet. Check back soon!</p>
            </div>
          )}

        </div>
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-modal-enter">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md transition-colors"
            >
              <X size={20} />
            </button>
            
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <Image 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                <MapPin size={14} className="text-secondary" /> {selectedProject.location}
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto">
              <p className="text-secondary text-xs font-bold tracking-widest uppercase mb-2">
                {selectedProject.category} • {selectedProject.date}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 leading-tight">
                {selectedProject.title}
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1.5 mb-1">
                    <Box size={14} /> Material
                  </div>
                  <div className="text-base font-semibold text-primary">{selectedProject.material}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1.5 mb-1">
                    <Ruler size={14} /> Scope
                  </div>
                  <div className="text-base font-semibold text-primary">{selectedProject.scope}</div>
                </div>
              </div>

              <div className="prose prose-sm md:prose-base text-gray-600 mb-8">
                <p>{selectedProject.description}</p>
                <p><strong>Project Highlights:</strong></p>
                <ul>
                  <li>Custom fabrication and precision templating</li>
                  <li>Premium edge profiling</li>
                  <li>Professional installation by our in-house team</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-md bg-white">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <a href="tel:4049524534" className="w-full bg-primary hover:bg-gray-800 text-white text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Replicate This Project <ArrowRight size={18} className="text-secondary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <MobileBottomNav />
      <StickyCta />
    </div>
  );
}

export default BlogClient;
