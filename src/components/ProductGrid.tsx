
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { ProductCardSkeleton } from './SkeletonLoader';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(6).fill(0).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-gray-200 p-8 shadow-sm rounded-lg">
        <p className="text-lg text-gray-500">No products found</p>
        <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or browse our categories</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
