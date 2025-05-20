import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { getProductById, getCategoryById, getProductsByCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductGrid from '@/components/ProductGrid';
import { ProductDetailSkeleton } from '@/components/SkeletonLoader';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isInWish, setIsInWish] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      if (productId) {
        const fetchedProduct = getProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setIsInWish(isInWishlist(fetchedProduct.id));
          
          const productCategory = getCategoryById(fetchedProduct.category);
          setCategory(productCategory);
          
          // Get related products (same category, exclude current)
          const related = getProductsByCategory(fetchedProduct.category)
            .filter(p => p.id !== fetchedProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [productId]);

  useEffect(() => {
    if (product) {
      setIsInWish(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isInWish) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    
    setIsInWish(!isInWish);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-klinkara-text mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/shop" 
          className="bg-klinkara-primary hover:bg-klinkara-accent text-white font-medium py-2 px-6 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-4">
        <Link to="/shop" className="text-sm text-gray-500 hover:text-klinkara-primary">
          Shop
        </Link>
        {category && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/shop?category=${category.id}`} className="text-sm text-gray-500 hover:text-klinkara-primary">
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-sm text-gray-700">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="container-border p-4">
          <div className="aspect-square border-2 border-klinkara-primary/30 mb-4 overflow-hidden rounded-none">
            <img 
              src={product.imageUrls[currentImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {product.imageUrls.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.imageUrls.map((imageUrl: string, index: number) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`block border-2 transition-all duration-300 hover:scale-105 ${
                    index === currentImageIndex 
                      ? 'border-klinkara-primary scale-105' 
                      : 'border-klinkara-primary/30 hover:border-klinkara-primary/50'
                  }`}
                >
                  <img 
                    src={imageUrl} 
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="container-border p-6">
          <h1 className="text-2xl font-bold text-klinkara-text mb-2">{product.name}</h1>
          
          <p className="text-xl font-semibold text-klinkara-primary mb-4">
            {formatPrice(product.price)}
          </p>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            
            <h3 className="font-medium text-klinkara-text mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6">
              {product.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-klinkara-text mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button 
                onClick={decrementQuantity}
                className="border-2 border-klinkara-primary/30 px-3 py-2 bg-white hover:bg-klinkara-neutral"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                className="w-16 border-y-2 border-klinkara-primary/30 px-3 py-2 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button 
                onClick={incrementQuantity}
                className="border-2 border-klinkara-primary/30 px-3 py-2 bg-white hover:bg-klinkara-neutral"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-klinkara-primary hover:bg-klinkara-accent text-white py-3 px-6 font-medium flex items-center justify-center gap-2 transition-colors border-2 border-klinkara-primary"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            
            <button
              onClick={toggleWishlist}
              className={`border-2 py-3 px-6 font-medium flex items-center justify-center gap-2 transition-colors ${
                isInWish 
                  ? 'border-klinkara-primary text-klinkara-primary bg-klinkara-neutral/20' 
                  : 'border-klinkara-primary/30 text-klinkara-text hover:border-klinkara-primary hover:text-klinkara-primary'
              }`}
            >
              <Heart size={18} fill={isInWish ? "#E27D60" : "none"} />
              {isInWish ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
          
          {/* Additional Information */}
          <div className="border-t-2 border-klinkara-primary/30 pt-6">
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Category:</span>{' '}
                {category?.name || product.category}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">SKU:</span> {product.id}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="section-title mb-8">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
