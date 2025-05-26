import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Premium from "./pages/Premium";
import { useEffect, useState } from "react";
import PromotionalBanner from "./components/PromotionalBanner";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Show promotional banner after a short delay on every refresh
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const closeBanner = () => {
    setShowBanner(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              
              <Sonner />
              <BrowserRouter>
                <Header />
                <Toaster />
                <main className="min-h-[calc(100vh-88px)] pb-16 md:pb-0 bg-white">
                  {showBanner && <PromotionalBanner onClose={closeBanner} />}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/premium" element={<Premium />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/auth" element={<Auth />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <BottomNavigation />
                <Footer />
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
