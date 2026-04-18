import { Button, Flex } from '@/components/elements';
import { styled } from '@/theme';
import Link from 'next/link';

export const HeaderWrapper = styled(Flex, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  width: '$percent$100',
  zIndex: 100,
  height: '$px$85',
  boxSizing: 'border-box',
  backgroundColor: '$main',
  borderBottomLeftRadius: '$px$20',
  borderBottomRightRadius: '$px$20',
  justifyContent: 'center !important',
  '@sm_max': {
    borderBottomLeftRadius: '$px$15',
    borderBottomRightRadius: '$px$15',
  }
});

export const HeaderContent = styled(Flex, {
  defaultVariants: {
    align: 'center',
    justify: 'between',
  },
  width: '$percent$100',
  maxWidth: '$breakpoints$xxl',
  px: '$px$100',
  '@lg_max': {
    px: '$px$25',
  },
  '@sm_max': {
    px: '$px$10',
  }
});

export const NavList = styled(Flex, {
  ai: 'center !important',
  gap: '$px$30',
  listStyle: 'none',
  m: 0,
  p: 0,
});

export const NavLinkItem = styled(Link, {
  display: 'flex',
  ai: 'center',
  gap: '$px$5',
  px: '$px$2',
  py: '$px$6',
  fontSize: '$fontSize$md',
  fontWeight: '$fontWeight$normal',
  color: '$white',
  textDecoration: 'none',
  position: 'relative',
  transition: 'color 0.15s',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0%',
    height: '1px',
    backgroundColor: '$white',
    transition: 'width 0.4s ease',
  },
  '&:hover::after': {
    width: '$percent$100',
  },
  variants: {
    active: {
      true: {
        color: '$white',
        '&::after': {
          width: '$percent$100',
        },
      },
    },
  },
});

export const LoginButton = styled(Button, {
  defaultVariants: {
    variant: 'default',
  },
  backgroundColor: '$white !important',
  color: '$main',
  px: '$px$22 !important',
  fontSize: '$fontSize$md !important',
  br: '$radius$full !important',
  '@sm_max': {
    px: '$px$15 !important',
    fontSize: '$fontSize$sm !important',
  }
});

export const MobileMenuButton = styled('button', {
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '$30',
  height: '$30',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
  zIndex: 1,

  '& svg': {
    width: '$px$30',
    height: '$px$30',
  },

  '& span': {
    width: '$25',
    height: '$3',
    backgroundColor: '$gray800',
    borderRadius: '$10',
    transition: '$ease',
    transformOrigin: '1px',
  },

  '& span:first-child': {
    '&.open': {
      transform: 'rotate(45deg)',
    },
  },

  '& span:nth-child(2)': {
    '&.open': {
      opacity: 0,
    },
  },

  '& span:last-child': {
    '&.open': {
      transform: 'rotate(-45deg)',
    },
  },

  '@lg_max': {
    display: 'flex',
  },
});

// ─── User avatar dropdown menu ───────────────────────────
export const UserMenu = styled('div', {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
});

export const UserMenuDropdown = styled('ul', {
  listStyle: 'none',
  margin: 0,
  padding: '$px$6 0',
  position: 'absolute',
  top: 'calc(100% + $px$10)',
  right: 0,
  minWidth: '$px$180',
  backgroundColor: '$white',
  borderRadius: '$radius$lg',
  boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
  border: '1px solid rgba(0,0,0,0.06)',
  zIndex: 200,
  // entrance animation
  animation: 'menuFadeIn 0.18s ease',
  '@keyframes menuFadeIn': {
    from: { opacity: 0, transform: 'translateY(-6px)' },
    to:   { opacity: 1, transform: 'translateY(0)' },
  },
});

export const UserMenuItem = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: '$px$10',
  width: '$percent$100',
  boxSizing: 'border-box',
  px: '$px$16',
  py: '$px$10',
  fontSize: '$fontSize$sm',
  color: '$primaryHeading',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  '&:hover': { backgroundColor: '#fdf5f7', color: '$main' },

  variants: {
    danger: {
      true: {
        color: '$errorColor',
        '&:hover': { backgroundColor: '#fff5f5', color: '$errorColor' },
      },
    },
  },
});

export const UserMenuDivider = styled('li', {
  height: '1px',
  backgroundColor: '$gray3',
  mx: '$px$12',
  my: '$px$4',
  listStyle: 'none',
});
