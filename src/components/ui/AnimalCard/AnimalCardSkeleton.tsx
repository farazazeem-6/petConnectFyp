import { Box, Flex } from '@/components/elements';
import { CardsShimmer, styled } from '@/theme';

const Shimmer = styled(Box, {
  backgroundColor: '$skeletonBaseColor',
  backgroundImage: '$skeletonGradient',
  backgroundSize: '936px 100%',
  animation: `${CardsShimmer} 1.4s linear infinite`,
  borderRadius: '$radius$sm',
});


const CardRoot = styled(Flex, {
  defaultVariants: {
    direction: 'column',
  },
  backgroundColor: '$cardBgColor',
  borderRadius: '$radius$xl',
  overflow: 'hidden',
  border: '1px solid $main',
  boxShadow: '$shadows$cardShadow',
  width: '$percent$100',
  minWidth: 0,
});

const ImagePlaceholder = styled(Shimmer, {
  width: '$percent$100',
  paddingTop: '$percent$60',
  borderRadius: '0',
});

const ContentWrapper = styled(Flex, {
  defaultVariants: {
    direction: 'column',
  },
  gap: '$px$10',
  p: '$px$14',
});

const NameRow = styled(Flex, {
  defaultVariants: {
    align: 'start',
  },
  gap: '$px$8',
});

const NameLine = styled(Shimmer, {
  height: '$px$18',
  width: '$percent$50',
  mb: '$px$6',
});
const BreedLine = styled(Shimmer, { height: '$px$13', width: '$percent$70' });


const BadgeRow = styled(Flex, { gap: '$px$6' });
const BadgePill = styled(Shimmer, {
  height: '$px$22',
  borderRadius: '$radius$full',

  variants: {
    size: {
      sm: { width: '$px$80' },
      md: { width: '$px$100' },
    },
  },
});

const ButtonPlaceholder = styled(Shimmer, {
  height: '$px$38',
  width: '$percent$100',
  borderRadius: '$radius$md',
  mt: '$px$4',
});


export function AnimalCardSkeleton() {
  return (
    <CardRoot aria-hidden="true" aria-label="Loading animal card">
      <ImagePlaceholder />

      <ContentWrapper>
        <NameRow>
          <Box css={{ display: 'flex', flexDirection: 'column', gap: '$px$2', width: '100%' }}>
            <NameLine />
            <BreedLine />
          </Box>
        </NameRow>

        <BadgeRow>
          <BadgePill size="sm" />
          <BadgePill size="md" />
        </BadgeRow>

        <ButtonPlaceholder />
      </ContentWrapper>
    </CardRoot>
  );
}
