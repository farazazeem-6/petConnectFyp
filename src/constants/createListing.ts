import { StepConfig } from '@/components/ui/Stepper';
import { Gender, Step1Fields, Step2Fields, Step3Fields } from '@/utils/types';

// ── Flow & Steps ───────────────────────────────────────────────────

export const FLOW_ID = 'create-listing';

export const ADD_ANIMAL_STEPS: StepConfig[] = [
  { id: 'animal-info', label: 'Animal Info', sublabel: 'Basic details' },
  { id: 'media', label: 'Media', sublabel: 'Photos & health' },
  { id: 'contact', label: 'Contact', sublabel: 'Your details' },
];

export const defaultStep1: Step1Fields = {
  name: '',
  age: '',
  type: '',
  breed: '',
  gender: 'male',
};

export const defaultStep2: Step2Fields = {
  imageFile: null,
  imagePreviewUrl: '',
  healthCondition: [],
  characteristics: [],
};

export const defaultStep3: Step3Fields = {
  city: '',
  address: '',
  phoneNumber: '',
  description: '',
};

// ── Step 1 Constants ──────────────────────────────────────────────

export { ANIMAL_OPTIONS as ANIMAL_TYPE_OPTIONS } from '@/utils/types/animal';

export const GENDERS: { label: string; value: Gender }[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Unknown', value: 'unknown' },
];

// ── Step 2 Constants ──────────────────────────────────────────────

export const HEALTH_CONDITIONS = [
  'Healthy',
  'Vaccinated',
  'Neutered / Spayed',
  'Dewormed',
  'Under Treatment',
  'Needs Special Care',
  'Disabled / Special Needs',
] as const;

export const CHARACTERISTICS_GROUPS = [
  {
    label: 'Personality',
    items: [
      'Playful', 'Calm', 'Affectionate', 'Independent',
      'Vocal', 'Gentle', 'Energetic', 'Shy', 'Confident', 'Curious',
    ],
  },
  {
    label: 'Lifestyle',
    items: [
      'Good with kids', 'Apartment friendly', 'Needs outdoor space',
      'Low maintenance', 'Lap cat/dog', 'Active lifestyle',
    ],
  },
  {
    label: 'Compatibility',
    items: [
      'Good with dogs', 'Good with cats', 'Good with other pets',
      'Prefers to be only pet', 'Requires Company',
    ],
  },
] as const;

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
