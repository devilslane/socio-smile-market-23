import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src="/assets/logo.png" 
                alt="SocioDent Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              Transforming dental care with technology. Book appointments, shop products, and access dental education all in one place.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-sociodent-100 hover:text-sociodent-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-sociodent-100 hover:text-sociodent-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-sociodent-100 hover:text-sociodent-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Find a Dentist', path: '/consultation' },
                { name: 'Marketplace', path: '/marketplace' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-sociodent-600 transition-colors text-sm inline-flex items-center"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-sociodent-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  123 Dental Avenue, Health District, CA 92603
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-sociodent-500 mr-3 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-sociodent-500 mr-3 flex-shrink-0" />
                <span className="text-gray-600 text-sm">info@sociodent.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest updates on dental care, promotions, and more.
            </p>
            <form className="space-y-2">
              <div className="flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-sociodent-400 focus:border-transparent transition-all duration-300 text-sm"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-sociodent-500 text-white py-2 px-4 rounded-lg hover:bg-sociodent-600 transition-colors text-sm font-medium"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} SocioDent. All rights reserved.
          </p>
          <div className="mt-2 md:mt-0 flex justify-center md:justify-end space-x-6">
            <Link to="/privacy" className="text-gray-600 hover:text-sociodent-600 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-sociodent-600 transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
