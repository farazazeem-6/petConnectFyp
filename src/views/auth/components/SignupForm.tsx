'use client';

import { ChangeEvent, useState } from 'react';
import { useAuth } from '@/hooks';
import { useAuthForm } from '../hooks/useAuthForm';
import { validateSignup } from '@/utils';
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
} from '../Auth.Style';

import { AuthInput } from './AuthInput';
import { PasswordInput } from './PasswordInput';
import { GoogleIcon } from '@/components/svgs';

export const SignupForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const { handleSignup, handleGoogleLogin, loading, error, user } = useAuth();

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

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    clearFieldError(key);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateSignup(
      form.name,
      form.email,
      form.password,
      form.confirm,
    );

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setApiError(null);
    setSubmitted(true);

    await handleSignup(form.email, form.password, form.name.trim());
  };

  const handleGoogle = async () => {
    setApiError(null);
    setSubmitted(true);
    await handleGoogleLogin();
  };

  return (
    <>
      <FormTitle>{messages.auth.signUp}</FormTitle>

      {/* Google */}
      <GoogleBtn onClick={handleGoogle} disabled={loading}>
        <GoogleIcon />
        Continue with Google
      </GoogleBtn>

      <DividerRow>
        <DividerLine />
        <DividerText>OR</DividerText>
        <DividerLine />
      </DividerRow>

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Full Name"
          placeholder="Full Name"
          value={form.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('name', e.target.value)
          }
          error={fieldErrors.name}
        />

        <AuthInput
          label="Email"
          placeholder="Email"
          value={form.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('email', e.target.value)
          }
          error={fieldErrors.email}
        />

        <PasswordInput
          value={form.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('password', e.target.value)
          }
          error={fieldErrors.password}
          placeholder="Password"
        />

        <PasswordInput
          value={form.confirm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('confirm', e.target.value)
          }
          error={fieldErrors.confirm}
          placeholder="Confirm password"
        />

        {apiError && <ErrorText>{apiError}</ErrorText>}

        <AuthSubmitBtn disabled={loading}>
          {loading
            ? messages.auth.creatingAccount
            : messages.auth.createAccount}
        </AuthSubmitBtn>
      </form>

      {/* Switch */}
      <ToggleRow>
        <span>Already have an account?</span>
        <ToggleLink onClick={onSwitch}>Sign in</ToggleLink>
      </ToggleRow>
    </>
  );
};
