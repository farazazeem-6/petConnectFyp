'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Container, Text } from '@/components/elements';
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
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import {
  addRegisteredAnimal,
  getRegistrationById,
  updateRegisteredAnimal,
} from '@/lib/firebase';
import { StaticRoutes } from '@/constants';
import {
  PageRoot,
  FormCard,
  PageHeader,
  BackBtn,
} from './RegisterAnimal.style';
import { StepOwnerInfo } from './StepOwnerInfo';
import { StepAnimalIdentity } from './StepAnimalIdentity';
import { StepPhotoNotes } from './StepPhotoNotes';
import { StepReview } from './StepReview';
import {
  REGISTRATION_FLOW_ID,
  REGISTRATION_STEPS,
  defaultOwnerStep,
  defaultAnimalStep,
  defaultPhotoStep,
  REGISTRY_MESSAGES,
  type OwnerStepFields,
  type OwnerStepErrors,
  type AnimalStepFields,
  type AnimalStepErrors,
  type PhotoStepFields,
  type PhotoStepErrors,
} from './constants';
import {
  validateOwnerStep,
  validateAnimalStep,
  validatePhotoStep,
} from './schema';
import type { AnimalType } from '@/utils/types';

type GuardedControlsProps = {
  onNextGuard: (currentIndex: number) => boolean;
  onFinalSubmit: () => void;
  isSubmitting: boolean;
  isEditMode: boolean;
};

function GuardedControls({
  onNextGuard,
  onFinalSubmit,
  isSubmitting,
  isEditMode,
}: GuardedControlsProps) {
  const { state, dispatch, steps } = useStepper();
  const isFirst = state.currentIndex === 0;
  const isLast = state.currentIndex === steps.length - 1;

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
          {isLast
            ? isSubmitting
              ? 'Saving…'
              : isEditMode
                ? 'Update Registration'
                : 'Save & Get QR Code'
            : 'Continue'}
        </Button>
      </ButtonGroup>
    </StepperControlsRoot>
  );
}

type RegisterAnimalFormProps = {
  editId?: string;
};

function RegisterAnimalFormInner({ editId }: RegisterAnimalFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(editId);
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefillLoading, setPrefillLoading] = useState(isEditMode);

  useEffect(() => {
    if (!loading && !user) {
      toast.error(REGISTRY_MESSAGES.loginRequired);
      router.replace(StaticRoutes.AUTH);
    }
  }, [user, loading, router]);

  const [owner, setOwner] = useState<OwnerStepFields>(defaultOwnerStep);
  const [ownerErrors, setOwnerErrors] = useState<OwnerStepErrors>({});
  const ownerRefs = {
    ownerName: useRef<HTMLInputElement>(null),
    ownerPhone: useRef<HTMLInputElement>(null),
  };
  const { scrollToFirstError: scrollOwner } = useScrollToError(
    ownerRefs,
    ownerErrors,
  );

  const [animal, setAnimal] = useState<AnimalStepFields>(defaultAnimalStep);
  const [animalErrors, setAnimalErrors] = useState<AnimalStepErrors>({});
  const animalRefs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    type: useRef<HTMLDivElement>(null),
    color: useRef<HTMLInputElement>(null),
  };
  const { scrollToFirstError: scrollAnimal } = useScrollToError(
    animalRefs,
    animalErrors,
  );

  const [photo, setPhoto] = useState<PhotoStepFields>(defaultPhotoStep);
  const [photoErrors, setPhotoErrors] = useState<PhotoStepErrors>({});
  const photoRefs = { image: useRef<HTMLDivElement>(null) };
  const { scrollToFirstError: scrollPhoto } = useScrollToError(
    photoRefs,
    photoErrors,
  );

  useEffect(() => {
    if (user && !isEditMode) {
      setOwner((prev) => ({
        ...prev,
        ownerName: prev.ownerName || user.name || '',
      }));
    }
  }, [user, isEditMode]);

  useEffect(() => {
    if (!isEditMode || !editId) return;

    (async () => {
      try {
        const registration = await getRegistrationById(editId);
        if (!registration || registration.userId !== user?.uid) {
          toast.error('Registration not found.');
          router.replace(StaticRoutes.REGISTER_ANIMAL);
          return;
        }

        setOwner({
          ownerName: registration.ownerName,
          ownerPhone: registration.ownerPhone,
        });
        setAnimal({
          name: registration.name,
          type: registration.type,
          breed: registration.breed ?? '',
          color: registration.color,
          age: String(registration.age),
          sex: registration.sex,
        });
        setPhoto({
          imageFile: null,
          imagePreviewUrl: registration.image,
          distinguishingFeatures: registration.distinguishingFeatures ?? '',
          city: registration.city ?? '',
        });
      } catch {
        toast.error(REGISTRY_MESSAGES.loadError);
      } finally {
        setPrefillLoading(false);
      }
    })();
  }, [editId, isEditMode, router, user?.uid]);

  const onNextGuard = useCallback(
    (currentIndex: number): boolean => {
      if (currentIndex === 0) {
        const errors = validateOwnerStep(owner);
        if (Object.keys(errors).length) {
          setOwnerErrors(errors);
          setTimeout(() => scrollOwner(errors), 0);
          toast.error('Please fill in all required fields first.');
          return false;
        }
        setOwnerErrors({});
      }

      if (currentIndex === 1) {
        const errors = validateAnimalStep(animal);
        if (Object.keys(errors).length) {
          setAnimalErrors(errors);
          setTimeout(() => scrollAnimal(errors), 0);
          toast.error('Please fill in all required fields first.');
          return false;
        }
        setAnimalErrors({});
      }

      if (currentIndex === 2) {
        const errors = validatePhotoStep(photo);
        if (Object.keys(errors).length) {
          setPhotoErrors(errors);
          setTimeout(() => scrollPhoto(errors), 0);
          toast.error('Please fill in all required fields first.');
          return false;
        }
        setPhotoErrors({});
      }

      return true;
    },
    [owner, animal, photo, scrollOwner, scrollAnimal, scrollPhoto],
  );

  const handleFinalSubmit = useCallback(async () => {
    if (!user?.uid) return;

    setIsSubmitting(true);

    try {
      let imageUrl = photo.imagePreviewUrl;
      if (photo.imageFile) {
        const uploaded = await uploadImageToCloudinary(photo.imageFile);
        if (uploaded) imageUrl = uploaded;
        else toast.error('Photo upload failed. Please try again.');
      }

      const payload = {
        userId: user.uid,
        ownerName: owner.ownerName.trim(),
        ownerPhone: owner.ownerPhone.replace(/\s/g, '').trim(),
        name: animal.name.trim(),
        type: animal.type as AnimalType,
        breed: animal.breed.trim() || undefined,
        color: animal.color.trim(),
        age: Number(animal.age),
        sex: animal.sex,
        image: imageUrl,
        distinguishingFeatures: photo.distinguishingFeatures.trim() || undefined,
        city: photo.city.trim() || undefined,
      };

      if (isEditMode && editId) {
        await updateRegisteredAnimal(editId, payload);
        toast.success(REGISTRY_MESSAGES.updated);
        router.push(`${StaticRoutes.REGISTER_ANIMAL}?highlight=${editId}`);
      } else {
        const result = await addRegisteredAnimal(payload);
        toast.success(REGISTRY_MESSAGES.saved);
        clearState(REGISTRATION_FLOW_ID);
        router.push(
          `${StaticRoutes.REGISTER_ANIMAL}?highlight=${result.registrationId}`,
        );
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : REGISTRY_MESSAGES.submitError;
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [user, owner, animal, photo, isEditMode, editId, router]);

  const handleBack = () => {
    clearState(REGISTRATION_FLOW_ID);
    router.push(StaticRoutes.REGISTER_ANIMAL);
  };

  if (prefillLoading) return null;

  return (
    <PageRoot>
      <Container
        css={{
          display: 'flex !important',
          justifyContent: 'center',
          width: '$percent$100',
          paddingLeft: '$px$20',
          paddingRight: '$px$20',
          '@sm_max': { paddingLeft: '$px$10', paddingRight: '$px$10' },
        }}
      >
        <FormCard>
          <PageHeader>
            <BackBtn type="button" aria-label="Go back" onClick={handleBack}>
              <ArrowLeftIcon width={18} height={18} color="white" />
            </BackBtn>
            <Text
              as="h1"
              heading="h4"
              css={{ fontWeight: '$fontWeight$bold', color: '$main' }}
            >
              {isEditMode ? 'Edit Pet Registration' : 'Register Your Pet'}
            </Text>
          </PageHeader>

          <StepperNav />

          <StepPanel stepIndex={0}>
            <StepOwnerInfo
              fields={owner}
              errors={ownerErrors}
              onChange={(patch) => {
                setOwner((prev) => ({ ...prev, ...patch }));
                setOwnerErrors((prev) => {
                  const next = { ...prev };
                  Object.keys(patch).forEach((k) => delete next[k as keyof OwnerStepErrors]);
                  return next;
                });
              }}
              fieldRefs={ownerRefs}
            />
          </StepPanel>

          <StepPanel stepIndex={1}>
            <StepAnimalIdentity
              fields={animal}
              errors={animalErrors}
              onChange={(patch) => {
                setAnimal((prev) => ({ ...prev, ...patch }));
                setAnimalErrors((prev) => {
                  const next = { ...prev };
                  Object.keys(patch).forEach((k) => delete next[k as keyof AnimalStepErrors]);
                  return next;
                });
              }}
              fieldRefs={animalRefs}
            />
          </StepPanel>

          <StepPanel stepIndex={2}>
            <StepPhotoNotes
              fields={photo}
              errors={photoErrors}
              onChange={(patch) => {
                setPhoto((prev) => ({ ...prev, ...patch }));
                if (patch.imageFile !== undefined || patch.imagePreviewUrl !== undefined) {
                  setPhotoErrors({});
                }
              }}
            />
            />
          </StepPanel>

          <StepPanel stepIndex={3}>
            <StepReview owner={owner} animal={animal} photo={photo} />
          </StepPanel>

          <GuardedControls
            onNextGuard={onNextGuard}
            onFinalSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
            isEditMode={isEditMode}
          />
        </FormCard>
      </Container>
    </PageRoot>
  );
}

export function RegisterAnimalForm({ editId }: RegisterAnimalFormProps) {
  return (
    <StepperProvider steps={REGISTRATION_STEPS} flowId={REGISTRATION_FLOW_ID}>
      <RegisterAnimalFormInner editId={editId} />
    </StepperProvider>
  );
}
