
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="mb-6">
          <ShoppingCart size={64} className="mx-auto text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-klinkara-text mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link 
          to="/shop" 
          className="bg-klinkara-primary hover:bg-klinkara-accent text-white font-medium py-2 px-6 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-klinkara-text mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="border border-klinkara-secondary bg-white">
            {cartItems.map((item) => (
              <div 
                key={item.product.id} 
                className="p-4 border-b border-klinkara-secondary last:border-b-0 flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-24 h-24">
                  <img 
                    src={item.product.imageUrls[0]} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between mb-2">
                    <Link 
                      to={`/product/${item.product.id}`} 
                      className="font-medium text-klinkara-text hover:text-klinkara-primary"
                    >
                      {item.product.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-500 hover:text-klinkara-primary"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-klinkara-primary font-medium mb-4">
                    {formatPrice(item.product.price)}
                  </p>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-4">Quantity:</span>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="border border-klinkara-secondary p-1 hover:bg-klinkara-neutral"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="border border-klinkara-secondary p-1 hover:bg-klinkara-neutral"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <span className="ml-auto font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Link to="/shop" className="text-klinkara-primary hover:underline flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="border border-klinkara-secondary bg-white p-6">
            <h2 className="text-lg font-semibold text-klinkara-text mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="pt-2 border-t border-klinkara-secondary">
                <div className="flex justify-between font-semibold">
                  <span className="text-klinkara-text">Total</span>
                  <span className="text-klinkara-primary">{formatPrice(getCartTotal())}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Including GST
                </p>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="block bg-klinkara-primary hover:bg-klinkara-accent text-white py-3 font-medium text-center w-full transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
