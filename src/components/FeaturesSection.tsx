
import React, { useEffect } from 'react';
import { 
  Calendar, 
  Home, 
  MapPin, 
  ShoppingBag, 
  MessagesSquare, 
  Shield,
  BadgeCheck,
  Clock
} from 'lucide-react';

const FeaturesSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Calendar size={24} />,
      title: 'Virtual Consultations',
      description: 'Connect with dental professionals from the comfort of your home via video calls.',
    },
    {
      icon: <Home size={24} />,
      title: 'Home Consultations',
      description: 'Schedule home visits for personalized dental care without leaving your house.',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Clinic Appointments',
      description: 'Find and book appointments with top-rated dental clinics near your location.',
    },
    {
      icon: <ShoppingBag size={24} />,
      title: 'Dental Marketplace',
      description: 'Shop for quality dental products with expert recommendations and reviews.',
    },
    {
      icon: <MessagesSquare size={24} />,
      title: 'Dental Education',
      description: 'Access educational resources and get answers to your dental questions.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Payments',
      description: 'Enjoy safe and transparent payment processing for all services.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="reveal-on-scroll inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
            Comprehensive Features
          </span>
          <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Everything You Need for Complete Dental Care
          </h2>
          <p className="reveal-on-scroll text-lg text-gray-600">
            SocioDent brings together all aspects of dental care in one seamless platform, making it easier than ever to manage your dental health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="reveal-on-scroll neo-card card-hover border border-gray-100"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-sociodent-50 text-sociodent-600 rounded-xl mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <span className="reveal-on-scroll inline-block px-3 py-1 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
                Why Choose SocioDent
              </span>
              <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold text-gray-900">
                Dental Care Designed for Modern Life
              </h2>
              <p className="reveal-on-scroll text-lg text-gray-600">
                We've reimagined the dental care experience to fit seamlessly into your busy lifestyle, making it easier to prioritize your dental health.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  {
                    icon: <BadgeCheck size={20} />,
                    title: 'Verified Professionals',
                    description: 'All dentists on our platform are thoroughly vetted and certified.'
                  },
                  {
                    icon: <Clock size={20} />,
                    title: 'Save Time and Effort',
                    description: 'No more phone calls or waiting. Book appointments instantly online.'
                  },
                  {
                    icon: <ShoppingBag size={20} />,
                    title: 'One-Stop Solution',
                    description: 'From consultations to products, get everything you need in one place.'
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="reveal-on-scroll flex items-start"
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <div className="mt-1 mr-4 w-6 h-6 flex-shrink-0 flex items-center justify-center text-sociodent-600">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="reveal-on-scroll aspect-square relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-sociodent-500/20 to-sociodent-100/30 z-10 rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Patient at dental consultation" 
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                loading="lazy"
              />
            </div>
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-sociodent-100 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
