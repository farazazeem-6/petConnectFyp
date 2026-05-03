'use client';
import React, { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Text, Container } from '@/components/elements';
import {
  StepperProvider,
  StepperNav,
  StepPanel,
  useStepper,
  clearState,
} from '@/components/ui/Stepper';
import {
  StepperControlsRoot,
  ButtonGroup,
  Button,
} from '@/components/ui/Stepper/Stepper.style';
import { ArrowLeftIcon } from '@/components/svgs';
import { useScrollToError } from '@/hooks';
import { useAuth } from '@/hooks/useAuth';
import { PageRoot, FormCard, PageHeader, BackBtn } from './CreateListing.style';
import { Step1_AnimalInfo } from './Step1_AnimalInfo';
import { Step2_MediaInfo } from './Step2_MediaInfo';
import { Step3_ContactInfo } from './Step3_ContactInfo';
import { validateStep1, validateStep2, validateStep3 } from './schema';
import type {
  Step1Fields,
  Step1Errors,
  Step1Refs,
  Step2Fields,
  Step2Errors,
  Step2Refs,
  Step3Fields,
  Step3Errors,
  Step3Refs,
} from './types';
import {
  STEPS,
  FLOW_ID,
  defaultStep1,
  defaultStep2,
  defaultStep3,
} from './constants';
import { addAnimal } from '@/lib/firebase/animal.service';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { logger } from '@/lib/logger';

// ── Guarded controls (inside provider context) ────────────────────
interface GuardedControlsProps {
  onNextGuard: (currentIndex: number) => boolean;
  onFinalSubmit: () => void;
  isSubmitting: boolean;
}

function GuardedControls({
  onNextGuard,
  onFinalSubmit,
  isSubmitting,
}: GuardedControlsProps) {
  const { state, dispatch, steps } = useStepper();
  const isFirst = state.currentIndex === 0;
  const isLast = state.currentIndex === steps.length - 1;

  // ── Scroll to top whenever step changes ──────────────────────────
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.currentIndex]);

  const handleNext = () => {
    const ok = onNextGuard(state.currentIndex);
    if (ok) dispatch({ type: 'NEXT', totalSteps: steps.length });
  };

  return (
    <StepperControlsRoot>
      <div />
      <ButtonGroup>
        <Button
          variant="secondary"
          type="button"
          onClick={() => dispatch({ type: 'PREV' })}
          disabled={isFirst || isSubmitting}
        >
          Back
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={isLast ? onFinalSubmit : handleNext}
          disabled={isSubmitting}
        >
          {isLast ? (isSubmitting ? 'Submitting…' : 'Finish') : 'Continue'}
        </Button>
      </ButtonGroup>
    </StepperControlsRoot>
  );
}

// ── Inner view ────────────────────────────────────────────────────
function CreateListingInner() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if unauthenticated
  React.useEffect(() => {
    if (!loading && !user) {
      toast.error('You must be logged in to access this page.');
      router.replace('/auth');
    }
  }, [user, loading, router]);

  // ── Step 1 ──────────────────────────────────────────────
  const [step1, setStep1] = useState<Step1Fields>(defaultStep1);
  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});

  const step1Refs: Step1Refs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    type: useRef<HTMLDivElement>(null),
    breed: useRef<HTMLInputElement>(null),
  };

  const { scrollToFirstError: scrollStep1 } = useScrollToError<Step1Errors>(
    step1Refs as Record<keyof Step1Errors, React.RefObject<HTMLElement | null>>,
    step1Errors,
  );

  const handleStep1Change = useCallback((patch: Partial<Step1Fields>) => {
    setStep1((prev) => ({ ...prev, ...patch }));
    setStep1Errors((prev) => {
      const next = { ...prev };
      (Object.keys(patch) as (keyof Step1Errors)[]).forEach(
        (k) => delete next[k],
      );
      return next;
    });
  }, []);

  // ── Step 2 ──────────────────────────────────────────────
  const [step2, setStep2] = useState<Step2Fields>(defaultStep2);
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});

  const step2Refs: Step2Refs = {
    image: useRef<HTMLDivElement>(null),
    healthCondition: useRef<HTMLDivElement>(null),
  };

  const { scrollToFirstError: scrollStep2 } = useScrollToError<Step2Errors>(
    step2Refs as Record<keyof Step2Errors, React.RefObject<HTMLElement | null>>,
    step2Errors,
  );

  const handleStep2Change = useCallback((patch: Partial<Step2Fields>) => {
    setStep2((prev) => ({ ...prev, ...patch }));
    setStep2Errors((prev) => {
      const next = { ...prev };
      if (patch.imageFile !== undefined || patch.imagePreviewUrl !== undefined)
        delete next.image;
      if (patch.healthCondition !== undefined) delete next.healthCondition;
      return next;
    });
  }, []);

  // ── Step 3 ──────────────────────────────────────────────
  const [step3, setStep3] = useState<Step3Fields>(defaultStep3);
  const [step3Errors, setStep3Errors] = useState<Step3Errors>({});

  const step3Refs: Step3Refs = {
    phoneNumber: useRef<HTMLInputElement>(null),
    city: useRef<HTMLInputElement>(null),
  };

  const { scrollToFirstError: scrollStep3 } = useScrollToError<Step3Errors>(
    step3Refs as Record<keyof Step3Errors, React.RefObject<HTMLElement | null>>,
    step3Errors,
  );

  const handleStep3Change = useCallback((patch: Partial<Step3Fields>) => {
    setStep3((prev) => ({ ...prev, ...patch }));
    setStep3Errors((prev) => {
      const next = { ...prev };
      (Object.keys(patch) as (keyof Step3Errors)[]).forEach(
        (k) => delete next[k],
      );
      return next;
    });
  }, []);

  // ── Next guard ──────────────────────────────────────────
  const onNextGuard = useCallback(
    (currentIndex: number): boolean => {
      if (currentIndex === 0) {
        const errors = validateStep1(step1);
        if (Object.keys(errors).length > 0) {
          setStep1Errors(errors);
          setTimeout(() => scrollStep1(errors), 0);
          toast.error('Please fill in all required fields first.');
          return false;
        }
        setStep1Errors({});
      }

      if (currentIndex === 1) {
        const errors = validateStep2(step2);
        if (Object.keys(errors).length > 0) {
          setStep2Errors(errors);
          setTimeout(() => scrollStep2(errors), 0);
          toast.error('Please fill in all required fields first.');
          return false;
        }
        setStep2Errors({});
      }

      return true;
    },
    [step1, step2, scrollStep1, scrollStep2],
  );

  // ── Final submit ────────────────────────────────────────
  const handleFinalSubmit = useCallback(async () => {
    // Validate step 3 first
    const errors = validateStep3(step3);
    if (Object.keys(errors).length > 0) {
      setStep3Errors(errors);
      setTimeout(() => scrollStep3(errors), 0);
      toast.error('Please fill in all required fields first.');
      return;
    }
    setStep3Errors({});

    setIsSubmitting(true);

    if (!user?.uid) {
      toast.error('You must be logged in to create a listing.');
      setIsSubmitting(false);
      return;
    }

    try {
      //  Try uploading image to Cloudinary — never block on failure
      let imageUrl = '';
      if (step2.imageFile) {
        const uploaded = await uploadImageToCloudinary(step2.imageFile);
        if (uploaded) {
          imageUrl = uploaded;
        } else {
          logger.error(
            '[CreateListing] Cloudinary upload failed — continuing without image.',
          );
        }
      }

      //  Build Firestore payload
      const payload = {
        userId: user.uid,
        name: step1.name.trim(),
        type: step1.type,
        breed: step1.breed.trim(),
        age: Number(step1.age),
        sex: step1.gender,
        image: imageUrl,
        healthCondition: step2.healthCondition,
        characteristics: step2.characteristics,
        city: step3.city.trim(),
        address: step3.address.trim() || '',
        phoneNumber: step3.phoneNumber.trim(),
        description: step3.description.trim() || '',
      };

      // Persist to Firestore
      await addAnimal(payload);

      toast.success('Animal listed for adoption!');
      clearState(FLOW_ID);
      router.push('/browse-pets');
    } catch (err) {
      logger.error('[CreateListing] Firestore error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [step1, step2, step3, user, router, scrollStep3]);

  const handleBack = useCallback(() => {
    clearState(FLOW_ID);
    router.push('/browse-pets');
  }, [router]);

  return (
    <>
      <PageRoot>
        <Container
          css={{
            display: 'flex !important',
            justifyContent: 'center',
            width: '$percent$100',
            paddingLeft: '$px$20',
            paddingRight: '$px$20',
            '@sm_max': {
              paddingLeft: '$px$10',
              paddingRight: '$px$10',
            },
          }}
        >
          <FormCard>
            {/* ── Header ── */}
            <PageHeader>
              <BackBtn type="button" aria-label="Go back" onClick={handleBack}>
                <ArrowLeftIcon width={18} height={18} color="white" />
              </BackBtn>
              <Text
                as="h1"
                heading="h4"
                css={{
                  fontWeight: '$fontWeight$bold',
                  color: '$main',
                  lineHeight: 1.2,
                }}
              >
                Add Animal for Donation
              </Text>
            </PageHeader>

            {/* ── Stepper nav ── */}
            <StepperNav />

            {/* ── Step 1 ── */}
            <StepPanel stepIndex={0}>
              <Step1_AnimalInfo
                fields={step1}
                errors={step1Errors}
                onChange={handleStep1Change}
                fieldRefs={step1Refs}
              />
            </StepPanel>

            {/* ── Step 2 ── */}
            <StepPanel stepIndex={1}>
              <Step2_MediaInfo
                fields={step2}
                errors={step2Errors}
                onChange={handleStep2Change}
                fieldRefs={step2Refs}
              />
            </StepPanel>

            {/* ── Step 3 – Contact Info ── */}
            <StepPanel stepIndex={2}>
              <Step3_ContactInfo
                fields={step3}
                errors={step3Errors}
                onChange={handleStep3Change}
                fieldRefs={step3Refs}
              />
            </StepPanel>

            {/* ── Navigation controls ── */}
            <GuardedControls
              onNextGuard={onNextGuard}
              onFinalSubmit={handleFinalSubmit}
              isSubmitting={isSubmitting}
            />
          </FormCard>
        </Container>
      </PageRoot>
    </>
  );
}

// ── Public export ─────────────────────────────────────────────────
export function CreateListing() {
  return (
    <StepperProvider steps={STEPS} flowId={FLOW_ID}>
      <CreateListingInner />
    </StepperProvider>
  );
}
