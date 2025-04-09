
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import FormFooter from '@/components/auth/FormFooter';
import RoleSelector from '@/components/auth/RoleSelector';
import SubmitButton from '@/components/auth/SubmitButton';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthStepContainer from '@/components/auth/AuthStepContainer';
import { useAuthForm } from '@/hooks/useAuthForm';

const Auth = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode') || 'login';
  const roleParam = searchParams.get('role') || 'user';
  const [role, setRole] = React.useState(roleParam);

  const {
    formState,
    setAuthType,
    setEmail,
    setPhone,
    setPassword,
    setName,
    setOtp,
    setIsCaptchaVerified,
    setSpecialization,
    setExperience,
    setBio,
    setLicenseFile,
    setCertificateFile,
    setIdFile,
    handleBackFromOtp,
    handleBackFromDocuments,
    handleSubmit
  } = useAuthForm({ mode, role });

  useEffect(() => {
    setRole(roleParam);
  }, [roleParam]);

  return (
    <AuthLayout>
      <AuthHeader mode={mode} />
      
      <form onSubmit={handleSubmit}>
        {mode === 'login' && (
          <RoleSelector role={role} />
        )}
        
        <AuthStepContainer 
          mode={mode}
          role={role}
          formState={formState}
          setAuthType={setAuthType}
          setEmail={setEmail}
          setPhone={setPhone}
          setPassword={setPassword}
          setName={setName}
          setOtp={setOtp}
          setIsCaptchaVerified={setIsCaptchaVerified}
          setSpecialization={setSpecialization}
          setExperience={setExperience}
          setBio={setBio}
          setLicenseFile={setLicenseFile}
          setCertificateFile={setCertificateFile}
          setIdFile={setIdFile}
          handleBackFromOtp={handleBackFromOtp}
          handleBackFromDocuments={handleBackFromDocuments}
        />
        
        <SubmitButton
          isLoading={formState.isLoading}
          step={formState.step}
          mode={mode}
          role={role}
        />
      </form>
      
      <FormFooter mode={mode} role={role} />
    </AuthLayout>
  );
};

export default Auth;
