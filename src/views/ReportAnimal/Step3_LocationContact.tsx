'use client';
import { RefObject } from 'react';
import { Input, Text } from '@/components/elements';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  StepContent,
  StyledTextarea,
  TwoColRow,
} from './ReportAnimal.style';
import { Step3Fields, Step3Errors, Step3Refs } from './types';

interface Props {
  fields: Step3Fields;
  errors: Step3Errors;
  onChange: (patch: Partial<Step3Fields>) => void;
  fieldRefs: Step3Refs;
}

export function Step3_LocationContact({ fields, errors, onChange, fieldRefs }: Props) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <StepContent>
      {/* ── Section hint ── */}
      <Text
        heading="h8"
        css={{ color: '$slateGray', lineHeight: 1.6, marginBottom: '-$px$4' }}
      >
        Tell us where and when the animal was last seen, and how people can
        reach you.
      </Text>

      {/* ── Last seen location ── */}
      <FieldGroup>
        <FieldLabel htmlFor="report-location">
          Last Seen Location <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.lastSeenLocation as RefObject<HTMLInputElement>}
          id="report-location"
          placeholder="e.g. DHA Phase 2, near Park Lane, Lahore"
          value={fields.lastSeenLocation}
          onChange={(e) => onChange({ lastSeenLocation: e.target.value })}
          invalid={!!errors.lastSeenLocation}
          inputSize="lg"
          maxLength={150}
        />
        {errors.lastSeenLocation ? (
          <FieldError>{errors.lastSeenLocation}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>

      {/* ── Date + Time row ── */}
      <TwoColRow>
        {/* Date */}
        <FieldGroup>
          <FieldLabel htmlFor="report-date">
            Date Last Seen <span>*</span>
          </FieldLabel>
          <Input
            ref={fieldRefs.lastSeenDate as RefObject<HTMLInputElement>}
            id="report-date"
            type="date"
            max={today}
            value={fields.lastSeenDate}
            onChange={(e) => onChange({ lastSeenDate: e.target.value })}
            invalid={!!errors.lastSeenDate}
            inputSize="lg"
          />
          {errors.lastSeenDate ? (
            <FieldError>{errors.lastSeenDate}</FieldError>
          ) : (
            <FieldError />
          )}
        </FieldGroup>

        {/* Time — optional */}
        <FieldGroup>
          <FieldLabel htmlFor="report-time">
            Time{' '}
            <span style={{ fontWeight: 400, fontSize: '0.75rem', color: '#94a3b8', marginLeft: 4 }}>
              (optional)
            </span>
          </FieldLabel>
          <Input
            id="report-time"
            type="time"
            value={fields.lastSeenTime}
            onChange={(e) => onChange({ lastSeenTime: e.target.value })}
            invalid={!!errors.lastSeenTime}
            inputSize="lg"
          />
          {errors.lastSeenTime ? (
            <FieldError>{errors.lastSeenTime}</FieldError>
          ) : (
            <FieldError />
          )}
        </FieldGroup>
      </TwoColRow>

      {/* ── Contact number ── */}
      <FieldGroup>
        <FieldLabel htmlFor="report-contact">
          Your Contact Number <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.contactNumber as RefObject<HTMLInputElement>}
          id="report-contact"
          type="tel"
          placeholder="e.g. 0300-1234567"
          value={fields.contactNumber}
          onChange={(e) => onChange({ contactNumber: e.target.value })}
          invalid={!!errors.contactNumber}
          inputSize="lg"
          maxLength={20}
        />
        {errors.contactNumber ? (
          <FieldError>{errors.contactNumber}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>

      {/* ── Additional details (optional) ── */}
      <FieldGroup>
        <FieldLabel htmlFor="report-details">
          Any Other Details{' '}
          <span style={{ fontWeight: 400, fontSize: '0.75rem', color: '#94a3b8', marginLeft: 4 }}>
            (optional)
          </span>
        </FieldLabel>
        <StyledTextarea
          id="report-details"
          placeholder="e.g. Animal was limping, wearing a red collar, last seen near the mosque."
          value={fields.additionalDetails}
          onChange={(e) => onChange({ additionalDetails: e.target.value })}
          rows={4}
          maxLength={400}
          invalid={!!errors.additionalDetails}
        />
        <Text
          heading="h8"
          css={{ color: '$slateGray', textAlign: 'right', marginTop: '-$px$2' }}
        >
          {fields.additionalDetails.length}/400
        </Text>
        {errors.additionalDetails ? (
          <FieldError>{errors.additionalDetails}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>
    </StepContent>
  );
}
