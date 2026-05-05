import { styled, keyframes } from '@/theme';
import { Box, Button } from '@/components/elements';

export const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const fadeSlideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(6px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});


export const ProfileCard = styled(Box, {
  backgroundColor: '$cardBgColor',
  borderRadius: '$radius$xl',
  border: '$px$1 solid $main',
  boxShadow: '$shadows$ctaShadow',
  overflow: 'hidden',
});

export const PhotoSection = styled(Box, {
  px: '$rem$1_5',
  pt: '$rem$2',
  pb: '$rem$1_5',
  borderBottom: '$px$1 solid $main',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$rem$1',
});

export const AvatarWrap = styled(Box, {
  position: 'relative',
  size: '$px$90',
  borderRadius: '$radius$circle',
  flexShrink: 0,
});

export const AvatarImage = styled('img', {
  size: '$px$90',
  borderRadius: '$radius$circle',
  objectFit: 'cover',
  display: 'block',
  border: '$px$2 solid $main',
});

export const AvatarLoaderOverlay = styled(Box, {
  position: 'absolute',
  inset: 0,
  borderRadius: '$radius$circle',
  backgroundColor: '$shadows$cardShadow',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AvatarSpinner = styled(Box, {
  size: '$px$24',
  borderRadius: '$radius$circle',
  border: '$px$2 solid $darkGray',
  borderTopColor: '$white',
  animation: `${spin} 0.65s linear infinite`,
});

export const FormSection = styled(Box, {
  px: '$rem$1_5',
  py: '$rem$1_5',

  '@sm_max': {
    px: '$rem$1',
  },
});

export const SectionLabel = styled('p', {
  fontSize: '$fontSize$xs',
  fontWeight: '$fontWeight$semibold',
  color: '$secondaryHeading',
  letterSpacing: '0.06em',
  tt: 'uppercase',
  mb: '$rem$1',
  display: 'flex',
  alignItems: 'center',
  gap: '$rem$0_5',
});

export const Divider = styled(Box, {
  height: '$px$1',
  backgroundColor: '$cardBorderColor',
  mx: '$rem$1_5',
});

export const FieldWrap = styled(Box, {
  mb: '$rem$1',
});

export const FieldLabel = styled('label', {
  display: 'block',
  fontSize: '$fontSize$xs',
  fontWeight: '$fontWeight$medium',
  color: '$secondaryHeading',
  mb: '$px$6',
});

export const GoogleFieldNote = styled('p', {
  fontSize: '$fontSize$xs',
  color: '$grayDark',
  fontStyle: 'italic',
  mt: '$px$5',
  lineHeight: 1.55,
});

export const GooglePasswordNotice = styled('p', {
  fontSize: '$fontSize$xs',
  color: '$grayDark',
  fontStyle: 'italic',
  mb: '$rem$1',
  lineHeight: 1.55,
  px: '$rem$1',
  py: '$rem$1',
  backgroundColor: '$whisperGray',
  borderRadius: '$radius$md',
  border: '$px$1 solid $main',
});

export const BtnSpinner = styled(Box, {
  size: '$px$10',
  borderRadius: '$radius$circle',
  border: '$px$2 solid $darkGray',
  borderTopColor: '$white',
  animation: `${spin} 0.6s linear infinite`,
  flexShrink: 0,
});

export const SuccessText = styled('span', {
  fontSize: '$fontSize$xs',
  color: '$success1',
  animation: `${fadeSlideIn} 0.2s ease`,
});

export const ErrorText = styled('p', {
  fontSize: '$fontSize$xs',
  color: '$error1',
  mt: '$px$5',
  animation: `${fadeSlideIn} 0.2s ease`,
});

export const CropModalOverlay = styled(Box, {
  position: 'fixed',
  inset: 0,
  backgroundColor: '$shadows$sideBarOverlay',
  zIndex: '$ul$200',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: '$rem$1',
  animation: `${fadeSlideIn} 0.15s ease`,
});

export const CropModalBox = styled(Box, {
  backgroundColor: '$cardBgColor',
  borderRadius: '$radius$xl',
  p: '$rem$1_5',
  width: '$percent$100',
  border: '$px$2 solid $main',
  bs: '$shadows$cardShadow2',
});

export const CropAreaWrap = styled(Box, {
  position: 'relative',
  width: '$percent$100',
  height: '$px$250',
  backgroundColor: '$black',
  borderRadius: '$radius$lg',
  overflow: 'hidden',
  mb: '$rem$1',

  '@sm_max': {
    height: '$px$200',
  },
});

export const ZoomSlider = styled('input', {
  flex: 1,
  accentColor: '$main',
  cursor: 'pointer',
});

export const PageLoaderWrap = styled(Box, {
  dflex: 'center',
  minHeight: '60dvh',
});

export const PageSpinner = styled(Box, {
  size: '$px$32',
  borderRadius: '$radius$circle',
  border: '$px$3 solid $cardBorderColor',
  borderTopColor: '$main',
  animation: `${spin} 0.7s linear infinite`,
});

export const ChangeButton = styled(Button, {
  backgroundColor: '$main !important',
  padding: '$px$15 !important',
  color: '$white !important',
  '@sm_max': {
    padding: '$px$10 !important',
  },
});
