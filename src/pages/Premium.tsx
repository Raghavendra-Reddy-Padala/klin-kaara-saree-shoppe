
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

const Premium = () => {
  const [loading, setLoading] = useState(true);
  const [premiumProducts, setPremiumProducts] = useState([]);

  useEffect(() => {
    // Filter products with price >= 15000 as premium products
    // In a real app, this would come from an API or have a dedicated premium flag
    const timer = setTimeout(() => {
      const filtered = products.filter(product => product.price >= 15000);
      setPremiumProducts(filtered);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-klinkara-text mb-3">Premium Collection</h1>
        <p className="text-gray-600">Discover our finest handcrafted luxury sarees</p>
      </div>
      
      <div className="relative mb-12 overflow-hidden bg-gradient-to-r from-klinkara-primary/10 to-klinkara-secondary/10 p-6 rounded-lg border border-gray-200">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-klinkara-primary mb-2">Exquisite Craftsmanship</h2>
          <p className="mb-4 text-klinkara-text">Our premium sarees are handcrafted by master artisans using traditional techniques passed down through generations.</p>
          <Link 
            to="/shop" 
            className="inline-block bg-klinkara-primary text-white px-6 py-2 rounded-md hover:bg-klinkara-primary/90 transition-colors"
          >
            Explore More
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-28 h-28 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#D946EF" d="M39.9,-68.3C53.1,-62.1,66.3,-54.6,75.1,-42.8C83.9,-31.1,88.4,-15.5,89.2,0.4C90,16.4,87.1,32.8,78.7,45.3C70.4,57.9,56.6,66.5,42.2,70.6C27.8,74.7,13.9,74.1,0.1,73.9C-13.7,73.8,-27.5,74,-39.7,69C-51.9,64,-62.5,53.8,-72,41.3C-81.4,28.9,-89.8,14.4,-91.2,-0.8C-92.5,-16,-86.9,-32,-77.6,-45.1C-68.2,-58.1,-55,-68.2,-41,-71.1C-27,-74,-13.5,-69.8,-0.3,-69.3C13,-68.7,26,-74.5,39.9,-68.3Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      <ProductGrid products={premiumProducts} loading={loading} />
    </div>
  );
};

export default Premium;
