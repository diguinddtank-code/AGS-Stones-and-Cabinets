import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-primary mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
          <Link href="/" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-full font-bold transition-transform hover:-translate-y-1 shadow-lg inline-block">
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
