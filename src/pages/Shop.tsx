
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory, categories, products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      if (selectedCategory) {
        setFilteredProducts(getProductsByCategory(selectedCategory));
      } else {
        setFilteredProducts(products);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    
    // Update URL
    const params = new URLSearchParams();
    if (categoryId) {
      params.set('category', categoryId);
    }
    
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}${categoryId ? `?${params.toString()}` : ''}`
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-klinkara-text mb-6">Shop All Sarees</h1>
      
      {/* Category Filters */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          <button
            className={`whitespace-nowrap px-4 py-2 text-sm border ${
              !selectedCategory
                ? 'border-klinkara-primary bg-klinkara-primary text-white'
                : 'border-klinkara-secondary bg-white text-klinkara-text hover:bg-klinkara-neutral'
            } transition-colors`}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`whitespace-nowrap px-4 py-2 text-sm border ${
                selectedCategory === category.id
                  ? 'border-klinkara-primary bg-klinkara-primary text-white'
                  : 'border-klinkara-secondary bg-white text-klinkara-text hover:bg-klinkara-neutral'
              } transition-colors`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <ProductGrid products={filteredProducts} loading={loading} />
    </div>
  );
};

export default Shop;
