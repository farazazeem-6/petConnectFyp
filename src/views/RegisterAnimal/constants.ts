import type { AnimalType } from '@/utils/types';

export const REGISTRATION_FLOW_ID = 'register-animal';

export const REGISTRATION_STEPS = [
  { id: 'owner', label: 'Owner', sublabel: 'Your details' },
  { id: 'animal', label: 'Animal', sublabel: 'Pet identity' },
  { id: 'photo', label: 'Photo', sublabel: 'Picture & notes' },
  { id: 'review', label: 'Review', sublabel: 'Confirm & save' },
];

export type OwnerStepFields = {
  ownerName: string;
  ownerPhone: string;
};

export type OwnerStepErrors = Partial<Record<keyof OwnerStepFields, string>>;

export type AnimalStepFields = {
  name: string;
  type: AnimalType | '';
  breed: string;
  color: string;
  age: string;
  sex: 'male' | 'female' | 'unknown';
};

export type AnimalStepErrors = Partial<Record<keyof AnimalStepFields, string>>;

export type PhotoStepFields = {
  imageFile: File | null;
  imagePreviewUrl: string;
  distinguishingFeatures: string;
  city: string;
};

export type PhotoStepErrors = Partial<
  Record<'image' | 'distinguishingFeatures' | 'city', string>
>;

export const defaultOwnerStep: OwnerStepFields = {
  ownerName: '',
  ownerPhone: '',
};

export const defaultAnimalStep: AnimalStepFields = {
  name: '',
  type: '',
  breed: '',
  color: '',
  age: '',
  sex: 'male',
};

export const defaultPhotoStep: PhotoStepFields = {
  imageFile: null,
  imagePreviewUrl: '',
  distinguishingFeatures: '',
  city: '',
};

export const REGISTRY_MESSAGES = {
  hubTitle: 'Pet Registry',
  hubSubtitle: 'Register your pets, get a unique QR ID card, and help reunite them if they ever get lost.',
  registerNew: 'Register New Animal',
  maxReached: 'You have reached the maximum of 2 registered animals.',
  noRegistrations: 'No registered animals yet.',
  noRegistrationsHint: 'Register your pet to receive a unique QR code you can print on a collar or tag.',
  deleteTitle: 'Delete Registration',
  deleteSubtitle: 'This will permanently remove this pet registration and its QR code.',
  loginRequired: 'Please log in to manage your pet registry.',
  saved: 'Pet registered successfully!',
  updated: 'Registration updated successfully!',
  deleted: 'Registration deleted.',
  loadError: 'Failed to load registrations.',
  submitError: 'Something went wrong. Please try again.',
  publicNotFound: 'Registration not found or has been removed.',
  publicSubtitle: 'Official Pet Connect registry profile',
  scanHint: 'Scan this QR code to view the pet profile if found.',
  downloadQr: 'Download QR Code',
  editRegistration: 'Edit',
  deleteRegistration: 'Delete',
  viewProfile: 'View Public Profile',
  registrationId: 'Registration ID',
  registeredOn: 'Registered on',
  ownerDetails: 'Owner Details',
  animalDetails: 'Animal Details',
};
