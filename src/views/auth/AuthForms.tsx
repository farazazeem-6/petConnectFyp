'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, GoogleIcon } from '@/components/svgs';
import {
  AuthSubmitBtn,
  DividerLine,
  DividerRow,
  DividerText,
  ErrorText,
  FieldLabel,
  FieldWrapper,
  ForgotLink,
  FormSubtitle,
  FormTitle,
  GoogleBtn,
  InputIconBtn,
  InputRelative,
  StyledInput,
  ToggleLink,
  ToggleRow,
} from './Auth.Style';
import { useAuth } from '@/hooks';

// ─── Validation ──────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Maps Firebase error codes → readable messages */
const friendlyError = (raw: string | null): string | null => {
  if (!raw) return null;
  if (raw.includes('user-not-found')) return 'No account found with this email.';
  if (raw.includes('wrong-password') || raw.includes('invalid-credential') || raw.includes('INVALID_LOGIN_CREDENTIALS'))
    return 'Incorrect email or password. Please try again.';
  if (raw.includes('email-already-in-use')) return 'This email is already registered. Sign in instead.';
  if (raw.includes('too-many-requests')) return 'Too many attempts. Please wait a moment and try again.';
  if (raw.includes('network-request-failed')) return 'Network error. Check your connection and retry.';
  if (raw.includes('popup-closed-by-user')) return 'Google sign-in was cancelled.';
  return raw; // fall back to raw if unrecognised
};

// ─── LoginForm ───────────────────────────────────────────
export const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const { handleLogin, handleGoogleLogin, loading, error, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Safe redirect in useEffect — never in render
  useEffect(() => {
    if (submitted && user && !loading) {
      router.push('/');
    }
  }, [submitted, user, loading, router]);

  // Keep local apiError in sync with Redux error after a submission
  useEffect(() => {
    if (submitted) {
      setApiError(friendlyError(error));
    }
  }, [error, submitted]);

  const validate = () => {
    const e: typeof fieldErrors = {};
    if (!email) e.email = 'Email is required';
    else if (!isValidEmail(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
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
      <FormTitle>Welcome Back!</FormTitle>
      <FormSubtitle>Sign in to your Pet Connect account</FormSubtitle>

      <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
        {/* Email */}
        <FieldWrapper>
          <FieldLabel htmlFor="login-email">Email</FieldLabel>
          <StyledInput
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Clear api error as soon as user starts editing email
              if (apiError) setApiError(null);
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            invalid={!!fieldErrors.email}
            autoComplete="email"
          />
          {fieldErrors.email && <ErrorText>{fieldErrors.email}</ErrorText>}
        </FieldWrapper>

        {/* Password */}
        <FieldWrapper>
          <FieldLabel htmlFor="login-password">Password</FieldLabel>
          <InputRelative>
            <StyledInput
              id="login-password"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              invalid={!!fieldErrors.password}
              hasRight={true}
              autoComplete="current-password"
            />
            <InputIconBtn
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPass((p) => !p)}
            >
              <EyeIcon css={{ width: '$px$18', height: '$px$18' }} />
            </InputIconBtn>
          </InputRelative>
          {fieldErrors.password && <ErrorText>{fieldErrors.password}</ErrorText>}
        </FieldWrapper>

        {/* API-level error shown between password field and forgot link */}
        {apiError && (
          <ErrorText css={{ mb: '$px$6', mt: '-$px$4' }}>{apiError}</ErrorText>
        )}

        <ForgotLink type="button">Forgot Password?</ForgotLink>

        <AuthSubmitBtn type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </AuthSubmitBtn>
      </form>

      {/* Divider */}
      <DividerRow>
        <DividerLine />
        <DividerText>or continue with</DividerText>
        <DividerLine />
      </DividerRow>

      {/* Google */}
      <GoogleBtn type="button" onClick={handleGoogle} disabled={loading}>
        <GoogleIcon css={{ width: '$px$20', height: '$px$20' }} />
        Continue with Google
      </GoogleBtn>

      {/* Switch to signup */}
      <ToggleRow>
        <span>Don&apos;t have an account?</span>
        <ToggleLink type="button" onClick={onSwitch}>Create one</ToggleLink>
      </ToggleRow>
    </>
  );
};

// ─── SignupForm ───────────────────────────────────────────
export const SignupForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const { handleSignup, handleGoogleLogin, loading, error, user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string; email?: string; password?: string; confirm?: string;
  }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Safe redirect in useEffect — never in render
  useEffect(() => {
    if (submitted && user && !loading) {
      router.push('/');
    }
  }, [submitted, user, loading, router]);

  // Sync Redux error → local apiError
  useEffect(() => {
    if (submitted) {
      setApiError(friendlyError(error));
    }
  }, [error, submitted]);

  const validate = () => {
    const e: typeof fieldErrors = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email) e.email = 'Email is required';
    else if (!isValidEmail(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!confirm) e.confirm = 'Please confirm your password';
    else if (confirm !== password) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setApiError(null);
    setSubmitted(true);
    await handleSignup(email, password, name.trim());
  };

  const handleGoogle = async () => {
    setApiError(null);
    setSubmitted(true);
    await handleGoogleLogin();
  };

  return (
    <>
      <FormTitle>Sign Up</FormTitle>

      {/* Google at top */}
      <GoogleBtn type="button" onClick={handleGoogle} disabled={loading}>
        <GoogleIcon css={{ width: '$px$20', height: '$px$20' }} />
        Continue with Google
      </GoogleBtn>

      <DividerRow>
        <DividerLine />
        <DividerText>OR</DividerText>
        <DividerLine />
      </DividerRow>

      <FormSubtitle css={{ mb: '$px$16', textAlign: 'center' }}>
        Fill in the details to create a new account.
      </FormSubtitle>

      <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
        {/* Full Name */}
        <FieldWrapper>
          <FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
          <StyledInput
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
            }}
            invalid={!!fieldErrors.name}
            autoComplete="name"
          />
          {fieldErrors.name && <ErrorText>{fieldErrors.name}</ErrorText>}
        </FieldWrapper>

        {/* Email */}
        <FieldWrapper>
          <FieldLabel htmlFor="signup-email">Email</FieldLabel>
          <StyledInput
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (apiError) setApiError(null);
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            invalid={!!fieldErrors.email}
            autoComplete="email"
          />
          {fieldErrors.email && <ErrorText>{fieldErrors.email}</ErrorText>}
        </FieldWrapper>

        {/* Password */}
        <FieldWrapper>
          <FieldLabel htmlFor="signup-password">Password</FieldLabel>
          <InputRelative>
            <StyledInput
              id="signup-password"
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              invalid={!!fieldErrors.password}
              hasRight={true}
              autoComplete="new-password"
            />
            <InputIconBtn
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPass((p) => !p)}
            >
              <EyeIcon css={{ width: '$px$18', height: '$px$18' }} />
            </InputIconBtn>
          </InputRelative>
          {fieldErrors.password && <ErrorText>{fieldErrors.password}</ErrorText>}
        </FieldWrapper>

        {/* Confirm Password */}
        <FieldWrapper>
          <FieldLabel htmlFor="signup-confirm">Confirm Password</FieldLabel>
          <InputRelative>
            <StyledInput
              id="signup-confirm"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (fieldErrors.confirm) setFieldErrors((prev) => ({ ...prev, confirm: undefined }));
              }}
              invalid={!!fieldErrors.confirm}
              hasRight={true}
              autoComplete="new-password"
            />
            <InputIconBtn
              type="button"
              aria-label="Toggle confirm password visibility"
              onClick={() => setShowConfirm((p) => !p)}
            >
              <EyeIcon css={{ width: '$px$18', height: '$px$18' }} />
            </InputIconBtn>
          </InputRelative>
          {fieldErrors.confirm && <ErrorText>{fieldErrors.confirm}</ErrorText>}
        </FieldWrapper>

        {/* API error */}
        {apiError && (
          <ErrorText css={{ mb: '$px$8', mt: '-$px$2' }}>{apiError}</ErrorText>
        )}

        <AuthSubmitBtn type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </AuthSubmitBtn>
      </form>

      {/* Switch to login */}
      <ToggleRow>
        <span>Already have an account?</span>
        <ToggleLink type="button" onClick={onSwitch}>Sign in</ToggleLink>
      </ToggleRow>
    </>
  );
};
