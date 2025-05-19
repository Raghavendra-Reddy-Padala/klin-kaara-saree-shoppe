
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
}

const slides: Slide[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1628070288160-f6c99e9b8857?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Kanchipuram Silk Collection",
    subtitle: "Handcrafted luxury for your special moments",
    buttonText: "Shop Now",
    link: "/shop?category=kanchipuram",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Wedding Season",
    subtitle: "Premium bridal sarees for your special day",
    buttonText: "View Collection",
    link: "/shop",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1610030183116-451f9312c552?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Festive Collection",
    subtitle: "Celebrate with elegance & tradition",
    buttonText: "Explore",
    link: "/shop",
  },
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the transition duration in CSS
  };

  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Slide Content */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">
              {slide.title}
            </h2>
            <p className="text-lg text-white mb-6 animate-fade-in">
              {slide.subtitle}
            </p>
            <Link to={slide.link}>
              <button className="bg-klinkara-primary hover:bg-klinkara-accent text-white font-medium py-2 px-6 rounded-none transition-all duration-300 transform hover:scale-105 animate-scale-in">
                {slide.buttonText}
              </button>
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-none transition-all"
        onClick={goToPrevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-none transition-all"
        onClick={goToNextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`mx-1 w-2 h-2 bg-white transition-all ${
              index === currentSlide ? 'w-6 bg-klinkara-primary' : 'bg-opacity-60'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
