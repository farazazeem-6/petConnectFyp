import { Box, Flex, Text } from '@/components/elements';
import { styled } from '@/theme';

export const PetServicesWrapper = styled(Box, {
  width: '$percent$100',
  boxSizing: 'border-box',
  py: '$px$64',
  px: '$px$60',

  '@lg_max': {
    px: '$px$30',
  },
  '@md_max': {
    px: '$px$20',
    py: '$px$48',
  },
  '@sm_max': {
    px: '$px$16',
    py: '$px$36',
  },
});

export const PetServicesHeader = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  textAlign: 'center',
  mb: '$px$48',

  '@md_max': {
    mb: '$px$36',
  },
  '@sm_max': {
    mb: '$px$28',
  },
});

export const PetServicesTitle = styled(Text, {
  mb: '$px$12',
  color: '$black !important',
  fontSize: '$fontSize$display',
  fontWeight: '$fontWeight$black',
  span: {
    color: '$main !important',
  },
  '@md_max': {
    fontSize: '$fontSize$xxxl',
  },
  '@sm_max': {
    mb: '$px$8',
    fontSize: '$px$22',
  },
});

export const PetServicesSubtitle = styled(Text, {
  fontSize: '$fontSize$md',
  fontWeight: '$fontWeight$normal',
  color: '$secondryHeading !important',
  maxWidth: '$px$540',
  lineHeight: '1.6 !important',

  '@sm_max': {
    fontSize: '$fontSize$sm',
  },
});

export const PetServicesSubtitleBold = styled('strong', {
  fontWeight: '$fontWeight$bold',
  color: '$main',
});

// ---- Cards Grid ----
export const CardsGrid = styled(Box, {
  display: 'grid',
  gap: '$px$20',
  gridTemplateColumns: 'repeat(4, 1fr)',
  width: '$percent$100',

  '@lg_max': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },

  '@md_max': {
    gap: '$px$16',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@sm_max': {
    gap: '$px$14',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

export const ServiceCard = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  textAlign: 'center',
  backgroundColor: '$dimWhite',
  br: '$radius$xl',
  px: '$px$28',
  pt: '$px$60',
  pb: '$px$30',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-20px',
    right: '-20px',
    width: '$px$80',
    height: '$px$80',
    borderRadius: '$radius$circle',
    backgroundColor: '$shadows$mainShadow',
    pointerEvents: 'none',
    transform: 'scale(1)',
    transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  '&:hover::after': {
    transform: 'scale(3.5)',
  },

  '@md_max': {
    p: '$px$24',
  },

  '@sm_max': {
    p: '$px$16',
  },

  '@xxs_max': {
    p: '$px$14',
  },
});

export const CardIconWrapper = styled(Flex, {
  mb: '$px$16',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  border: '1px solid $main',
  borderRadius: '$radius$full',
  padding: '$px$20',
  '@sm_max': {
    mb: '$px$12',
    padding: '$px$10',
  },
});

export const CardIcon = styled(Flex, {
  alignItems: 'center !important',
  justifyContent: 'center !important',

  '@sm_max': {
    mb: '$px$12',
  },
});
export const CardTitle = styled(Text, {
  fontSize: '$fontSize$xl',
  fontWeight: '$fontWeight$bold',
  color: '$blueText !important',
  mb: '$px$10',
  mt: '$px$10',

  '@sm_max': {
    fontSize: '$fontSize$md',
    mb: '$px$6',
  },
});

export const CardDescription = styled(Text, {
  fontSize: '$fontSize$md',
  fontWeight: '$fontWeight$light',
  color: '$secondryHeading !important',
  lineHeight: '1.55 !important',
  mb: '$px$10',
  flex: 1,

  '@sm_max': {
    fontSize: '$px$12',
    mb: '$px$14',
  },
});

export const CardButton = styled('button', {
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$main',
  color: '$white',
  border: 'none',
  br: '$radius$full',
  px: '$px$25',
  py: '$px$12',
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$bold',
  cursor: 'pointer',
  letterSpacing: '0.01em',
  transition: 'background-color 0.2s ease, transform 0.15s ease',
  whiteSpace: 'nowrap',

  '&:hover': {
    backgroundColor: '$darkMain',
    transform: 'scale(1.03)',
  },

  '@sm_max': {
    px: '$px$14',
    py: '$px$8',
    fontSize: '$px$11',
  },
});
