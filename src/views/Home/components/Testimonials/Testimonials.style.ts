import { Box, Flex, Text } from '@/components/elements';
import { styled } from '@/theme';

// ---- Section Wrapper ----

export const TestimonialsSectionWrapper = styled(Box, {
  width: '$percent$100',
  boxSizing: 'border-box',
  py: '$px$80',
  px: '$px$60',
  textAlign: 'center',
  overflow: 'hidden',

  '@lg_max': {
    px: '$px$40',
  },
  '@md_max': {
    py: '$px$60',
    px: '$px$24',
  },
  '@sm_max': {
    py: '$px$50',
    px: '$px$16',
  },
});

// ---- Section Heading ----

export const TestimonialsHeading = styled(Text, {
  fontSize: '$fontSize$heading',
  fontWeight: '$fontWeight$black',
  color: '$black !important',
  lineHeight: '1.1 !important',
  mb: '$px$12',

  '@md_max': {
    fontSize: '$fontSize$xxxl',
  },
  '@sm_max': {
    fontSize: '$px$30',
  },
});

export const TestimonialsHeadingHighlight = styled('span', {
  color: '$main !important',
});

export const TestimonialsSubtitle = styled(Text, {
  fontSize: '$fontSize$md',
  fontWeight: '$fontWeight$normal',
  color: '$secondryHeading !important',
  lineHeight: '1.6 !important',
  mb: '$px$50',

  '@sm_max': {
    fontSize: '$fontSize$sm',
    mb: '$px$32',
  },
});

// ---- Cards Grid (Desktop) ----

export const TestimonialsGrid = styled(Flex, {
  gap: '$px$24',
  justifyContent: 'center !important',
  alignItems: 'stretch !important',
  maxWidth: '$breakpoints$xxl',
  margin: '0 auto',

  '@sm_max': {
    display: 'none !important',
  },
});

// ---- Swiper Wrapper (Mobile only) ----

export const TestimonialsSwiperWrapper = styled(Box, {
  display: 'none',
  width: '$percent$100',

  '@sm_max': {
    display: 'block',
  },

  // Swiper pagination dots override
  '& .swiper-pagination': {
    position: 'relative',
    marginTop: '$px$20',
  },

  '& .swiper-pagination-bullet': {
    width: '8px',
    height: '8px',
    background: '$main',
    opacity: '0.3',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
  },

  '& .swiper-pagination-bullet-active': {
    opacity: '1',
    transform: 'scale(1.3)',
  },
});

// ---- Single Card ----

export const TestimonialCard = styled(Flex, {
  flexDirection: 'column !important',
  justifyContent: 'space-between !important',
  flex: '1',
  maxWidth: '$px$380',
  minWidth: '$px$260',
  background: '$white',
  br: '$radius$xl',
  boxShadow: '$shadows$lg',
  px: '$px$28',
  pt: '$px$32',
  pb: '$px$24',
  textAlign: 'left',
  boxSizing: 'border-box',

  '@md_max': {
    px: '$px$20',
    pt: '$px$24',
    pb: '$px$20',
  },
  '@sm_max': {
    maxWidth: '$percent$100',
    minWidth: 'unset',
    mx: '$px$4',
  },
});

export const TestimonialQuote = styled(Text, {
  fontSize: '$fontSize$md',
  fontStyle: 'italic',
  fontWeight: '$fontWeight$normal',
  color: '$secondryHeading !important',
  lineHeight: '1.7 !important',
  flex: '1',
  mb: '$px$24',

  '@sm_max': {
    fontSize: '$fontSize$sm',
  },
});

// ---- Author Row ----

export const TestimonialAuthorRow = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$12',
  borderTop: '1px solid $neutralGray',
  pt: '$px$16',
});

export const TestimonialAvatar = styled(Flex, {
  width: '$px$40',
  height: '$px$40',
  br: '$radius$full',
  background: '$main',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  flexShrink: '0',
});

export const TestimonialAvatarInitial = styled(Text, {
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$bold',
  color: '$white !important',
  textTransform: 'uppercase',
});

export const TestimonialAuthorInfo = styled(Flex, {
  flexDirection: 'column !important',
  gap: '$px$2',
});

export const TestimonialAuthorName = styled(Text, {
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$semibold',
  color: '$black !important',
});

export const TestimonialAuthorCity = styled(Text, {
  fontSize: '$fontSize$xs',
  fontWeight: '$fontWeight$normal',
  color: '$secondryHeading !important',
});