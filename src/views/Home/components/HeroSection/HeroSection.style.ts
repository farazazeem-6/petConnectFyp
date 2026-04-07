import { Box, Button, Flex, Text } from '@/components/elements';
import { styled } from '@/theme';

export const HeroSectionWrapper = styled(Flex, {
  width: '$percent$100',
  overflow: 'visible',
  boxSizing: 'border-box',
  py: '$px$50',
  gap: '$px$40',
  position: 'relative',

  '@md_max': {
    flexDirection: 'column',
    py: '$px$30',
    gap: '$px$30',
  },
});

export const HeroSectionContentLeft = styled(Flex, {
  flexDirection: 'column !important',
  flex: '0 0 $percent$50',
  maxWidth: '$percent$50',
  gap: '$px$16',
  pt: '$px$20',

  '@md_max': {
    flex: '1 1 $percent$100',
    maxWidth: '$percent$100',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export const HeroSubHeading = styled(Text, {
  fontStyle: 'italic',
  fontSize: '$fontSize$sm',
  color: '#8B2040 !important',
  fontWeight: '$fontWeight$normal',

  '& b': {
    fontWeight: '$fontWeight$bold',
    color: '#8B2040',
  },
});

export const HeroHeading = styled(Text, {
  fontSize: '$fontSize$heading',
  fontWeight: '$fontWeight$black',
  color: '$black !important',
  lineHeight: '0.95 !important',
  letterSpacing: '0.02em',
  textTransform: 'uppercase',

  '@md_max': {
    fontSize: '$fontSize$xxxl',
  },
});

export const HeroShopLine = styled(Text, {
  fontSize: '$fontSize$lg',
  fontWeight: '$fontWeight$semibold',
  color: '$black !important',
  mt: '$px$8',

  '& span': {
    textDecoration: 'none',
    color: '$black',
    fontWeight: '$fontWeight$bold',
  },
});

export const HeroDescription = styled(Text, {
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$normal',
  lineHeight: '1.6 !important',
  color: '$black !important',
  maxWidth: '$px$480',

  '& b': {
    fontWeight: '$fontWeight$bold',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    cursor: 'pointer',
  },

  '@md_max': {
    fontSize: '$fontSize$sm',
    maxWidth: '$percent$100',
  },
});

export const HeroBrandName = styled(Text, {
  fontSize: '$fontSize$md',
  fontWeight: '$fontWeight$black',
  color: '$black !important',
});

// ---- Right side: "Why choose" card ----

export const HeroSectionContentRight = styled(Flex, {
  flexDirection: 'column !important',
  flex: '0 0 45%',
  maxWidth: '45%',
  position: 'relative',

  '@md_max': {
    flex: '1 1 $percent$100',
    maxWidth: '$percent$100',
  },
});

export const WhyChooseCard = styled(Flex, {
  flexDirection: 'column !important',
  border: '1.5px solid #e0e0e0',
  br: '$radius$xxl',
  px: '$px$28',
  py: '$px$28',
  backgroundColor: '$white',
  gap: '$px$10',
  position: 'relative',
  zIndex: 2,

  '@md_max': {
    px: '$px$16',
    py: '$px$20',
  },
});

export const WhyChooseTitle = styled(Text, {
  fontSize: '$fontSize$xl',
  fontWeight: '$fontWeight$bold',
  color: '#8B2040 !important',
  textAlign: 'center',
  mb: '$px$4',
});

export const WhyChooseBullet = styled(Text, {
  fontSize: '$fontSize$sm',
  color: '$black !important',
  textAlign: 'center',
  lineHeight: '1.7 !important',
  fontWeight: '$fontWeight$normal',

  '& b': {
    fontWeight: '$fontWeight$bold',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
});

export const GoToButton = styled(Button, {
  defaultVariants: {
    variant: 'default',
  },
  background: '#8B2040 !important',
  backgroundColor: '#8B2040 !important',
  color: '$white !important',
  br: '$radius$full !important',
  px: '$px$32 !important',
  py: '$px$12 !important',
  fontSize: '$fontSize$md !important',
  fontWeight: '$fontWeight$semibold !important',
  mx: 'auto',
  mt: '$px$8',
  gap: '$px$8',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: '#721832 !important',
    backgroundColor: '#721832 !important',
    transform: 'translateY(-1px)',
  },
});

// ---- Absolute positioned image placeholders ----

export const HeroDogImageWrapper = styled(Box, {
  position: 'absolute',
  bottom: '-10px',
  left: '-20px',
  width: '$px$120',
  height: '$px$140',
  zIndex: 3,
  overflow: 'visible',

  '& img': {
    width: '$percent$100',
    height: '$percent$100',
    objectFit: 'contain',
    objectPosition: 'bottom',
  },

  '@md_max': {
    width: '$px$80',
    height: '$px$100',
    left: '-5px',
    bottom: '-5px',
  },
});

export const HeroCatImageWrapper = styled(Box, {
  position: 'absolute',
  top: '-20px',
  right: '-10px',
  width: '$px$100',
  height: '$px$110',
  zIndex: 3,
  overflow: 'visible',

  '& img': {
    width: '$percent$100',
    height: '$percent$100',
    objectFit: 'contain',
    objectPosition: 'top right',
  },

  '@md_max': {
    width: '$px$70',
    height: '$px$80',
    right: '-5px',
    top: '-10px',
  },
});
