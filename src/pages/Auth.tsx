
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Import components
import AuthLayout from '@/components/auth/AuthLayout';
import RoleSelector from '@/components/auth/RoleSelector';
import CredentialsForm from '@/components/auth/CredentialsForm';
import OtpForm from '@/components/auth/OtpForm';
import DoctorDocumentsForm from '@/components/auth/DoctorDocumentsForm';
import SubmitButton from '@/components/auth/SubmitButton';
import FormFooter from '@/components/auth/FormFooter';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const role = searchParams.get('role') || 'user';
  const navigate = useNavigate();
  const { toast } = useToast();

  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'credentials' | 'otp' | 'documents'>('credentials');
  
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setEmail('');
    setPhone('');
    setPassword('');
    setName('');
    setOtp('');
    setStep('credentials');
    setIsCaptchaVerified(false);
    setLicenseFile(null);
    setCertificateFile(null);
    setIdFile(null);
    setSpecialization('');
    setExperience('');
    setBio('');
    
    const lastUsedPhone = localStorage.getItem('lastUsedPhone');
    if (lastUsedPhone) {
      setPhone(lastUsedPhone);
    }
  }, [mode, role]);

  const handleCaptchaVerify = (isVerified: boolean) => {
    setIsCaptchaVerified(isVerified);
  };

  const redirectBasedOnRole = (userRole: string) => {
    console.log("Redirecting user with role:", userRole);
    
    if (userRole === 'doctor') {
      navigate('/doctor-portal');
    } else if (userRole === 'admin') {
      navigate('/admin-portal');
    } else {
      navigate('/dashboard');
    }
  };

  const handleBackToCredentials = () => {
    setStep('credentials');
    setOtp('');
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
      
      if (authType === 'phone' && phone) {
        localStorage.setItem('lastUsedPhone', phone);
      }
      
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
          if (mode === 'signup' && role === 'doctor') {
            toast({
              title: "Complete your profile",
              description: "Please submit your documents for verification.",
            });
            setStep('documents');
          } else {
            completeAuthentication();
          }
        }
      }, 1000);
    } else if (step === 'otp') {
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
        
        if (mode === 'signup' && role === 'doctor') {
          toast({
            title: "Complete your profile",
            description: "Please submit your documents for verification.",
          });
          setStep('documents');
        } else {
          completeAuthentication();
        }
      }, 1000);
    } else if (step === 'documents') {
      if (!licenseFile || !certificateFile || !idFile || !specialization || !experience) {
        toast({
          title: "Missing information",
          description: "Please upload all required documents and fill in all fields.",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        
        toast({
          title: "Documents submitted",
          description: "Your documents have been submitted for verification. You will be notified when your account is approved.",
        });

        localStorage.setItem('doctorVerificationStatus', 'pending');
        
        localStorage.setItem('userRole', role);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', name);
        
        navigate('/dashboard');
      }, 1000);
    }
  };
  
  const completeAuthentication = () => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', mode === 'signup' ? name : 'User');
    
    toast({
      title: mode === 'login' ? "Welcome back!" : "Account created!",
      description: mode === 'login' 
        ? "You've successfully logged in." 
        : "Your account has been created successfully.",
    });

    redirectBasedOnRole(role);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 'credentials' 
            ? (mode === 'login' ? 'Welcome Back' : 'Create Your Account') 
            : step === 'otp'
              ? 'Verify Your Phone'
              : 'Complete Your Profile'
          }
        </h1>
        <p className="text-gray-600">
          {step === 'credentials'
            ? (mode === 'login' 
              ? 'Sign in to access your account' 
              : 'Join SocioDent for better dental care')
            : step === 'otp'
              ? 'Enter the code we sent to your phone'
              : 'Upload your credentials for verification'
          }
        </p>
      </div>

      {step === 'credentials' && mode === 'login' && (
        <RoleSelector role={role} />
      )}
      
      <form onSubmit={handleSubmit}>
        {step === 'credentials' && (
          <CredentialsForm
            mode={mode}
            authType={authType}
            setAuthType={setAuthType}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            onCaptchaVerify={handleCaptchaVerify}
          />
        )}
        
        {step === 'otp' && (
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            onBack={handleBackToCredentials}
            authType={authType}
          />
        )}
        
        {step === 'documents' && (
          <DoctorDocumentsForm
            specialization={specialization}
            setSpecialization={setSpecialization}
            experience={experience}
            setExperience={setExperience}
            bio={bio}
            setBio={setBio}
            licenseFile={licenseFile}
            setLicenseFile={setLicenseFile}
            certificateFile={certificateFile}
            setCertificateFile={setCertificateFile}
            idFile={idFile}
            setIdFile={setIdFile}
            onBack={handleBackToCredentials}
          />
        )}
        
        <SubmitButton
          isLoading={isLoading}
          step={step}
          mode={mode}
          role={role}
        />
      </form>
      
      {step === 'credentials' && (
        <FormFooter mode={mode} />
      )}
    </AuthLayout>
  );
};

export default Auth;
