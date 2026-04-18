import {
  ErrorText,
  FieldLabel,
  FieldWrapper,
  StyledInput,
} from '../Auth.Style';

export const AuthInput = ({ label, error, ...props }: any) => (
  <FieldWrapper>
    <FieldLabel>{label}</FieldLabel>
    <StyledInput {...props} invalid={!!error} />
    {error && <ErrorText>{error}</ErrorText>}
  </FieldWrapper>
);
