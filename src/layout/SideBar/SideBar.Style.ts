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
  left: 0,
  width: '$px$550',
  maxWidth: '85vw',
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$main',
  boxShadow: '8px 0 24px rgba(0, 0, 0, 0.12)',
  borderTopRightRadius: '$px$26',
  borderBottomRightRadius: '$px$26',
  zIndex: 250,
  transform: 'translateX(-100%)',
  transition: 'transform 0.3s ease',

  '&.open': {
    transform: 'translateX(0)',
  },

  '@sm_max': {
    width: '$percent$100',
    maxWidth: '100vw',
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
  },
});

export const SidebarContent = styled(Flex, {
  flexDirection: 'column !important',
  padding: '$px$40',
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
});

export const SidebarNav = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  gap: '$px$10',
  mt: '$px$80',
});

export const SidebarActions = styled(Box, {
  marginTop: 'auto',
  paddingTop: '$px$20',
});

export const Logo = styled(Flex, {
  alignItems: 'center !important',
  cursor: 'pointer',
});

export const SidebarCloseBox = styled(Box, {
  cursor: 'pointer',
  '& svg': {
    width: '$px$30',
    height: '$px$30',
  },
  '@sm_max': {
    '& svg': {
      width: '$px$20',
      height: '$px$20',
    },
  },
});

export const NavItem = styled(Link, {
  position: 'relative',
  fontSize: '$fontSize$lg',
  fontWeight: '$fontWeight$normal',
  color: '$white',
  textDecoration: 'none',
  cursor: 'pointer',
  padding: '$px$14 0',
  display: 'block',
  transition: 'padding-left 0.4s ease, color 0.2s ease',

  '&:hover': {
    paddingLeft: '$px$8',
  },
  variants: {
    active: {
      true: {
        color: '$white',
      },
    },
  },
});
