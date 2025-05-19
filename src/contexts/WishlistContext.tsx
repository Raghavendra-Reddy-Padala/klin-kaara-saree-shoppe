
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, getProductById } from '../data/products';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();

  // Load wishlist from local storage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('klinkara-wishlist');
    if (savedWishlist) {
      try {
        const wishlistIds = JSON.parse(savedWishlist) as string[];
        const items = wishlistIds
          .map(id => getProductById(id))
          .filter(Boolean) as Product[];
        setWishlistItems(items);
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    const wishlistIds = wishlistItems.map(item => item.id);
    localStorage.setItem('klinkara-wishlist', JSON.stringify(wishlistIds));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems(prev => [...prev, product]);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} added to your wishlist`,
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Removed from Wishlist",
      description: "Item removed from your wishlist",
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items removed from your wishlist",
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const getWishlistCount = () => wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
