import { Box, Button, Text } from '@/components/elements';
import { styled } from '@/theme';

export const AuthPageWrapper = styled(Box, {
  display: 'flex !important',
  height: '100dvh',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '$authBg',
  alignItems: 'stretch',

  '@md_max': {
    flexDirection: 'column',
  },
});

export const BrandPanel = styled(Box, {
  flex: '0 0 $percent$50',
  height: '$dvh$100',
  backgroundColor: '$main',
  borderTopRightRadius: '$px$40',
  borderBottomRightRadius: '$px$40',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$px$20',
  overflow: 'hidden',
  flexShrink: 0,

  '@lg_max': { flex: '0 0 $percent$42' },
  '@md_max': { display: 'none !important' },
});

export const MobileHeader = styled(Box, {
  display: 'none',
  backgroundColor: '$main',
  width: '$percent$100',
  py: '$px$20',
  px: '$px$20',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomLeftRadius: '$px$20',
  borderBottomRightRadius: '$px$20',
  flexShrink: 0,
  zIndex: 10,
  
  '@md_max': {
    display: 'flex',
  },
});

export const MobileBackBtn = styled('button', {
  all: 'unset',
  position: 'absolute',
  left: '$px$20',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '$white',
  
  '& svg': {
    width: '$px$24',
    height: '$px$24',
  },
  
  '&:hover': {
     color: '$white75',
  },
});

export const BrandTagline = styled(Text, {
  color: '$white75 !important',
  fontSize: '$fontSize$md',
  textAlign: 'center !important',
  maxWidth: '$px$280',
  lineHeight: '$px$26',
});

export const FormPanel = styled(Box, {
  flex: 1,
  height: '$dvh$100',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box',

  px: '$px$40',
  position: 'relative',

  '@md_max': {
    py: '$px$40',
    px: '$px$24',
  },
  '@sm_max': {
    py: '$px$30',
    px: '$px$16',
  },
});

export const BackBtn = styled('button', {
  all: 'unset',
  position: 'absolute',
  top: '$px$22',
  left: '$px$22',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$px$38',
  height: '$px$38',
  borderRadius: '$radius$full',
  cursor: 'pointer',
  color: '$white75',
  backgroundColor: '$white12',
  transition: 'background-color 0.2s ease, color 0.2s ease',

  '&:hover': {
    backgroundColor: '$white22',
    color: '$white',
  },
});

export const FormCard = styled(Box, {
  width: '$percent$100',
  maxWidth: '$px$440',
  boxSizing: 'border-box',
  backgroundColor: '$white',
  borderRadius: '$radius$xxl',
  boxShadow: '$shadows$authCard',
  p: '$px$40',
  my: 'auto',

  '@sm_max': {
    p: '$px$24',
    borderRadius: '$radius$xl',
  },
});

export const FormTitle = styled(Text, {
  fontSize: '$px$26',
  fontWeight: '$fontWeight$semibold',
  color: '$primaryHeading',
  textAlign: 'center !important',
  display: 'block !important',
  mb: '$px$8',

  '@sm_max': { fontSize: '$fontSize$xxl' },
});

export const FormSubtitle = styled(Text, {
  fontSize: '$fontSize$sm',
  color: '$slateGray',
  textAlign: 'center !important',
  display: 'block !important',
  mb: '$px$24',
  lineHeight: 1.5,
});

export const FieldWrapper = styled(Box, {
  width: '$percent$100',
  mb: '$px$14',
});

export const FieldLabel = styled('label', {
  display: 'block',
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$medium',
  color: '$primaryHeading',
  mb: '$px$5',
});

export const StyledInput = styled('input', {
  width: '$percent$100',
  boxSizing: 'border-box',
  padding: '$px$15 $px$14',
  fontSize: '$fontSize$sm',
  color: '$primaryHeading',
  backgroundColor: '$white',
  border: '1.5px solid $gray3',
  borderRadius: '$radius$lg',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',

  '&::placeholder': { color: '$slateGray' },
  '&:focus': {
    borderColor: '$main',
    backgroundColor: '$white',
  },

  variants: {
    hasRight: {
      true: { paddingRight: '$px$44' },
    },
    invalid: {
      true: {
        borderColor: '$errorColor',
        '&:focus': { boxShadow: '0 0 0 3px $errorColor' },
      },
    },
  },
});

export const InputRelative = styled(Box, {
  position: 'relative',
  width: '$percent$100',
});

export const InputIconBtn = styled('button', {
  all: 'unset',
  position: 'absolute',
  right: '$px$12',
  top: '$percent$50',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '$slateGray',
  '&:hover': { color: '$main' },
});

export const ErrorText = styled(Text, {
  fontSize: '$fontSize$xs !important',
  color: '$errorColor !important',
  display: 'block !important',
  mt: '$px$4',
  lineHeight: 1.4,
});

export const AuthSubmitBtn = styled(Button, {
  width: '$percent$100 !important',
  py: '$px$22 !important',
  fontSize: '$fontSize$md !important',
  fontWeight: '$fontWeight$semibold !important',
  backgroundColor: '$main !important',
  color: '$white !important',
  borderRadius: '$radius$lg !important',
  mt: '$px$8',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, transform 0.15s ease',
  textAlign: 'center !important',
  display: 'block !important',
  boxSizing: 'border-box',
  '&:hover:not(:disabled)': { backgroundColor: '$darkMain !important' },
  '&:active': { transform: 'translateY(0px)' },
  '&:disabled': {
    opacity: 0.55,
    cursor: 'not-allowed',
    transform: 'none',
  },
  defaultVariants: { variant: 'default' },
});

export const DividerRow = styled(Box, {
  display: 'flex !important',
  alignItems: 'center',
  gap: '$px$10',
  my: '$px$16',
  width: '$percent$100',
});

export const DividerLine = styled(Box, {
  flex: 1,
  height: '1px',
  backgroundColor: '$gray3',
});

export const DividerText = styled(Text, {
  fontSize: '$fontSize$xs !important',
  color: '$slateGray !important',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  mt: '$px$3',
});

export const GoogleBtn = styled('button', {
  all: 'unset',
  display: 'flex !important',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$px$10',
  width: '$percent$100',
  boxSizing: 'border-box',
  py: '$px$11',
  px: '$px$20',
  border: '1.5px solid $gray3',
  borderRadius: '$radius$md',
  backgroundColor: '$white',
  cursor: 'pointer',
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$medium',
  color: '$primaryHeading',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',

  '&:hover': {
    borderColor: '$main',
  },
  '&:disabled': { opacity: 0.6, cursor: 'not-allowed' },
});

export const ToggleRow = styled(Box, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$px$4',
  mt: '$px$20',
  fontSize: '$fontSize$sm',
  color: '$slateGray',
  flexWrap: 'wrap',
});

export const ToggleLink = styled('button', {
  all: 'unset',
  color: '$main',
  fontWeight: '$fontWeight$semibold',
  cursor: 'pointer',
  fontSize: '$fontSize$sm',

  '&:hover': { textDecoration: 'underline' },
});

export const ForgotLink = styled('button', {
  all: 'unset',
  color: '$main',
  fontSize: '$px$12',
  fontWeight: '$fontWeight$medium',
  cursor: 'pointer',
  display: 'block',
  textAlign: 'right',
  mb: '$px$16',
  mt: '$px$2',

  '&:hover': { textDecoration: 'underline' },
});
