'use client';

import React from 'react';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';
import { CheckCircle, Hammer, Ruler, Truck, PenTool } from 'lucide-react';

const ServicesClient = () => {
  const services = [
    {
      title: "Granite Countertops",
      desc: "Durable, heat-resistant, and naturally beautiful. Perfect for kitchens and high-traffic areas.",
      features: ["Natural Stone", "Unique Patterns", "Heat & Scratch Resistant"],
      img: "https://dam.thdstatic.com/content/production/3sJNZBkk31xe9nTrYrToTw/Y6t8wIWPcudCaKjiS8Z74g/Original%20file/quartz-vs-granite-countertops-section-6.jpg"
    },
    {
      title: "Quartz Countertops",
      desc: "Engineered for consistency and low maintenance. Non-porous and available in a wide range of colors.",
      features: ["Low Maintenance", "Stain Resistant", "Consistent Color"],
      img: "https://hamishmurray.com/wp-content/uploads/2021/06/shutterstock_1315328237-1.jpeg"
    },
    {
      title: "Custom Cabinetry",
      desc: "Maximize your storage with custom-built cabinets designed to fit your space perfectly.",
      features: ["Custom Sizes", "Premium Hardware", "Variety of Finishes"],
      img: "https://21stcenturycd.com/wp-content/uploads/2025/02/Aspen-kitchen-2-1.webp"
    },
    {
      title: "Bathroom Vanities",
      desc: "Transform your bathroom into a spa-like retreat with elegant stone vanities and custom cabinets.",
      features: ["Luxury Design", "Water Resistant", "Custom Layouts"],
      img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
              alt="AGS Services"
              className="w-full h-full object-cover"
              fill
              priority
              sizes="100vw"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-20 text-center py-20">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-in slide-in-from-bottom-4 duration-700">Our Services</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100">
              Comprehensive stone and cabinetry solutions for your dream home.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {services.map((service, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="md:w-2/5 h-64 md:h-auto relative">
                    <Image 
                      src={service.img} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className="md:w-3/5 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6 text-base leading-relaxed">{service.desc}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                          <CheckCircle size={16} className="text-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Process</h2>
              <p className="text-gray-600">
                From initial consultation to final installation, we ensure a seamless experience.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
              
              {[
                { icon: <PenTool size={32} />, title: "1. Consultation", desc: "We discuss your vision, budget, and material preferences." },
                { icon: <Ruler size={32} />, title: "2. Templating", desc: "Precise laser measurements ensure a perfect fit for your space." },
                { icon: <Hammer size={32} />, title: "3. Fabrication", desc: "Our skilled artisans cut and polish your stone to perfection." },
                { icon: <Truck size={32} />, title: "4. Installation", desc: "Professional installation in as little as one day." }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center relative z-10">
                  <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Start Your Project Today</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us for a free consultation and estimate.
            </p>
            <a 
              href="/contact" 
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-bold transition-transform hover:-translate-y-1 shadow-lg inline-block"
            >
              Get a Free Quote
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesClient;
