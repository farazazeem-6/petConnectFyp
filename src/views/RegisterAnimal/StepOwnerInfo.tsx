'use client';

import React, { RefObject } from 'react';
import { Input, Selection } from '@/components/elements';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  StepContent,
} from './RegisterAnimal.style';
import type { OwnerStepFields, OwnerStepErrors } from './constants';

type Props = {
  fields: OwnerStepFields;
  errors: OwnerStepErrors;
  onChange: (patch: Partial<OwnerStepFields>) => void;
  fieldRefs: {
    ownerName: RefObject<HTMLInputElement | null>;
    ownerPhone: RefObject<HTMLInputElement | null>;
  };
};

export function StepOwnerInfo({ fields, errors, onChange, fieldRefs }: Props) {
  return (
    <StepContent>
      <FieldGroup>
        <FieldLabel htmlFor="owner-name">
          Owner Name <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.ownerName}
          id="owner-name"
          placeholder="Your full name"
          value={fields.ownerName}
          onChange={(e) => onChange({ ownerName: e.target.value })}
          invalid={!!errors.ownerName}
          inputSize="lg"
        />
        {errors.ownerName ? <FieldError>{errors.ownerName}</FieldError> : <FieldError />}
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="owner-phone">
          Phone Number <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.ownerPhone}
          id="owner-phone"
          placeholder="e.g. 03001234567"
          value={fields.ownerPhone}
          onChange={(e) => onChange({ ownerPhone: e.target.value })}
          invalid={!!errors.ownerPhone}
          inputSize="lg"
        />
        {errors.ownerPhone ? (
          <FieldError>{errors.ownerPhone}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>
    </StepContent>
  );
}
