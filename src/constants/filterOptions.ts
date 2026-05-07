export { ANIMAL_OPTIONS as ANIMAL_TYPE_OPTIONS } from '@/utils/types/animal';

export const DEFAULT_BREED_OPTIONS: string[] = [
  'Labrador',
  'Poodle',
  'Persian',
  'Siamese',
  'Budgerigar',
];

export const DEFAULT_CITY_OPTIONS: string[] = [
  'Faisalabad',
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Gujranwala',
  'Quetta',
  'Sialkot',
  'Hyderabad',
  'Multan',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Shaheed Benazirabad',
  'Mirpur Khas',
  'Nawabshah',
  'Dera Ghazi Khan',
  'Sahiwal',
  'Okara',
  'Skardu',
  'Mardan',
];

export const GENDER_OPTIONS = ['Male', 'Female'] as const;

export type GenderOption = (typeof GENDER_OPTIONS)[number];
