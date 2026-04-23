import React from 'react';
import { styled } from '@/theme';

const RadioContainer = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
});
const RadioInput = styled('input', {
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',
  height: 0,
  width: 0,
});
const RadioButton = styled('div', {
  position: 'relative',
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  border: '2px solid #d1d5db',
  backgroundColor: 'white',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  '&:hover': {
    borderColor: '$main',
    boxShadow:
      '0 4px 12px rgba(34, 197, 94, 0.15), 0 2px 4px rgba(34, 197, 94, 0.1)',
  },
  variants: {
    checked: {
      true: {
        borderColor: '$main',
        backgroundColor: '$main',
        '&::after': {
          content: '',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'white',
        },
        '&:hover': {
          borderColor: '$main',
          backgroundColor: '$main',
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        boxShadow: 'none',
        transform: 'none',
        '&:hover': {
          borderColor: '#d1d5db',
          boxShadow: 'none',
          transform: 'none',
        },
      },
    },
  },
  // Focus styles for accessibility
  '&:focus-within': {
    outline: 'none',
    borderColor: '$main',
  },
});
type TRadioProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  id?: string;
};
export const Radio: React.FC<TRadioProps> = ({
  checked = false,
  onChange,
  disabled = false,
  name,
  value,
  id,
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };
  return (
    <RadioContainer onClick={handleChange}>
      <RadioInput
        type="radio"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        id={id}
        onChange={() => {}} // Handled by container click
      />
      <RadioButton checked={checked} disabled={disabled} />
    </RadioContainer>
  );
};
