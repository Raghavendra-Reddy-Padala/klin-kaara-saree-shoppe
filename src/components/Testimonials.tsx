
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    text: "The Kanchipuram silk saree I purchased from KlinKaaRa exceeded my expectations! The quality is exceptional, and the design is absolutely stunning. I received numerous compliments at my daughter's wedding.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 2,
    name: "Ananya Patel",
    location: "Mumbai",
    text: "KlinKaaRa sarees are truly a work of art. The craftsmanship and attention to detail are remarkable. The saree I bought for my sister's wedding was the perfect blend of tradition and elegance.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 3,
    name: "Meera Singh",
    location: "Bangalore",
    text: "I've purchased multiple sarees from KlinKaaRa, and each one is more beautiful than the last. The quality is impeccable, and the designs are timeless. Highly recommend for anyone looking for authentic Indian sarees.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const goToNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-10 bg-klinkara-neutral overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e27d60' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>
      
      <div className="max-w-md mx-auto px-6 relative">
        <h2 className="section-title text-center mb-8">What Our Customers Say</h2>
        
        <div className="relative h-56">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute w-full transition-all duration-500 ease-in-out ${
                index === currentTestimonial
                  ? 'opacity-100 translate-x-0'
                  : index < currentTestimonial
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="bg-white p-6 shadow-sm border border-klinkara-secondary rounded-none text-center">
                <div className="flex justify-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 object-cover rounded-full border-2 border-klinkara-primary" 
                  />
                </div>
                <p className="text-klinkara-text italic mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="text-klinkara-primary font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={goToPrevTestimonial}
            className="p-2 bg-white border border-klinkara-secondary hover:bg-klinkara-neutral"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 mx-1 ${
                index === currentTestimonial ? 'bg-klinkara-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
          <button
            onClick={goToNextTestimonial}
            className="p-2 bg-white border border-klinkara-secondary hover:bg-klinkara-neutral"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
