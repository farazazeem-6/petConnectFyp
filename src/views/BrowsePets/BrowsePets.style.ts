import { Box, Flex } from "@/components/elements";
import { styled } from "@/theme";

export const PageRoot = styled(Box, {
  minHeight: '100dvh',
  backgroundColor: '$colorGray',
  paddingTop: '$px$24',
  paddingBottom: '$px$48',
});

export const TopBar = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$px$24',
  gap: '$px$12',
});

// Only visible on mobile where the sidebar is a drawer
export const BrowseHeading = styled(Box, {
  display: 'none',
  '@md_max': {
    display: 'block',
  },
});

export const ContentRow = styled(Flex, {
  alignItems: 'flex-start',
  gap: '$px$20',
  '@md_max': { gap: 0 },
});

export const GridArea = styled(Box, {
  flex: 1,
  minWidth: 0,
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

export const AddPetCard = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$px$10',
  backgroundColor: '$white',
  border: '2px dashed $lightGrayLine',
  borderRadius: '$radius$lg',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  alignSelf: 'stretch',
  padding: '$px$20',
  '&:hover': {
    borderColor: '$main',
    boxShadow: '$cardShadow',
  },
});

export const AddPetIcon = styled(Box, {
  width: '48px',
  height: '48px',
  borderRadius: '$radius$full',
  border: '3px solid $main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  color: '$main',
  fontSize: '28px',
  lineHeight: 1,
  fontWeight: '$fontWeight$light',
  transition: 'background 0.2s ease',
  '$parent:hover &': {
    backgroundColor: '$dimWhite',
  },
});