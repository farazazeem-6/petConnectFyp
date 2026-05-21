import { Box, Flex } from '@/components/elements';
import { styled } from '@/theme';

// ── Page root — same background as Browse/LostFound ──────────────────────────
export const PageRoot = styled(Box, {
  minHeight: '100dvh',
  backgroundColor: '$colorGray',
});

// ── Toolbar: tab pills (right) + create button (left) ────────────────────────
export const ToolBar = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '$px$12',
  marginBottom: '$px$20',
  marginTop: '$px$20',
});

// ── Tab pills group ───────────────────────────────────────────────────────────
export const TabPillGroup = styled(Flex, {
  gap: '$px$8',
  flexWrap: 'wrap',
});

// ── Individual tab pill ───────────────────────────────────────────────────────
export const TabPill = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$px$6',
  padding: '$px$8 $px$18',
  borderRadius: '$radius$full',
  fontSize: '$rem$0_87',
  fontWeight: '$fontWeight$semibold',
  letterSpacing: '0.02em',
  border: '1px solid $main',
  color: '$main',
  backgroundColor: 'transparent',
  transition: 'background 0.18s ease, color 0.18s ease',

  '&:hover': {
    backgroundColor: '$dimWhite',
  },

  // active state — filled
  variants: {
    active: {
      true: {
        backgroundColor: '$main',
        color: '$white',
        '&:hover': { backgroundColor: '$darkMain' },
      },
    },
  },
});

// ── Create new listing button ─────────────────────────────────────────────────
export const CreateBtn = styled('button', {
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
  '@sm_max': {
    display: 'none'
  },

  '&:hover': {
    backgroundColor: '$darkMain',
    boxShadow: '$shadows$mainShadow',
    transform: 'translateY(-1px)',
  },

  '&:active': { transform: 'translateY(0)' },

});

// ── Listing count label ───────────────────────────────────────────────────────
export const CountLabel = styled(Box, {
  color: '$slateGray',
  fontSize: '$rem$0_87',
  fontWeight: '$fontWeight$medium',
});

// ── Grid wrapper — same as BrowsePets ────────────────────────────────────────
export const GridArea = styled(Box, {
  flex: 1,
  minWidth: 0,
});

// ── Choose listing type modal body ────────────────────────────────────────────
export const ChoiceRow = styled(Flex, {
  gap: '$px$12',
  marginTop: '$px$8',
  '@xs_max': { flexDirection: 'column' },
});

export const ChoiceCard = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$px$10',
  padding: '$px$24 $px$16',
  borderRadius: '$radius$xl',
  border: '2px solid $main',
  backgroundColor: 'transparent',
  color: '$main',
  fontWeight: '$fontWeight$semibold',
  fontSize: '$rem$0_9',
  textAlign: 'center',
  transition: 'background 0.18s ease, transform 0.12s ease',

  '&:hover': {
    backgroundColor: '$dimWhite',
    transform: 'translateY(-2px)',
  },

  '&:active': { transform: 'translateY(0)' },
});

export const ChoiceIcon = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$px$60',
  height: '$px$60',
  borderRadius: '$radius$full',
  backgroundColor: 'rgba(48, 160, 78, 0.1)',
  border: '1px solid $main',
});

export const MobileListingAddButton = styled('button', {
  position: 'fixed',
  bottom: '$px$80',
  right: '$px$20',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$px$40',
  height: '$px$40',
  borderRadius: '$radius$full',
  backgroundColor: '$main',
  color: '$white',
  boxShadow: '0 4px 14px rgba(160,48,72,0.45)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  zIndex: 30,
  border: '2px solid $white',

  '&:hover': {
    backgroundColor: '$darkMain',
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 6px 20px rgba(160,48,72,0.55)',
  },

  '&:active': {
    transform: 'translateY(0) scale(0.98)',
    backgroundColor: '$darkMain',
  },

  '@sm_max': {
    display: 'flex',
    bottom: '$px$120',
  },
});
