import { Button, Flex } from '@/components/elements';
import { styled } from '@/theme';
import Link from 'next/link';

export const HeaderWrapper = styled(Flex, {
  defaultVariants: {
    align: 'center',
    justify: 'between',
  },
  px: '$px$32',
  height: '$px$90',
  backgroundColor: '$green17',
  backdropFilter: 'blur(8px)',
  borderBottomRightRadius: '$px$20',
  borderBottomLeftRadius: '$px$20',
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
  transition: 'all 0.15s, color 0.15s',
  '&:hover': {
    color: '$dGreen',
    transform: 'translateY(-2px)',
  },
  variants: {
    active: {
      true: {
        color: '$primary',
        borderBottom: '1px solid $white',
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
