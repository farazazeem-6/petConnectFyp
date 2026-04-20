import * as yup from 'yup';

// ── Step 1: Animal Info ──────────────────────────────────────────
export const step0Schema = yup.object({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Animal name is required'),

    species: yup
        .string()
        .oneOf(['dog', 'cat', 'bird', 'rabbit', 'other'], 'Select a valid species')
        .required('Species is required'),

    breed: yup
        .string()
        .min(2, 'Breed must be at least 2 characters')
        .required('Breed is required'),

    age: yup
        .number()
        .typeError('Age must be a number')
        .min(0, 'Age cannot be negative')
        .max(30, 'Please enter a valid age')
        .required('Age is required'),

    ageUnit: yup
        .string()
        .oneOf(['months', 'years'], 'Select months or years')
        .required('Age unit is required'),

    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Select a gender')
        .required('Gender is required'),

    size: yup
        .string()
        .oneOf(['small', 'medium', 'large'], 'Select a size')
        .required('Size is required'),

    color: yup
        .string()
        .min(2, 'Please describe the color or markings')
        .required('Color / markings are required'),
});

// ── Step 2: Health & Temperament ────────────────────────────────
export const step1Schema = yup.object({
    vaccinated: yup
        .string()
        .oneOf(['yes', 'no', 'partial'], 'Select vaccination status')
        .required('Vaccination status is required'),

    neutered: yup
        .string()
        .oneOf(['yes', 'no'], 'Select one')
        .required('This field is required'),

    healthNotes: yup
        .string()
        .max(500, 'Health notes cannot exceed 500 characters'),
    // optional — not required

    temperament: yup
        .string()
        .oneOf(['friendly', 'shy', 'playful', 'aggressive', 'calm'], 'Select a temperament')
        .required('Temperament is required'),

    goodWithKids: yup
        .string()
        .oneOf(['yes', 'no', 'unknown'], 'Select one')
        .required('Required'),

    goodWithAnimals: yup
        .string()
        .oneOf(['yes', 'no', 'unknown'], 'Select one')
        .required('Required'),
});

// ── Step 3: Location & Contact ───────────────────────────────────
export const step2Schema = yup.object({
    city: yup
        .string()
        .min(2, 'City name is too short')
        .required('City is required'),

    area: yup
        .string()
        .min(3, 'Please provide your area or neighbourhood')
        .required('Area is required'),

    contactName: yup
        .string()
        .min(2, 'Name is too short')
        .required('Contact name is required'),

    contactPhone: yup
        .string()
        .matches(
            /^(\+92|0)[0-9]{10}$/,
            'Enter a valid Pakistani number e.g. 0300 1234567'
        )
        .required('Phone number is required'),

    preferredContact: yup
        .string()
        .oneOf(['call', 'whatsapp', 'both'], 'Select a contact method')
        .required('Preferred contact method is required'),

    adopterRequirements: yup
        .string()
        .max(300, 'Cannot exceed 300 characters'),
    // optional — e.g. "must have a house, no small children"
});

// ── Merged schema (used for TS types only) ───────────────────────
export const fullSchema = step0Schema.concat(step1Schema).concat(step2Schema);
export type AddAnimalFormData = yup.InferType<typeof fullSchema>;

// Step schemas in order — index matches step index
export const stepSchemas = [step0Schema, step1Schema, step2Schema] as const;