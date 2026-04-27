import { StepConfig } from '@/components/ui/Stepper';
import { Step0Fields, Step1Fields, Step2Fields, Step3Fields, RGender } from './types';

// ── Flow & Steps ─────────────────────────────────────────────────
export const FLOW_ID = 'report-animal';

export const STEPS: StepConfig[] = [
  { id: 'report-type', label: 'Report Type', sublabel: 'What happened?' },
  { id: 'animal-details', label: 'Animal Details', sublabel: 'Describe the animal' },
  { id: 'photo', label: 'Photo', sublabel: 'Upload a photo' },
  { id: 'location-contact', label: 'Location', sublabel: 'Where & when seen' },
];

// ── Default values ────────────────────────────────────────────────
export const defaultStep0: Step0Fields = {
  reportType: '',
};

export const defaultStep1: Step1Fields = {
  name: '',
  type: '',
  breed: '',
  color: '',
  age: '',
  gender: 'unknown',
  distinguishingFeatures: '',
};

export const defaultStep2: Step2Fields = {
  imageFile: null,
  imagePreviewUrl: '',
};

export const defaultStep3: Step3Fields = {
  lastSeenLocation: '',
  lastSeenDate: '',
  lastSeenTime: '',
  additionalDetails: '',
  contactNumber: '',
};

// ── Shared constants ──────────────────────────────────────────────
export { ANIMAL_OPTIONS as ANIMAL_TYPE_OPTIONS } from '@/utils/types/animal';

export const GENDERS: { label: string; value: RGender }[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Unknown', value: 'unknown' },
];

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
