'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './Header';
import StickyCta from './StickyCta';
import Footer from './Footer';
import { ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react';
import { blogContent, BlogPost } from '../lib/blogData';

const categoryFilters = [
  'All Guides',
  'WikiHow & Care',
  'Edge & Design',
  'Stone Comparisons',
  'Installation Prep',
  'Cabinet Maintenance',
  'Cost & Budgets'
];

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState('All Guides');
  const [searchQuery, setSearchQuery] = useState('');

  const postsList: BlogPost[] = Object.values(blogContent);

  const filteredPosts = postsList.filter((post) => {
    const matchesCategory =
      activeCategory === 'All Guides' ||
      (activeCategory === 'WikiHow & Care' && (post.badgeType === 'wikihow' || post.category === 'Maintenance')) ||
      (activeCategory === 'Edge & Design' && post.category === 'Design & Styles') ||
      (activeCategory === 'Stone Comparisons' && post.category === 'Comparisons') ||
      (activeCategory === 'Installation Prep' && post.category === 'Installation Prep') ||
      (activeCategory === 'Cabinet Maintenance' && post.category === 'Cabinets') ||
      (activeCategory === 'Cost & Budgets' && post.category === 'Cost Guides');

    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.badge.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getBadgeStyle = (badgeType: BlogPost['badgeType']) => {
    switch (badgeType) {
      case 'wikihow':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'comparison':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-100';
      case 'maintenance':
        return 'bg-sky-50 text-sky-700 border border-sky-100';
      case 'guide':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      default:
        return 'bg-blue-50 text-blue-600 border border-blue-100';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#f8fafc]">
      <Header />

      <main className="flex-grow pt-28 md:pt-36 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14} className="text-blue-600" />
              WikiHow & Pro Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-5 leading-tight">
              Homeowner Guides & How-Tos
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
              Step-by-step illustrated guides, stone comparison breakdowns, and expert checklists 
              crafted by master fabricators in Metro Atlanta.
            </p>

            {/* Search Bar */}
            <div className="mt-8 relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search guides (e.g. clean granite, measure, quartz vs granite)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-gray-400 hover:text-gray-600 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid - WikiHow Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* WikiHow Illustrated Cover Image */}
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority={post.slug === 'how-to-clean-and-seal-granite-countertops'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  {/* Top Row: Badge & Date */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${getBadgeStyle(post.badgeType)}`}>
                      {post.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Bottom Row: Read Link */}
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-sm tracking-wide transition-all group-hover:gap-2.5"
                    >
                      Read Article <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 max-w-xl mx-auto p-8 shadow-sm">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-serif text-primary font-bold mb-2">No matching guides found</h3>
              <p className="text-gray-500 text-sm mb-6">
                Try searching for something else like &quot;granite&quot;, &quot;quartz&quot;, &quot;clean&quot;, or &quot;measure&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Guides');
                }}
                className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom Callout: Real Projects Gallery */}
          <div className="mt-20 bg-gradient-to-r from-primary to-[#1e293b] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 block">
                Looking for Completed Transformations?
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium mb-3">
                Explore Our Real Project Photo Gallery
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                See real kitchens, bathrooms, and custom cabinets installed by AGS Stones in Duluth, Alpharetta, Buckhead, and across Metro Atlanta.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-secondary text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-lg hover:shadow-2xl flex-shrink-0"
            >
              View Finished Projects <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
      <StickyCta />
    </div>
  );
}
