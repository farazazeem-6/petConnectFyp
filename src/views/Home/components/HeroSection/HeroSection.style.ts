import { Box, Button, Flex, Text } from '@/components/elements';
import { styled } from '@/theme';

export const HeroSectionWrapper = styled(Flex, {
  width: '$percent$100',
  overflow: 'visible',
  boxSizing: 'border-box',
  py: '$px$50',
  gap: '$px$40',
  px: '$px$60',
  justifyContent: 'space-around !important',
  '@lg_max': {
    px: '0',
    flexDirection: 'column !important',
    gap: '$px$20',
    py: '$px$30',
    alignItems: 'center',
  },
  '@md_max': {
    flexDirection: 'column !important',
    gap: '$px$60',
  },
  '@sm_max': {
    mt: '0',
  },
});

export const HeroSectionContentLeft = styled(Flex, {
  flexDirection: 'column !important',
  gap: '$px$16',
  pt: '$px$10',

  '@md_max': {
    alignItems: 'center',
    textAlign: 'center',
  },
});

export const HeroSubHeading = styled(Text, {
  fontStyle: 'italic',
  fontSize: '$fontSize$md',
  color: '$main !important',
  fontWeight: '$fontWeight$light',

  '& b': {
    fontWeight: '$fontWeight$bold',
    color: '$main',
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
  '@sm_max': {
    fontSize: '$px$40',
  },
});

export const HeroShopLine = styled(Text, {
  fontSize: '$fontSize$xxl',
  fontWeight: '$fontWeight$normal',
  mt: '$px$8',

  '& span': {
    textDecoration: 'none',
    fontWeight: '$fontWeight$semibold',
  },
});

export const HeroDescription = styled(Text, {
  fontSize: '$fontSize$md',
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
  fontSize: '$fontSize$lg',
  fontWeight: '$fontWeight$bold',
  color: '$secondryHeading !important',
});

// ---- Right Side ----

export const HeroSectionContentRight = styled(Flex, {
  flexDirection: 'column !important',
  position: 'relative',
  borderRadius: '$radius$xl',
  overflow: 'hidden',
  flexShrink: '0',
  width: '500px',
  height: '400px',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '$radius$xl',
  },
  '@lg_max': {
    display: 'none',
  },
});
export const CardTitle = styled(Flex, {
  defaultVariant: {
    align: 'center',
  },
  justifyContent: 'center !important',
  mb: '$px$14',
  gap: '$px$8',
  '@lg_max': {
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
  },
  '@md_max': {
    flexDirection: 'row !important',
  },
});

export const WhyChooseCard = styled(Flex, {
  flexDirection: 'column !important',
  border: '1.5px solid $main',
  br: '$radius$xl',
  px: '$px$28',
  paddingTop: '$px$60',
  paddingBottom: '$px$20',
  gap: '$px$10',
  position: 'relative',
  zIndex: 2,

  '@md_max': {
    px: '$px$16',
    py: '$px$20',
  },
  '@sm_max': {
    px: '$px$5',
  },
});

export const WhyChooseTitle = styled(Text, {
  fontSize: '$fontSize$xxl',
  fontWeight: '$fontWeight$semibold',
  color: '$main !important',
  textAlign: 'center',
});

export const WhyChooseBullet = styled(Text, {
  fontSize: '$fontSize$md',
  textAlign: 'center',
  lineHeight: '1.7 !important',
  fontWeight: '$fontWeight$light',
  color: '$secondryHeading !important',

  '& b': {
    fontWeight: '$fontWeight$bold',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    color: '$black !important',
  },
  '@sm_max': {},
});

export const GoToButton = styled(Button, {
  defaultVariants: {
    variant: 'default',
  },
  background: '$main !important',
  color: '$white !important',
  br: '$radius$full !important',
  px: '$px$32 !important',
  py: '$px$15 !important',
  fontSize: '$fontSize$md !important',
  fontWeight: '$fontWeight$semibold !important',
  mx: 'auto',
  mt: '$px$10',
  gap: '$px$8',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: '$darkMain !important',
    transform: 'translateY(-1px)',
  },
  '@lg_max': {
    px: '$px$25 !important',
    py: '$px$15 !important',
  },
});

// ---- Absolute positioned image ----

export const HeroDogImageWrapper = styled(Box, {
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '$px$100',
  zIndex: 3,
  overflow: 'hidden',

  '& img': {
    width: '$percent$100',
    height: '$percent$100',
    objectFit: 'contain',
    objectPosition: 'bottom left',
  },
  '@md_max': {
    width: '$px$70',
    height: '$px$90',
  },
});

export const HeroCatImageWrapper = styled(Box, {
  position: 'absolute',
  top: '-$px$70',
  right: '0',
  width: '$px$120',
  zIndex: 3,
  overflow: 'visible',

  '& img': {
    width: '$percent$100',
    height: '$percent$100',
    objectFit: 'contain',
    objectPosition: 'top right',
  },
});

export const FindMatchButton = styled(Button, {
  defaultVariants: {
    variant: 'default',
  },
  display: 'flex !important',
  alignItems: 'center',
  justifyContent: 'center !important',
  gap: '8px',
  backgroundColor: '$main !important',
  color: '$white !important',
  fontWeight: '$fontWeight$bold !important',
  borderRadius: '$radius$full !important',
  padding: '12px 24px !important',
  '&:hover': {
    background: '$darkMain !important',
    transform: 'translateY(-1px)',
  },
});
