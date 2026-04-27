import { Box, Flex } from '@/components/elements';
import { CardsShimmer, styled } from '@/theme';
import { PawIcon, LocationIcon, CalendarIcon, PaletteIcon } from '@/components/svgs';

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

const ButtonGroup = styled(Flex, {
  gap: '$px$8',
  width: '$percent$100',
  mt: '$px$4',
  flexDirection: 'row',
  alignItems: 'stretch',
  '@xs_max': {
    flexDirection: 'column',
  },
});

const ButtonPlaceholderFull = styled(Shimmer, {
  height: '$px$38',
  flex: 1,
  borderRadius: '$radius$md',
});

interface AnimalCardSkeletonProps {
  variant?: 'adoption' | 'report';
}


export function AnimalCardSkeleton({ variant = 'adoption' }: AnimalCardSkeletonProps) {
  if (variant === 'report') {
    return (
      <CardRoot aria-hidden="true" aria-label="Loading report card">
        <ImagePlaceholder />
        <ContentWrapper>
          <NameRow>
            <Box css={{ display: 'flex', flexDirection: 'column', gap: '$px$2', width: '100%' }}>
              <Flex align="start" justify="between" css={{ width: '100%', gap: '8px' }}>
                <NameLine css={{ width: '60%', mb: 0 }} />
                <BadgePill size="sm" css={{ width: '50px', height: '18px' }} />
              </Flex>
              <Flex gap="2" align="center" css={{ marginTop: '6px' }}>
                <PaletteIcon css={{ color: '$skeletonBaseColor', width: '13px', height: '13px', flexShrink: 0 }} />
                <BreedLine css={{ width: '40%', height: '12px' }} />
              </Flex>
              <Flex gap="2" align="center" css={{ marginTop: '2px' }}>
                <LocationIcon css={{ color: '$skeletonBaseColor', width: '14px', height: '14px', flexShrink: 0 }} />
                <BreedLine css={{ width: '60%', height: '12px' }} />
              </Flex>
              <Flex gap="2" align="center" css={{ marginTop: '2px' }}>
                <CalendarIcon css={{ color: '$skeletonBaseColor', width: '13px', height: '13px', flexShrink: 0 }} />
                <BreedLine css={{ width: '30%', height: '12px' }} />
              </Flex>
            </Box>
          </NameRow>
          
          <BadgeRow>
            <BadgePill size="sm" css={{ width: '70px', height: '22px' }} />
          </BadgeRow>

          <ButtonGroup>
            <ButtonPlaceholderFull />
          </ButtonGroup>
        </ContentWrapper>
      </CardRoot>
    );
  }

  // ADOPTION VARIANT
  return (
    <CardRoot aria-hidden="true" aria-label="Loading animal card">
      <ImagePlaceholder />

      <ContentWrapper>
        <NameRow>
          <Box css={{ display: 'flex', flexDirection: 'column', gap: '$px$2', width: '100%' }}>
            <Flex align="start" justify="between" css={{ width: '100%', gap: '8px' }}>
              <NameLine css={{ width: '60%', mb: 0 }} />
              <BadgePill size="sm" css={{ width: '40px', height: '18px', borderRadius: '$radius$lg' }} />
            </Flex>
            
            <Flex align="center" justify="between" css={{ marginTop: '6px' }}>
              <Flex gap="2" align="center">
                <LocationIcon css={{ color: '$skeletonBaseColor', width: '16px', height: '16px', flexShrink: 0 }} />
                <BreedLine css={{ width: '60px', height: '13px' }} />
              </Flex>
              <BreedLine css={{ width: '80px', height: '11px', marginTop: '2px' }} />
            </Flex>
          </Box>
        </NameRow>

        <BadgeRow>
          <BadgePill size="sm" css={{ width: '70px' }} />
          <BadgePill size="sm" css={{ width: '60px' }} />
        </BadgeRow>

        <ButtonGroup>
          <ButtonPlaceholderFull />
          <ButtonPlaceholderFull />
        </ButtonGroup>
      </ContentWrapper>
    </CardRoot>
  );
}
