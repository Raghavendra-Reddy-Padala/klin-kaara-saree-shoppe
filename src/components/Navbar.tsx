import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle search functionality
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative search-bar bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search for sarees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <button 
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full px-4 text-klinkara-primary hover:text-klinkara-accent transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link 
          to="/shop" 
          className={`nav-link ${location.pathname === '/shop' ? 'nav-link-active' : ''}`}
        >
          Shop
        </Link>
        <Link 
          to="/collections" 
          className={`nav-link ${location.pathname === '/collections' ? 'nav-link-active' : ''}`}
        >
          Collections
        </Link>
        <Link 
          to="/about" 
          className={`nav-link ${location.pathname === '/about' ? 'nav-link-active' : ''}`}
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className={`nav-link ${location.pathname === '/contact' ? 'nav-link-active' : ''}`}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Navbar; 