'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextJSImage, WebLogo } from '@/components/elements';
import { BackArrowIcon } from '@/components/svgs';
import {
  AuthPageWrapper,
  BackBtn,
  BrandPanel,
  BrandTagline,
  FormCard,
  FormPanel,
  MobileHeader,
  MobileBackBtn,
} from './Auth.Style';
import { LoginForm, SignupForm } from './components';

type TAuthMode = 'login' | 'signup';

export const Auth = () => {
  const [mode, setMode] = useState<TAuthMode>('login');
  const router = useRouter();

  return (
    <AuthPageWrapper>
      {/* ── Left branding panel ── */}
      <BrandPanel>
        {/* Back button sits top-left of the brand panel */}
        <BackBtn onClick={() => router.back()} aria-label="Go back">
          <BackArrowIcon />
        </BackBtn>

        <WebLogo
          color="$white"
          iconSize={52}
          fontSize={34}
          fontWeight="$fontWeights$bold"
        />
  
        <BrandTagline>
          Find, adopt &amp; care love
          <br />
          your perfect furry companion
        </BrandTagline>
      </BrandPanel>

      {/* ── Mobile Header (Visible only when left panel is hidden) ── */}
      <MobileHeader>
        <MobileBackBtn onClick={() => router.back()} aria-label="Go back">
          <BackArrowIcon />
        </MobileBackBtn>
        <WebLogo color="$white" iconSize={32} fontSize={24} />
      </MobileHeader>

      {/* ── Right scrollable form panel*/}
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
