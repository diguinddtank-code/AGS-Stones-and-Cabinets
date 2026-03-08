'use client';

import React from 'react';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';
import { CheckCircle, Users, Award, Clock } from 'lucide-react';

const AboutClient = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop")' }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-20 text-center py-20">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-in slide-in-from-bottom-4 duration-700">Crafting Stone into Art</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100">
              Your trusted partner for luxury countertops and custom cabinetry in the Greater Atlanta area.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Our Story</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                  Family Owned, Community Focused
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded with a passion for excellence and a dedication to craftsmanship, AGS Stones has grown from a small local workshop to one of Atlanta's premier stone fabricators. We believe that every home deserves a touch of luxury, and we strive to make that accessible to our community.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our journey began with a simple mission: to provide high-quality granite and quartz countertops with transparent pricing and exceptional service. Today, we continue to uphold these values, treating every project as if it were for our own home.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-3">
                    <Clock className="text-secondary shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-900">15+ Years</h4>
                      <p className="text-sm text-gray-500">Industry Experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="text-secondary shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-900">2000+</h4>
                      <p className="text-sm text-gray-500">Happy Clients</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/10 rounded-tl-3xl -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/10 rounded-br-3xl -z-10"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                  alt="AGS Stones Team working on a project" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/3]"
                  width={600}
                  height={450}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600">
                We don't just build kitchens; we build relationships based on trust, quality, and integrity.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="w-12 h-12 text-secondary mb-4" />,
                  title: "Quality Craftsmanship",
                  desc: "We use state-of-the-art technology combined with traditional hand-finishing techniques to ensure every edge is perfect."
                },
                {
                  icon: <CheckCircle className="w-12 h-12 text-secondary mb-4" />,
                  title: "Transparent Pricing",
                  desc: "No hidden fees or surprises. We provide detailed estimates so you know exactly what you're paying for."
                },
                {
                  icon: <Users className="w-12 h-12 text-secondary mb-4" />,
                  title: "Customer First",
                  desc: "Your satisfaction is our priority. We walk you through every step of the process, from selection to installation."
                }
              ].map((value, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  {value.icon}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Transform Your Home?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Visit our showroom in Duluth or contact us today for a free estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#contact" 
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-bold transition-transform hover:-translate-y-1 shadow-lg"
              >
                Get a Free Quote
              </a>
              <a 
                href="/#contact" 
                className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-colors"
              >
                Visit Showroom
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutClient;
