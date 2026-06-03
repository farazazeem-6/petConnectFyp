'use client';

import React, { RefObject } from 'react';
import { Input, Selection } from '@/components/elements';
import { ANIMAL_TYPE_OPTIONS, GENDERS } from '@/constants';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  TwoColRow,
  StepContent,
  PillGroup,
  GenderPill,
} from './RegisterAnimal.style';
import type { AnimalStepFields, AnimalStepErrors } from './constants';
import type { AnimalType } from '@/utils/types';

type Props = {
  fields: AnimalStepFields;
  errors: AnimalStepErrors;
  onChange: (patch: Partial<AnimalStepFields>) => void;
  fieldRefs: {
    name: RefObject<HTMLInputElement | null>;
    age: RefObject<HTMLInputElement | null>;
    type: RefObject<HTMLDivElement | null>;
    color: RefObject<HTMLInputElement | null>;
  };
};

export function StepAnimalIdentity({ fields, errors, onChange, fieldRefs }: Props) {
  return (
    <StepContent>
      <FieldGroup>
        <FieldLabel htmlFor="pet-name">
          Pet Name <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.name}
          id="pet-name"
          placeholder="e.g. Bruno, Whiskers"
          value={fields.name}
          onChange={(e) => onChange({ name: e.target.value })}
          invalid={!!errors.name}
          inputSize="lg"
          maxLength={30}
        />
        {errors.name ? <FieldError>{errors.name}</FieldError> : <FieldError />}
      </FieldGroup>

      <TwoColRow>
        <FieldGroup ref={fieldRefs.type as RefObject<HTMLDivElement>}>
          <FieldLabel>
            Animal Type <span>*</span>
          </FieldLabel>
          <Selection
            options={ANIMAL_TYPE_OPTIONS}
            value={fields.type}
            onChange={(v) => onChange({ type: v as AnimalType })}
            placeholder="Select type"
            enableSearch
          />
          {errors.type ? <FieldError>{errors.type}</FieldError> : <FieldError />}
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="pet-breed">Breed</FieldLabel>
          <Input
            id="pet-breed"
            placeholder="e.g. Labrador"
            value={fields.breed}
            onChange={(e) => onChange({ breed: e.target.value })}
            inputSize="lg"
            maxLength={30}
          />
          <FieldError />
        </FieldGroup>
      </TwoColRow>

      <TwoColRow>
        <FieldGroup>
          <FieldLabel htmlFor="pet-age">
            Age (months) <span>*</span>
          </FieldLabel>
          <Input
            ref={fieldRefs.age}
            id="pet-age"
            type="number"
            min="0"
            max="240"
            placeholder="e.g. 24"
            value={fields.age}
            onChange={(e) => onChange({ age: e.target.value })}
            invalid={!!errors.age}
            inputSize="lg"
          />
          {errors.age ? <FieldError>{errors.age}</FieldError> : <FieldError />}
        </FieldGroup>

        <FieldGroup ref={fieldRefs.color as RefObject<HTMLDivElement>}>
          <FieldLabel htmlFor="pet-color">
            Color / Markings <span>*</span>
          </FieldLabel>
          <Input
            id="pet-color"
            placeholder="e.g. Brown with white chest"
            value={fields.color}
            onChange={(e) => onChange({ color: e.target.value })}
            invalid={!!errors.color}
            inputSize="lg"
            maxLength={50}
          />
          {errors.color ? <FieldError>{errors.color}</FieldError> : <FieldError />}
        </FieldGroup>
      </TwoColRow>

      <FieldGroup>
        <FieldLabel>
          Gender <span>*</span>
        </FieldLabel>
        <PillGroup>
          {GENDERS.map(({ label, value }) => (
            <GenderPill
              key={value}
              type="button"
              active={fields.sex === value}
              onClick={() => onChange({ sex: value })}
            >
              {label}
            </GenderPill>
          ))}
        </PillGroup>
        <FieldError />
      </FieldGroup>
    </StepContent>
  );
}
