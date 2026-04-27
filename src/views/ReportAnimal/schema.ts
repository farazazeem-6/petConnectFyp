import {
  Step0Fields, Step0Errors,
  Step1Fields, Step1Errors,
  Step2Fields, Step2Errors,
  Step3Fields, Step3Errors,
} from './types';

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
  }

  if (!fields.type) {
    errors.type = 'Please select the animal type.';
  }

  const color = fields.color.trim();
  if (!color) {
    errors.color = 'Color / markings is required.';
  } else if (color.length > 50) {
    errors.color = 'Color description cannot exceed 50 characters.';
  }

  const age = fields.age.trim();
  if (!age) {
    errors.age = 'Age estimate is required.';
  } else if (age.length > 30) {
    errors.age = 'Age description cannot exceed 30 characters.';
  }

  const features = fields.distinguishingFeatures.trim();
  if (!features) {
    errors.distinguishingFeatures = 'Distinguishing features are required.';
  } else if (features.length > 300) {
    errors.distinguishingFeatures = 'Cannot exceed 300 characters.';
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
