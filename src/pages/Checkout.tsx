
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, CreditCard, Truck } from 'lucide-react';
import { processCheckout, initiateRazorpayOrder } from '@/services/api';
import { toast } from "@/hooks/use-toast";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to proceed with checkout",
      });
      navigate('/account');
    }

    // Pre-fill email from user data if available
    if (user) {
      setShippingDetails(prev => ({
        ...prev,
        email: user.email,
        firstName: user.name ? user.name.split(' ')[0] : '',
        lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
      }));
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to proceed with checkout",
      });
      navigate('/account');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order data
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingDetails,
        deliveryMethod,
        paymentMethod,
        amount: getCartTotal() + (deliveryMethod === 'express' ? 299 : 0)
      };
      
      if (paymentMethod === 'card') {
        // Initialize Razorpay order
        const razorpayResponse = await initiateRazorpayOrder(orderData.amount);
        
        // In a real app, we would integrate with Razorpay's SDK here
        // For now, we'll just simulate a successful payment
        console.log('Razorpay order initialized:', razorpayResponse);
        
        // Process the checkout with payment info
        await processCheckout({
          ...orderData,
          paymentInfo: {
            orderId: razorpayResponse.orderId,
            paymentId: 'pay_simulated_' + Math.random().toString(36).substring(2, 15),
            signature: 'sig_simulated_' + Math.random().toString(36).substring(2, 15),
          }
        });
      } else {
        // Cash on delivery - directly process the order
        await processCheckout(orderData);
      }
      
      // Success - clear the cart and redirect to success page
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      });
      clearCart();
      navigate('/account');
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-klinkara-text mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add items to your cart before proceeding to checkout.</p>
        <Link 
          to="/shop" 
          className="bg-klinkara-primary hover:bg-klinkara-accent text-white font-medium py-2 px-6 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-klinkara-text mb-6">Checkout</h1>
      
      {!isAuthenticated ? (
        <div className="text-center py-12 border border-klinkara-secondary bg-white">
          <h2 className="text-xl font-semibold text-klinkara-text mb-4">Account Required</h2>
          <p className="text-gray-600 mb-6">Please log in or create an account to complete your purchase.</p>
          <Link 
            to="/account" 
            className="bg-klinkara-primary hover:bg-klinkara-accent text-white font-medium py-2 px-6 transition-colors"
          >
            Sign In / Create Account
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="border border-klinkara-secondary bg-white p-6">
                <h2 className="text-lg font-semibold text-klinkara-text mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-klinkara-text mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={shippingDetails.firstName}
                      onChange={handleChange}
                      required
                      className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-klinkara-text mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={shippingDetails.lastName}
                      onChange={handleChange}
                      required
                      className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-klinkara-text mb-1">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={shippingDetails.address}
                      onChange={handleChange}
                      required
                      className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-klinkara-text mb-1">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={shippingDetails.city}
                      onChange={handleChange}
                      required
                      className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-klinkara-text mb-1">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={shippingDetails.state}
                      onChange={handleChange}
                      required
                      className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-klinkara-text mb-1">
                      PIN Code
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      value={shippingDetails.pincode}
                      onChange={handleChange}
                      required
                      className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-klinkara-text mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-klinkara-text mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingDetails.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                    />
                  </div>
                </div>
              </div>
              
              {/* Delivery Method */}
              <div className="border border-klinkara-secondary bg-white p-6">
                <h2 className="text-lg font-semibold text-klinkara-text mb-4">Delivery Method</h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center p-3 border ${deliveryMethod === 'standard' ? 'border-klinkara-primary bg-klinkara-neutral' : 'border-klinkara-secondary'} cursor-pointer`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="standard"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium">Standard Delivery</span>
                        <span className="font-medium">Free</span>
                      </div>
                      <p className="text-sm text-gray-500">7-10 business days</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-3 border ${deliveryMethod === 'express' ? 'border-klinkara-primary bg-klinkara-neutral' : 'border-klinkara-secondary'} cursor-pointer`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium">Express Delivery</span>
                        <span className="font-medium">₹299</span>
                      </div>
                      <p className="text-sm text-gray-500">2-3 business days</p>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="border border-klinkara-secondary bg-white p-6">
                <h2 className="text-lg font-semibold text-klinkara-text mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center p-3 border ${paymentMethod === 'card' ? 'border-klinkara-primary bg-klinkara-neutral' : 'border-klinkara-secondary'} cursor-pointer`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <CreditCard className="mr-2" size={20} />
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-3 border ${paymentMethod === 'cod' ? 'border-klinkara-primary bg-klinkara-neutral' : 'border-klinkara-secondary'} cursor-pointer`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <Truck className="mr-2" size={20} />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-klinkara-secondary bg-white p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-klinkara-text mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(getCartTotal())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {deliveryMethod === 'express' ? formatPrice(299) : 'Free'}
                  </span>
                </div>
              </div>
              
              <div className="h-px bg-klinkara-secondary my-3"></div>
              
              <div className="flex justify-between font-semibold mb-6">
                <span className="text-klinkara-text">Total</span>
                <span className="text-klinkara-primary">
                  {formatPrice(getCartTotal() + (deliveryMethod === 'express' ? 299 : 0))}
                </span>
              </div>
              
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full bg-klinkara-primary hover:bg-klinkara-accent text-white py-3 font-medium text-center flex items-center justify-center transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
                {!isProcessing && <ChevronRight size={18} className="ml-1" />}
              </button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                By placing your order, you agree to our <a href="#" className="text-klinkara-primary hover:underline">Terms and Conditions</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
