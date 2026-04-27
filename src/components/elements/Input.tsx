import * as React from 'react';
import { CSS, styled } from '@/theme';
import { Flex } from './Flex';

// ───────── Types ──────────────────

type TComponentSize = 'sm' | 'md' | 'lg';
type TInputFieldProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'size'
> & {
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  inputSize?: TComponentSize;
  variant?: 'filled' | 'outline' | 'ghost' | 'simple';
  invalid?: boolean;
  maxLength?: number;
  id?: number | string;
  css?: CSS;
};

// ───────── Styling ──────────────────

const InputGroup = styled(Flex, {
  position: 'relative',
  width: '$percent$100',
});

const StyledInput = styled('input', {
  color: '$foreground',
  borderRadius: '$px$8',
  backgroundColor: '$background',
  width: '$percent$100',
  border: '$px$1 solid $main',
  outline: 'none',
  transition: 'all 0.2s ease',

  variants: {
    inputSize: {
      sm: { padding: '$rem$0_37 $rem$0_75', fontSize: '$rem$0_75' },
      md: { padding: '$rem$1 $rem$1', fontSize: '$rem$0_87' },
      lg: { padding: '$rem$1_25 $rem$1', fontSize: '$rem$1_06' },
    },
    variant: {
      filled: {
        backgroundColor: '$veryLightGreen',
        outline: 'none',
        '&:hover': {
          backgroundColor: '$veryLightPeel',
        },
        '&:focus': {
          backgroundColor: '$white',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        border: '$px$1 solid $dGreen',
        outline: 'none',
      },
      ghost: {
        border: 'none',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        outline: 'none',
        padding: 0,
        '&:focus': {
          border: 'none',
          boxShadow: 'none',
        },
      },
      simple: {
        border: 'none',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&:focus': {
          outline: 'none',
          border: 'none',
          backgroundColor: '$white',
          boxShadow: '0 $px$1 0 0 $dGreen',
        },
      },
    },
    invalid: {
      true: {
        borderColor: '$colors$errorColor',
        '&::placeholder': {
          color: '$colors$errorColor',
        },
        '&:focus': {
          boxShadow: 'none',
        },
      },
    },
  },

  defaultVariants: {
    inputSize: 'md',
  },

  '&.has-left': {
    paddingLeft: '$px$40',
  },
  '&.has-right': {
    paddingRight: '$px$90',
  },
});

const InputSlot = styled(Flex, {
  position: 'absolute',
  top: '$percent$50',
  transform: 'translateY(-50%)',
  zIndex: '$ul$2',
  variants: {
    side: {
      left: { left: '$px$5' },
      right: { right: '$px$5' },
    },
  },
});

// ───────── Component ──────────────────

export const Input = React.forwardRef<HTMLInputElement, TInputFieldProps>(
  (
    {
      contentLeft,
      contentRight,
      inputSize,
      maxLength,
      variant,
      invalid,
      id,
      css,
      ...props
    },
    ref,
  ) => {
    const className = [contentLeft && 'has-left', contentRight && 'has-right']
      .filter(Boolean)
      .join(' ');

    return (
      <InputGroup>
        {contentLeft && <InputSlot side="left">{contentLeft}</InputSlot>}
        <StyledInput
          ref={ref}
          className={className}
          inputSize={inputSize}
          variant={variant}
          invalid={invalid}
          maxLength={maxLength}
          id={id}
          css={css}
          {...props}
        />
        {contentRight && <InputSlot side="right">{contentRight}</InputSlot>}
      </InputGroup>
    );
  },
);

Input.displayName = 'Input';
