
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Star, Heart, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-md md:hidden">
      <div className="grid grid-cols-5 items-center justify-between">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center py-3 ${
            isActive('/') ? 'text-klinkara-primary scale-110' : 'text-klinkara-text'
          } transition-all duration-200`}
        >
          <Home size={22} className={isActive('/') ? 'animate-fade-in' : ''} />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>
        
        <Link 
          to="/shop" 
          className={`flex flex-col items-center justify-center py-3 ${
            isActive('/shop') ? 'text-klinkara-primary scale-110' : 'text-klinkara-text'
          } transition-all duration-200`}
        >
          <ShoppingBag size={22} className={isActive('/shop') ? 'animate-fade-in' : ''} />
          <span className="text-xs mt-1 font-medium">Shop</span>
        </Link>
        
        <Link 
          to="/premium" 
          className={`flex flex-col items-center justify-center py-3 ${
            isActive('/premium') ? 'text-klinkara-primary scale-110' : 'text-klinkara-text'
          } transition-all duration-200`}
        >
          <Star size={22} className={isActive('/premium') ? 'animate-fade-in' : ''} />
          <span className="text-xs mt-1 font-medium">Premium</span>
        </Link>
        
        <Link 
          to="/wishlist" 
          className={`flex flex-col items-center justify-center py-3 ${
            isActive('/wishlist') ? 'text-klinkara-primary scale-110' : 'text-klinkara-text'
          } transition-all duration-200`}
        >
          <Heart size={22} className={isActive('/wishlist') ? 'animate-fade-in' : ''} />
          <span className="text-xs mt-1 font-medium">Wishlist</span>
        </Link>
        
        <Link 
          to="/account" 
          className={`flex flex-col items-center justify-center py-3 ${
            isActive('/account') ? 'text-klinkara-primary scale-110' : 'text-klinkara-text'
          } transition-all duration-200`}
        >
          <User size={22} className={isActive('/account') ? 'animate-fade-in' : ''} />
          <span className="text-xs mt-1 font-medium">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
