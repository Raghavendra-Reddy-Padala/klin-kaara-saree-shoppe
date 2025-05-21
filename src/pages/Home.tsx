
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
      
      <section className="py-12 px-6 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center mb-8">Our Collections</h2>
          <CategoryGrid loading={loading} />
        </div>
      </section>
      
      <section className="py-12 px-6 bg-white fade-in-delay-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/shop" className="text-sm text-klinkara-primary hover:underline transition-colors">
              View All
            </Link>
          </div>
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      <div className="fade-in-delay-200">
        <Testimonials />
      </div>
      
      <section className="py-12 px-6 bg-white fade-in-delay-300">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-title text-center mb-8">Follow Us on Instagram</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array(4).fill(0).map((_, index) => (
              <a href="#" key={index} className="relative group block h-40 overflow-hidden rounded-lg">
                <img 
                  src={`https://images.unsplash.com/photo-1610030${index + 1}67685-f39cf8b3e807?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3`} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-klinkara-primary bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    @klinkaaraofficial
                  </span>
                </div>
              </a>
            ))}
          </div>
          
          <a href="#" className="inline-block mt-8 border border-klinkara-primary text-klinkara-primary px-6 py-2 rounded-md hover:bg-klinkara-primary hover:text-white transition-colors duration-300">
            Follow Us
          </a>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default Home;
