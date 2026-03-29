'use client';
import { useState } from 'react';

export const useImgLoadingState = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onImageLoad = () => {
    setIsLoading(false);
  };

  const onImageError = () => {
    setIsLoading(false); // In case of an error, we still want to hide the loader.
  };

  return { isLoading, onImageLoad, onImageError };
};
