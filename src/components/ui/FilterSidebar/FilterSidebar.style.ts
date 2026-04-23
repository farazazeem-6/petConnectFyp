'use client';

import { keyframes, styled } from '@/theme/stitches.config';
import { Box } from '@/components/elements/Box';
import { Flex } from '@/components/elements/Flex';
import { Text } from '@/components/elements/Text';
import { fadeIn, slideInLeft } from '@/theme';

export const SidebarRoot = styled(Box, {
  width: '$px$270',
  flexShrink: 0,
  backgroundColor: '$white',
  borderRadius: '$radius$lg',
  border: '1px solid $lightGrayLine',
  boxShadow: '$cardShadow',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100vh - 48px)',
  position: 'sticky',
  top: '$px$24',

  '@md_max': {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100dvh',
    maxHeight: '100dvh',
    width: '290px',
    maxWidth: '85vw',
    zIndex: '$ul$900',
    borderRadius: '0 $radius$xl $radius$xl 0',
    transform: 'translateX(-100%)',
    transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '4px 0 24px rgba(0,0,0,0.18)',
    '&[data-open="true"]': {
      transform: 'translateX(0)',
      animation: `${slideInLeft} 0.32s cubic-bezier(0.4, 0, 0.2, 1)`,
    },
  },
});

export const SidebarHeader = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  padding: '$px$20 $px$20 $px$14',
  borderBottom: '2px solid $lightGrayLine',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: '$white',
  flexShrink: 0,
  borderRadius: '$radius$lg $radius$lg 0 0',
});

export const SidebarScrollArea = styled(Box, {
  overflowY: 'auto',
  flex: 1,
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: '$lightGrayLine',
    borderRadius: '$radius$full',
  },
});

export const SidebarInner = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  padding: '$px$4 $px$20 $px$20',
});

export const FilterSection = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$8',
  paddingTop: '$px$14',
  paddingBottom: '$px$14',
  borderBottom: '1px solid $lightGrayLine',
  '&:last-of-type': { borderBottom: 'none' },
});

export const SectionLabel = styled(Flex, {
  alignItems: 'center',
  gap: '$px$6',
  marginBottom: '$px$2',
});

export const SectionTitle = styled(Text, {
  fontSize: '$px$12',
  fontWeight: '$fontWeight$bold',
  letterSpacing: '0.1em',
});

export const OptionRow = styled(Box, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$px$10',
  padding: '$px$5 $px$8',
  borderRadius: '$radius$md',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background 0.15s ease',
  '&:hover': { backgroundColor: '$colorGray' },
});

export const AgeRangeRow = styled(Flex, {
  gap: '$px$10',
  alignItems: 'flex-start',
  width: '100%',
});

export const AgeFieldWrapper = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$4',
  flex: 1,
  minWidth: 0,
});

export const AgeLabel = styled(Text, {
  fontSize: '$rem$0_62',
  fontWeight: '$fontWeight$semibold',
  color: '$slateGray',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
});

export const ResetButton = styled('button', {
  all: 'unset',
  display: 'block',
  width: '100%',
  marginTop: '$px$16',
  padding: '$rem$0_75 $rem$1',
  textAlign: 'center',
  fontSize: '$rem$0_81',
  fontWeight: '$fontWeight$semibold',
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: '$main',
  border: '1.5px solid $main',
  borderRadius: '$radius$md',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  boxSizing: 'border-box',
  '&:hover': { backgroundColor: '$dimWhite' },
});

export const DrawerOverlay = styled(Box, {
  display: 'none',
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
