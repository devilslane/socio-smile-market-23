
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import CredentialsForm from '@/components/auth/CredentialsForm';
import OtpForm from '@/components/auth/OtpForm';
import FormFooter from '@/components/auth/FormFooter';
import RoleSelector from '@/components/auth/RoleSelector';
import SubmitButton from '@/components/auth/SubmitButton';
import DoctorDocumentsForm from '@/components/auth/DoctorDocumentsForm';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode') || 'login';
  const roleParam = searchParams.get('role') || 'user';

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'credentials' | 'otp' | 'documents'>('credentials');
  
  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState(roleParam);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  
  // Doctor specific fields
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);

  const { toast } = useToast();

  // Update role when URL param changes
  useEffect(() => {
    setRole(roleParam);
  }, [roleParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'credentials') {
      // Validate form
      if (mode === 'signup' && !name.trim()) {
        toast({
          title: "Error",
          description: "Please enter your name",
          variant: "destructive"
        });
        return;
      }
      
      if (authType === 'email' && !email.trim()) {
        toast({
          title: "Error",
          description: "Please enter your email address",
          variant: "destructive"
        });
        return;
      }
      
      if (authType === 'phone' && !phone.trim()) {
        toast({
          title: "Error",
          description: "Please enter your phone number",
          variant: "destructive"
        });
        return;
      }
      
      if (authType === 'email' && !password.trim()) {
        toast({
          title: "Error",
          description: "Please enter your password",
          variant: "destructive"
        });
        return;
      }

      if (!isCaptchaVerified) {
        toast({
          title: "Error",
          description: "Please complete the captcha verification",
          variant: "destructive"
        });
        return;
      }

      // Proceed based on auth type
      if (authType === 'phone') {
        setIsLoading(true);
        // Simulate API call to send OTP
        setTimeout(() => {
          setIsLoading(false);
          setStep('otp');
          toast({
            title: "OTP Sent",
            description: `A verification code has been sent to ${phone}`,
          });
        }, 1500);
      } else {
        // Email login/signup
        setIsLoading(true);
        // Simulate authentication API call
        setTimeout(() => {
          setIsLoading(false);
          
          if (mode === 'signup') {
            if (role === 'doctor') {
              setStep('documents');
              toast({
                title: "Account Created",
                description: "Please complete your profile with professional details",
              });
            } else {
              // Regular user signup - complete
              localStorage.setItem('isAuthenticated', 'true');
              localStorage.setItem('userName', name);
              localStorage.setItem('userRole', role);
              
              toast({
                title: "Success",
                description: "Your account has been created successfully",
              });
              
              navigate('/');
            }
          } else {
            // Login successful
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', 'Demo User'); // In a real app, this would come from the API
            localStorage.setItem('userRole', role);
            
            toast({
              title: "Login Successful",
              description: "Welcome back!",
            });
            
            // Redirect based on role
            if (role === 'doctor') {
              navigate('/doctor-portal');
            } else if (role === 'admin') {
              navigate('/admin-portal');
            } else {
              navigate('/dashboard');
            }
          }
        }, 1500);
      }
    } else if (step === 'otp') {
      // Validate OTP
      if (!otp || otp.length < 4) {
        toast({
          title: "Error",
          description: "Please enter a valid verification code",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsLoading(false);
        
        if (mode === 'signup') {
          if (role === 'doctor') {
            setStep('documents');
          } else {
            // Complete signup
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', name || phone);
            localStorage.setItem('userRole', role);
            
            toast({
              title: "Success",
              description: "Your account has been created successfully",
            });
            
            navigate('/');
          }
        } else {
          // Login successful
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userName', 'Demo User');
          localStorage.setItem('userRole', role);
          
          toast({
            title: "Login Successful",
            description: "Welcome back!",
          });
          
          // Redirect based on role
          if (role === 'doctor') {
            navigate('/doctor-portal');
          } else if (role === 'admin') {
            navigate('/admin-portal');
          } else {
            navigate('/dashboard');
          }
        }
      }, 1500);
    } else if (step === 'documents') {
      // Validate doctor documents
      if (!specialization || !experience) {
        toast({
          title: "Error",
          description: "Please fill all required fields",
          variant: "destructive"
        });
        return;
      }
      
      if (!licenseFile || !certificateFile || !idFile) {
        toast({
          title: "Error",
          description: "Please upload all required documents",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      // Simulate document submission
      setTimeout(() => {
        setIsLoading(false);
        
        toast({
          title: "Documents Submitted",
          description: "Your profile is under review. We'll notify you once approved.",
        });
        
        // Since documents are submitted but pending review
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', name || email);
        localStorage.setItem('userRole', 'doctor_pending');
        
        navigate('/');
      }, 2000);
    }
  };

  const handleBackFromOtp = () => {
    setStep('credentials');
  };
  
  const handleBackFromDocuments = () => {
    setStep('credentials');
  };

  const handleCaptchaVerify = (isVerified: boolean) => {
    setIsCaptchaVerified(isVerified);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
        </h1>
        <p className="text-gray-600">
          {mode === 'login' 
            ? 'Sign in to continue to your account' 
            : 'Fill in your details to get started'
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Role Selector - Only show for login */}
        {mode === 'login' && (
          <RoleSelector role={role} />
        )}
        
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
            onBack={handleBackFromOtp}
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
            onBack={handleBackFromDocuments}
          />
        )}
        
        <SubmitButton
          isLoading={isLoading}
          step={step}
          mode={mode}
          role={role}
        />
      </form>
      
      <FormFooter mode={mode} />
    </AuthLayout>
  );
};

export default Auth;
