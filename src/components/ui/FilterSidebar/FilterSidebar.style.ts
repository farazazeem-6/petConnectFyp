'use client';

import { keyframes } from '@/theme/stitches.config';
import { styled } from '@/theme';
import { Box } from '@/components/elements/Box';
import { Flex } from '@/components/elements/Flex';
import { Text } from '@/components/elements/Text';
import { Button } from '@/components/elements/Button';

// ─── Drawer slide-in animation (left → right) ────────────────────
const slideInFromLeft = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
});

// ─── Overlay fade-in ─────────────────────────────────────────────
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

// ─── Outer sidebar wrapper (desktop: static; mobile: drawer) ─────
export const SidebarRoot = styled(Box, {
  width: '280px',           // fixed desktop width
  flexShrink: 0,
  backgroundColor: '$white',
  borderRadius: '$radius$lg',
  border: '1px solid $lightGrayLine',
  boxShadow: '$cardShadow',
  height: 'fit-content',
  overflowY: 'auto',
  position: 'sticky',
  top: '24px',              // sticks below the header on scroll

  // ── Mobile drawer: hidden off-screen by default, pulls in when open ──
  '@md_max': {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100dvh',       // full-screen height on mobile
    width: '300px',
    maxWidth: '85vw',
    zIndex: '$ul$900',
    borderRadius: '0 $radius$xl $radius$xl 0',
    overflowY: 'auto',
    transform: 'translateX(-100%)',           // hidden by default
    transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '4px 0 24px rgba(0,0,0,0.18)',

    // open state toggled via data-open attribute
    '&[data-open="true"]': {
      transform: 'translateX(0)',
      animation: `${slideInFromLeft} 0.32s cubic-bezier(0.4, 0, 0.2, 1)`,
    },
  },
});

// ─── Dark overlay behind drawer (mobile only) ────────────────────
export const DrawerOverlay = styled(Box, {
  display: 'none',          // hidden on desktop
  '@md_max': {
    display: 'block',
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: '$ul$800',
    backdropFilter: 'blur(2px)',
    cursor: 'pointer',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease',

    '&[data-open="true"]': {
      opacity: 1,
      pointerEvents: 'auto',
      animation: `${fadeIn} 0.3s ease`,
    },
  },
});

// ─── Inner padding wrapper ────────────────────────────────────────
export const SidebarInner = styled(Flex, {
  flexDirection: 'column !important',
  padding: '$px$20',
  gap: '$px$4',
});

// ─── Sidebar header (title + subtitle) ───────────────────────────
export const SidebarHeader = styled(Flex, {
  flexDirection: 'column !important',
  gap: '$px$2',
  paddingBottom: '$px$16',
  borderBottom: '2px solid $lightGrayLine',
  marginBottom: '$px$4',
});

// ─── Section block (e.g. "Animal Type", "Breed") ─────────────────
export const FilterSection = styled(Flex, {
  flexDirection: 'column !important',
  gap: '$px$10',
  paddingTop: '$px$14',
  paddingBottom: '$px$14',
  borderBottom: '1px solid $lightGrayLine',

  '&:last-of-type': {
    borderBottom: 'none',
  },
});

// ─── Section label row (icon + label text) ───────────────────────
export const SectionLabel = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$8',
  marginBottom: '$px$6',
});

// ─── Custom checkbox row ──────────────────────────────────────────
export const CheckboxRow = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$10',
  cursor: 'pointer',
  padding: '$px$4 $px$6',
  borderRadius: '$radius$md',
  transition: 'background 0.15s ease',
  userSelect: 'none',

  '&:hover': { backgroundColor: '$colorGray' },
});

// ─── Styled native checkbox ───────────────────────────────────────
export const StyledCheckbox = styled('input', {
  width: '16px',
  height: '16px',
  accentColor: '$main',        // brand teal/green color for checkmark
  cursor: 'pointer',
  flexShrink: 0,
});

// ─── Radio row (gender) ───────────────────────────────────────────
export const RadioRow = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$10',
  cursor: 'pointer',
  padding: '$px$4 $px$6',
  borderRadius: '$radius$md',
  transition: 'background 0.15s ease',
  userSelect: 'none',

  '&:hover': { backgroundColor: '$colorGray' },
});

// ─── Styled native radio ──────────────────────────────────────────
export const StyledRadio = styled('input', {
  width: '16px',
  height: '16px',
  accentColor: '$main',
  cursor: 'pointer',
  flexShrink: 0,
});

// ─── Min/Max age row layout ───────────────────────────────────────
export const AgeRangeRow = styled(Flex, {
  gap: '$px$10',
  alignItems: 'flex-end !important',
});

// ─── Each age field wrapper (label + input) ───────────────────────
export const AgeFieldWrapper = styled(Flex, {
  flexDirection: 'column !important',
  gap: '$px$4',
  flex: 1,
});

// ─── Age label text (MIN AGE / MAX AGE) ──────────────────────────
export const AgeLabel = styled(Text, {
  fontSize: '$rem$0_62',
  fontWeight: '$fontWeight$semibold',
  color: '$slateGray',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
});

// ─── Inline age input ─────────────────────────────────────────────
export const AgeInput = styled('input', {
  width: '100%',
  padding: '$rem$0_5 $rem$0_75',
  fontSize: '$rem$0_87',
  color: '$foreground',
  backgroundColor: '$white',
  border: '1px solid $lightGrayLine',
  borderRadius: '$radius$md',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',

  '&:focus': {
    borderColor: '$main',
    boxShadow: '0 0 0 3px rgba(160, 48, 72, 0.1)',
  },

  // remove browser spinners on number inputs
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '&[type=number]': { MozAppearance: 'textfield' },
});

// ─── Styled native select (for Breed, City) ───────────────────────
export const StyledSelect = styled('select', {
  width: '100%',
  padding: '$rem$0_5 $rem$0_75',
  fontSize: '$rem$0_87',
  color: '$foreground',
  backgroundColor: '$white',
  border: '1px solid $lightGrayLine',
  borderRadius: '$radius$md',
  outline: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  appearance: 'none',          // remove native arrow
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '$px$30',

  '&:focus': {
    borderColor: '$main',
    boxShadow: '0 0 0 3px rgba(160, 48, 72, 0.1)',
  },
});

// ─── Reset button at the bottom ───────────────────────────────────
export const ResetButton = styled(Button, {
  width: '100%',
  marginTop: '$px$16',
  backgroundColor: 'transparent !important',
  color: '$main !important',
  border: '1.5px solid $main !important',
  fontSize: '$rem$0_87 !important',
  fontWeight: '$fontWeight$semibold !important',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  padding: '$rem$0_75 $rem$1 !important',
  transition: 'all 0.2s ease !important',

  '&:hover': {
    backgroundColor: '$dimWhite !important',
  },
});

// ─── Mobile "Toggle Filters" floating button ──────────────────────
export const FilterToggleBtn = styled(Button, {
  display: 'none',             // hidden on desktop

  '@md_max': {
    display: 'inline-flex',
    gap: '$px$8',
    alignItems: 'center',
    backgroundColor: '$main !important',
    color: '$white !important',
    borderRadius: '$radius$full !important',
    padding: '$rem$0_62 $rem$1_25 !important',
    fontSize: '$rem$0_87 !important',
    boxShadow: '$md',
  },
});

// ─── Drawer close "×" button (visible inside drawer on mobile) ────
export const DrawerCloseBtn = styled('button', {
  display: 'none',
  '@md_max': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '$px$6',
    borderRadius: '$radius$full',
    color: '$foreground',
    transition: 'background 0.15s ease',
    '&:hover': { backgroundColor: '$colorGray' },
  },
});
