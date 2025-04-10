
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sociodent-50 to-white">
      <div className="flex flex-col flex-grow items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-sociodent-600 hover:text-sociodent-700 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
          
          <div className="glass-card rounded-2xl p-8 border border-white/50 shadow-glass">
            <div className="text-center mb-6">
              <Link to="/" className="inline-block">
                <img 
                  src="/public/logo.png" 
                  alt="SocioDent Logo" 
                  className="h-12 mx-auto object-contain"
                />
              </Link>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
