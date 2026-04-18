import { useState } from 'react';
import {
  ErrorText,
  FieldWrapper,
  InputIconBtn,
  InputRelative,
  StyledInput,
} from '../Auth.Style';
import { EyeIcon, EyeClosedIcon } from '@/components/svgs';

export const PasswordInput = ({ value, onChange, error, placeholder }: any) => {
  const [show, setShow] = useState(false);

  return (
    <FieldWrapper>
      <InputRelative>
        <StyledInput
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          invalid={!!error}
          hasRight
        />
        <InputIconBtn
          type="button"
          onClick={() => setShow((p) => !p)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? (
            <EyeIcon width={20} height={20} />
          ) : (
            <EyeClosedIcon width={20} height={20} />
          )}
        </InputIconBtn>
      </InputRelative>
      {error && <ErrorText>{error}</ErrorText>}
    </FieldWrapper>
  );
};
