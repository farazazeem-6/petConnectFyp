import { Box, Flex } from '@/components/elements';
import { styled } from '@/theme';
import Link from 'next/link';

export const SidebarOverlay = styled(Box, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 200,
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease, visibility 0.3s ease',

  '&.open': {
    opacity: 1,
    visibility: 'visible',
  },
});

export const SidebarWrapper = styled(Box, {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '$px$350',
  maxWidth: '85vw',
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$blue1',
  boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.12)',
  borderLeft: '1px solid $lightGrayLine',
  borderTopLeftRadius: '$px$16',
  borderBottomLeftRadius: '$px$16',
  zIndex: 250,
  transform: 'translateX(100%)',
  transition: 'transform 0.3s ease',

  '&.open': {
    transform: 'translateX(0)',
  },

  '@sm_max': {
    width: '$percent$100',
    maxWidth: '100vw',
  },
});

export const SidebarContent = styled(Flex, {
  flexDirection: 'column !important',
  padding: '$px$20',
  height: '$percent$100',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  boxSizing: 'border-box',
});

export const SidebarHeader = styled(Flex, {
  alignItems: 'center !important',
  justifyContent: 'space-between !important',
  marginBottom: '$px$24',
  paddingBottom: '$px$16',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
});

export const SidebarNav = styled(Flex, {
  flexDirection: 'column !important',
  gap: '0',
});

export const SidebarActions = styled(Box, {
  marginTop: 'auto',
  paddingTop: '$px$20',
});

export const Logo = styled(Flex, {
  alignItems: 'center !important',
  cursor: 'pointer',
});

export const NavItem = styled(Link, {
  position: 'relative',
  fontSize: '$fontSize$md',
  color: '$black',
  textDecoration: 'none',
  cursor: 'pointer',
  padding: '$px$14 0',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  display: 'block',
  transition: 'padding-left 0.2s ease, color 0.2s ease',

  '&:last-child, &:nth-last-child(2)': {
    borderBottom: 'none',
  },

  '&:hover': {
    paddingLeft: '$px$8',
  },

  variants: {
    active: {
      true: {
        color: '$blue19',
        fontWeight: '$fontWeight$semibold',
      },
    },
  },
});
