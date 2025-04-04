
import React from 'react';
import { Link } from 'react-router-dom';

interface FormFooterProps {
  mode: string;
}

const FormFooter: React.FC<FormFooterProps> = ({ mode }) => {
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
