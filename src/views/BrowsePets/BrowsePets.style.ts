import { Box, Flex } from "@/components/elements";
import { styled } from "@/theme";

export const PageRoot = styled(Box, {
  minHeight: '100dvh',
  backgroundColor: '$colorGray',
  paddingTop: '$px$24',
  paddingBottom: '$px$48',
});

export const PageContainer = styled(Box, {
  maxWidth: '$px$1200',
  margin: '0 auto',
  paddingInline: '$px$24',
  '@md_max': { paddingInline: '$px$16' },
  '@sm_max': { paddingInline: '$px$12' },
});

export const TopBar = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$px$24',
  gap: '$px$12',
});

export const ContentRow = styled(Flex, {
  alignItems: 'flex-start',
  gap: '$px$24',
  '@md_max': { gap: 0 },
});

export const GridArea = styled(Box, {
  flex: 1,
  minWidth: 0,
});

export const PetGrid = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '$px$20',
  '@lg_max': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@sm_max': { gridTemplateColumns: '1fr' },
});

export const ResultsBar = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$px$16',
  paddingBottom: '$px$12',
  borderBottom: '1px solid $lightGrayLine',
});


export const MobileFilterBtn = styled('button', {
  display: 'none',
  '@md_max': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '$px$8',
    padding: '$px$10 $px$18',
    backgroundColor: '$main',
    color: '$white',
    border: 'none',
    borderRadius: '$radius$full',
    fontSize: '$rem$0_87',
    fontWeight: '$fontWeight$semibold',
    cursor: 'pointer',
    boxShadow: '$md',
    transition: 'background 0.2s ease',
    '&:hover': { backgroundColor: '$darkMain' },
  },
});