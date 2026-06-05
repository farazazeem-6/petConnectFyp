'use client';

import Image from 'next/image';
import {
  ReviewSection,
  ReviewRow,
  ReviewLabel,
  ReviewValue,
  StepContent,
  ImagePreviewWrap,
} from './RegisterAnimal.style';
import type {
  AnimalStepFields,
  OwnerStepFields,
  PhotoStepFields,
} from './constants';
import { ANIMAL_TYPE_OPTIONS } from '@/constants';
import { capitalize } from '@/views/Admin/utils';

type Props = {
  owner: OwnerStepFields;
  animal: AnimalStepFields;
  photo: PhotoStepFields;
};

export function StepReview({ owner, animal, photo }: Props) {
  const typeLabel =
    ANIMAL_TYPE_OPTIONS.find((o) => o.value === animal.type)?.label ??
    capitalize(animal.type);

  return (
    <StepContent>
      <ReviewSection>
        <ReviewRow>
          <ReviewLabel>Owner Name</ReviewLabel>
          <ReviewValue>{owner.ownerName}</ReviewValue>
        </ReviewRow>
        <ReviewRow>
          <ReviewLabel>Phone</ReviewLabel>
          <ReviewValue>{owner.ownerPhone}</ReviewValue>
        </ReviewRow>
      </ReviewSection>

      <ReviewSection>
        <ReviewRow>
          <ReviewLabel>Pet Name</ReviewLabel>
          <ReviewValue>{animal.name}</ReviewValue>
        </ReviewRow>
        <ReviewRow>
          <ReviewLabel>Type</ReviewLabel>
          <ReviewValue>{typeLabel}</ReviewValue>
        </ReviewRow>
        <ReviewRow>
          <ReviewLabel>Breed</ReviewLabel>
          <ReviewValue>{animal.breed || '—'}</ReviewValue>
        </ReviewRow>
        <ReviewRow>
          <ReviewLabel>Color</ReviewLabel>
          <ReviewValue>{animal.color}</ReviewValue>
        </ReviewRow>
        <ReviewRow>
          <ReviewLabel>Age</ReviewLabel>
          <ReviewValue>{animal.age} months</ReviewValue>
        </ReviewRow>
        <ReviewRow>
          <ReviewLabel>Gender</ReviewLabel>
          <ReviewValue>{capitalize(animal.sex)}</ReviewValue>
        </ReviewRow>
        {photo.city && (
          <ReviewRow>
            <ReviewLabel>City</ReviewLabel>
            <ReviewValue>{photo.city}</ReviewValue>
          </ReviewRow>
        )}
        {photo.distinguishingFeatures && (
          <ReviewRow>
            <ReviewLabel>Features</ReviewLabel>
            <ReviewValue>{photo.distinguishingFeatures}</ReviewValue>
          </ReviewRow>
        )}
      </ReviewSection>

      {photo.imagePreviewUrl && (
        <ImagePreviewWrap>
          <Image src={photo.imagePreviewUrl} alt={animal.name} />
        </ImagePreviewWrap>
      )}
    </StepContent>
  );
}
