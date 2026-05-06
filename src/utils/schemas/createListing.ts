import { Step1Errors, Step1Fields, Step2Errors, Step2Fields, Step3Errors, Step3Fields } from "../types";

// ── Validation for Step 1 ─────────────────────────────────────────
export function validateStep1(fields: Step1Fields): Step1Errors {
    const errors: Step1Errors = {};

    if (!fields.name.trim()) {
        errors.name = 'Animal name / title is required.';
    } else if (fields.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters.';
    } else if (fields.name.trim().length > 30) {
        errors.name = 'Name cannot exceed 30 characters.';
    }

    if (!fields.age.trim()) {
        errors.age = 'Age is required.';
    } else {
        const age = Number(fields.age);
        if (isNaN(age) || age < 0 || age > 30) {
            errors.age = 'Enter a valid age between 0 and 30.';
        }
    }

    if (!fields.type) {
        errors.type = 'Please select the animal type.';
    }

    if (!fields.breed.trim()) {
        errors.breed = 'Breed is required.';
    } else if (fields.breed.trim().length > 30) {
        errors.breed = 'Breed cannot exceed 30 characters.';
    }

    return errors;
}

// ── Validation for Step 2 ─────────────────────────────────────────
export function validateStep2(fields: Step2Fields): Step2Errors {
    const errors: Step2Errors = {};

    if (!fields.imageFile && !fields.imagePreviewUrl) {
        errors.image = 'Please upload a photo of the animal.';
    }

    if (fields.healthCondition.length === 0) {
        errors.healthCondition = 'Please select at least one health condition.';
    }

    return errors;
}

// ── Validation for Step 3 ─────────────────────────────────────────
export function validateStep3(fields: Step3Fields): Step3Errors {
    const errors: Step3Errors = {};

    const phone = fields.phoneNumber.trim();
    if (!phone) {
        errors.phoneNumber = 'Phone number is required.';
    } else if (!/^[\d\s\-+()]{7,15}$/.test(phone)) {
        errors.phoneNumber = 'Enter a valid phone number (7–15 digits).';
    }

    if (!fields.city.trim()) {
        errors.city = 'City is required.';
    } else if (fields.city.trim().length < 2) {
        errors.city = 'City must be at least 2 characters.';
    } else if (fields.city.trim().length > 50) {
        errors.city = 'City cannot exceed 50 characters.';
    }

    return errors;
}
