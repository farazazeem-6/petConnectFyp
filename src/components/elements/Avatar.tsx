'use client';
import { useEffect, useState, useRef } from 'react';
import { CSS, styled } from '@/theme';
import { Flex } from './Flex';
import { Box } from './Box';

const StyledAvatarRoot = styled(Box, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  borderRadius: '$radius$full',
  backgroundColor: '$gray300',
  border: '1px solid transparent',
  transition: 'border-color 0.2s ease-in-out',
  position: 'relative',

  variants: {
    size: {
      sm: { width: '$px$32', height: '$px$32' },
      md: { width: '$px$45', height: '$px$45' },
      lg: { width: '$px$60', height: '$px$60' },
    },
    fallback: {
      true: { borderColor: '$primary' },
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

const StyledAvatarFallback = styled(Flex, {
  defaultVariants: {
    align: 'center',
    justify: 'center',
  },
  width: '$percent$100',
  height: '$percent$100',
  backgroundColor: 'white',
  color: '$primary',
  fontSize: '$rem$1_31',
  fontWeight: '$fontWeight$semibold',
  lineHeight: 1,
  position: 'absolute',
  top: 0,
  left: 0,
});

type TAvatarProps = {
  src?: string;
  alt?: string;
  fallbackText?: string;
  delayMs?: number;
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
}: TAvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentSrcRef = useRef<string | undefined>(src);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // If no src provided, always show fallback
  const hasNoSrc = !src || src === '';

  // Show fallback when: no src, image error, or image hasn't loaded yet
  // This ensures fallback is always visible while image is loading
  const shouldShowFallback = hasNoSrc || imageError || !imageLoaded;

  const trimmed = fallbackText?.trim() || '';
  const fallbackInitial = trimmed[0]?.toUpperCase() || '';

  // Reset states only when src actually changes (not on every render)
  useEffect(() => {
    if (currentSrcRef.current !== src) {
      currentSrcRef.current = src;
      // Reset states when src changes
      setImageError(false);
      setImageLoaded(false);
    }
  }, [src]);

  // Notify parent about current renderable state
  useEffect(() => {
    onImageStatusChange?.(!shouldShowFallback);
    // only depends on fallback state
  });

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
      {/* Fallback is always rendered - shown when no src, error, or image not loaded */}
      <StyledAvatarFallback
        css={{
          zIndex: imageLoaded && !imageError && !hasNoSrc ? 0 : 1,
          opacity: imageLoaded && !imageError && !hasNoSrc ? 0 : 1,
          pointerEvents: 'none',
        }}
      >
        {fallbackInitial}
      </StyledAvatarFallback>
      {/* Image is rendered when src exists - hidden until loaded */}
      {src && src !== '' && (
        <StyledAvatarImage
          ref={(el) => {
            imageRef.current = el;
            // Check if image is already loaded when ref is set (for cached images)
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
