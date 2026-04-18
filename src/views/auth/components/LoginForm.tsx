'use client';

import { ChangeEvent, useState } from 'react';
import { useAuth } from '@/hooks';
import { useAuthForm } from '../hooks';
import { validateLogin } from '@/utils';
import { messages } from '@/constants';

import {
  AuthSubmitBtn,
  DividerLine,
  DividerRow,
  DividerText,
  ErrorText,
  FormTitle,
  GoogleBtn,
  ToggleLink,
  ToggleRow,
  ForgotLink,
} from '../Auth.Style';

import { AuthInput } from './AuthInput';
import { PasswordInput } from './PasswordInput';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { GoogleIcon } from '@/components/svgs';

export const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const { handleLogin, handleGoogleLogin, loading, error, user } = useAuth();

  const {
    apiError,
    setApiError,
    fieldErrors,
    setFieldErrors,
    clearFieldError,
    setSubmitted,
  } = useAuthForm({
    user,
    loading,
    error,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateLogin(email, password);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setApiError(null);
    setSubmitted(true);

    await handleLogin(email, password);
  };

  const handleGoogle = async () => {
    setApiError(null);
    setSubmitted(true);
    await handleGoogleLogin();
  };

  return (
    <>
      <FormTitle>{messages.auth.welcomeBack}</FormTitle>
      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            clearFieldError('email');
          }}
          error={fieldErrors.email}
        />

        <PasswordInput
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            clearFieldError('password');
          }}
          error={fieldErrors.password}
          placeholder="Password"
        />

        {apiError && <ErrorText>{apiError}</ErrorText>}

        <ForgotLink type="button" onClick={() => setForgotOpen(true)}>
          {messages.auth.forgotPassword}
        </ForgotLink>

        <AuthSubmitBtn disabled={loading}>
          {loading ? messages.auth.signingIn : messages.auth.signIn}
        </AuthSubmitBtn>
      </form>

      {/* Divider */}
      <DividerRow>
        <DividerLine />
        <DividerText>or continue with</DividerText>
        <DividerLine />
      </DividerRow>

      {/* Google */}
      <GoogleBtn onClick={handleGoogle} disabled={loading}>
        <GoogleIcon />
        Continue with Google
      </GoogleBtn>

      {/* Switch */}
      <ToggleRow>
        <span>Don&apos;t have an account?</span>
        <ToggleLink onClick={onSwitch}>Create one</ToggleLink>
      </ToggleRow>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        open={forgotOpen}
        onOpenChange={setForgotOpen}
      />
    </>
  );
};
