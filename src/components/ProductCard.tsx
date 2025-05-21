
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="block"
    >
      <div className="product-card overflow-hidden group h-full flex flex-col">
        <div className="relative h-0 pb-[125%] overflow-hidden bg-gray-50">
          <img 
            src={product.imageUrls[0]} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button 
            onClick={toggleWishlist}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white bg-opacity-80 rounded-none z-10 transition-transform duration-300 hover:scale-110"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              size={18} 
              fill={isWishlisted ? "#E27D60" : "none"} 
              stroke={isWishlisted ? "#E27D60" : "currentColor"}
            />
          </button>
        </div>
        <div className="p-3 flex-grow flex flex-col">
          <h3 className="text-sm font-medium text-klinkara-text mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-base font-semibold text-klinkara-primary mt-auto">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
