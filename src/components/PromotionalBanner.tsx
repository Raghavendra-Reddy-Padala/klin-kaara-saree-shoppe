import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PromotionalBannerProps {
  onClose: () => void;
  banner: {
    imageUrl: string;
    title: string;
    description: string;
    link: string;
    buttonText: string;
  };
}

const PromotionalBanner = ({ onClose, banner }: PromotionalBannerProps) => {
  return (
    <div className="w-full bg-white border-b-2 border-klinkara-primary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-[300px] object-cover rounded-none border-2 border-klinkara-primary/20"
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {banner.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {banner.description}
            </p>
            <Link to={banner.link}>
              <button className="bg-klinkara-primary hover:bg-klinkara-accent text-white font-medium py-2 px-6 rounded-none transition-all duration-300 transform hover:scale-105 border-2 border-klinkara-primary">
                {banner.buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
