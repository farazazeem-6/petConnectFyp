import { Box, Button, Text } from '@/components/elements';
import { styled } from '@/theme';

// ─── Page wrapper ─────────────────────────────────────────
// height: 100dvh + overflow:hidden on the WRAPPER so only the right panel scrolls
export const AuthPageWrapper = styled('div', {
  display: 'flex !important',
  height: '100dvh',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '#f7f8fc',
  alignItems: 'stretch',
});

// ─── Left branding panel ─────────────────────────────────
// position:sticky / height:100dvh keeps it rigidly in place
export const BrandPanel = styled('div', {
  flex: '0 0 45%',
  height: '100dvh',           // always exactly viewport height
  backgroundColor: '$main',
  borderTopRightRadius: '$px$40',
  borderBottomRightRadius: '$px$40',
  display: 'flex !important',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$px$20',
  overflow: 'hidden',
  flexShrink: 0,             // never shrink

  '@lg_max': { flex: '0 0 42%' },
  '@md_max': { display: 'none !important' },
});

export const BrandTagline = styled(Text, {
  color: 'rgba(255,255,255,0.75)',
  fontSize: '$fontSize$md',
  textAlign: 'center !important',
  maxWidth: '$px$280',
  lineHeight: 1.6,
});

// ─── Right form panel (scrollable) ────────────────────────
export const FormPanel = styled('div', {
  flex: 1,
  height: '100dvh',           // clamp to viewport
  overflowY: 'auto',          // this is the only scroll container
  display: 'flex !important',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  py: '$px$60',
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

// Back arrow button — lives on the LEFT brand panel, top-left corner
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
  color: 'rgba(255,255,255,0.75)',
  backgroundColor: 'rgba(255,255,255,0.12)',
  transition: 'background-color 0.2s ease, color 0.2s ease',

  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.22)',
    color: '$white',
  },
});

export const FormCard = styled(Box, {
  width: '$percent$100',
  maxWidth: '$px$440',
  backgroundColor: '$white',
  borderRadius: '$radius$xxl',
  boxShadow: '0 8px 40px rgba(160, 48, 72, 0.08)',
  p: '$px$40',
  // margin:auto centers the card in the flex column when content is shorter
  my: 'auto',

  '@sm_max': {
    p: '$px$24',
    borderRadius: '$radius$xl',
  },
});

// ─── Form title / subtitle ────────────────────────────────
export const FormTitle = styled(Text, {
  fontSize: '$fontSize$xxxl',
  fontWeight: '$fontWeight$bold',
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

// ─── Input field + label wrapper ─────────────────────────
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
  padding: '$px$11 $px$14',
  fontSize: '$fontSize$sm',
  color: '$primaryHeading',
  backgroundColor: '$white',
  border: '1.5px solid $gray3',
  borderRadius: '$radius$md',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',

  '&::placeholder': { color: '$slateGray' },
  '&:focus': {
    borderColor: '$main',
    boxShadow: '0 0 0 3px rgba(160, 48, 72, 0.1)',
    backgroundColor: '$white',
  },

  variants: {
    hasRight: {
      true: { paddingRight: '$px$44' },
    },
    invalid: {
      true: {
        borderColor: '$errorColor',
        '&:focus': { boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.12)' },
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

// Inline field error (under the input)
export const ErrorText = styled(Text, {
  fontSize: '$fontSize$xs',
  color: '$errorColor',
  display: 'block !important',
  mt: '$px$4',
  lineHeight: 1.4,
});

// ─── Auth action button ────────────────────────────────────
export const AuthSubmitBtn = styled(Button, {
  width: '$percent$100 !important',
  py: '$px$16 !important',
  fontSize: '$fontSize$md !important',
  fontWeight: '$fontWeight$semibold !important',
  backgroundColor: '$main !important',
  color: '$white !important',
  borderRadius: '$radius$md !important',
  mt: '$px$8',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, transform 0.15s ease',
  textAlign: 'center !important',
  display: 'block !important',

  '&:hover:not(:disabled)': { backgroundColor: '$darkMain !important', transform: 'translateY(-1px)' },
  '&:active': { transform: 'translateY(0px)' },
  '&:disabled': {
    opacity: 0.55,
    cursor: 'not-allowed',
    transform: 'none',
  },
  defaultVariants: { variant: 'default' },
});

// ─── Divider ──────────────────────────────────────────────
export const DividerRow = styled('div', {
  display: 'flex !important',
  alignItems: 'center',
  gap: '$px$10',
  my: '$px$16',
  width: '$percent$100',
});

export const DividerLine = styled('div', {
  flex: 1,
  height: '1px',
  backgroundColor: '$gray3',
});

export const DividerText = styled(Text, {
  fontSize: '$fontSize$xs',
  color: '$slateGray',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

// ─── Google button ────────────────────────────────────────
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
    boxShadow: '0 2px 8px rgba(160, 48, 72, 0.1)',
  },
  '&:disabled': { opacity: 0.6, cursor: 'not-allowed' },
});

// ─── Toggle link row ─────────────────────────────────────
export const ToggleRow = styled('div', {
  display: 'flex !important',
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
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$medium',
  cursor: 'pointer',
  display: 'block',
  textAlign: 'right',
  mb: '$px$16',
  mt: '$px$2',

  '&:hover': { textDecoration: 'underline' },
});
