import { RefObject } from 'react';
import { AnimalType, ReportType } from '@/utils/types/animal';

export type { ReportType };

// ── Step 0 Types ─────────────────────────────────────────────────
export interface Step0Fields {
  reportType: ReportType | '';
}

export interface Step0Errors {
  reportType?: string;
}

export interface Step0Refs {
  reportType: RefObject<HTMLDivElement | null>;
}

// ── Step 1 Types ─────────────────────────────────────────────────
export type RGender = 'male' | 'female' | 'unknown';

export interface Step1Fields {
  name: string;
  type: AnimalType;
  breed: string;           // optional — no validation required
  color: string;
  age: string;
  gender: RGender;
  distinguishingFeatures: string;
}

export interface Step1Errors {
  name?: string;
  type?: string;
  color?: string;
  age?: string;
  distinguishingFeatures?: string;
}

export interface Step1Refs {
  name: RefObject<HTMLInputElement | null>;
  type: RefObject<HTMLDivElement | null>;
  color: RefObject<HTMLInputElement | null>;
  age: RefObject<HTMLInputElement | null>;
  distinguishingFeatures: RefObject<HTMLTextAreaElement | null>;
}

// ── Step 2 Types ─────────────────────────────────────────────────
export interface Step2Fields {
  imageFile: File | null;
  imagePreviewUrl: string;
}

export interface Step2Errors {
  image?: string;
}

export interface Step2Refs {
  image: RefObject<HTMLDivElement | null>;
}

// ── Step 3 Types ─────────────────────────────────────────────────
export interface Step3Fields {
  lastSeenLocation: string;
  lastSeenDate: string;
  lastSeenTime: string;
  additionalDetails: string;
  contactNumber: string;
}

export interface Step3Errors {
  lastSeenLocation?: string;
  lastSeenDate?: string;
  contactNumber?: string;
}

export interface Step3Refs {
  lastSeenLocation: RefObject<HTMLInputElement | null>;
  lastSeenDate: RefObject<HTMLInputElement | null>;
  contactNumber: RefObject<HTMLInputElement | null>;
}
