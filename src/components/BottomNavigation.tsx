
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-klinkara-secondary shadow-md md:hidden">
      <div className="grid grid-cols-4 items-center justify-between">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center py-2 ${
            isActive('/') ? 'text-klinkara-primary' : 'text-klinkara-text'
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/shop" 
          className={`flex flex-col items-center justify-center py-2 ${
            isActive('/shop') ? 'text-klinkara-primary' : 'text-klinkara-text'
          }`}
        >
          <ShoppingBag size={20} />
          <span className="text-xs mt-1">Shop</span>
        </Link>
        
        <Link 
          to="/wishlist" 
          className={`flex flex-col items-center justify-center py-2 ${
            isActive('/wishlist') ? 'text-klinkara-primary' : 'text-klinkara-text'
          }`}
        >
          <Heart size={20} />
          <span className="text-xs mt-1">Wishlist</span>
        </Link>
        
        <Link 
          to="/account" 
          className={`flex flex-col items-center justify-center py-2 ${
            isActive('/account') ? 'text-klinkara-primary' : 'text-klinkara-text'
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
