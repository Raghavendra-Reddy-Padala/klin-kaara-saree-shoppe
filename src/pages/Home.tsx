import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '@/components/HeroCarousel';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import { getFeaturedProducts } from '@/data/products';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFeaturedProducts(getFeaturedProducts());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <HeroCarousel />
      
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center mb-8">Our Collections</h2>
          <CategoryGrid loading={loading} />
        </div>
      </section>
      
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/shop" className="text-sm text-klinkara-primary hover:underline">
              View All
            </Link>
          </div>
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      <Testimonials />
      
      <section className="py-16 bg-white border-b-2 border-klinkara-primary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 border-b-2 border-klinkara-primary/30 pb-4">
            Follow Us on Instagram
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, index) => (
              <a
                key={index}
                href="#"
                className="group relative overflow-hidden aspect-square border-2 border-klinkara-primary/20"
              >
                <img 
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Instagram post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Post
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default Home;
