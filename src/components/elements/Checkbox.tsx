import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CSS, styled, VariantProps } from '@stitches/react';
import { TickIcon } from '../svgs';

const CheckboxRoot = styled(CheckboxPrimitive.Root, {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  appearance: 'none',
  lineHeight: '1',
  backgroundColor: '$lightGrayLine',
  borderWidth: '1px',
  border: 'unset',
  borderRadius: '3px',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  overflow: 'hidden',
  outline: 'none',
  cursor: 'pointer',

  variants: {
    size: {
      sm: {
        width: '15px',
        height: '15px',
      },
      md: {
        width: '20px',
        height: '20px',
        minWidth: '20px',
        minHeight: '20px',
      },
      lg: {
        width: '25px',
        height: '25px',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

const CheckboxIndicator = styled(CheckboxPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  size: '14px',
});

type CheckboxPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;
type CheckboxVariants = VariantProps<typeof CheckboxRoot>;
type CheckboxProps = Omit<CheckboxPrimitiveProps, 'children'> &
  CheckboxVariants & { css?: CSS };

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxRoot>,
  CheckboxProps
>((props, forwardedRef) => (
  <CheckboxRoot {...props} ref={forwardedRef}>
    <CheckboxIndicator>
      {/* replace check icon if needed */}
      <TickIcon />
    </CheckboxIndicator>
  </CheckboxRoot>
));

Checkbox.displayName = 'Checkbox';
