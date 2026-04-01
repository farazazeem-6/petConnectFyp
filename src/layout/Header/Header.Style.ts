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
  backgroundColor: '$white',
  zIndex: 300,
  px: '$px$32',
  height: '$px$70',
  backdropFilter: 'blur(8px)',
  borderBottom: '1px solid $lightGrayLine',
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
    color: '$dGreen',
    transform: 'translateY(-2px)',
  },
  variants: {
    active: {
      true: {
        color: '$primary',
        borderBottom: '1px solid $primary',
        fontWeight: '$fontWeight$semibold',
        transform: 'translateY(-2px)',
      },
    },
  },
});

export const LoginButton = styled(Button, {
  defaultVariants: {
    variant: 'outline',
  },
  px: '$px$30 !important',
  backgroundColor: '$white !important',
  fontSize: '$fontSize$md !important',
  fontWeight: '$fontWeight$medium',
  br: '$radius$full !important',
  '&:hover': {
    backgroundColor: '$veryLightGreen !important',
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
});
