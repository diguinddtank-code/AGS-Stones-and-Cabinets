import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from './ProjectsGallery';

// A curated snapshot spanning all categories (Kitchen, Bathroom, Cabinets, Fireplace)
const featuredIds = [1, 30, 6, 26, 16, 36, 39, 20];
const featured = featuredIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

const ProjectsShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative z-30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase mb-4">Our Work</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-6">Real Projects We&apos;ve Built</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kitchens, bathrooms, and custom cabinetry we&apos;ve fabricated and installed for homeowners
            across Atlanta and Duluth, GA. No stock photos, just finished work.
          </p>
        </div>

        {/* Photo Grid */}
        <Link href="/projects" className="block group/grid">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
            {featured.map((project) => (
              <div
                key={project.id}
                className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-md"
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/grid:scale-105"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover/grid:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-2 left-2 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover/grid:opacity-100 transition-opacity duration-300">
                  {project.category}
                </span>
              </div>
            ))}
          </div>
        </Link>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-primary hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:-translate-y-1"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
