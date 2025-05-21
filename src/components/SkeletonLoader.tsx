
import React from 'react';

interface SkeletonProps {
  height?: string;
  width?: string;
  className?: string;
  rounded?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height = 'h-4',
  width = 'w-full',
  className = '',
  rounded = false
}) => {
  return (
    <div 
      className={`skeletal-loader ${height} ${width} ${rounded ? 'rounded-lg' : ''} ${className}`}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card overflow-hidden bg-white animate-pulse">
      <Skeleton height="h-40" className="mb-3" />
      <div className="p-4">
        <Skeleton height="h-4" className="mb-2" />
        <Skeleton height="h-4" width="w-2/3" className="mb-3" />
        <Skeleton height="h-5" width="w-1/3" />
      </div>
    </div>
  );
};

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="category-card overflow-hidden bg-white animate-pulse">
      <Skeleton height="h-36" className="mb-2" />
      <div className="p-4">
        <Skeleton height="h-4" width="w-2/3" className="mb-2" />
        <Skeleton height="h-3" width="w-full" className="mx-auto" />
      </div>
    </div>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <Skeleton height="h-64" className="mb-4 rounded-lg" />
      <Skeleton height="h-6" className="mb-2" />
      <Skeleton height="h-5" width="w-1/3" className="mb-4" />
      <Skeleton height="h-4" className="mb-2" />
      <Skeleton height="h-4" className="mb-2" />
      <Skeleton height="h-4" width="w-2/3" className="mb-4" />
      <Skeleton height="h-10" className="mb-2 rounded-md" />
    </div>
  );
};
