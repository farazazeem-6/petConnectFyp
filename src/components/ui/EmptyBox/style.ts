import { Flex } from '@/components/elements';
import { styled } from '@/theme';

export const EmptyBoxWrapper = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  padding: '$px$40',
  width: '$percent$100',
  textAlign: 'center',
  borderRadius: '$radius$xl',
  border: '$px$1 dashed $lightGrayLine',
  gap: '$px$12',
  background: '$dimWhite',
});
