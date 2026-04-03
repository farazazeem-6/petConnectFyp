import { Button, Flex } from '@/components/elements';
import { styled } from '@/theme';
import Link from 'next/link';

export const HeaderWrapper = styled(Flex, {
  defaultVariants: {
    align: 'center',
    justify: 'between',
  },
  position: 'sticky',
  top: 0,
  width: '$percent$100',
  zIndex: 100,
  height: '$px$70',
  boxSizing: 'border-box',
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
  color: '$black',
  textDecoration: 'none',
  transition: 'all 0.15s, color 0.15s',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  variants: {
    active: {
      true: {
        color: '$black',
        borderBottom: '1px solid $black',
        transform: 'translateY(-2px)',
      },
    },
  },
});

export const LoginButton = styled(Button, {
  defaultVariants: {
    variant: 'default',
  },
  border: '1px solid $blue6',
  px: '$px$30 !important',
  fontSize: '$fontSize$md !important',
  br: '$radius$full !important',
  '&:active': {
    transform: 'scale(0.97)',
  },
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
