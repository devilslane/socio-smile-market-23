
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Captcha } from '@/components/ui/captcha';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const navigate = useNavigate();
  const { toast } = useToast();

  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  
  // Form values
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  useEffect(() => {
    // Reset form values when mode changes
    setEmail('');
    setPhone('');
    setPassword('');
    setName('');
    setOtp('');
    setStep('credentials');
    setIsCaptchaVerified(false);
    
    // Get last used phone number from localStorage
    const lastUsedPhone = localStorage.getItem('lastUsedPhone');
    if (lastUsedPhone) {
      setPhone(lastUsedPhone);
    }
  }, [mode]);

  const handleCaptchaVerify = (isVerified: boolean) => {
    setIsCaptchaVerified(isVerified);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'credentials') {
      if (!isCaptchaVerified) {
        toast({
          title: "Captcha verification required",
          description: "Please complete the captcha verification",
          variant: "destructive"
        });
        return;
      }
      
      if (authType === 'email' && (!email || !password || (mode === 'signup' && !name))) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
      
      if (authType === 'phone' && !phone) {
        toast({
          title: "Missing information",
          description: "Please enter your phone number.",
          variant: "destructive"
        });
        return;
      }
      
      // Save phone for future use
      if (authType === 'phone' && phone) {
        localStorage.setItem('lastUsedPhone', phone);
      }
      
      // Simulating OTP send
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        
        if (authType === 'phone') {
          toast({
            title: "OTP Sent",
            description: "A verification code has been sent to your phone.",
          });
          setStep('otp');
        } else {
          // For email flow in this demo, we'll just simulate success
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userName', mode === 'signup' ? name : 'User');
          
          toast({
            title: mode === 'login' ? "Welcome back!" : "Account created!",
            description: mode === 'login' 
              ? "You've successfully logged in." 
              : "Your account has been created successfully.",
          });
          navigate('/dashboard');
        }
      }, 1500);
    } else if (step === 'otp') {
      // Verify OTP
      if (!otp || otp.length < 4) {
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid verification code.",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        
        // Store auth status
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', mode === 'signup' ? name : 'User');
        
        toast({
          title: mode === 'login' ? "Welcome back!" : "Account created!",
          description: mode === 'login' 
            ? "You've successfully logged in." 
            : "Your account has been created successfully.",
        });
        navigate('/dashboard');
      }, 1500);
    }
  };

  const handleBackToCredentials = () => {
    setStep('credentials');
    setOtp('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sociodent-50 to-white">
      <div className="flex flex-col flex-grow items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to Home */}
          <Link to="/" className="inline-flex items-center text-sociodent-600 hover:text-sociodent-700 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
          
          {/* Auth Card */}
          <div className="glass-card rounded-2xl p-8 border border-white/50 shadow-glass">
            {/* Logo */}
            <div className="text-center mb-6">
              <Link to="/" className="inline-block text-2xl font-bold text-sociodent-700">
                SocioDent
              </Link>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {step === 'credentials' 
                  ? (mode === 'login' ? 'Welcome Back' : 'Create Your Account') 
                  : 'Verify Your Phone'
                }
              </h1>
              <p className="text-gray-600">
                {step === 'credentials'
                  ? (mode === 'login' 
                    ? 'Sign in to access your account' 
                    : 'Join SocioDent for better dental care')
                  : 'Enter the code we sent to your phone'
                }
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {step === 'credentials' && (
                <>
                  {/* Auth Type Selector */}
                  <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                    <button
                      type="button"
                      className={cn(
                        "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                        authType === 'email'
                          ? "bg-white shadow-sm text-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      )}
                      onClick={() => setAuthType('email')}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                        authType === 'phone'
                          ? "bg-white shadow-sm text-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      )}
                      onClick={() => setAuthType('phone')}
                    >
                      Phone
                    </button>
                  </div>
                  
                  {/* Name - only for signup */}
                  {mode === 'signup' && (
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="input-primary"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  )}
                  
                  {/* Email or Phone */}
                  {authType === 'email' ? (
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          className="input-primary pl-10"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          className="input-primary pl-10"
                          placeholder="+1 (555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Password - only for email auth */}
                  {authType === 'email' && (
                    <div className="mb-6">
                      <div className="flex justify-between mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        {mode === 'login' && (
                          <Link to="/forgot-password" className="text-sm text-sociodent-600 hover:text-sociodent-700">
                            Forgot password?
                          </Link>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="input-primary pr-10"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Captcha */}
                  <div className="mb-6">
                    <Captcha 
                      onVerify={handleCaptchaVerify} 
                      className="mb-4"
                    />
                  </div>
                </>
              )}
              
              {/* OTP Input */}
              {step === 'otp' && (
                <div className="mb-6">
                  <div className="mb-4">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      id="otp"
                      className="input-primary text-center text-xl tracking-widest"
                      placeholder="••••"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Didn't receive the code?{" "}
                    <button 
                      type="button"
                      className="text-sociodent-600 hover:text-sociodent-700 font-medium"
                    >
                      Resend
                    </button>
                  </p>
                  
                  <button
                    type="button"
                    className="flex items-center justify-center w-full text-sociodent-600 hover:text-sociodent-700 mb-2"
                    onClick={handleBackToCredentials}
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to {authType === 'email' ? 'email' : 'phone number'}
                  </button>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                className={cn(
                  "button-primary w-full",
                  isLoading && "opacity-70 cursor-not-allowed"
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span>
                    {step === 'credentials' 
                      ? (mode === 'login' ? 'Sign In' : 'Create Account') 
                      : 'Verify'
                    }
                  </span>
                )}
              </button>
            </form>
            
            {/* Auth Switch */}
            {step === 'credentials' && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
