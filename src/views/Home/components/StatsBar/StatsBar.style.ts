import { Box, Flex, Text } from '@/components/elements';
import { styled } from '@/theme';

export const StatsBarWrapper = styled(Box, {
  width: '$percent$100',
  boxSizing: 'border-box',
  mt: '$px$60',
  py: '$px$40',

  '@lg_max': {
    py: '$px$32',
  },
  '@md_max': {
    py: '$px$28',
  },
  '@sm_max': {
    py: '$px$24',
    mt: '$px$30',
  },
});
export const StatsBarContent = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  width: '$percent$100',
  gap: '$px$30',
  boxSizing: 'border-box',
}
)

export const StatsInner = styled(Box, {
  display: 'flex',
  justifyContent: 'space-around !important',
  width: '$percent$100',
  maxWidth: '$breakpoints$xxl',
  backgroundColor: '$main',
  margin: '0 auto',
  mx: 'auto',
  gap: '$px$8',

  '@md_max': {
    justifyContent: 'space-around !important',
    gap: '$px$12',
  },
  '@sm_max': {
    gap: '$px$50',
    flexDirection: 'column !important',
  },
});

export const StatItem = styled(Flex, {
  flexDirection: 'column !important',
  position: 'relative',
  alignItems: 'center !important',
});

export const StatValue = styled(Text, {
  fontSize: '$fontSize$xxxl',
  fontWeight: '$fontWeight$black',
  color: '$white !important',
  lineHeight: '1 !important',
  letterSpacing: '-0.02em',
  mb: '$px$6',

  '@md_max': {
    fontSize: '$fontSize$xxl',
    mb: '$px$4',
  },
  '@sm_max': {
    fontSize: '$px$22',
    mb: '$px$3',
  },
});

export const StatLabel = styled(Text, {
  fontSize: '$fontSize$xs !important',
  fontWeight: '$fontWeight$normal',
  color: '$colorGray !important',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  lineHeight: '1.2 !important',
  '@md_max': {
    fontSize: '$px$10 !important',
  },

  '@sm_max': {
    fontSize: '$px$10',
    letterSpacing: '0.08em',
  },
});
