
import React from 'react';
import { Link } from 'react-router-dom';

interface FormFooterProps {
  mode: string;
  role?: string;
}

const FormFooter: React.FC<FormFooterProps> = ({ mode, role = 'user' }) => {
  // Custom message for doctor role
  if (role === 'doctor' && mode === 'login') {
    return (
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Not Registered as a Doctor with us?{" "}
          <Link 
            to={'/auth?mode=signup&role=doctor'} 
            className="text-sociodent-600 hover:text-sociodent-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    );
  }
  
  // Default message for other roles
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600">
        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
        <Link 
          to={mode === 'login' ? '/auth?mode=signup' : '/auth?mode=login'} 
          className="text-sociodent-600 hover:text-sociodent-700 font-medium"
        >
          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
};

export default FormFooter;
