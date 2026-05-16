'use client';
import React, { RefObject } from 'react';
import { Input, Selection, Text } from '@/components/elements';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  TwoColRow,
  PillGroup,
  GenderPill,
  StepContent,
  StyledTextarea,
} from './ReportAnimal.style';
import { Step1Fields, Step1Errors, Step1Refs } from './types';
import { AnimalType } from '@/utils/types/animal';
import { ANIMAL_TYPE_OPTIONS, GENDERS } from './constants';

interface Props {
  fields: Step1Fields;
  errors: Step1Errors;
  onChange: (patch: Partial<Step1Fields>) => void;
  fieldRefs: Step1Refs;
}

export function Step1_AnimalDetails({ fields, errors, onChange, fieldRefs }: Props) {
  return (
    <StepContent>
      {/* ── Name ── */}
      <FieldGroup>
        <FieldLabel htmlFor="report-name">
          Animal Name <span>*</span>
        </FieldLabel>
        <Input
          ref={fieldRefs.name}
          id="report-name"
          placeholder="e.g. Max, Fluffy, Unknown"
          value={fields.name}
          onChange={(e) => onChange({ name: e.target.value })}
          invalid={!!errors.name}
          inputSize="lg"
          maxLength={30}
        />
        {errors.name ? <FieldError>{errors.name}</FieldError> : <FieldError />}
      </FieldGroup>

      {/* ── Type + Age row ── */}
      <TwoColRow>
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
          {errors.type ? <FieldError>{errors.type}</FieldError> : <FieldError />}
        </FieldGroup>

        {/* Age */}
        <FieldGroup>
          <FieldLabel htmlFor="report-age">
            Age Estimate <span>*</span>
          </FieldLabel>
          <Input
            ref={fieldRefs.age}
            id="report-age"
            placeholder='e.g. ~24 months, Young'
            value={fields.age}
            onChange={(e) => onChange({ age: e.target.value })}
            invalid={!!errors.age}
            inputSize="lg"
            maxLength={30}
          />
          {errors.age ? <FieldError>{errors.age}</FieldError> : <FieldError />}
        </FieldGroup>
      </TwoColRow>

      {/* ── Color + Breed row ── */}
      <TwoColRow>
        {/* Color */}
        <FieldGroup>
          <FieldLabel htmlFor="report-color">
            Color / Markings <span>*</span>
          </FieldLabel>
          <Input
            ref={fieldRefs.color}
            id="report-color"
            placeholder="e.g. Brown & white, Black"
            value={fields.color}
            onChange={(e) => onChange({ color: e.target.value })}
            invalid={!!errors.color}
            inputSize="lg"
            maxLength={50}
          />
          {errors.color ? <FieldError>{errors.color}</FieldError> : <FieldError />}
        </FieldGroup>

        {/* Breed — optional */}
        <FieldGroup>
          <FieldLabel htmlFor="report-breed">
            Breed{' '}
            <span style={{ fontWeight: 400, fontSize: '0.75rem', color: '#94a3b8', marginLeft: 4 }}>
              (optional)
            </span>
          </FieldLabel>
          <Input
            id="report-breed"
            placeholder="e.g. Labrador, Persian"
            value={fields.breed}
            onChange={(e) => onChange({ breed: e.target.value })}
            inputSize="lg"
            maxLength={30}
          />
          <FieldError />
        </FieldGroup>
      </TwoColRow>

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
                id={`report-gender-${value}`}
              >
                {label}
              </GenderPill>
            );
          })}
        </PillGroup>
        <FieldError />
      </FieldGroup>

      {/* ── Distinguishing Features ── */}
      <FieldGroup>
        <FieldLabel htmlFor="report-features">
          Distinguishing Features <span>*</span>
        </FieldLabel>
        <Text
          heading="h8"
          css={{ color: '$slateGray', marginBottom: '$px$2', lineHeight: 1.4 }}
        >
          Collar, tags, scars, unique markings, behaviour, etc.
        </Text>
        <StyledTextarea
          id="report-features"
          placeholder="e.g. Blue collar with no tag, scar on left ear, very friendly"
          value={fields.distinguishingFeatures}
          rows={3}
          maxLength={300}
          invalid={!!errors.distinguishingFeatures}
          onChange={(e) => onChange({ distinguishingFeatures: e.target.value })}
        />
        {errors.distinguishingFeatures ? (
          <FieldError>{errors.distinguishingFeatures}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>
    </StepContent>
  );
}
