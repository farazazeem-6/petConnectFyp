import { Step1Errors, Step1Fields, Step2Errors, Step2Fields, Step3Errors, Step3Fields } from "../types";

const ALPHABETIC_LABEL_REGEX = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;
const MAX_AGE_MONTHS = 240;

// ── Validation for Step 1 ─────────────────────────────────────────
export function validateStep1(fields: Step1Fields): Step1Errors {
    const errors: Step1Errors = {};

    const name = fields.name.trim();
    if (!name) {
        errors.name = 'Animal name / title is required.';
    } else if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters.';
    } else if (name.length > 30) {
        errors.name = 'Name cannot exceed 30 characters.';
    } else if (!ALPHABETIC_LABEL_REGEX.test(name)) {
        errors.name = 'Name can only include letters, spaces, hyphens, or apostrophes.';
    }

    if (!fields.age.trim()) {
        errors.age = 'Age is required.';
    } else {
        const age = Number(fields.age);
        if (
            Number.isNaN(age) ||
            age < 0 ||
            age > MAX_AGE_MONTHS ||
            !Number.isInteger(age)
        ) {
            errors.age = `Enter a valid whole number of months between 0 and ${MAX_AGE_MONTHS}.`;
        }
    }

    if (!fields.type) {
        errors.type = 'Please select the animal type.';
    }

    const breed = fields.breed.trim();
    if (!breed) {
        errors.breed = 'Breed is required.';
    } else if (breed.length < 2) {
        errors.breed = 'Breed must be at least 2 characters.';
    } else if (breed.length > 30) {
        errors.breed = 'Breed cannot exceed 30 characters.';
    } else if (!ALPHABETIC_LABEL_REGEX.test(breed)) {
        errors.breed = 'Breed can only include letters, spaces, hyphens, or apostrophes.';
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

    const description = fields.description.trim();
    if (description) {
        if (description.length < 5) {
            errors.description = 'Message must be at least 5 characters.';
        } else if (description.length > 400) {
            errors.description = 'Message cannot exceed 400 characters.';
        }
    }

    return errors;
}
