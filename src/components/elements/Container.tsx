import { styled } from '@/theme/stitches.config';

export const Container = styled('div', {
  flexShrink: 0,
  ml: 'auto',
  mr: 'auto',
  px: '$space$20',
  boxSizing: 'border-box',

  '@md_max': {
    px: '$space$15',
  },
  '@sm_max': {
    px: '$space$10',
  },

  variants: {
    size: {
      xs: {
        maxWidth: '$breakpoints$xs',
      },
      sm: {
        maxWidth: '$breakpoints$sm',
      },
      md: {
        maxWidth: '$breakpoints$md',
      },
      lg: {
        maxWidth: '$breakpoints$lg',
      },
      xl: {
        maxWidth: '$breakpoints$xl',
      },
      xxl: {
        maxWidth: '$breakpoints$xxl',
        width: '100%',
      },
      xxxl: {
        maxWidth: '$breakpoints$xxxl',
      },
      fluid: {
        maxWidth: 'none',
      },
    },
  },
  defaultVariants: {
    size: 'xxl',
  },
});
