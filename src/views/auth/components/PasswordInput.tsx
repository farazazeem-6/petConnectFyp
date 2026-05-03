import { useState } from 'react';
import {
  ErrorText,
  FieldWrapper,
  InputIconBtn,
  InputRelative,
  StyledInput,
} from '../Auth.Style';
import { EyeIcon, EyeClosedIcon } from '@/components/svgs';
import { CSS } from '@/theme';

type PasswordInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
  id?: string;
  disabled?: boolean;
  css?: CSS;
};

export const PasswordInput = ({
  value,
  onChange,
  error,
  placeholder,
  id,
  disabled,
  css,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <FieldWrapper>
      <InputRelative>
        <StyledInput
          css={css}
          id={id}
          disabled={disabled}
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
