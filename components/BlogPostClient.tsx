'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import StickyCta from './StickyCta';
import Footer from './Footer';
import {
  ChevronRight,
  Clock,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Phone,
  HelpCircle,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { blogContent } from '../lib/blogData';

const metroCities = [
  { name: 'Duluth, GA', slug: 'countertops-duluth-ga' },
  { name: 'Alpharetta, GA', slug: 'countertops-alpharetta-ga' },
  { name: 'Roswell, GA', slug: 'countertops-roswell-ga' },
  { name: 'Atlanta, GA', slug: 'countertops-atlanta-ga' },
  { name: 'Johns Creek, GA', slug: 'countertops-johns-creek-ga' },
  { name: 'Suwanee, GA', slug: 'countertops-suwanee-ga' },
  { name: 'Marietta, GA', slug: 'countertops-marietta-ga' },
  { name: 'Sandy Springs, GA', slug: 'countertops-sandy-springs-ga' },
  { name: 'Buckhead, GA', slug: 'countertops-buckhead-ga' },
];

const coreServices = [
  { name: 'Granite & Quartz Countertops', slug: 'countertops' },
  { name: 'Custom Kitchen Cabinets', slug: 'cabinets' },
  { name: 'Full Kitchen Remodeling', slug: 'kitchen-remodeling' },
  { name: 'Bathroom Renovations', slug: 'bathroom-remodeling' },
  { name: 'Outdoor BBQ Kitchens', slug: 'outdoor-kitchens' },
  { name: 'Backsplash & Tile Work', slug: 'backsplash-tile' },
];

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col font-sans relative bg-gray-50">
        <Header />
        <main className="flex-grow pt-36 pb-20 flex items-center justify-center">
          <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-200 max-w-md mx-auto">
            <h1 className="text-3xl font-serif text-primary mb-3">Guide Not Found</h1>
            <p className="text-gray-500 text-sm mb-6">The article you are looking for may have been moved or updated.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Return to All Guides
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related guides (other than the current one)
  const relatedPosts = Object.values(blogContent)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const otherGuides = Object.values(blogContent)
    .filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#f8fafc]">
      <Header />

      <main className="flex-grow pt-28 md:pt-36 pb-24">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          {/* 1. Breadcrumbs Trail */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-medium">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-gray-400" />
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog & Guides
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-gray-400" />
              </li>
              <li className="text-gray-800 font-semibold truncate max-w-[260px] sm:max-w-md">
                {post.title}
              </li>
            </ol>
          </nav>
          
          {/* 2. Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                {post.badge}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Calendar size={13} /> Published: {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author / EEAT Trust Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-secondary text-white font-serif font-bold flex items-center justify-center text-base shadow-sm">
                  AGS
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 m-0">
                    Written & Reviewed by AGS Stones Craftsmen <CheckCircle2 size={15} className="text-blue-600 inline" />
                  </p>
                  <p className="text-xs text-gray-500 m-0">
                    Master Stone Fabricators & Licensed Cabinet Contractors • Duluth, GA
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5 text-xs text-gray-600 font-medium">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck size={16} /> Factory-Direct
                </span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1 text-blue-700 font-semibold">
                  <Award size={16} /> 5.0 Star Rated
                </span>
              </div>
            </div>
          </header>

          {/* 3. Featured WikiHow Illustrated Cover Image */}
          <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-8 shadow-xl border border-gray-200/90 relative bg-gray-100">
            <Image 
              src={post.image} 
              alt={post.alt} 
              className="w-full h-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
            <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Sparkles size={12} className="text-secondary" /> AGS Master Guide Illustrated Tutorial
            </div>
          </div>

          {/* 4. Key Takeaways Box (Featured Snippet Optimization) */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50/90 to-yellow-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-amber-600" />
                <h2 className="text-lg sm:text-xl font-serif font-bold text-amber-950 m-0">
                  Key Takeaways: Quick Summary
                </h2>
              </div>
              <ul className="space-y-3 m-0 p-0 list-none">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-amber-950 leading-relaxed font-normal">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs mt-0.5 shadow-sm">
                      ✓
                    </span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Main Article Body */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-200/80 shadow-sm mb-12">
            <div className="prose prose-base sm:prose-lg max-w-none text-gray-700">
              {post.content}
            </div>
          </div>

          {/* 6. Serving Greater Atlanta & Gwinnett County Hub */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-12">
            <div className="flex items-center gap-2.5 mb-3">
              <MapPin size={20} className="text-secondary" />
              <h3 className="text-xl font-serif font-bold text-primary m-0">
                Serving the Greater Metro Atlanta Community
              </h3>
            </div>
            <p className="text-sm text-gray-600 font-light mb-6 leading-relaxed">
              AGS Stones & Cabinets provides factory-direct fabrication, laser templating, and professional stone installation across all surrounding Georgia neighborhoods:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {metroCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="text-xs font-semibold px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                >
                  ✦ {city.name}
                </Link>
              ))}
            </div>
          </section>

          {/* 7. Frequently Asked Questions (FAQ Accordion + Schema.org FAQPage) */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm mb-12">
              <div className="flex items-center gap-2.5 mb-2">
                <HelpCircle size={22} className="text-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                  Frequently Asked Questions
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6">
                Common Questions from Homeowners
              </h2>

              <div className="space-y-4">
                {post.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-gray-200 rounded-2xl p-5 open:bg-gray-50/70 transition-all duration-200 cursor-pointer"
                  >
                    <summary className="list-none flex items-center justify-between gap-4 font-serif text-lg font-bold text-primary select-none">
                      <span>{faq.q}</span>
                      <span className="flex-shrink-0 text-secondary text-2xl font-light group-open:rotate-45 transition-transform duration-200">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed font-light m-0 pt-2 border-t border-gray-200/60">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* 8. High-Impact Conversion CTA Box */}
          <section className="bg-primary text-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#ca8a04_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl">
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] block mb-2">
                Buy Direct & Save 20% to 30%
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold mb-4 leading-tight">
                Ready to Experience the AGS Stones Difference?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light mb-8 leading-relaxed">
                Skip the retail middlemen. Visit our Duluth showroom to hand-select your exact full-size stone slabs, or schedule a free in-home digital laser templating estimate.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Free In-Home Estimate <ArrowRight size={16} />
                </Link>
                <a
                  href="tel:4049524534"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-full transition-colors"
                >
                  <Phone size={15} className="text-secondary" /> (404) 952-4534
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-secondary" /> 4579 Abbotts Bridge Rd Suite -10, Duluth, GA
                </span>
                <span>•</span>
                <span>Mon–Fri: 8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </section>

          {/* 9. Internal Linking Engine: Explore Related Services & Locations */}
          <section className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm mb-14">
            <div className="border-b border-gray-100 pb-5 mb-8">
              <span className="text-secondary text-xs font-bold uppercase tracking-widest block mb-1">
                Internal Resource Hub
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary m-0">
                Explore Related Services & Local Guides
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1: Core Services */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <Layers size={14} className="text-secondary" /> Core Fabrication Services
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {coreServices.map((srv) => (
                    <li key={srv.slug}>
                      <Link
                        href={`/services/${srv.slug}`}
                        className="text-gray-600 hover:text-primary hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                      >
                        <span className="text-secondary text-xs">→</span> {srv.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/projects"
                      className="text-secondary font-bold hover:underline inline-flex items-center gap-1.5 pt-2"
                    >
                      ✦ Real Completed Projects Gallery
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Local City Pages */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <MapPin size={14} className="text-secondary" /> Local Service Hubs
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {metroCities.slice(0, 7).map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/${city.slug}`}
                        className="text-gray-600 hover:text-primary hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                      >
                        <span className="text-secondary text-xs">→</span> {city.name} Countertops
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Recommended Remodeling Guides */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-secondary" /> Remodeling Guides
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {otherGuides.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={`/blog/${guide.slug}`}
                        className="text-gray-600 hover:text-primary hover:translate-x-1 inline-flex items-center gap-1.5 transition-all line-clamp-1"
                        title={guide.title}
                      >
                        <span className="text-secondary text-xs">→</span> {guide.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/blog"
                      className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1.5 pt-2"
                    >
                      ✦ Return to All Guides & How-Tos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 10. Related Guides Cards (WikiHow Style) */}
          <section className="border-t border-gray-200/80 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary">Related How-To Guides</h3>
                <p className="text-sm text-gray-500 font-light">Continue learning with more step-by-step homeowner tutorials</p>
              </div>
              <Link href="/blog" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={related.image}
                      alt={related.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-2">
                      {related.badge}
                    </span>
                    <h4 className="font-serif font-bold text-gray-900 group-hover:text-primary transition-colors text-base mb-3 leading-snug line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed font-light">
                      {related.excerpt}
                    </p>
                    <span className="text-xs text-blue-600 font-bold mt-auto flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Guide <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </article>
      </main>

      <Footer />
      <StickyCta />
    </div>
  );
}
