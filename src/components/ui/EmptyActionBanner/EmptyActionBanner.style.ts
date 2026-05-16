import { styled } from '@/theme';
import { Flex, Text, Button } from '@/components/elements';

export const BannerWrapper = styled(Flex, {
  all: 'unset',
  display: 'flex !important',
  cursor: 'pointer',
  width: '100%',
  boxSizing: 'border-box',
  flexDirection: 'column !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  gap: '$px$16',
  padding: '$px$48 $px$24',
  borderRadius: '$radius$lg',
  background: '$dimWhite',
  border: '2px dashed $lightGrayLine',
  textAlign: 'center',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    background: 'rgba(48, 160, 78, 0.05)',
    borderColor: '$main',
  },

  '@xs_max': {
    padding: '$px$30 $px$16',
  },
});

export const IconRing = styled(Flex, {
  width: '72px !important',
  height: '72px !important',
  borderRadius: '$radius$full !important',
  backgroundColor: 'rgba(48, 160, 78, 0.05)',
  border: '2px solid $main',
  alignItems: 'center !important',
  justifyContent: 'center !important',
});

export const ContentBox = styled(Flex, {
  flexDirection: 'column !important',
  gap: '$px$6',
  maxWidth: '380px',
  alignItems: 'center !important',
  textAlign: 'center !important',
});

export const ActionPill = styled(Button, {
  display: 'inline-flex !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  gap: '$px$8',
  backgroundColor: '$main !important',
  color: '$white !important',
  padding: '$px$12 $px$28 !important',
  borderRadius: '$radius$full !important',
  fontSize: '$fontSize$sm !important',
  fontWeight: '$fontWeight$semibold !important',
  border: 'none !important',
  width: 'auto !important',
  minWidth: 'max-content !important',
  margin: '0 auto !important',

  '&:hover': {
    opacity: 0.9,
    backgroundColor: '$colors$main !important',
  },
});
