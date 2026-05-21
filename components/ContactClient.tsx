'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import ContactForm from './ContactForm';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Gem } from 'lucide-react';

import LocalSEOSection from './LocalSEOSection';

const locations = [
  'Alpharetta',
  'Johns Creek',
  'Sandy Springs',
  'Buckhead',
  'Roswell',
  'Atlanta',
  'Duluth',
  'Suwanee',
  'Marietta'
];

const ContactClient = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <section className="relative px-4 pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
              alt="Contact AGS Stones & Cabinets"
              className="w-full h-full object-cover object-center"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[#090909]/80 z-10"></div>
          
          <div className="container mx-auto max-w-7xl relative z-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              {/* Copy & Value Proposition */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Factory-Direct Quotes
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-white mb-6 leading-[1.1] tracking-tight">
                  Let's Discuss Your <span className="italic font-light text-secondary">Vision.</span>
                </h1>
                
                <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-lg">
                  Skip the retail middlemen. Talk directly to the Duluth fabricators and master carpenters who will build and install your custom kitchen or bath.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center text-sm font-medium">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs uppercase tracking-wider mb-0.5">Call Direct</span>
                      <a href="tel:4049524534" className="text-lg hover:text-secondary transition-colors">(404) 952-4534</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs uppercase tracking-wider mb-0.5">Email Plans</span>
                      <a href="mailto:agsstonesandcabinets@gmail.com" className="hover:text-secondary transition-colors">agsstonesandcabinets@gmail.com</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-secondary/10 rounded-[2rem] blur-2xl"></div>
                <div className="relative bg-white border border-gray-100 p-8 sm:p-12 rounded-[2rem] shadow-2xl">
                  <h3 className="text-2xl font-serif font-medium text-primary mb-2">Request an Estimate</h3>
                  <p className="text-gray-500 text-sm font-light mb-8">Tell us about your project space and materials, and our design team will reach out with pricing.</p>
                  
                  <ContactForm theme="light" />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Studio Info & Local SEO Details */}
        <section className="py-24 bg-white relative border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-12 gap-16 items-start">
              
              {/* Showroom details */}
              <div className="md:col-span-5 space-y-12">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-secondary text-secondary"></span> The Showroom
                  </h2>
                  <h3 className="text-3xl font-serif text-primary mb-6">Visit Our Duluth Facility</h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    Feel the actual weight, texture, and edge profiles of our premium quartz, granite, and quartzite selections. See our solid-wood European cabinetry displays in person.
                  </p>
                  
                  <div className="grid gap-6">
                    <div className="flex gap-4">
                      <MapPin className="text-secondary shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-primary font-medium mb-1">AGS Stones & Cabinets HQ</h4>
                        <p className="text-gray-500 text-sm font-light mb-2">4579 Abbotts Bridge Rd Suite -10<br/>Duluth, GA 30097</p>
                        <a 
                          href="https://maps.google.com/?q=AGS+STONES+%26+CABINETS,+4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097,+United+States" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-widest text-secondary hover:text-primary border-b border-secondary hover:border-primary transition-all pb-0.5 inline-flex items-center gap-1"
                        >
                          Open in Google Maps <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Clock className="text-secondary shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-primary font-medium mb-1">Operating Hours</h4>
                        <div className="text-gray-500 text-sm font-light space-y-1.5">
                          <p className="flex justify-between w-48 border-b border-gray-100 pb-1"><span>Mon-Fri:</span> <span className="text-primary">9:00 AM - 6:00 PM</span></p>
                          <p className="flex justify-between w-48 border-b border-gray-100 pb-1"><span>Saturday:</span> <span className="text-primary">10:00 AM - 4:00 PM</span></p>
                          <p className="flex justify-between w-48 pb-1"><span>Sunday:</span> <span>Closed</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map iFrame */}
              <div className="md:col-span-7 h-[500px] w-full rounded-3xl overflow-hidden border border-gray-100 relative group shadow-sm">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.467866876543!2d-84.1756569234676!3d34.02874697316744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f598c467657571%3A0x6762332675667676!2s4579%20Abbotts%20Bridge%20Rd%20Suite%20-10%2C%20Duluth%2C%20GA%2030097!5e0!3m2!1sen!2sus!4v1709867543210!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AGS Stones Location Map"
                  className="absolute inset-0 z-0"
                ></iframe>
              </div>

            </div>
          </div>
        </section>

        <LocalSEOSection />

      </main>

      <Footer />
    </div>
  );
};

export default ContactClient;
