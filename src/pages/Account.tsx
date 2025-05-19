
import React, { useState } from 'react';
import { UserRound } from 'lucide-react';

const Account = () => {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in a real app, this would validate with a backend
    setUser({ name: 'Test User', email: formData.email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-klinkara-neutral border border-klinkara-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <UserRound size={40} className="text-klinkara-primary" />
          </div>
          <h1 className="text-2xl font-bold text-klinkara-text">My Account</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>
        
        <div className="space-y-8">
          <div className="border border-klinkara-secondary bg-white p-6">
            <h2 className="text-lg font-semibold text-klinkara-text mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Name</span>
                <p className="font-medium text-klinkara-text">Test User</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email</span>
                <p className="font-medium text-klinkara-text">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="border border-klinkara-secondary bg-white p-6">
            <h2 className="text-lg font-semibold text-klinkara-text mb-4">Order History</h2>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </div>
          
          <div className="border border-klinkara-secondary bg-white p-6">
            <h2 className="text-lg font-semibold text-klinkara-text mb-4">Saved Addresses</h2>
            <p className="text-gray-600">You haven't saved any addresses yet.</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 border border-klinkara-primary text-klinkara-primary hover:bg-klinkara-primary hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-klinkara-text mb-6 text-center">Sign In</h1>
      
      <div className="border border-klinkara-secondary bg-white p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-klinkara-text mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
        
        <div className="mt-6 pt-6 border-t border-klinkara-secondary text-center">
          <p className="text-gray-600 mb-4">
            Don't have an account?
          </p>
          <a
            href="#"
            className="block w-full border border-klinkara-secondary bg-transparent text-klinkara-text py-2 font-medium hover:bg-klinkara-neutral transition-colors"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Account;
