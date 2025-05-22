
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search query:', searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-klinkara-secondary transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={toggleMenu} 
            className="text-klinkara-text hover:text-klinkara-primary transition-colors duration-300"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/djyny0qqn/image/upload/v1747326621/DB0548_1_Final-removebg-preview_romx1s.png" 
              alt="KlinKaaRa Logo" 
              className="h-10"
            />
          </Link>
          
          <div className="flex items-center">
            <Link to="/cart" className="relative">
              <ShoppingCart 
                size={22} 
                className="text-klinkara-text hover:text-klinkara-primary transition-colors duration-300" 
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-klinkara-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        <div className="px-4 py-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for sarees..."
              className="w-full py-2 px-4 pr-10 bg-white border border-klinkara-secondary rounded-none text-sm focus:outline-none focus:border-klinkara-primary transition-all duration-300"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-3 text-klinkara-text hover:text-klinkara-primary transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-[60] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-klinkara-secondary">
          <h2 className="text-lg font-medium text-klinkara-text">Menu</h2>
          <button 
            onClick={toggleMenu} 
            className="text-klinkara-text hover:text-klinkara-primary transition-colors duration-300"
            aria-label="Close Menu"
          >
            <X size={24} className="hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
        
        <nav className="py-4">
          <ul className="space-y-1">
            <li>
              <Link 
                to="/" 
                className="block px-4 py-3 text-klinkara-text hover:bg-gray-50 hover:text-klinkara-primary transition-all duration-300"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/shop" 
                className="block px-4 py-3 text-klinkara-text hover:bg-gray-50 hover:text-klinkara-primary transition-all duration-300"
                onClick={toggleMenu}
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link 
                to="/premium" 
                className="block px-4 py-3 text-klinkara-text hover:bg-gray-50 hover:text-klinkara-primary transition-all duration-300"
                onClick={toggleMenu}
              >
                Premium Collection
              </Link>
            </li>
            <li>
              <Link 
                to="/cart" 
                className="block px-4 py-3 text-klinkara-text hover:bg-gray-50 hover:text-klinkara-primary transition-all duration-300"
                onClick={toggleMenu}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link 
                to="/wishlist" 
                className="block px-4 py-3 text-klinkara-text hover:bg-gray-50 hover:text-klinkara-primary transition-all duration-300"
                onClick={toggleMenu}
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link 
                to="/account" 
                className="block px-4 py-3 text-klinkara-text hover:bg-gray-50 hover:text-klinkara-primary transition-all duration-300"
                onClick={toggleMenu}
              >
                Account
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block px-4 py-3 text-klinkara-text hover:bg-gray-50 hover:text-klinkara-primary transition-all duration-300"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link 
                to="/privacy-policy" 
                className="block px-4 py-3 text-klinkara-text hover:bg-gray-50 hover:text-klinkara-primary transition-all duration-300"
                onClick={toggleMenu}
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Header spacer */}
      <div className="h-[88px]" />
    </>
  );
};

export default Header;
