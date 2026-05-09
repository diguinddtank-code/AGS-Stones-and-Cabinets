'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import StickyCta from './StickyCta';
import Footer from './Footer';
import { ArrowLeft } from 'lucide-react';
import { blogContent } from '../lib/blogData';

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col font-sans relative">
        <Header />
        <main className="flex-grow pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-primary mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-secondary hover:underline">Return to Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header />

      <main className="flex-grow pt-24 md:pt-32 pb-16">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          
          <header className="mb-10 text-center">
            <p className="text-secondary font-medium mb-3">{post.date}</p>
            <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-6">{post.title}</h1>
          </header>

          <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-md relative">
            <Image 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content}
          </div>
        </article>
      </main>

      <Footer />
      <StickyCta />
    </div>
  );
}
