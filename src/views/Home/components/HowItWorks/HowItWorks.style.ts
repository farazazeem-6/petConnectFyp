import { Box, Flex, Text } from '@/components/elements';
import { styled } from '@/theme';

export const HowItWorksWrapper = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  width: '$percent$100',
  boxSizing: 'border-box',
  py: '$px$60',
  px: '$px$60',
  gap: '$px$10',

  '@lg_max': {
    px: '$px$30',
  },
  '@md_max': {
    px: '$px$20',
    py: '$px$40',
  },
  '@sm_max': {
    px: '$px$16',
    py: '$px$32',
  },
});

export const HowItWorksTitleRow = styled(Flex, {
  alignItems: 'center !important',
  justifyContent: 'center !important',
  gap: '$px$12',
  flexWrap: 'wrap',
  mb: '$px$6',
});

export const HowItWorksHeading = styled(Text, {
  fontSize: '$fontSize$display',
  fontWeight: '$fontWeight$black',
  color: '$black !important',
  lineHeight: '1 !important',

  '@md_max': {
    fontSize: '$fontSize$xxxl',
  },
  '@sm_max': {
    fontSize: '$px$22',
  },
});

export const HowItWorksSubtitle = styled(Text, {
  fontSize: '$fontSize$md',
  fontWeight: '$fontWeight$light',
  color: '$secondryHeading !important',
  textAlign: 'center',
  mt: '$px$8',
  mb: '$px$40',

  '@md_max': {
    mb: '$px$32',
  },
  '@sm_max': {
    fontSize: '$fontSize$sm',
    mb: '$px$24',
  },
});

// ---- Steps row ----

export const StepsRow = styled(Flex, {
  alignItems: 'flex-start !important',
  justifyContent: 'center !important',
  width: '$percent$100',
  gap: '0',

  '@md_max': {
    flexDirection: 'column !important',
    alignItems: 'center !important',
    gap: '$px$32',
  },
});

export const StepItem = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  flex: 1,
  position: 'relative',

  '@md_max': {
    width: '$percent$100',
    maxWidth: '$px$300',
  },
});

// Connector line between icon circles on the horizontal row
export const StepConnector = styled(Box, {
  flex: 1,
  height: '$px$2',
  backgroundColor: '$neutralGray',
  alignSelf: 'flex-start',
  mt: '$px$40',
  '@md_max': {
    display: 'none',
  },
});

export const StepIconCircle = styled(Flex, {
  alignItems: 'center !important',
  justifyContent: 'center !important',
  width: '$px$70',
  height: '$px$70',
  br: '$radius$circle',
  border: '$px$3 solid $neutralGray',
  backgroundColor: '$white',
  mb: '$px$20',
  flexShrink: 0,
  '@sm_max': {
    width: '$px$64',
    height: '$px$64',
    mb: '$px$14',
  },
});

export const StepTitle = styled(Text, {
  fontSize: '$fontSize$lg',
  fontWeight: '$fontWeight$bold',
  color: '$black !important',
  textAlign: 'center',
  mb: '$px$6',
});

export const StepDescription = styled(Text, {
  lineHeight: '1.6 !important',
  fontSize: '$fontSize$md',
  fontWeight: '$fontWeight$light',
  color: '$secondryHeading !important',
  textAlign: 'center',
});
