'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Input } from '@/components/elements';
import { CameraIcon } from '@/components/svgs';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  StepContent,
  ImageDropZone,
  ImagePreviewWrap,
  RemovePhotoBtn,
} from './RegisterAnimal.style';
import type { PhotoStepFields, PhotoStepErrors } from './constants';

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

type Props = {
  fields: PhotoStepFields;
  errors: PhotoStepErrors;
  onChange: (patch: Partial<PhotoStepFields>) => void;
};

export function StepPhotoNotes({ fields, errors, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) return;

    if (fields.imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(fields.imagePreviewUrl);
    }

    onChange({
      imageFile: file,
      imagePreviewUrl: URL.createObjectURL(file),
    });
  };

  const handleRemove = () => {
    if (fields.imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(fields.imagePreviewUrl);
    }
    onChange({ imageFile: null, imagePreviewUrl: '' });
  };

  return (
    <StepContent>
      <FieldGroup>
        <FieldLabel>
          Pet Photo <span>*</span>
        </FieldLabel>

        {fields.imagePreviewUrl ? (
          <ImagePreviewWrap>
            <Image
              src={fields.imagePreviewUrl}
              alt="Pet preview"
              width={400}
              height={240}
              style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
            />
            <RemovePhotoBtn type="button" onClick={handleRemove}>
              Remove
            </RemovePhotoBtn>
          </ImagePreviewWrap>
        ) : (
          <ImageDropZone onClick={() => fileRef.current?.click()}>
            <CameraIcon width={32} height={32} css={{ color: '$main' }} />
            <span>Click to upload a clear photo of your pet</span>
            <span style={{ fontSize: '0.75rem', color: '#667085' }}>
              JPG, PNG, WEBP or GIF
            </span>
          </ImageDropZone>
        )}

        <input
          ref={fileRef}
          type="file"
          accept={ACCEPTED.join(',')}
          hidden
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />

        {errors.image ? (
          <FieldError>{errors.image}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="distinguishing-features">
          Distinguishing Features
        </FieldLabel>
        <Input
          id="distinguishing-features"
          placeholder="Scars, collar color, unique marks…"
          value={fields.distinguishingFeatures}
          onChange={(e) => onChange({ distinguishingFeatures: e.target.value })}
          inputSize="lg"
          maxLength={300}
          invalid={!!errors.distinguishingFeatures}
        />
        {errors.distinguishingFeatures ? (
          <FieldError>{errors.distinguishingFeatures}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="registry-city">City</FieldLabel>
        <Input
          id="registry-city"
          placeholder="e.g. Lahore"
          value={fields.city}
          onChange={(e) => onChange({ city: e.target.value })}
          inputSize="lg"
          maxLength={50}
          invalid={!!errors.city}
        />
        {errors.city ? <FieldError>{errors.city}</FieldError> : <FieldError />}
      </FieldGroup>
    </StepContent>
  );
}
