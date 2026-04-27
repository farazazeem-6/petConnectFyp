'use client';
import React, { useRef, useCallback, RefObject } from 'react';
import { Text } from '@/components/elements';
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  StepContent,
  ImageDropZone,
  ImagePreview,
  DropZoneIcon,
  DropZoneOverlay,
} from './ReportAnimal.style';
import { CameraIcon } from '@/components/svgs';
import { Step2Fields, Step2Errors, Step2Refs } from './types';
import { ACCEPTED_IMAGE_TYPES } from './constants';

interface Props {
  fields: Step2Fields;
  errors: Step2Errors;
  onChange: (patch: Partial<Step2Fields>) => void;
  fieldRefs: Step2Refs;
}

export function Step2_PhotoInfo({ fields, errors, onChange, fieldRefs }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <StepContent>
      <FieldGroup ref={fieldRefs.image as RefObject<HTMLDivElement>}>
        <FieldLabel htmlFor="report-image">
          Animal Photo <span>*</span>
        </FieldLabel>
        <Text
          heading="h8"
          css={{ color: '$slateGray', marginBottom: '$px$2', lineHeight: 1.5 }}
        >
          A clear photo helps identify the animal much faster.
        </Text>

        {/* Hidden native file input */}
        <input
          ref={fileInputRef}
          id="report-image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          aria-label="Upload animal photo"
        />

        <ImageDropZone
          htmlFor="report-image"
          hasImage={!!fields.imagePreviewUrl}
          invalid={!!errors.image}
          aria-invalid={!!errors.image}
        >
          {fields.imagePreviewUrl ? (
            <>
              <ImagePreview src={fields.imagePreviewUrl} alt="Animal preview" />
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
                Single image only
              </Text>
            </>
          )}
        </ImageDropZone>

        {errors.image ? <FieldError>{errors.image}</FieldError> : <FieldError />}
      </FieldGroup>
    </StepContent>
  );
}
