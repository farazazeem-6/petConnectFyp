import { styled } from '@/theme';
import { Box, Flex } from '@/components/elements';

export const ModalContent = styled(Flex, {
  flexDirection: 'column !important',
  gap: '$px$20',
  '@md': {
    flexDirection: 'row !important',
    gap: '$px$32',
  },
});

export const ImageSection = styled(Box, {
  flex: '1',
  position: 'relative',
  borderRadius: '$radius$xl',
  overflow: 'hidden',
  backgroundColor: '$lightGray',
  minHeight: '$px$250',
  '@md': {
    minHeight: '$px$400',
  },
});

export const AnimalImage = styled('img', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '$percent$100',
  height: '$percent$100',
  objectFit: 'cover',
});

export const DetailsSection = styled(Flex, {
  flex: '1.2',
  flexDirection: 'column !important',
  gap: '$px$16',
});

export const InfoHeader = styled(Flex, {
  justifyContent: 'space-between !important',
  alignItems: 'center',
  borderBottom: '1px solid $lightGray',
  paddingBottom: '$px$10',
});

export const InfoGrid = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '$px$12',
});

export const InfoItem = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$4',
});

export const TagsContainer = styled(Flex, {
  flexWrap: 'wrap !important',
  gap: '$px$8',
  marginTop: '$px$8',
});

export const DescriptionBox = styled(Box, {
  backgroundColor: '$dimWhite',
  padding: '$px$16',
  borderRadius: '$radius$lg',
  border: '1px solid $main',
  marginTop: '$px$10',
});
