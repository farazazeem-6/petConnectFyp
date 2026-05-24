import { Box, Flex, Text } from '@/components/elements';
import { styled } from '@/theme';

export const DashBoardHeaderWrapper = styled(Box, {
  border: '1px solid $main',
  padding: '$px$30',
  borderRadius: '$radius$xl',
  boxShadow: '$shadows$ctaShadow',
  boxSizing: 'border-box',
  display: 'flex',
  gap: '$px$30',
  alignItems: 'center',
  '@sm_max': {
    flexDirection: 'column',
    gap: '$px$10',
    padding: '$px$20 $px$10',
  },
});
export const IconWrapper = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$px$15',
  borderRadius: '$radius$lg',
  border: '1px solid $main',
  backgroundColor: '$main',
});
export const TextWrapper = styled(Flex, {
  defaultVariants: {
    direction: 'column',
    alignItems: 'flex-start',
    gap: '8',
  },
  '@sm_max': {
    alignItems: 'center !important'
  }
});
export const HeadingText = styled(Text, {
  fontSize: '$px$30 !important',
  color: '$black !important',
  fontWeight: '$fontWeight$extrabold',
  '@sm_max': {
    fontSize: '$px$24 !important',
  }
});
export const SubHeadingText = styled(Text, {
  fontSize: '$px$16 !important',
  fontWeight: '$fontWeight$light',
  '@sm_max': {
    fontSize: '$px$14 !important',
    textAlign: 'center !important',
  }
});
