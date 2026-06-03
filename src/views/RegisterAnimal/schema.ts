import type {
  AnimalStepFields,
  OwnerStepFields,
  PhotoStepFields,
} from './constants';
import { ANIMAL_OPTIONS } from '@/utils/types';

const phoneRegex = /^(\+92|0)[0-9]{10}$/;
const ALPHABETIC_LABEL_REGEX = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;
const COLOR_REGEX = /^[A-Za-z]+(?:[ ,.'\-/&][A-Za-z]+)*$/;
const FEATURE_REGEX = /^[A-Za-z0-9 ,.'\-()]+$/;
const MAX_AGE_MONTHS = 240;

export const validateOwnerStep = (
  fields: OwnerStepFields,
): Partial<Record<keyof OwnerStepFields, string>> => {
  const errors: Partial<Record<keyof OwnerStepFields, string>> = {};

  const ownerName = fields.ownerName.trim();
  if (!ownerName) {
    errors.ownerName = 'Owner name is required';
  } else if (ownerName.length < 2) {
    errors.ownerName = 'Name must be at least 2 characters';
  } else if (ownerName.length > 50) {
    errors.ownerName = 'Name cannot exceed 50 characters';
  } else if (!ALPHABETIC_LABEL_REGEX.test(ownerName)) {
    errors.ownerName = 'Name can only include letters, spaces, hyphens, or apostrophes';
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

  const animalName = fields.name.trim();
  if (!animalName) {
    errors.name = 'Animal name is required';
  } else if (animalName.length < 2) {
    errors.name = 'Animal name must be at least 2 characters';
  } else if (animalName.length > 30) {
    errors.name = 'Animal name cannot exceed 30 characters';
  } else if (!ALPHABETIC_LABEL_REGEX.test(animalName)) {
    errors.name = 'Animal name can only include letters, spaces, hyphens, or apostrophes';
  }

  if (!fields.type || !validTypes.includes(fields.type)) {
    errors.type = 'Select an animal type';
  }

  const color = fields.color.trim();
  if (!color) {
    errors.color = 'Color / markings are required';
  } else if (color.length < 2) {
    errors.color = 'Color / markings must be at least 2 characters';
  } else if (color.length > 50) {
    errors.color = 'Color / markings cannot exceed 50 characters';
  } else if (!COLOR_REGEX.test(color)) {
    errors.color = 'Color can only include letters, spaces, commas, hyphens, slashes, ampersands, or apostrophes';
  }

  if (!fields.age.trim()) {
    errors.age = 'Age is required';
  } else {
    const age = Number(fields.age);
    if (
      Number.isNaN(age) ||
      age < 0 ||
      age > MAX_AGE_MONTHS ||
      !Number.isInteger(age)
    ) {
      errors.age = `Enter a valid whole number of months between 0 and ${MAX_AGE_MONTHS}`;
    }
  }

  const breed = fields.breed.trim();
  if (breed) {
    if (breed.length < 2) {
      errors.breed = 'Breed must be at least 2 characters';
    } else if (breed.length > 30) {
      errors.breed = 'Breed cannot exceed 30 characters';
    } else if (!ALPHABETIC_LABEL_REGEX.test(breed)) {
      errors.breed = 'Breed can only include letters, spaces, hyphens, or apostrophes';
    }
  }

  return errors;
};

export const validatePhotoStep = (
  fields: PhotoStepFields,
): Partial<Record<'image' | 'distinguishingFeatures' | 'city', string>> => {
  const errors: Partial<Record<'image' | 'distinguishingFeatures' | 'city', string>> = {};

  if (!fields.imageFile && !fields.imagePreviewUrl) {
    errors.image = 'A pet photo is required';
  }

  const features = fields.distinguishingFeatures.trim();
  if (features) {
    if (features.length < 5) {
      errors.distinguishingFeatures = 'Please provide at least 5 characters';
    } else if (features.length > 300) {
      errors.distinguishingFeatures = 'Distinguishing features cannot exceed 300 characters';
    } else if (!FEATURE_REGEX.test(features)) {
      errors.distinguishingFeatures = 'Features can only include letters, numbers, spaces, commas, periods, hyphens, parentheses, or apostrophes';
    }
  }

  const city = fields.city.trim();
  if (city) {
    if (city.length < 2) {
      errors.city = 'City must be at least 2 characters';
    } else if (city.length > 50) {
      errors.city = 'City cannot exceed 50 characters';
    } else if (!ALPHABETIC_LABEL_REGEX.test(city)) {
      errors.city = 'City can only include letters, spaces, hyphens, or apostrophes';
    }
  }

  return errors;
};
