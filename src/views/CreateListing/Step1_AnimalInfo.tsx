'use client';
import React, { RefObject } from 'react';
import { Input, Selection } from '@/components/elements';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  TwoColRow,
  PillGroup,
  GenderPill,
  StepContent,
} from './CreateListing.style';

import { Step1Fields, Step1Errors, Step1Refs } from './types';
import { AnimalType } from '@/utils/types/animal';
import { ANIMAL_TYPE_OPTIONS, GENDERS } from './constants';

// ── Component ─────────────────────────────────────────────────────
interface Props {
  fields: Step1Fields;
  errors: Step1Errors;
  onChange: (patch: Partial<Step1Fields>) => void;
  fieldRefs: Step1Refs;
}

export function Step1_AnimalInfo({
  fields,
  errors,
  onChange,
  fieldRefs,
}: Props) {
  return (
    <StepContent>
      {/* ── Name ── */}
      <FieldGroup>
        <FieldLabel htmlFor="listing-name">
          Animal Name / Title <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.name}
          id="listing-name"
          placeholder="e.g. Buddy, Golden Boy"
          value={fields.name}
          onChange={(e) => onChange({ name: e.target.value })}
          invalid={!!errors.name}
          inputSize="lg"
          maxLength={30}
        />
        {errors.name ? <FieldError>{errors.name}</FieldError> : <FieldError />}
      </FieldGroup>

      {/* ── Age + Type row ── */}
      <TwoColRow>
        {/* Age */}
        <FieldGroup>
          <FieldLabel htmlFor="listing-age">
            Age (years) <span>*</span>
          </FieldLabel>
          <Input
            ref={fieldRefs.age}
            id="listing-age"
            type="number"
            min="0"
            max="30"
            placeholder="e.g. 2"
            value={fields.age}
            onChange={(e) => onChange({ age: e.target.value })}
            invalid={!!errors.age}
            inputSize="lg"
          />
          {errors.age ? <FieldError>{errors.age}</FieldError> : <FieldError />}
        </FieldGroup>

        {/* Type */}
        <FieldGroup ref={fieldRefs.type as RefObject<HTMLDivElement>}>
          <FieldLabel>
            Animal Type <span>*</span>
          </FieldLabel>
          <Selection
            options={ANIMAL_TYPE_OPTIONS}
            value={fields.type}
            onChange={(v) => onChange({ type: v as AnimalType })}
            placeholder="Select type..."
            enableSearch={false}
            inputSize="lg"
          />
          {errors.type ? (
            <FieldError>{errors.type}</FieldError>
          ) : (
            <FieldError />
          )}
        </FieldGroup>
      </TwoColRow>

      {/* ── Breed ── */}
      <FieldGroup>
        <FieldLabel htmlFor="listing-breed">
          Breed <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.breed}
          id="listing-breed"
          placeholder="e.g. Labrador, Persian, Cockatiel"
          value={fields.breed}
          onChange={(e) => onChange({ breed: e.target.value })}
          invalid={!!errors.breed}
          inputSize="lg"
          maxLength={30}
        />
        {errors.breed ? (
          <FieldError>{errors.breed}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>

      {/* ── Gender pills ── */}
      <FieldGroup>
        <FieldLabel>
          Gender <span>*</span>
        </FieldLabel>
        <PillGroup>
          {GENDERS.map(({ label, value }) => {
            const isActive = fields.gender === value;
            return (
              <GenderPill
                key={value}
                type="button"
                active={isActive}
                onClick={() => onChange({ gender: value })}
                aria-pressed={isActive}
                id={`gender-${value}`}
              >
                {label}
              </GenderPill>
            );
          })}
        </PillGroup>
        {/* No error for gender since it always has a default */}
        <FieldError />
      </FieldGroup>
    </StepContent>
  );
}
