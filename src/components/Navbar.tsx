
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isAuthenticated = false; // This will be replaced with actual auth logic later

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || isOpen
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-sociodent-700 transition-all duration-300 hover:text-sociodent-500"
          >
            <span className="flex items-center gap-2">
              SocioDent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:text-sociodent-600',
                  location.pathname === link.path
                    ? 'text-sociodent-600'
                    : 'text-gray-700'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth/Cart Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-sociodent-600 transition-colors">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-sociodent-500 rounded-full">
                    0
                  </span>
                </Link>
                <Link to="/dashboard" className="button-secondary py-2">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth?mode=login" className="button-text">
                  Log in
                </Link>
                <Link to="/auth?mode=signup" className="button-primary py-2">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            'fixed inset-0 bg-white z-40 pt-20 pb-6 px-6 flex flex-col lg:hidden transition-all duration-300 ease-in-out',
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          )}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-lg font-medium py-2 border-b border-gray-100 transition-all',
                  location.pathname === link.path
                    ? 'text-sociodent-600'
                    : 'text-gray-700'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="flex items-center gap-2 py-3">
                  <ShoppingCart size={20} />
                  <span>Cart (0)</span>
                </Link>
                <Link to="/dashboard" className="button-primary w-full flex justify-center">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth?mode=login" className="button-secondary w-full flex justify-center">
                  Log in
                </Link>
                <Link to="/auth?mode=signup" className="button-primary w-full flex justify-center">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
