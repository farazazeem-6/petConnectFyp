import { Box, Button, Flex } from '@/components/elements';
import { styled } from '@/theme';

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
  boxShadow: '0 3px 12px rgba(160,48,72,0.28)',
  transition: 'background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease',
  '&:hover': {
    backgroundColor: '$darkMain',
    boxShadow: '0 5px 18px $shadows$ctaShadow',
    transform: 'translateY(-1px)',
  },
  '&:active': { transform: 'translateY(0)' },
});

// ── Full-width CTA banner shown when no data yet ───────────────

export const CTABanner = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  width: '$percent$100',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$px$16',
  padding: '$px$48 $px$24',
  marginBottom: '$px$16',
  borderRadius: '$radius$xl',
  background: 'linear-gradient(135deg, rgba(160,48,72,0.08) 0%, rgba(160,48,72,0.03) 100%)',
  border: '2px dashed $shadows$ctaShadown',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
  textAlign: 'center',

  '&:hover': {
    borderColor: '$main',
    boxShadow: '0 8px 32px rgba(160,48,72,0.14)',
    background: 'linear-gradient(135deg, rgba(160,48,72,0.12) 0%, rgba(160,48,72,0.05) 100%)',
  },

  '&:focus-visible': {
    outline: '2px solid $main',
    outlineOffset: '3px',
  },
});

export const CTAIconRing = styled(Box, {
  width: '$px$72',
  height: '$px$72',
  borderRadius: '$radius$full',
  backgroundColor: '$shadows$ctaShadow',
  border: '2px solid $main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s ease',
});

export const CTAContent = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$6',
  maxWidth: '420px',
  margin: '0 auto',
});

export const CTAButton = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  gap: '$px$8',
  backgroundColor: '$main',
  color: '$white',
  padding: '$px$12 $px$28',
  borderRadius: '$radius$full',
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$semibold',
  marginTop: '$px$4',
  boxShadow: '$shadows$ctaShadow',
  transition: 'box-shadow 0.2s ease',
});

export const FilterTopButton = styled(Button, {
  cursor: 'pointer !important',
  display: 'inline-flex !important',
  alignItems: 'center',
  gap: '$px$6 !important',
  padding: '$px$8 $px$18 !important',
  borderRadius: '$radius$full !important',
  fontSize: '0.875rem',
  fontWeight: '$fontWeight$semibold',
  transition: 'all 0.15s ease',
  lineHeight: 1,

  variants: {
    active: {
      true: {
        border: '1.5px solid $main !important',
        backgroundColor: '$main !important',
        color: '$white !important',
        boxShadow: '$ctaShadow !important',
        '&:hover': {
          background: '$main !important'
        }
      },
      false: {
        border: '1.5px solid $lightBlue !important',
        backgroundColor: '$white !important',
        color: '$darkGray !important',
        boxShadow: 'none !important',
      },
    },
  },

  '&:hover': {
    background: 'none !important',
  },
})