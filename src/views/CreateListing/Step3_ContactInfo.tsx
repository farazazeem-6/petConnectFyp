'use client';
import { RefObject } from 'react';
import { Input, Text, Selection } from '@/components/elements';
import { DEFAULT_CITY_OPTIONS } from '@/constants';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  StepContent,
} from './CreateListing.style';
import { Step3Fields, Step3Errors, Step3Refs } from './types';

// ── Component ─────────────────────────────────────────────────────
interface Props {
  fields: Step3Fields;
  errors: Step3Errors;
  onChange: (patch: Partial<Step3Fields>) => void;
  fieldRefs: Step3Refs;
}

export function Step3_ContactInfo({ fields, errors, onChange, fieldRefs }: Props) {
  return (
    <StepContent>
      {/* ── Section hint ── */}
      <Text
        heading="h8"
        css={{ color: '$slateGray', lineHeight: 1.6, marginBottom: '-$px$4' }}
      >
        Let interested adopters know how to reach you. Only your phone number
        and city are required.
      </Text>

      {/* ── City ── */}
      <FieldGroup ref={fieldRefs.city as unknown as RefObject<HTMLDivElement>}>
        <FieldLabel>
          City <span>*</span>
        </FieldLabel>
        <Selection
          options={DEFAULT_CITY_OPTIONS.map((city) => ({
            label: city,
            value: city,
          }))}
          value={fields.city}
          onChange={(val) => onChange({ city: val })}
          placeholder="Select a City"
          enableSearch={false}
          enableClear={false}
          inputSize="lg"
        />
        {errors.city ? <FieldError>{errors.city}</FieldError> : <FieldError />}
      </FieldGroup>

      {/* ── Phone number ── */}
      <FieldGroup>
        <FieldLabel htmlFor="listing-phone">
          Phone Number <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.phoneNumber as RefObject<HTMLInputElement>}
          id="listing-phone"
          type="tel"
          placeholder="e.g. 0300-1234567"
          value={fields.phoneNumber}
          onChange={(e) => onChange({ phoneNumber: e.target.value })}
          invalid={!!errors.phoneNumber}
          inputSize="lg"
          maxLength={20}
        />
        {errors.phoneNumber ? (
          <FieldError>{errors.phoneNumber}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>

      {/* ── Address (optional) ── */}
      <FieldGroup>
        <FieldLabel htmlFor="listing-address">
          Address{' '}
          <span
            style={{
              fontWeight: 400,
              fontSize: '0.75rem',
              color: '#94a3b8',
              marginLeft: 4,
            }}
          >
            (optional)
          </span>
        </FieldLabel>
        <Input
          id="listing-address"
          placeholder="e.g. Street 5, DHA Phase 2"
          value={fields.address}
          onChange={(e) => onChange({ address: e.target.value })}
          inputSize="lg"
          maxLength={100}
        />
        <FieldError />
      </FieldGroup>

      {/* ── Description / message (optional) ── */}
      <FieldGroup>
        <FieldLabel htmlFor="listing-description">
          Short Message{' '}
          <span
            style={{
              fontWeight: 400,
              fontSize: '0.75rem',
              color: '#94a3b8',
              marginLeft: 4,
            }}
          >
            (optional)
          </span>
        </FieldLabel>
        <textarea
          id="listing-description"
          placeholder="e.g. He is very friendly and loves kids. Vaccinated and neutered."
          value={fields.description}
          onChange={(e) => onChange({ description: e.target.value })}
          maxLength={400}
          rows={4}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: '12px',
            border: '1.5px solid #e2e8f0',
            padding: '12px 16px',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            color: '#1e293b',
            backgroundColor: '#fff',
            resize: 'vertical',
            outline: 'none',
            transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
            lineHeight: 1.6,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#a03048';
            e.target.style.boxShadow = '0 0 0 3px rgba(160,48,72,0.12)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
        />
        <Text
          heading="h8"
          css={{ color: '$slateGray', textAlign: 'right', marginTop: '-$px$2' }}
        >
          {fields.description.length}/400
        </Text>
        <FieldError />
      </FieldGroup>
    </StepContent>
  );
}
