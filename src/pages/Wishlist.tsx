
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="mb-6">
          <Heart size={64} className="mx-auto text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-klinkara-text mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mb-8">Save your favorite items to check back later.</p>
        <Link 
          to="/shop" 
          className="bg-klinkara-primary hover:bg-klinkara-accent text-white font-medium py-2 px-6 transition-colors"
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-klinkara-text mb-6">My Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="product-card overflow-hidden">
            <div className="relative">
              <Link to={`/product/${product.id}`}>
                <div className="h-48">
                  <img 
                    src={product.imageUrls[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              
              <button 
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white bg-opacity-80 rounded-none"
                aria-label="Remove from wishlist"
              >
                <Heart size={18} fill="#E27D60" stroke="#E27D60" />
              </button>
            </div>
            
            <div className="p-4">
              <Link 
                to={`/product/${product.id}`}
                className="font-medium text-klinkara-text hover:text-klinkara-primary"
              >
                <h3 className="mb-2 line-clamp-1">{product.name}</h3>
              </Link>
              
              <p className="text-klinkara-primary font-medium mb-3">
                {formatPrice(product.price)}
              </p>
              
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-klinkara-neutral hover:bg-klinkara-secondary/20 text-klinkara-text py-2 text-sm flex items-center justify-center gap-1 transition-colors"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
