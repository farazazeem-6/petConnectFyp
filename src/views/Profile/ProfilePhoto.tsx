'use client';

import { useRef, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { Flex, Button, Text } from '@/components/elements';
import {
  PhotoSection,
  AvatarWrap,
  AvatarImage,
  AvatarLoaderOverlay,
  AvatarSpinner,
  CropModalOverlay,
  CropModalBox,
  CropAreaWrap,
  ZoomSlider,
  BtnSpinner,
  ChangeButton,
} from './Profile.style';
import { TProfilePhotoProps } from '@/utils/types';

// ── Crop helper → returns a cropped circular File
const getCroppedFile = (imageSrc: string, pixelCrop: Area): Promise<File> =>
  new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.src = imageSrc;
    image.onload = () => {
      const SIZE = 400;
      const canvas = document.createElement('canvas');
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas unavailable'));

      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        SIZE,
        SIZE,
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Blob creation failed'));
          resolve(new File([blob], 'avatar.jpg', { type: 'image/jpeg' }));
        },
        'image/jpeg',
        0.9,
      );
    };
    image.onerror = reject;
  });

export const ProfilePhoto = ({
  photoURL,
  name,
  photoLoading,
  onPhotoChange,
  onPhotoRemove,
}: TProfilePhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cropOpen, setCropOpen] = useState(false);
  const [rawSrc, setRawSrc] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState<Area | null>(null);
  const [cropApplying, setCropApplying] = useState(false);

  const isDefaultAvatar = photoURL?.includes('ui-avatars.com');

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedPixels(pixels);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setRawSrc(ev.target?.result as string);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleApply = async () => {
    if (!croppedPixels) return;
    setCropApplying(true);
    try {
      const file = await getCroppedFile(rawSrc, croppedPixels);
      await onPhotoChange(file);
      setCropOpen(false);
    } finally {
      setCropApplying(false);
    }
  };

  return (
    <>
      <PhotoSection>
        {/* ── Avatar with overlay loader ── */}
        <AvatarWrap>
          <AvatarImage src={photoURL} alt={name} />
          {photoLoading && (
            <AvatarLoaderOverlay>
              <AvatarSpinner />
            </AvatarLoaderOverlay>
          )}
        </AvatarWrap>

        {/* ── Buttons ── */}
        <Flex direction="row" align="center" gap={12}>
          <ChangeButton
            variant="default"
            size="md"
            disabled={photoLoading}
            onClick={() => fileInputRef.current?.click()}
          >
            Change Photo
          </ChangeButton>

          {!isDefaultAvatar && (
            <Button
              css={{
                padding: '$px$15 !important',
                '@sm_max': {
                  padding: '$px$10 !important',
                },
              }}
              variant="ghost"
              disabled={photoLoading}
              onClick={onPhotoRemove}
            >
              Remove
            </Button>
          )}
        </Flex>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </PhotoSection>

      {/* ── Crop modal ── */}
      {cropOpen && (
        <CropModalOverlay onClick={() => setCropOpen(false)}>
          <CropModalBox onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <Flex
              direction="row"
              align="center"
              justify="between"
              css={{ mb: '$rem$1' }}
            >
              <Text
                css={{
                  fontSize: '$fontSize$md',
                  fontWeight: '$fontWeight$semibold',
                  color: '$foreground',
                }}
              >
                Crop Photo
              </Text>
              <Button
                css={{
                  padding: '$px$15 !important',
                  '@sm_max': { padding: '$px$10 !important' },
                }}
                variant="ghost"
                onClick={() => setCropOpen(false)}
              >
                ✕
              </Button>
            </Flex>

            {/* Crop area */}
            <CropAreaWrap>
              <Cropper
                image={rawSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </CropAreaWrap>

            {/* Zoom */}
            <Flex
              direction="row"
              align="center"
              gap={12}
              css={{ mb: '$rem$1' }}
            >
              <Text
                css={{
                  fontSize: '$fontSize$xs',
                  color: '$black',
                  whiteSpace: 'nowrap',
                }}
              >
                Zoom
              </Text>
              <ZoomSlider
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
              <Text
                css={{
                  fontSize: '$fontSize$xs',
                  color: '$grayDark',
                  minWidth: '$px$28',
                }}
              >
                {zoom.toFixed(1)}×
              </Text>
            </Flex>

            {/* Footer */}
            <Flex direction="row" align="center" justify="end" gap={8}>
              <Button
                css={{
                  padding: '$px$15 !important',
                  '@sm_max': { padding: '$px$10 !important' },
                }}
                variant="ghost"
                onClick={() => setCropOpen(false)}
              >
                Cancel
              </Button>
              <ChangeButton
                variant={'default'}
                disabled={cropApplying}
                onClick={handleApply}
              >
                {cropApplying ? <BtnSpinner /> : 'Apply'}
              </ChangeButton>
            </Flex>
          </CropModalBox>
        </CropModalOverlay>
      )}
    </>
  );
};
