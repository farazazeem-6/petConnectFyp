import { styled, rotate360 } from '@/theme';
import { Box } from './Box';
import { Flex } from './Flex';
import { Text } from './Text';

const LoaderWrapper = styled(Flex, {
  height: '$dvh$100',
  width: '$percent$100',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  flexDirection: 'column !important',
  gap: '$rem$0_75',
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

type TLoaderProps = {
  message?: string;
};

export function Loader({ message }: TLoaderProps) {
  return (
    <LoaderWrapper>
      <Spinner />
      {message && (
        <Text css={{ fontSize: '$fontSize$sm', color: '$grayDark' }}>
          {message}
        </Text>
      )}
    </LoaderWrapper>
  );
}
