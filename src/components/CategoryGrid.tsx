
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
      <div className="category-card overflow-hidden group h-full flex flex-col">
        <div className="relative h-36 md:h-44 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <h3 className="text-base font-medium text-klinkara-text">{name}</h3>
          <p className="text-sm text-gray-500 mt-1 hidden md:block">Explore our collection of {name.toLowerCase()}</p>
          <span className="text-sm text-klinkara-primary mt-2 group-hover:translate-x-1 transition-transform duration-300">
            View Collection
          </span>
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
