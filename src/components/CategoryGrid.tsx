
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { CategoryCardSkeleton } from './SkeletonLoader';

interface CategoryGridProps {
  loading?: boolean;
}

const CategoryCard: React.FC<{ id: string; name: string; imageUrl: string }> = ({ id, name, imageUrl }) => {
  return (
    <Link to={`/shop?category=${id}`} className="block">
<div className="category-card overflow-hidden rounded-lg group  h-40 md:h-80 relative shadow-lg hover:shadow-xl transition-shadow duration-300">
    {/* Background image with reduced opacity */}
    <div className="group relative w-full h-full overflow-hidden">
  <img
    src={imageUrl}
    alt={name}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
  <div
    className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-60 pointer-events-none"
  ></div>
</div>
    
    {/* Content container at bottom */}
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">{name}</h3>
        </div>
        
        {/* Arrow icon in bottom right */}
        <div className="flex-shrink-0 ml-4">
          <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center group-hover:bg-white/40 transition-colors duration-300">
            <svg 
              className="w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</Link>
  );
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array(6).fill(0).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {categories.map((category, index) => (
        <div key={category.id} className={`fade-in-delay-${index % 3}00`}>
          <CategoryCard 
            id={category.id} 
            name={category.name} 
            imageUrl={category.imageUrl} 
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
