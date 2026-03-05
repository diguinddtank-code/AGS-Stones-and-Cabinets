import React, { Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import MobileBottomNav from '../components/MobileBottomNav';
import StickyCta from '../components/StickyCta';
import { ArrowLeft } from 'lucide-react';

const Footer = lazy(() => import('../components/Footer'));

const blogContent: Record<string, { title: string; content: React.ReactNode; image: string; date: string; excerpt: string }> = {
  'granite-vs-quartz-which-is-better-for-your-kitchen': {
    title: 'Granite vs Quartz: Which is Better for Your Kitchen?',
    date: 'Oct 15, 2023',
    excerpt: 'Discover the pros and cons of granite and quartz countertops to make the best decision for your kitchen remodel.',
    image: 'https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg',
    content: (
      <>
        <p className="mb-4">When remodeling a kitchen, one of the most significant decisions you will make is choosing the right countertop material. Two of the most popular options are granite and quartz. Both offer stunning beauty and durability, but they have distinct differences.</p>
        
        <h3 className="text-2xl font-serif text-primary mt-8 mb-4">What is Granite?</h3>
        <p className="mb-4">Granite is a 100% natural stone mined from quarries around the world, cut down to a manageable size, and then polished to a fine finish. Because it's a natural material, no two granite slabs are exactly alike.</p>
        
        <h3 className="text-2xl font-serif text-primary mt-8 mb-4">What is Quartz?</h3>
        <p className="mb-4">Quartz countertops are engineered stone products. They are made from about 90-95% crushed natural quartz, mixed with polymer resins that bind the material together, and pigments for color.</p>
        
        <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Durability and Maintenance</h3>
        <p className="mb-4"><strong>Granite:</strong> Very durable and heat resistant. However, it is porous and requires sealing at least once a year to prevent stains and bacteria growth.</p>
        <p className="mb-4"><strong>Quartz:</strong> Harder than granite and nearly indestructible. It is non-porous, meaning it doesn't require sealing and is highly resistant to stains and bacteria. However, it is less heat resistant than granite.</p>
        
        <h3 className="text-2xl font-serif text-primary mt-8 mb-4">The Verdict</h3>
        <p className="mb-4">If you want a 100% natural look with unique patterns and don't mind occasional maintenance, granite is a fantastic choice. If you prefer a uniform look, zero maintenance, and high stain resistance, quartz is the winner.</p>
      </>
    )
  }
};

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative">
        <Header />
        <main className="flex-grow pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-primary mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-secondary hover:underline">Return to Blog</Link>
          </div>
        </main>
        <Suspense fallback={<div className="h-16" />}><Footer /></Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative">
      <Helmet>
        <title>{post.title} | AGS Stones Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://agsstonefabricators.com/blog/${slug}`} />
      </Helmet>
      <Header />

      <main className="flex-grow pt-24 md:pt-32 pb-16">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          
          <header className="mb-10 text-center">
            <p className="text-secondary font-medium mb-3">{post.date}</p>
            <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-6">{post.title}</h1>
          </header>

          <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-md">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content}
          </div>
        </article>
      </main>

      <Suspense fallback={<div className="h-16" />}>
        <Footer />
      </Suspense>

      <MobileBottomNav />
      <StickyCta />
    </div>
  );
}

export default BlogPost;
