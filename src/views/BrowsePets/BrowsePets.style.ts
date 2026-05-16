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

// ── Action bar above the grid (count + add button) ───────────────
export const AddActionBar = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$px$14',
  paddingBottom: '$px$12',
  borderBottom: '1px solid $lightGrayLine',
  gap: '$px$12',
});

export const AddActionButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$px$6',
  padding: '$px$10 $px$20',
  backgroundColor: '$main',
  color: '$white',
  borderRadius: '$radius$full',
  fontSize: '$rem$0_87',
  fontWeight: '$fontWeight$semibold',
  lineHeight: 1,
  boxShadow: '$shadows$ctaShadow',
  transition: 'background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease',
  '&:hover': {
    backgroundColor: '$darkMain',
    boxShadow: '$shadows$ctaShadow',
    transform: 'translateY(-1px)',
  },
  '&:active': { transform: 'translateY(0)' },
});