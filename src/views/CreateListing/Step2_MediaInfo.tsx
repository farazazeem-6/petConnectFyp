'use client';
import React, { useRef, useCallback, RefObject } from 'react';
import { Box, Text } from '@/components/elements';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  PillGroup,
  StepContent,
  ImageDropZone,
  ImagePreview,
  DropZoneIcon,
  DropZoneOverlay,
  SectionHeading,
  MultiPill,
  CharSection,
} from './CreateListing.style';

import { CameraIcon } from '@/components/svgs';
import { Step2Fields, Step2Errors, Step2Refs } from './types';
import {
  HEALTH_CONDITIONS,
  CHARACTERISTICS_GROUPS,
  ACCEPTED_IMAGE_TYPES,
} from './constants';

// ── Component ─────────────────────────────────────────────────────
interface Props {
  fields: Step2Fields;
  errors: Step2Errors;
  onChange: (patch: Partial<Step2Fields>) => void;
  fieldRefs: Step2Refs;
}

export function Step2_MediaInfo({
  fields,
  errors,
  onChange,
  fieldRefs,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Image file handling ──────────────────────────────────────
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        onChange({ imageFile: null, imagePreviewUrl: '' });
        return;
      }

      const url = URL.createObjectURL(file);
      onChange({ imageFile: file, imagePreviewUrl: url });
      // Reset so same file can be re-selected
      e.target.value = '';
    },
    [onChange],
  );

  const handleRemoveImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (fields.imagePreviewUrl) URL.revokeObjectURL(fields.imagePreviewUrl);
      onChange({ imageFile: null, imagePreviewUrl: '' });
    },
    [onChange, fields.imagePreviewUrl],
  );

  // ── Health condition toggle ──────────────────────────────────
  const toggleHealth = useCallback(
    (item: string) => {
      const current = fields.healthCondition;
      const next = current.includes(item)
        ? current.filter((h) => h !== item)
        : [...current, item];
      onChange({ healthCondition: next });
    },
    [fields.healthCondition, onChange],
  );

  // ── Characteristic toggle ────────────────────────────────────
  const toggleChar = useCallback(
    (item: string) => {
      const current = fields.characteristics;
      const next = current.includes(item)
        ? current.filter((c) => c !== item)
        : [...current, item];
      onChange({ characteristics: next });
    },
    [fields.characteristics, onChange],
  );

  return (
    <StepContent>
      {/* ── Image Upload ── */}
      <FieldGroup ref={fieldRefs.image as RefObject<HTMLDivElement>}>
        <FieldLabel htmlFor="listing-image">
          Animal Photo <span>*</span>
        </FieldLabel>

        {/* Hidden native file input */}
        <input
          ref={fileInputRef}
          id="listing-image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          aria-label="Upload animal photo"
        />

        <ImageDropZone
          htmlFor="listing-image"
          hasImage={!!fields.imagePreviewUrl}
          invalid={!!errors.image}
          aria-invalid={!!errors.image}
        >
          {fields.imagePreviewUrl ? (
            <>
              <ImagePreview src={fields.imagePreviewUrl} alt="Animal preview" />
              {/* Hover overlay: change photo */}
              <DropZoneOverlay onClick={handleRemoveImage}>
                Remove Photo
              </DropZoneOverlay>
            </>
          ) : (
            <>
              <DropZoneIcon>
                <CameraIcon width={40} height={40} css={{ color: '$main' }} />
              </DropZoneIcon>
              <Text
                heading="h4"
                css={{
                  color: '$main',
                  fontWeight: '$fontWeight$semibold',
                  textAlign: 'center',
                }}
              >
                Click to upload photo
              </Text>
              <Text
                heading="h8"
                css={{
                  color: '$slateGray',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                JPG, PNG, WEBP or GIF · Max size 5 MB
                <br />
                Single image only — no videos
              </Text>
            </>
          )}
        </ImageDropZone>

        {errors.image ? (
          <FieldError>{errors.image}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>

      {/* ── Health Condition ── */}
      <FieldGroup ref={fieldRefs.healthCondition as RefObject<HTMLDivElement>}>
        <FieldLabel>
          Health Condition <span>*</span>
        </FieldLabel>
        <Text
          heading="h8"
          css={{ color: '$slateGray', marginBottom: '$px$4', lineHeight: 1.4 }}
        >
          Select all that apply
        </Text>
        <PillGroup>
          {HEALTH_CONDITIONS.map((item) => {
            const isSelected = fields.healthCondition.includes(item);
            return (
              <MultiPill
                key={item}
                type="button"
                selected={isSelected}
                invalid={!isSelected && !!errors.healthCondition}
                onClick={() => toggleHealth(item)}
                aria-pressed={isSelected}
                id={`health-${item.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {isSelected && '✓ '}
                {item}
              </MultiPill>
            );
          })}
        </PillGroup>
        {errors.healthCondition ? (
          <FieldError>{errors.healthCondition}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>

      {/* ── Characteristics (optional, grouped) ── */}
      <FieldGroup>
        <FieldLabel>Characteristics </FieldLabel>
        <CharSection>
          {CHARACTERISTICS_GROUPS.map(({ label, items }) => (
            <Box key={label} css={{ marginBottom: '$px$16' }}>
              <SectionHeading>{label}</SectionHeading>
              <PillGroup>
                {items.map((item) => {
                  const isSelected = fields.characteristics.includes(item);
                  return (
                    <MultiPill
                      key={item}
                      type="button"
                      selected={isSelected}
                      onClick={() => toggleChar(item)}
                      aria-pressed={isSelected}
                      id={`char-${item.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {isSelected && '✓ '}
                      {item}
                    </MultiPill>
                  );
                })}
              </PillGroup>
            </Box>
          ))}
        </CharSection>
      </FieldGroup>
    </StepContent>
  );
}
