import {
  Box,
  Button,
  Flex,
  ImageWithSkeleton,
  Text,
} from '@/components/elements';
import { styled } from '@/theme';

export const CardRoot = styled(Flex, {
  defaultVariants: { direction: 'column' },
  backgroundColor: '$cardBgColor',
  borderRadius: '$radius$lg',
  overflow: 'hidden',
  border: '1px solid $main',
  boxShadow: '$shadows$cardShadow',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  width: '$percent$100',
  minWidth: 0,

  '&:hover': {
    transform: 'translateY(-2px)',
  },
});

export const ImageWrapper = styled(Box, {
  width: '$percent$100',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  backgroundColor: '$lightGray',
  position: 'relative',
});

export const IconWrapper = styled(Box, {
  position: 'absolute',
  top: '$px$8',
  right: '$px$8',
  zIndex: '10',
  '& svg': {
    color: '$white',
    width: '$px$20',
    height: '$px$20',
    '&:hover': {
      fill: '$main',
    },
  },
});
export const AnimalImage = styled(ImageWithSkeleton, {
  width: '$percent$100',
  height: '$percent$100',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
});

export const ContentWrapper = styled(Flex, {
  defaultVariants: { direction: 'column' },
  flex: 1,
  gap: '$px$10',
  py: '$px$8',
  px: '$px$6',
});

export const NameRow = styled(Flex, {
  alignItems: 'flex-start !important',
  justifyContent: 'space-between !important',
  gap: '$px$8',
});

export const NameBlock = styled(Flex, {
  defaultVariants: { direction: 'column' },
  gap: '$px$2',
  width: '$percent$100',
  minWidth: 0,
});

export const BadgeRow = styled(Flex, {
  flexWrap: 'wrap !important',
  gap: '$px$6',
});

export const Badge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  px: '$px$10',
  py: '$px$4',
  borderRadius: '$radius$sm',
  fontSize: '$px$10',
  fontWeight: '$fontWeight$semibold',
  letterSpacing: '0.03em',
  backgroundColor: '$veryLightGreen',
  color: '$dGreen',
});

export const AgeBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  px: '$px$10',
  py: '$px$2',
  borderRadius: '$radius$sm',
  fontSize: '$px$12',
  fontWeight: '$fontWeight$semibold',
  letterSpacing: '0.03em',
  backgroundColor: '$dimWhite',
  color: '$main',
  border: '1px solid $main',
  whiteSpace: 'nowrap',
  '@sm_max': {
    fontSize: '$px$8',
    px: '$px$6',
    py: '$px$2',
  },
});

// Report type badge — Lost (red) / Found (green)
export const ReportTypeBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$px$4',
  px: '$px$10',
  py: '$px$2',
  borderRadius: '$radius$sm',
  fontSize: '$fontSize$xxs',
  fontWeight: '$fontWeight$bold',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  flexShrink: 0,

  variants: {
    reportType: {
      lost: {
        backgroundColor: '$reportLostBg',
        color: '$reportLostColor',
        border: '1px solid $reportLostBorder',
        '& svg': { color: '$reportLostColor' },
      },
      found: {
        backgroundColor: '$reportFoundBg',
        color: '$reportFoundColor',
        border: '1px solid $reportFoundBorder',
        '& svg': { color: '$reportFoundColor' },
      },
    },
  },
  '@sm_max': {
    fontSize: '$px$8',
    px: '$px$6',
    py: '$px$2',
  },
});

// Status badge — Open / Resolved
export const StatusBadge = styled(Badge, {
  variants: {
    resolved: {
      true: {
        backgroundColor: '$reportFoundBg',
        color: '$reportFoundColor',
        border: '1px solid $reportFoundBorder',
      },
      false: {
        color: '$main',
        backgroundColor: '$dimWhite',
        borderColor: '$dimWhite',
      },
    },
  },
});

export const ButtonGroup = styled(Flex, {
  gap: '$px$8',
  width: '$percent$100',
  mt: 'auto',
});

// ── Owner action row (Edit / Delete) — visible in My Listings only ────────────

export const OwnerActionRow = styled(Flex, {
  gap: '$px$6',
  width: '$percent$100',
  borderTop: '1px dashed $ownerActionDivider',
  pt: '$px$8',
  mt: 'auto',

  '& button .btn-icon': {
    display: 'none',
  },
  '@md_max': {
    '& button .btn-text': { display: 'none' },
    '& button .btn-icon': { display: 'block' },
  },
});

// ── Unified card button with default / danger variants ────────────────────────

export const AnimalCardButton = styled(Button, {
  defaultVariants: { variant: 'default' },
  flex: 1,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$px$6',
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$semibold',
  letterSpacing: '0.04em',
  padding: '$px$12 $px$16 !important',
  backgroundColor: '$main !important',
  border: '1px solid $main !important',
  color: '$white !important',
  width: '$percent$100',
  borderRadius: '$radius$full !important',
  '&:hover': {
    backgroundColor: '$darkMain !important',
  },

  variants: {
    variant: {
      default: {},
      danger: {
        border: '1px solid $error1 !important',
        color: '$error1 !important',

        '&:hover': {
          backgroundColor: '$errorHoverBg !important',
        },
      },
      main: {
        backgroundColor: '$main !important',
        color: '$white !important',
        '&:hover': {
          backgroundColor: '$darkMain !important',
        },
      },
    },
  },
  '& svg': {
    width: '$px$16',
    height: '$px$16',
  },
  '@sm_max': {
    padding: '$px$10 $px$10 !important',
    '& svg': {
      width: '$px$10',
      height: '$px$10',
    },
  },
});

export const AnimalName = styled(Text, {
  defaultVariants: { ellipsis: 1 },
  color: '$main !important',
  fontSize: '$px$16 !important',
  fontWeight: '$fontWeight$bold !important',
  letterSpacing: '0.03em !important',
  lineHeight: 1.2,
  textOverflow: 'ellipsis !important',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@sm_max': {
    fontSize: '$px$12 !important',
  },
});

export const LocationWrapper = styled(Flex, {
  defaultVariants: { align: 'center', gap: '2' },
  '& svg': {
    height: '$px$15',
    width: '$px$15',
    color: '$main',
  },
  '@sm_max': {
    '& svg': {
      height: '$px$10',
      width: '$px$10',
    },
  },
});

export const LocationText = styled(Text, {
  defaultVariants: { ellipsis: 1 },
  color: '$slateGray !important',
  fontSize: '$px$10 !important',
  fontWeight: '$fontWeight$medium !important',
  letterSpacing: '0.03em !important',
  lineHeight: 1.2,
});

export const BreedText = styled(Text, {
  defaultVariants: { ellipsis: 1 },
  color: '$slateGray !important',
  fontSize: '$px$10 !important',
  fontWeight: '$fontWeight$medium !important',
  letterSpacing: '0.03em !important',
  lineHeight: 1.2,
});
