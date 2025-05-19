
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ChevronRight, CreditCard, Truck } from 'lucide-react';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout process
    console.log('Checkout submitted', { shippingDetails, deliveryMethod, paymentMethod });
  };

  if (cartItems.length === 0) {
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
              className="w-full bg-klinkara-primary hover:bg-klinkara-accent text-white py-3 font-medium text-center flex items-center justify-center transition-colors"
              onClick={handleSubmit}
            >
              Place Order
              <ChevronRight size={18} className="ml-1" />
            </button>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              By placing your order, you agree to our <a href="#" className="text-klinkara-primary hover:underline">Terms and Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
