import { useCallback, useEffect, useState } from 'react';
import { useScreenWidth, useScrollRestoration } from '@/hooks';

export const useHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { clearScrollPosition } = useScrollRestoration();
  const { isLgMax } = useScreenWidth();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLogoClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavigation = useCallback(() => {
    clearScrollPosition();
    setIsMobileMenuOpen(false);
  }, [clearScrollPosition]);

  // ── Close when clicking outside sidebar ──────────────────────────────────────────────

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.mobile-sidebar')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // ── Lock body scroll when sidebar is open ──────────────────────────────────────────────

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const lock = isMobileMenuOpen;
    body.style.overflow = lock ? 'hidden' : '';
    html.style.overflow = lock ? 'hidden' : '';
    return () => {
      body.style.overflow = '';
      html.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ── Close sidebar when crossing lg breakpoint ──────────────────────────────────────────────

  useEffect(() => {
    if (!isLgMax) setIsMobileMenuOpen(false);
  }, [isLgMax]);

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    handleLogoClick,
    handleNavigation,
  };
};
