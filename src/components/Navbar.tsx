
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, UserCog, BadgeHelp, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const storedName = localStorage.getItem('userName') || 'User';
      const storedRole = localStorage.getItem('userRole') || 'user';
      
      setIsAuthenticated(authStatus);
      setUserName(storedName);
      setUserRole(storedRole);
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserName('');
    setUserRole('');
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
    
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'About', path: '/about' },
  ];

  const userNavLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'About', path: '/about' },
  ];

  const doctorNavLinks = [
    { name: 'Doctor Portal', path: '/doctor-portal' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'About', path: '/about' },
  ];

  const adminNavLinks = [
    { name: 'Admin Portal', path: '/admin-portal' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'About', path: '/about' },
  ];

  let activeLinks = navLinks;
  if (isAuthenticated) {
    if (userRole === 'doctor') {
      activeLinks = doctorNavLinks;
    } else if (userRole === 'admin') {
      activeLinks = adminNavLinks;
    } else {
      activeLinks = userNavLinks;
    }
  }

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
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold transition-all duration-300"
          >
            <img 
              src="/gh-pages/logo.png" 
              alt="SocioDent Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {activeLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:text-sociodent-600',
                  location.pathname === link.path
                    ? 'text-coral-500'
                    : 'text-gray-700'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/checkout" className="relative p-2 text-gray-700 hover:text-sociodent-600 transition-colors">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-coral-500 rounded-full">
                    0
                  </span>
                </Link>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                    aria-label="Log out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
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

          <button
            className="lg:hidden p-2 text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
