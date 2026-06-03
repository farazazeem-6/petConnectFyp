import {
  Step0Fields, Step0Errors,
  Step1Fields, Step1Errors,
  Step2Fields, Step2Errors,
  Step3Fields, Step3Errors,
} from './types';

const ALPHABETIC_LABEL_REGEX = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;
const COLOR_REGEX = /^[A-Za-z]+(?:[ ,.'\-/&][A-Za-z]+)*$/;
const FEATURE_REGEX = /^[A-Za-z0-9 ,.'\-()]+$/;
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const MAX_AGE_MONTHS = 240;

// ── Step 0 — Report Type ──────────────────────────────────────────
export function validateStep0(fields: Step0Fields): Step0Errors {
  const errors: Step0Errors = {};
  if (!fields.reportType) {
    errors.reportType = 'Please select a report type to continue.';
  }
  return errors;
}

// ── Step 1 — Animal Details ───────────────────────────────────────
export function validateStep1(fields: Step1Fields): Step1Errors {
  const errors: Step1Errors = {};

  const name = fields.name.trim();
  if (!name) {
    errors.name = 'Animal name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 30) {
    errors.name = 'Name cannot exceed 30 characters.';
  } else if (!ALPHABETIC_LABEL_REGEX.test(name)) {
    errors.name = 'Name can only include letters, spaces, hyphens, or apostrophes.';
  }

  if (!fields.type) {
    errors.type = 'Please select the animal type.';
  }

  const color = fields.color.trim();
  if (!color) {
    errors.color = 'Color / markings is required.';
  } else if (color.length < 2) {
    errors.color = 'Color description must be at least 2 characters.';
  } else if (color.length > 50) {
    errors.color = 'Color description cannot exceed 50 characters.';
  } else if (!COLOR_REGEX.test(color)) {
    errors.color = 'Color can only include letters, spaces, commas, hyphens, slashes, ampersands, or apostrophes.';
  }

  const breed = fields.breed.trim();
  if (breed) {
    if (breed.length < 2) {
      errors.breed = 'Breed must be at least 2 characters.';
    } else if (breed.length > 30) {
      errors.breed = 'Breed cannot exceed 30 characters.';
    } else if (!ALPHABETIC_LABEL_REGEX.test(breed)) {
      errors.breed = 'Breed can only include letters, spaces, hyphens, or apostrophes.';
    }
  }

  const age = fields.age.trim();
  if (!age) {
    errors.age = 'Age estimate is required.';
  } else if (age.length > 30) {
    errors.age = 'Age description cannot exceed 30 characters.';
  } else {
    const numericValues = age.match(/\d+/g)?.map(Number) ?? [];
    if (numericValues.some((value) => value < 0 || value > MAX_AGE_MONTHS)) {
      errors.age = `Enter an age value no greater than ${MAX_AGE_MONTHS} months.`;
    }
  }

  const features = fields.distinguishingFeatures.trim();
  if (!features) {
    errors.distinguishingFeatures = 'Distinguishing features are required.';
  } else if (features.length < 5) {
    errors.distinguishingFeatures = 'Distinguishing features must be at least 5 characters.';
  } else if (features.length > 300) {
    errors.distinguishingFeatures = 'Cannot exceed 300 characters.';
  } else if (!FEATURE_REGEX.test(features)) {
    errors.distinguishingFeatures = 'Features can only include letters, numbers, spaces, commas, periods, hyphens, parentheses, or apostrophes.';
  }

  return errors;
}

// ── Step 2 — Photo ────────────────────────────────────────────────
export function validateStep2(fields: Step2Fields): Step2Errors {
  const errors: Step2Errors = {};
  if (!fields.imageFile && !fields.imagePreviewUrl) {
    errors.image = 'Please upload a photo of the animal.';
  }
  return errors;
}

// ── Step 3 — Location & Contact ───────────────────────────────────
export function validateStep3(fields: Step3Fields): Step3Errors {
  const errors: Step3Errors = {};

  const location = fields.lastSeenLocation.trim();
  if (!location) {
    errors.lastSeenLocation = 'Last seen location is required.';
  } else if (location.length > 150) {
    errors.lastSeenLocation = 'Location cannot exceed 150 characters.';
  }

  if (!fields.lastSeenDate) {
    errors.lastSeenDate = 'Date last seen is required.';
  } else {
    const lastSeenDate = new Date(fields.lastSeenDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (Number.isNaN(lastSeenDate.getTime())) {
      errors.lastSeenDate = 'Enter a valid date.';
    } else if (lastSeenDate > today) {
      errors.lastSeenDate = 'Date cannot be in the future.';
    }
  }

  if (fields.lastSeenTime && !TIME_REGEX.test(fields.lastSeenTime)) {
    errors.lastSeenTime = 'Enter a valid time in HH:MM format.';
  }

  const additionalDetails = fields.additionalDetails.trim();
  if (additionalDetails) {
    if (additionalDetails.length < 5) {
      errors.additionalDetails = 'Details must be at least 5 characters.';
    } else if (additionalDetails.length > 400) {
      errors.additionalDetails = 'Details cannot exceed 400 characters.';
    } else if (!FEATURE_REGEX.test(additionalDetails)) {
      errors.additionalDetails = 'Details can only include letters, numbers, spaces, commas, periods, hyphens, parentheses, or apostrophes.';
    }
  }

  const phone = fields.contactNumber.trim();
  if (!phone) {
    errors.contactNumber = 'Contact number is required.';
  } else {
    // Strip formatting characters and count only digits
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 11) {
      errors.contactNumber = 'Enter a valid 11-digit number (e.g. 0300-1234567).';
    }
  }

  return errors;
}
