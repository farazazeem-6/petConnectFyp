'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useClickOutside = () => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders
  const closePopover = useCallback(() => setIsOpen(false), []);
  const togglePopover = useCallback(() => setIsOpen((prev) => !prev), []);

  // Handle click outside and escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current?.contains(event.target as Node) ||
        popoverRef.current?.contains(event.target as Node)
      )
        return;
      closePopover();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopover();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closePopover]);

  return { closePopover, avatarRef, togglePopover, isOpen, popoverRef };
};
