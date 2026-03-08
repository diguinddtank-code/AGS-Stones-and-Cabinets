import React from 'react';

export const blogContent: Record<string, { title: string; content: React.ReactNode; image: string; date: string; excerpt: string }> = {
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
