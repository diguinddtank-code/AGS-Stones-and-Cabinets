'use client';

import React from 'react';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';
import ContactForm from './ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactClient = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
              alt="Contact Us"
              className="w-full h-full object-cover"
              fill
              priority
              sizes="100vw"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-20 text-center py-20">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-in slide-in-from-bottom-4 duration-700">Contact Us</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100">
              We're here to help you with your next project.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Details */}
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Get in Touch</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you have a question about our services, need a quote, or want to schedule a showroom visit, our team is ready to assist you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Visit Our Showroom</h3>
                      <p className="text-gray-600">4579 Abbotts Bridge Rd Suite -10<br/>Duluth, GA 30097</p>
                      <a 
                        href="https://maps.google.com/?q=4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline text-sm mt-1 inline-block"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                      <p className="text-gray-600">Mon-Sat: 9am - 6pm</p>
                      <a href="tel:4049524534" className="text-secondary hover:underline text-lg font-bold mt-1 inline-block">
                        (404) 952-4534
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                      <p className="text-gray-600">Send us your plans or questions anytime.</p>
                      <a href="mailto:agsstonesandcabinets@gmail.com" className="text-secondary hover:underline text-sm mt-1 inline-block">
                        agsstonesandcabinets@gmail.com
                      </a>
                    </div>
                  </div>

                   <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Business Hours</h3>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li className="flex justify-between w-40"><span>Monday - Friday:</span> <span>9:00 AM - 6:00 PM</span></li>
                        <li className="flex justify-between w-40"><span>Saturday:</span> <span>10:00 AM - 4:00 PM</span></li>
                        <li className="flex justify-between w-40"><span>Sunday:</span> <span>Closed</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Wrapper */}
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-96 w-full bg-gray-200 relative">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.467866876543!2d-84.1756569234676!3d34.02874697316744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f598c467657571%3A0x6762332675667676!2s4579%20Abbotts%20Bridge%20Rd%20Suite%20-10%2C%20Duluth%2C%20GA%2030097!5e0!3m2!1sen!2sus!4v1709867543210!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="AGS Stones Location Map"
            ></iframe>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactClient;
