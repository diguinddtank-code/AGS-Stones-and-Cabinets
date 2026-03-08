import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Helmet>
        <title>Privacy Policy | AGS Stones & Cabinets</title>
        <meta name="description" content="Privacy Policy for AGS Stones & Cabinets. Learn how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://agsstonefabricators.com/privacy-policy" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8 text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg text-gray-700">
            <p>
              At AGS Stones & Cabinets ("we", "us", or "our"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Fill out a contact form or request a quote.</li>
              <li>Subscribe to our newsletter.</li>
              <li>Contact us via email or phone.</li>
            </ul>
            <p>
              This information may include your name, email address, phone number, and project details.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide and improve our services.</li>
              <li>Communicate with you about your project or inquiries.</li>
              <li>Send you promotional emails or newsletters (you can opt-out at any time).</li>
              <li>Analyze website traffic and user behavior to improve our website.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website or conducting our business, as long as those parties agree to keep this information confidential.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Cookies</h2>
            <p>
              Our website may use "cookies" to enhance your experience. You can choose to set your web browser to refuse cookies or to alert you when cookies are being sent. However, some parts of the website may not function properly without them.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4 font-bold">
              AGS Stones & Cabinets<br/>
              4579 Abbotts Bridge Rd Suite -10<br/>
              Duluth, GA 30097<br/>
              (404) 952-4534<br/>
              agsstonesandcabinets@gmail.com
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
