import { RefObject } from 'react';
import { AnimalType } from '@/utils/types/animal';

// ── Step 1 Types ─────────────────────────────────────────────────────────

export type Gender = 'male' | 'female' | 'unknown';

export interface Step1Fields {
  name: string;
  age: string;
  type: AnimalType;
  breed: string;
  gender: Gender;
}

export interface Step1Errors {
  name?: string;
  age?: string;
  type?: string;
  breed?: string;
}

export interface Step1Refs {
  name: RefObject<HTMLInputElement | null>;
  age: RefObject<HTMLInputElement | null>;
  type: RefObject<HTMLDivElement | null>;
  breed: RefObject<HTMLInputElement | null>;
}

// ── Step 2 Types ─────────────────────────────────────────────────────────

export interface Step2Fields {
  imageFile: File | null;
  imagePreviewUrl: string;
  healthCondition: string[];
  characteristics: string[];
}

export interface Step2Errors {
  image?: string;
  healthCondition?: string;
}

export interface Step2Refs {
  image: RefObject<HTMLDivElement | null>;
  healthCondition: RefObject<HTMLDivElement | null>;
}

// ── Step 3 Types ─────────────────────────────────────────────────────────

export interface Step3Fields {
  city: string;
  address: string;
  phoneNumber: string; 
  description: string; 
}

export interface Step3Errors {
  phoneNumber?: string;
  city?: string;
}

export interface Step3Refs {
  phoneNumber: RefObject<HTMLInputElement | null>;
  city: RefObject<HTMLInputElement | null>;
}
