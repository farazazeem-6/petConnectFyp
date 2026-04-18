'use client';

import React, { useEffect, useState, useRef } from 'react';
import { CSS, styled } from '@/theme';
import { Box } from './Box';

const StyledAvatarRoot = styled(Box, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  borderRadius: '$percent$100',
  border: '1px solid transparent',
  transition: 'border-color 0.2s ease-in-out',
  position: 'relative',

  variants: {
    size: {
      sm: { width: '$px$32', height: '$px$32' },
      md: { width: '$px$40', height: '$px$40' },
      lg: { width: '$px$60', height: '$px$60' },
    },
    fallback: {
      true: { borderColor: '$main' },
      false: { borderColor: 'transparent' },
    },
  },

  defaultVariants: {
    size: 'md',
    fallback: false,
  },
});

const StyledAvatarImage = styled('img', {
  width: '$percent$100',
  height: '$percent$100',
  objectFit: 'cover',
  borderRadius: 'inherit',
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'block',
});

const StyledAvatarFallback = styled(Box, {
  width: '$percent$100',
  height: '$percent$100',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$white',
  color: '$main',
  fontSize: '$px$20',
  fontWeight: '$fontWeight$semibold',
  lineHeight: 1,
  position: 'absolute',
  top: 0,
  left: 0,
});

type AvatarProps = {
  src?: string;
  alt?: string;
  fallbackText?: string;
  size?: 'sm' | 'md' | 'lg';
  css?: CSS;
  onImageStatusChange?: (hasRenderableImage: boolean) => void;
};

export const Avatar = ({
  src,
  alt,
  fallbackText,
  size = 'md',
  css,
  onImageStatusChange,
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentSrcRef = useRef<string | undefined>(src);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const hasNoSrc = !src || src === '';
  const shouldShowFallback = hasNoSrc || imageError || !imageLoaded;
  const trimmed = fallbackText?.trim() || '';
  const fallbackInitial = trimmed[0]?.toUpperCase() || '';

  useEffect(() => {
    if (currentSrcRef.current !== src) {
      currentSrcRef.current = src;
      setImageError(false);
      setImageLoaded(false);
    }
  }, [src]);

  useEffect(() => {
    onImageStatusChange?.(!shouldShowFallback);
  }, [shouldShowFallback]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    onImageStatusChange?.(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    onImageStatusChange?.(false);
  };

  return (
    <StyledAvatarRoot size={size} fallback={shouldShowFallback} css={css}>
      <StyledAvatarFallback
        css={{
          zIndex: imageLoaded && !imageError && !hasNoSrc ? 0 : 1,
          opacity: imageLoaded && !imageError && !hasNoSrc ? 0 : 1,
          pointerEvents: 'none',
        }}
      >
        {fallbackInitial}
      </StyledAvatarFallback>

      {src && src !== '' && (
        <StyledAvatarImage
          ref={(el) => {
            imageRef.current = el;
            if (el && el.complete && el.naturalHeight !== 0 && !imageLoaded) {
              setImageLoaded(true);
              onImageStatusChange?.(true);
            }
          }}
          src={src}
          alt={alt}
          css={{
            ...css,
            zIndex: imageLoaded && !imageError ? 2 : 0,
            opacity: imageLoaded && !imageError ? 1 : 0,
            visibility: imageError ? 'hidden' : 'visible',
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </StyledAvatarRoot>
  );
};
