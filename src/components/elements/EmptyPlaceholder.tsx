import { Box } from './Box';
import { Flex } from './Flex';
import { Text } from './Text';
import { styled } from '@/theme';

export const EmptyWrapper = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  boxSizing: 'border-box',
  gap: '$px$12',
  width: '$percent$100',
  height: '$percent$100',
  backgroundColor: '$white',
  borderRadius: '$radius$lg',

  variants: {
    variant: {
      page: {
        padding: '$px$60',
        border: '1px dashed $lightGrayLine',
        minHeight: '$px$300',
      },
      card: {
        position: 'absolute',
        inset: 0,
        padding: '$px$16',
        backgroundColor: '$colorGray',
        border: 'none',
      },
    },
  },
  defaultVariants: {
    variant: 'page',
  },
});

export type EmptyPlaceholderProps = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  variant?: 'page' | 'card';
  css?: any;
};

export function EmptyPlaceholder({
  icon,
  title,
  subtitle,
  variant = 'page',
  css,
}: EmptyPlaceholderProps) {
  return (
    <EmptyWrapper variant={variant} css={css}>
      {icon && <Box css={{ marginBottom: '4px' }}>{icon}</Box>}
      <Text
        heading="h5"
        css={{ color: '$main', fontWeight: '$fontWeight$semibold', textAlign: 'center' }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text heading="h8" css={{ color: '$slateGray', textAlign: 'center' }}>
          {subtitle}
        </Text>
      )}
    </EmptyWrapper>
  );
}
