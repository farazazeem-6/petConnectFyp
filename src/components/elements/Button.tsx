import { styled } from '@/theme';

export const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$rem$0_87',
  fontSize: '$rem$1',
  fontWeight: '$fontWeight$semibold',
  borderRadius: '$px$8',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  userSelect: 'none',
  lineHeight: '$px$1',
  boxSizing: 'border-box',

  '&:disabled': {
    opacity: '$ul$0.5',
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      default: {
        background: 'none',
        color: '$main',
        '&:hover': {
          background: 'none',
        },
      },
      primary: {
        background: '$blue19 !important',
        color: '$white',
        '&:hover': {
          background: '$blue20 !important',
        },
      },
      gradientGreen: {
        background: '$$gradients$greenGradient1',
        color: '$white',
        '&:hover': {
          background: '$gradients$greenGradient2',
        },
      },
      outline: {
        backgroundColor: '$blue9',
        color: '$textOnHover',
        border: '$px$1 solid $blue2',
        '&:hover': {
          backgroundColor: '$blue12',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$black',
        border: '1px solid $black',
        '&:hover': {
          backgroundColor: '$ghostBtn',
        },
      },
    },

    size: {
      sm: {
        padding: '$rem$0_37 $rem$0_75',
        fontSize: '$rem$0_75',
      },
      md: {
        padding: '$rem$1_25 $rem$1',
        fontSize: '$rem$0_87',
      },
      lg: {
        padding: '$rem$1_37 $rem$1_31',
        fontSize: '$rem$1',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
