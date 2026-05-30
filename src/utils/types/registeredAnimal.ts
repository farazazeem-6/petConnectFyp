import type { AnimalType } from './animal';

export type RegistrationStatus = 'active' | 'revoked';

export interface TRegisteredAnimal {
  id?: string;
  userId: string;
  registrationId: string;
  ownerName: string;
  ownerPhone: string;
  name: string;
  type: AnimalType;
  breed?: string;
  color: string;
  age: number;
  sex: 'male' | 'female' | 'unknown';
  image: string;
  distinguishingFeatures?: string;
  city?: string;
  status: RegistrationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export const MAX_REGISTRATIONS_PER_USER = 2;
