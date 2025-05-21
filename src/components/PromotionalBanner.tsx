
import React from 'react';
import { X } from 'lucide-react';

interface PromotionalBannerProps {
  onClose: () => void;
}

const PromotionalBanner = ({ onClose }: PromotionalBannerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-gray-200 w-full max-w-md p-6 rounded-lg relative animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-klinkara-primary transition-colors"
          aria-label="Close promotional banner"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-klinkara-primary mb-2">Limited Time Offer!</h2>
          <p className="text-klinkara-text mb-4">Save 20% on all premium sarees this week only.</p>
          
          <div className="mb-4 overflow-hidden rounded-md">
            <img 
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Premium saree collection"
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            Use code <span className="font-semibold">PREMIUM20</span> at checkout
          </p>
          
          <a 
            href="/premium" 
            className="block w-full bg-klinkara-primary text-white py-2 rounded-md hover:bg-klinkara-primary/90 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.location.href = '/premium';
            }}
          >
            Shop Premium Collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
