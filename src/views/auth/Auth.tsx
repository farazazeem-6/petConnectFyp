'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WebLogo } from '@/components/elements';
import { BackArrowIcon } from '@/components/svgs';
import {
  AuthPageWrapper,
  BackBtn,
  BrandPanel,
  BrandTagline,
  FormCard,
  FormPanel,
} from './Auth.Style';
import { LoginForm, SignupForm } from './AuthForms';

type TAuthMode = 'login' | 'signup';

export const Auth = () => {
  const [mode, setMode] = useState<TAuthMode>('login');
  const router = useRouter();

  return (
    <AuthPageWrapper>
      {/* ── Left branding panel — NEVER scrolls ── */}
      <BrandPanel>
        {/* Back button sits top-left of the brand panel */}
        <BackBtn onClick={() => router.back()} aria-label="Go back">
          <BackArrowIcon />
        </BackBtn>

        <WebLogo color="#ffffff" iconSize={52} fontSize={34} fontWeight="700" />
        <BrandTagline>
          Find, adopt &amp; care for<br />your perfect furry companion
        </BrandTagline>
      </BrandPanel>

      {/* ── Right scrollable form panel — no back button here ── */}
      <FormPanel>
        <FormCard>
          {mode === 'login' ? (
            <LoginForm onSwitch={() => setMode('signup')} />
          ) : (
            <SignupForm onSwitch={() => setMode('login')} />
          )}
        </FormCard>
      </FormPanel>
    </AuthPageWrapper>
  );
};
