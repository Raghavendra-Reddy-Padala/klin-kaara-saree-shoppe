
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { CategoryCardSkeleton } from './SkeletonLoader';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  loading?: boolean;
}

const CategoryCard: React.FC<{ id: string; name: string; imageUrl: string }> = ({ id, name, imageUrl }) => {
  return (
    <Link to={`/shop?category=${id}`} className="block">
      <div className="category-card h-full">
        <div className="md:flex block">
          {/* Image container - full width on mobile, half width on desktop */}
          <div className="relative h-52 md:h-44 md:w-1/2 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
            <h3 className="absolute bottom-4 left-4 text-lg font-medium text-white md:hidden">{name}</h3>
          </div>
          
          {/* Content container - full width on mobile, half width on desktop */}
          <div className="p-4 md:w-1/2 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-medium text-klinkara-text hidden md:block">{name}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Explore our collection of {name.toLowerCase()} featuring traditional designs with modern touches.
                Our {name.toLowerCase()} are handcrafted with premium materials ensuring both quality and elegance.
              </p>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center text-sm text-klinkara-primary group-hover:translate-x-1 transition-transform duration-300">
                View Collection
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(4).fill(0).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category, index) => (
        <div key={category.id} className={`fade-in-delay-${index % 2}00`}>
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
