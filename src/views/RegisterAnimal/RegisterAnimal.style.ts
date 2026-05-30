import { Box, Flex } from '@/components/elements';
import { styled } from '@/theme';
import { fadeSlideIn } from '../Profile';

export {
  PageRoot,
  FormCard,
  PageHeader,
  BackBtn,
  FieldGroup,
  FieldLabel,
  FieldError,
  TwoColRow,
  StepContent,
  ImageDropZone,
  DropZoneOverlay,
  PillGroup,
  GenderPill,
} from '../CreateListing/CreateListing.style';

export const ImagePreviewWrap = styled(Box, {
  position: 'relative',
  width: '$percent$100',
  borderRadius: '$radius$lg',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.06)',

  '& img': {
    width: '$percent$100',
    height: '240px',
    objectFit: 'cover',
    display: 'block',
  },
});

export const RemovePhotoBtn = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  cursor: 'pointer',
  position: 'absolute',
  top: '$px$12',
  right: '$px$12',
  padding: '$px$8 $px$12',
  borderRadius: '$radius$md',
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
  color: '$white',
  fontSize: '$font$sm',
  fontWeight: 600,
});

export const HubWrapper = styled(Box, {
  width: '$percent$100',
  boxSizing: 'border-box',
  mx: 'auto',
  py: '$rem$2',
  px: '$px$100',
  animation: `${fadeSlideIn} 0.25s ease`,
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$32',

  '@lg_max': { px: '$px$70' },
  '@md_max': { px: '$px$50', gap: '$px$24' },
  '@sm_max': { px: '$px$10' },
});

export const HubHeaderRow = styled(Flex, {
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$px$16',
  flexWrap: 'wrap',
});

export const RegistryGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '$px$24',
});

export const RegistryCard = styled(Box, {
  backgroundColor: '$white',
  borderRadius: '16px',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '$shadows$formCard',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const RegistryCardImage = styled('img', {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
});

export const RegistryCardBody = styled(Box, {
  padding: '$px$20',
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$12',
  flex: 1,
});

export const RegistryCardTitle = styled('h3', {
  margin: 0,
  fontSize: '$font$lg',
  fontWeight: '700',
  color: '$primaryHeading',
});

export const RegistryMeta = styled('p', {
  margin: 0,
  fontSize: '$font$sm',
  color: '$slateGray',
});

export const RegistryIdBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'flex-start',
  padding: '$px$6 $px$12',
  borderRadius: '999px',
  fontSize: '$font$xs',
  fontWeight: '700',
  letterSpacing: '0.04em',
  backgroundColor: 'rgba(22, 102, 52, 0.1)',
  color: '$main',
});

export const CardActions = styled(Flex, {
  gap: '$px$10',
  flexWrap: 'wrap',
  marginTop: 'auto',
  paddingTop: '$px$8',
});

export const EmptyRegistryCard = styled(Box, {
  padding: '$px$40',
  textAlign: 'center',
  backgroundColor: '$dimWhite',
  borderRadius: '16px',
  border: '1px dashed rgba(22, 102, 52, 0.25)',
});

export const QrCard = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$px$16',
  padding: '$px$24',
  borderRadius: '16px',
  backgroundColor: '$white',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '$shadows$formCard',
});

export const QrFrame = styled(Box, {
  padding: '$px$16',
  borderRadius: '12px',
  backgroundColor: '$white',
  border: '2px solid $main',
});

export const ReviewSection = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$12',
  padding: '$px$20',
  borderRadius: '12px',
  backgroundColor: '$dimWhite',
  border: '1px solid rgba(0, 0, 0, 0.04)',
});

export const ReviewRow = styled(Flex, {
  justifyContent: 'space-between',
  gap: '$px$16',
  flexWrap: 'wrap',
});

export const ReviewLabel = styled('span', {
  fontSize: '$font$sm',
  color: '$slateGray',
  fontWeight: '500',
});

export const ReviewValue = styled('span', {
  fontSize: '$font$sm',
  color: '$primaryHeading',
  fontWeight: '600',
  textAlign: 'right',
});

export const PublicProfileWrapper = styled(Box, {
  width: '$percent$100',
  maxWidth: '720px',
  mx: 'auto',
  py: '$rem$2',
  px: '$px$20',
  animation: `${fadeSlideIn} 0.25s ease`,
});

export const PublicHero = styled(Box, {
  borderRadius: '20px',
  overflow: 'hidden',
  backgroundColor: '$white',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '$shadows$formCard',
});

export const PublicHeroImage = styled('img', {
  width: '100%',
  height: '320px',
  objectFit: 'cover',

  '@sm_max': { height: '240px' },
});

export const PublicHeroBody = styled(Box, {
  padding: '$px$28',

  '@sm_max': { padding: '$px$20' },
});

export const PublicTitle = styled('h1', {
  margin: 0,
  fontSize: '$px$32',
  fontWeight: '800',
  color: '$primaryHeading',

  '@sm_max': { fontSize: '$px$24' },
});

export const DetailGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '$px$16',
  marginTop: '$px$24',

  '@sm_max': { gridTemplateColumns: '1fr' },
});

export const DetailItem = styled(Box, {
  padding: '$px$16',
  borderRadius: '12px',
  backgroundColor: '$dimWhite',
});

export const DetailLabel = styled('span', {
  display: 'block',
  fontSize: '$font$xs',
  color: '$slateGray',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '$px$6',
});

export const DetailValue = styled('span', {
  display: 'block',
  fontSize: '$font$md',
  fontWeight: '600',
  color: '$primaryHeading',
});

export const ContactBanner = styled(Box, {
  marginTop: '$px$24',
  padding: '$px$20',
  borderRadius: '14px',
  backgroundColor: '$main',
  color: '$white',
});

export const LimitBanner = styled(Box, {
  padding: '$px$14 $px$18',
  borderRadius: '12px',
  backgroundColor: 'rgba(253, 38, 146, 0.08)',
  border: '1px solid rgba(253, 38, 146, 0.2)',
  color: '$secondryHeading',
  fontSize: '$font$sm',
});
