
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you!",
        description: "You've successfully subscribed to our newsletter.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-klinkara-neutral py-16 px-6">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="section-title mb-6">Join Our Newsletter</h2>
        <p className="mb-6 text-klinkara-text">
          Subscribe to receive updates on new collections, exclusive offers, and styling tips.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-grow py-3 px-4 border border-klinkara-secondary bg-white focus:border-klinkara-primary transition-colors outline-none rounded-none"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-klinkara-primary hover:bg-klinkara-accent text-white py-3 px-6 font-medium transition-all duration-300 rounded-none ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
