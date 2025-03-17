
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import { Calendar, Tooth, ShoppingBag, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  // Initialize reveal on scroll animations
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

  // Sample dentists data
  const featuredDentists = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialty: 'Orthodontist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      location: 'New York, NY',
      rating: 4.9,
      reviewCount: 124
    },
    {
      id: '2',
      name: 'Michael Chen',
      specialty: 'Periodontist',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      location: 'San Francisco, CA',
      rating: 4.8,
      reviewCount: 87
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      specialty: 'Cosmetic Dentist',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      location: 'Miami, FL',
      rating: 4.7,
      reviewCount: 93
    }
  ];

  // Sample products data
  const featuredProducts = [
    {
      id: '1',
      name: 'Sonic Pro Electric Toothbrush',
      image: 'https://images.unsplash.com/photo-1559304822-9eb2813c9844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 79.99,
      rating: 4.8,
      reviewCount: 342,
      category: 'Electric Toothbrush'
    },
    {
      id: '2',
      name: 'Premium Teeth Whitening Kit',
      image: 'https://images.unsplash.com/photo-1570001276999-bc13027db47b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 49.99,
      rating: 4.6,
      reviewCount: 219,
      category: 'Whitening'
    },
    {
      id: '3',
      name: 'Organic Mint Dental Floss',
      image: 'https://images.unsplash.com/photo-1612887726773-e64e49123924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      price: 8.99,
      rating: 4.7,
      reviewCount: 156,
      category: 'Floss'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Consultation Types */}
        <section className="py-20 bg-sociodent-50">
          <div className="container-custom">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="reveal-on-scroll inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
                Flexible Care Options
              </span>
              <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Choose How You Want Your Consultation
              </h2>
              <p className="reveal-on-scroll text-lg text-gray-600">
                Whether you prefer the convenience of a virtual call, the comfort of your home, or a visit to a dental clinic, we've got you covered.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Calendar className="text-sociodent-600" size={32} />,
                  title: 'Virtual Consultation',
                  description: 'Connect with a dentist via video call, share photos, and get expert advice without leaving home.',
                  features: ['No travel needed', 'Flexible scheduling', 'Secure video platform'],
                  action: 'Book Virtual',
                  link: '/consultation?type=virtual',
                  image: 'https://images.unsplash.com/photo-1516914589923-f105f1535f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                },
                {
                  icon: <Tooth className="text-sociodent-600" size={32} />,
                  title: 'Home Consultation',
                  description: 'Have a qualified dentist visit your home for check-ups, advice, and basic treatments.',
                  features: ['Comfort of your home', 'Family appointments', 'Thorough assessment'],
                  action: 'Book Home Visit',
                  link: '/consultation?type=home',
                  image: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                },
                {
                  icon: <MapPin className="text-sociodent-600" size={32} />,
                  title: 'Clinic Consultation',
                  description: 'Visit a dental clinic for comprehensive care with access to full dental equipment.',
                  features: ['Full dental facilities', 'Complete treatments', 'In-person care'],
                  action: 'Find Clinic',
                  link: '/consultation?type=clinic',
                  image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                }
              ].map((option, index) => (
                <div 
                  key={index}
                  className="reveal-on-scroll glass-card rounded-2xl overflow-hidden border border-white/50 card-hover"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-[3/2] relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sociodent-900/30"></div>
                    <img 
                      src={option.image} 
                      alt={option.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-sociodent-50 rounded-full mb-5">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-5">
                      {option.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-sociodent-500 mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={option.link} className="button-primary w-full flex justify-center">
                      {option.action}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Dentists */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="reveal-on-scroll inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
                  Expert Professionals
                </span>
                <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Meet Our Top Dentists
                </h2>
                <p className="reveal-on-scroll text-lg text-gray-600 max-w-2xl">
                  Highly qualified dentists ready to provide exceptional care for all your dental needs.
                </p>
              </div>
              
              <Link to="/consultation" className="mt-6 md:mt-0 group flex items-center font-medium text-sociodent-600 hover:text-sociodent-700 transition-colors">
                View All Dentists
                <ArrowRight size={18} className="ml-1 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDentists.map((dentist, index) => (
                <div 
                  key={dentist.id}
                  className="reveal-on-scroll glass-card rounded-2xl overflow-hidden card-hover border border-white/50"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-[3/2] relative">
                    <img 
                      src={dentist.image} 
                      alt={`Dr. ${dentist.name}`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="text-yellow-400 w-4 h-4 mr-1" />
                      <span>{dentist.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-xs ml-1">({dentist.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">Dr. {dentist.name}</h3>
                    <p className="text-sociodent-600 mb-2">{dentist.specialty}</p>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{dentist.location}</span>
                    </div>
                    
                    <Link 
                      to={`/consultation/${dentist.id}`} 
                      className="button-primary w-full flex justify-center"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="reveal-on-scroll inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
                  Dental Products
                </span>
                <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Shop Quality Products
                </h2>
                <p className="reveal-on-scroll text-lg text-gray-600 max-w-2xl">
                  Expert-recommended products to maintain your dental health between appointments.
                </p>
              </div>
              
              <Link to="/marketplace" className="mt-6 md:mt-0 group flex items-center font-medium text-sociodent-600 hover:text-sociodent-700 transition-colors">
                Browse All Products
                <ArrowRight size={18} className="ml-1 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="reveal-on-scroll glass-card rounded-2xl overflow-hidden card-hover"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Link to={`/marketplace/${product.id}`} className="block aspect-square p-8 relative bg-white">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-sociodent-100 text-sociodent-700 px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <Link to={`/marketplace/${product.id}`} className="hover:text-sociodent-600 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    </Link>
                    
                    <div className="flex items-center mt-2 mb-3">
                      <div className="flex items-center text-sm">
                        <Star className="text-yellow-400 w-4 h-4 mr-1" />
                        <span className="font-medium">{product.rating.toFixed(1)}</span>
                        <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                      <button 
                        className="button-primary py-2 px-3 text-sm flex items-center"
                      >
                        <ShoppingBag size={16} className="mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-sociodent-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
          <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Dental Care Experience?
              </h2>
              <p className="reveal-on-scroll text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Join thousands of satisfied patients who have made SocioDent their trusted dental care partner.
              </p>
              <div className="reveal-on-scroll flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth?mode=signup" className="button-primary bg-white text-sociodent-700 hover:bg-gray-100">
                  Create Your Account
                </Link>
                <Link to="/consultation" className="button-secondary bg-transparent text-white border-white hover:bg-white/10">
                  Find a Dentist
                </Link>
              </div>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sociodent-500 rounded-full blur-3xl opacity-30 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sociodent-500 rounded-full blur-3xl opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
