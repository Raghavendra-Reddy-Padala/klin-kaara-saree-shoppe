
import React, { useState, useEffect } from 'react';
import { UserRound, PackageOpen, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getViewOrders, getAddresses } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Account = () => {
  const { user, isAuthenticated, isLoading, login, register, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('info');
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showRegister, setShowRegister] = useState(false);

  // Helper function to get user's display name
  const getUserDisplayName = () => {
    if (!user) return "User";
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.email?.split('@')[0] || 
           "User";
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await login(loginForm.email, loginForm.password)) {
      // Successfully logged in
      navigate('/account');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Registration error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (await register(registerForm.name, registerForm.email, registerForm.password)) {
      // Successfully registered
      navigate('/account');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAccountData = async () => {
        setDataLoading(true);
        try {
          // In real app, these would hit the API endpoints
          const ordersData = await getViewOrders();
          const addressesData = await getAddresses();
          
          setOrders(ordersData.orders);
          setAddresses(addressesData.addresses);
        } catch (error) {
          console.error("Failed to load account data", error);
          toast({
            title: "Error",
            description: "Failed to load your account data",
            variant: "destructive",
          });
        } finally {
          setDataLoading(false);
        }
      };
      
      fetchAccountData();
    }
  }, [isAuthenticated]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <div className="w-10 h-10 border-2 border-klinkara-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading account information...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-klinkara-text mb-6 text-center">
          {showRegister ? "Create Account" : "Sign In"}
        </h1>
        
        <div className="border border-klinkara-secondary bg-white p-6">
          {!showRegister ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-klinkara-text mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-klinkara-text mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-klinkara-primary hover:bg-klinkara-accent text-white py-2 font-medium transition-colors"
              >
                Sign In
              </button>
              
              <div className="text-center">
                <a href="#" className="text-sm text-klinkara-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-klinkara-text mb-1">
                  Full Name
                </label>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  required
                  className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                />
              </div>
              
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-klinkara-text mb-1">
                  Email Address
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                  className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                />
              </div>
              
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-klinkara-text mb-1">
                  Password
                </label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                  className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-klinkara-text mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                  className="w-full border border-klinkara-secondary px-3 py-2 focus:outline-none focus:border-klinkara-primary"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-klinkara-primary hover:bg-klinkara-accent text-white py-2 font-medium transition-colors"
              >
                Create Account
              </button>
            </form>
          )}
          
          <div className="mt-6 pt-6 border-t border-klinkara-secondary text-center">
            <p className="text-gray-600 mb-4">
              {!showRegister ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="block w-full border border-klinkara-secondary bg-transparent text-klinkara-text py-2 font-medium hover:bg-klinkara-neutral transition-colors"
            >
              {!showRegister ? "Create Account" : "Sign In Instead"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-klinkara-neutral border border-klinkara-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <UserRound size={40} className="text-klinkara-primary" />
        </div>
        <h1 className="text-2xl font-bold text-klinkara-text">My Account</h1>
        <p className="text-gray-600">Welcome back, {getUserDisplayName()}!</p>
      </div>
      
      <div className="border border-klinkara-secondary bg-white mb-8">
        <div className="flex border-b border-klinkara-secondary">
          <button 
            className={`flex-1 py-3 text-center font-medium ${activeTab === 'info' ? 'bg-klinkara-neutral text-klinkara-primary' : 'text-klinkara-text hover:bg-klinkara-neutral/50'}`}
            onClick={() => setActiveTab('info')}
          >
            Account Info
          </button>
          <button 
            className={`flex-1 py-3 text-center font-medium ${activeTab === 'orders' ? 'bg-klinkara-neutral text-klinkara-primary' : 'text-klinkara-text hover:bg-klinkara-neutral/50'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`flex-1 py-3 text-center font-medium ${activeTab === 'addresses' ? 'bg-klinkara-neutral text-klinkara-primary' : 'text-klinkara-text hover:bg-klinkara-neutral/50'}`}
            onClick={() => setActiveTab('addresses')}
          >
            Addresses
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Name</span>
                <p className="font-medium text-klinkara-text">{getUserDisplayName()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email</span>
                <p className="font-medium text-klinkara-text">{user?.email || "N/A"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center mt-6 py-2 px-4 border border-klinkara-primary text-klinkara-primary hover:bg-klinkara-primary hover:text-white transition-colors"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              {dataLoading ? (
                <div className="py-10 text-center">
                  <div className="w-10 h-10 border-2 border-klinkara-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading your orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order: any) => (
                    <div key={order.id} className="border border-klinkara-secondary p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-sm text-gray-500">Order #{order.id}</span>
                          <p className="font-medium text-klinkara-text">{formatDate(order.date)}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">Total</span>
                          <p className="font-medium text-klinkara-primary">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <PackageOpen size={16} className="mr-2 text-gray-500" />
                          <span className={`text-sm ${
                            order.status === 'Delivered' ? 'text-green-600' : 'text-amber-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <button className="text-sm text-klinkara-primary hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <PackageOpen size={40} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">You haven't placed any orders yet.</p>
                  <a href="/shop" className="inline-block mt-4 text-klinkara-primary hover:underline">
                    Start Shopping
                  </a>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'addresses' && (
            <div>
              {dataLoading ? (
                <div className="py-10 text-center">
                  <div className="w-10 h-10 border-2 border-klinkara-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading your addresses...</p>
                </div>
              ) : addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((address: any) => (
                    <div key={address.id} className="border border-klinkara-secondary p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="font-medium text-klinkara-text">{address.name}</span>
                            <span className="text-xs bg-klinkara-neutral px-2 py-1 ml-2">
                              {address.id === 1 ? 'Default' : ''}
                            </span>
                          </div>
                          <p className="text-gray-600">{address.street}</p>
                          <p className="text-gray-600">{address.city}, {address.state} {address.pincode}</p>
                          <p className="text-gray-600 mt-1">Phone: {address.phone}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-sm text-klinkara-primary hover:underline">
                            Edit
                          </button>
                          {address.id !== 1 && (
                            <button className="text-sm text-red-600 hover:underline">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full py-2 px-4 mt-4 border border-dashed border-klinkara-secondary text-klinkara-text hover:bg-klinkara-neutral transition-colors">
                    + Add New Address
                  </button>
                </div>
              ) : (
                <div className="text-center py-10">
                  <MapPin size={40} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">You haven't saved any addresses yet.</p>
                  <button className="inline-block mt-4 text-klinkara-primary hover:underline">
                    Add Your First Address
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
