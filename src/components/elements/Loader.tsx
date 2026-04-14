import { styled, rotate360 } from '@/theme';
import { Box } from './Box';
import { Flex } from './Flex';

const LoaderWrapper = styled(Flex, {
  height: '$dvh$100',
  width: '$percent$100',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  backgroundColor: '$background',
});

const Spinner = styled(Box, {
  width: '$px$40',
  height: '$px$40',
  borderRadius: '$percent$50',
  border: '$px$3 solid $main',
  borderTopColor: '$text',
  animation: `${rotate360} 0.8s linear infinite`,
});

export function Loader() {
  return (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
}
