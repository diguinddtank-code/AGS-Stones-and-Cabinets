import React, { Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import MobileBottomNav from '../components/MobileBottomNav';
import StickyCta from '../components/StickyCta';
import { MapPin, Star, CheckCircle2, Phone } from 'lucide-react';

const Footer = lazy(() => import('../components/Footer'));

const locations = ['atlanta', 'duluth', 'alpharetta', 'roswell', 'johns-creek', 'suwanee', 'marietta', 'sandy-springs'];

function LocationPage() {
  const { city } = useParams<{ city: string }>();
  
  // Format city name: 'johns-creek' -> 'Johns Creek'
  const formattedCity = city 
    ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Atlanta';

  const isValidLocation = city && locations.includes(city.toLowerCase());

  if (!isValidLocation) {
    return (
      <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative">
        <Header />
        <main className="flex-grow pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-primary mb-4">Location Not Found</h1>
            <Link to="/" className="text-secondary hover:underline">Return Home</Link>
          </div>
        </main>
        <Suspense fallback={<div className="h-16" />}><Footer /></Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative">
      <Helmet>
        <title>Granite Countertops in {formattedCity}, GA | AGS Stones</title>
        <meta name="description" content={`Looking for granite countertops in ${formattedCity}? AGS Stones is your local factory-direct fabricator. Save 30% today on premium stone surfaces.`} />
        <link rel="canonical" href={`https://agsstonefabricators.com/granite-countertops-${city}`} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Local SEO Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: 'url("https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg")' }}
          ></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-20 text-center py-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in slide-in-from-bottom-4 duration-700">
              <MapPin size={16} className="text-secondary" /> Serving {formattedCity}, GA & Surrounding Areas
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight animate-in slide-in-from-bottom-6 duration-700 delay-100">
              Premium Granite Countertops in <span className="text-secondary">{formattedCity}</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-in slide-in-from-bottom-8 duration-700 delay-200">
              Upgrade your kitchen or bathroom with factory-direct granite, quartz, and marble countertops. Expert fabrication and installation in {formattedCity}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-10 duration-700 delay-300">
              <a href="tel:4049524534" className="bg-secondary hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <Phone size={20} /> Get a Free Estimate
              </a>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-12 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5.0 <Star className="inline text-secondary fill-secondary" size={20} /></div>
                <div className="text-sm text-gray-600 font-medium">Top Rated in {formattedCity}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-gray-600 font-medium">Satisfaction Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section for SEO */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                  Why Choose AGS Stones for Your {formattedCity} Home?
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  When searching for "granite countertops near me" in {formattedCity}, you want a local fabricator you can trust. AGS Stones offers factory-direct pricing, meaning we cut out the middleman to save you money without sacrificing quality.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Huge selection of Granite, Quartz, and Marble slabs',
                    'Custom fabrication in our local Duluth facility',
                    'Fast turnaround times (usually 5-7 days)',
                    'Professional, insured installation team',
                    'Free in-home measurements and design consultation'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-secondary shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-secondary rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
                <img 
                  src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
                  alt={`Granite countertops installation in ${formattedCity}`} 
                  className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

      </main>

      <Suspense fallback={<div className="h-16" />}>
        <Footer />
      </Suspense>

      <MobileBottomNav />
      <StickyCta />
    </div>
  );
}

export default LocationPage;
