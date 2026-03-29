'use client';
import React, { useEffect, useState, type FC } from 'react';
import { styled } from '@/theme/stitches.config';
import { CSS, VariantProps } from '@stitches/react';
import Image from 'next/image';
import { Box } from './Box';
import { slideDownAndFade, slideUpAndFade, popOutIn } from '@/theme';
import { SkeletonLoader } from './Skeleton';
import { useImgLoadingState } from '@/hooks';

type TNextJSImage = {
  imageUrl: string;
  css?: CSS;
  width?: string | number;
  height?: string | number;
  shape?: VariantProps<typeof StyledHTMLImage>['shape'];
  animate?: VariantProps<typeof StyledHTMLImage>['animate'];
  alt?: string;
  fallbackImage?: string;
  onError?: () => void;
};

export const NextJSImage: FC<TNextJSImage> = ({
  imageUrl,
  width,
  height,
  css,
  shape = 'square',
  animate,
  alt = '',
  fallbackImage,
  onError,
}) => {
  const { isLoading, onImageError, onImageLoad } = useImgLoadingState();
  const [hasError, setHasError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  useEffect(() => {
    setCurrentImageUrl(imageUrl);
    setHasError(false);
  }, [imageUrl]);

  const handleError = () => {
    onImageError();
    if (fallbackImage && !hasError) {
      setHasError(true);
      setCurrentImageUrl(fallbackImage);
    } else if (onError) {
      onError();
    }
  };

  return (
    <Box
      css={{
        width: '$percent100',
        height: '$percent$100',
        position: 'relative',
      }}
    >
      {isLoading && (
        <ImageSkeltonWrapper>
          <SkeletonLoader
            circle={shape === 'circle'}
            width="100%"
            height="100%"
          />
        </ImageSkeltonWrapper>
      )}
      <StyledHTMLImage
        src={currentImageUrl}
        onLoad={onImageLoad}
        onError={handleError}
        alt={alt}
        css={{
          ...css,
          objectFit: css?.objectFit || 'cover',
          position: isLoading ? 'absolute' : 'relative',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
        width={width}
        height={height}
        shape={shape}
        animate={animate}
      />
    </Box>
  );
};

type THTMLImage = {
  imageUrl: string;
  css?: CSS;
  objectFit?: 'contain' | 'cover' | 'fill';
  alt?: string;
  fallbackImage?: string;
  onError?: () => void;
};

export const HTMLImage: FC<THTMLImage> = ({
  imageUrl,
  css,
  objectFit = 'contain',
  alt = '',
  fallbackImage,
  onError,
}) => {
  const { isLoading, onImageError, onImageLoad } = useImgLoadingState();
  const [hasError, setHasError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  useEffect(() => {
    setCurrentImageUrl(imageUrl);
    setHasError(false);
  }, [imageUrl]);

  const handleError = () => {
    onImageError();
    if (fallbackImage && !hasError) {
      setHasError(true);
      setCurrentImageUrl(fallbackImage);
    } else if (onError) {
      onError();
    }
  };

  return (
    <Box css={{ width: '100%', height: '100%', position: 'relative' }}>
      {isLoading && <SkeletonLoader width="100%" height="100%" />}
      <StyledNextImage
        src={currentImageUrl}
        alt={alt}
        layout="fill"
        objectFit={objectFit}
        onLoad={onImageLoad}
        onError={handleError}
        css={css}
      />
    </Box>
  );
};

//  Styled Components

export const StyledHTMLImage = styled('img', {
  display: 'block',
  borderRadius: '4px',
  variants: {
    shape: {
      square: { borderRadius: '4px' },
      circle: { borderRadius: '50%' },
      rounded: { borderRadius: '12px' },
    },
    animate: {
      slideUpFade: {
        animation: `1.5s ${slideUpAndFade} ease-out`,
      },
      slideUpFade2: {
        animation: `2s ${slideUpAndFade} ease-out`,
      },
      slideUpFade3: {
        animation: `2.5s ${slideUpAndFade} ease-out`,
      },
      slideDownFade: {
        animation: `1.5s ${slideDownAndFade} ease-out`,
      },
      slideDownFade2: {
        animation: `2s ${slideDownAndFade} ease-out`,
      },
      slideDownFade3: {
        animation: `3s ${slideDownAndFade} ease-out`,
      },
      popOutIn1: {
        animation: `1s ${popOutIn} ease-out`,
      },
      popOutIn: {
        animation: `1.5s ${popOutIn} ease-out`,
      },
    },
  },
});

export const StyledNextImage = styled(Image, {
  borderRadius: 4,
});

const ImageSkeltonWrapper = styled(Box, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
});
