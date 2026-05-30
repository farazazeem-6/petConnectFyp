import type {
  AnimalStepFields,
  OwnerStepFields,
  PhotoStepFields,
} from './constants';
import { ANIMAL_OPTIONS } from '@/utils/types';

const phoneRegex = /^(\+92|0)[0-9]{10}$/;

export const validateOwnerStep = (
  fields: OwnerStepFields,
): Partial<Record<keyof OwnerStepFields, string>> => {
  const errors: Partial<Record<keyof OwnerStepFields, string>> = {};

  if (!fields.ownerName.trim()) {
    errors.ownerName = 'Owner name is required';
  } else if (fields.ownerName.trim().length < 2) {
    errors.ownerName = 'Name must be at least 2 characters';
  }

  if (!fields.ownerPhone.trim()) {
    errors.ownerPhone = 'Phone number is required';
  } else if (!phoneRegex.test(fields.ownerPhone.replace(/\s/g, ''))) {
    errors.ownerPhone = 'Enter a valid Pakistani number e.g. 03001234567';
  }

  return errors;
};

export const validateAnimalStep = (
  fields: AnimalStepFields,
): Partial<Record<keyof AnimalStepFields, string>> => {
  const errors: Partial<Record<keyof AnimalStepFields, string>> = {};
  const validTypes = ANIMAL_OPTIONS.map((o) => o.value);

  if (!fields.name.trim()) {
    errors.name = 'Animal name is required';
  }

  if (!fields.type || !validTypes.includes(fields.type)) {
    errors.type = 'Select an animal type';
  }

  if (!fields.color.trim()) {
    errors.color = 'Color / markings are required';
  }

  if (!fields.age.trim()) {
    errors.age = 'Age is required';
  } else if (Number.isNaN(Number(fields.age)) || Number(fields.age) < 0) {
    errors.age = 'Enter a valid age in months';
  }

  return errors;
};

export const validatePhotoStep = (
  fields: PhotoStepFields,
): Partial<Record<'image', string>> => {
  const errors: Partial<Record<'image', string>> = {};

  if (!fields.imageFile && !fields.imagePreviewUrl) {
    errors.image = 'A pet photo is required';
  }

  return errors;
};
