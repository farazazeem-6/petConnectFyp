export { ANIMAL_OPTIONS as ANIMAL_TYPE_OPTIONS } from '@/utils/types/animal';

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
