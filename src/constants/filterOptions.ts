// ─── Filter Sidebar Constants ──────────────────────────────────────────────

export const ANIMAL_TYPE_OPTIONS = [
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Bird', value: 'bird' },
] as const;

export const DEFAULT_BREED_OPTIONS: string[] = [
  'Labrador',
  'Poodle',
  'Persian',
  'Siamese',
  'Budgerigar',
];

export const DEFAULT_CITY_OPTIONS: string[] = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
];

export const GENDER_OPTIONS = ['Male', 'Female'] as const;

export type GenderOption = (typeof GENDER_OPTIONS)[number];
