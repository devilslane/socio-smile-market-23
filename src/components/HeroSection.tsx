
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShoppingBag, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      },
      { threshold: 0.1 }
    );
    
    const heroElements = document.querySelectorAll('.reveal-on-scroll');
    heroElements.forEach((el) => observer.observe(el));
    
    return () => {
      heroElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-white to-sociodent-50 overflow-hidden"
    >
      <div className="container-custom relative">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mr-16 mt-16 w-64 h-64 bg-sociodent-100 rounded-full blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-5xl mx-auto">
          {/* Chip */}
          <div 
            className="reveal-on-scroll inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium"
            style={{ transitionDelay: '0ms' }}
          >
            Introducing SocioDent
          </div>
          
          {/* Headline */}
          <h1 
            className="reveal-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            style={{ transitionDelay: '100ms' }}
          >
            Your Complete Dental <br className="hidden md:block" />
            <span className="text-coral-500">Care Solution</span>
          </h1>
          
          {/* Subheading */}
          <p 
            className="reveal-on-scroll text-lg md:text-xl text-gray-600 mb-8 max-w-2xl"
            style={{ transitionDelay: '200ms' }}
          >
            Book consultations, shop dental products, and access expert advice — all in one seamless platform. Experience dental care reimagined.
          </p>
          
          {/* CTA Buttons */}
          <div 
            className="reveal-on-scroll flex flex-col sm:flex-row gap-4 mb-16"
            style={{ transitionDelay: '300ms' }}
          >
            <Link to="/auth?mode=signup" className="button-primary text-center">
              Get Started
            </Link>
            <Link to="/consultation" className="button-secondary text-center">
              Find a Dentist
            </Link>
          </div>
          
          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Calendar className="text-sociodent-600" size={24} />,
                title: "Easy Appointment Booking",
                description: "Schedule virtual or in-person consultations with top dentists in just a few clicks.",
                delay: 400
              },
              {
                icon: <ShoppingBag className="text-sociodent-600" size={24} />,
                title: "Dental Marketplace",
                description: "Shop quality dental products with expert recommendations and fast delivery.",
                delay: 500
              },
              {
                icon: <MessageCircle className="text-sociodent-600" size={24} />,
                title: "Expert Advice & Support",
                description: "Get answers to your dental questions from our community of professionals.",
                delay: 600
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="reveal-on-scroll glass-card rounded-2xl p-6 card-hover"
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-sociodent-50 rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
