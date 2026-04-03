'use client';
import { useEffect, useRef } from 'react';

type TScrollRestorationOptions = {
  key?: string;
  enabled?: boolean;
  threshold?: number;
};

export const useScrollRestoration = (
  options: TScrollRestorationOptions = {},
) => {
  const { key = 'scroll-position', enabled = true, threshold = 100 } = options;
  const isInitialized = useRef(false);
  const isRefreshing = useRef(false);

  // Check if this is a page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      isRefreshing.current = true;
    };

    const handleLoad = () => {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        isRefreshing.current = false;
      }, 100);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Save scroll position
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (isRefreshing.current) return;

      const scrollY = window.scrollY;
      if (scrollY > threshold) {
        sessionStorage.setItem(key, scrollY.toString());
      } else {
        sessionStorage.removeItem(key);
      }
    };

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [enabled, key, threshold]);

  // Restore scroll position
  const restoreScrollPosition = () => {
    if (!enabled || isInitialized.current) return;

    const savedPosition = sessionStorage.getItem(key);
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      if (position > 0) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo({
            top: position,
            behavior: 'instant', // Use instant to avoid animation
          });
        });
      }
    }

    isInitialized.current = true;
  };

  // Clear saved position
  const clearScrollPosition = () => {
    sessionStorage.removeItem(key);
  };

  return {
    restoreScrollPosition,
    clearScrollPosition,
  };
};
