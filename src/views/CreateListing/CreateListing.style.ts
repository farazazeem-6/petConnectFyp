import { Box, Flex } from '@/components/elements';
import { styled } from '@/theme';

export const PageRoot = styled(Box, {
  minHeight: '100dvh',
  backgroundColor: '$colorGray',
  paddingTop: '$px$40',
  paddingBottom: '$px$60',
  display: 'flex !important',
  alignItems: 'flex-start',
  justifyContent: 'center',
  boxSizing: 'border-box',

  '@md_max': {
    paddingTop: '$px$20',
    paddingBottom: '$px$40',
  },
  '@sm_max': {
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: '100dvh',
    alignItems: 'flex-start',
  },
});

export const FormCard = styled(Box, {
  width: '$percent$100',
  maxWidth: '$px$720',
  backgroundColor: '$white',
  borderRadius: '$radius$xl',
  boxShadow: '0 8px 40px rgba(160,48,72,0.08), 0 2px 12px rgba(0,0,0,0.06)',
  padding: '$px$36 $px$40',
  margin: '0 $px$16',
  boxSizing: 'border-box',

  '@md_max': {
    padding: '$px$28 $px$28',
    margin: '0 $px$12',
  },
  '@sm_max': {
    borderRadius: 0,
    margin: 0,
    padding: '$px$20 $px$16',
    boxShadow: 'none',
    minHeight: '100dvh',
  },
});

export const PageHeader = styled(Flex, {
  display: 'flex !important',
  alignItems: 'center !important',
  gap: '$px$12',
  marginBottom: '$px$28',

  '@sm_max': {
    marginBottom: '$px$20',
  },
});

export const BackBtn = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  width: '$px$38',
  height: '$px$38',
  borderRadius: '$radius$full',
  backgroundColor: '$main',
  color: '$white',
  flexShrink: 0,
  transition: 'background 0.18s ease, transform 0.15s ease',
  '&:hover': {
    background: '$darkMain',
    transform: 'translateX(-2px)',
  },
  '&:active': {
    transform: 'scale(0.94)',
  },
});

export const FieldGroup = styled(Box, {
  display: 'flex !important',
  flexDirection: 'column !important',
  gap: '$px$5',
  width: '$percent$100',
});

export const FieldLabel = styled('label', {
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$semibold',
  color: '$slateGray',
  '& span': {
    color: '$main',
    marginLeft: '$px$2',
  },
});

export const FieldError = styled('p', {
  fontSize: '$fontSize$xs',
  color: '$errorColor',
  margin: 0,
  display: 'flex !important',
  alignItems: 'center',
  gap: '$px$4',
  minHeight: '$px$18',
  lineHeight: 1.4,
  fontWeight: '$fontWeight$medium',
});

export const TwoColRow = styled(Flex, {
  display: 'flex !important',
  gap: '$px$16',
  alignItems: 'flex-start !important',

  '@sm_max': {
    flexDirection: 'column !important',
    gap: '$px$16',
  },
});

export const PillGroup = styled(Flex, {
  display: 'flex !important',
  gap: '$px$10',
  flexWrap: 'wrap',
});

export const GenderPill = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'inline-flex !important',
  alignItems: 'center !important',
  gap: '$px$6',
  padding: '$px$9 $px$22',
  borderRadius: '$radius$full',
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$medium',
  border: '1.5px solid $lightGrayLine',
  color: '$slateGray',
  backgroundColor: '$white',
  transition: 'border-color 0.15s ease, color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease',
  userSelect: 'none',

  variants: {
    active: {
      true: {
        borderColor: '$main',
        backgroundColor: '$main',
        color: '$white',
        boxShadow: '0 3px 10px rgba(160,48,72,0.22)',
        '&:hover': {
          borderColor: '$main',
          backgroundColor: '$main',
          color: '$white',
        },
      },
      false: {
        '&:hover': {
          borderColor: '$main',
          color: '$main',
          backgroundColor: '$dimWhite',
        },
      },
    },
  },

  defaultVariants: {
    active: false,
  },
});

export const StepContent = styled(Flex, {
  display: 'flex !important',
  flexDirection: 'column !important',
  gap: '$px$20',
  paddingTop: '$px$8',
  paddingBottom: '$px$4',
});

export const DummyStepBox = styled(Flex, {
  display: 'flex !important',
  flexDirection: 'column !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  gap: '$px$12',
  padding: '$px$48 $px$24',
  backgroundColor: '$colorGray',
  borderRadius: '$radius$lg',
  border: '1.5px dashed $lightGrayLine',
  textAlign: 'center',
  minHeight: '$px$180',
});

export const ImageDropZone = styled('label', {
  display: 'flex !important',
  flexDirection: 'column !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  gap: '$px$10',
  width: '$percent$100',
  minHeight: '$px$200',
  borderRadius: '$radius$xl',
  border: '2px dashed $lightGrayLine',
  backgroundColor: '$colorGray',
  cursor: 'pointer',
  transition: 'border-color 0.18s ease, background 0.18s ease',
  padding: '$px$20',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    borderColor: '$main',
    backgroundColor: '$dimWhite',
  },

  variants: {
    hasImage: {
      true: {
        border: '2px solid $main',
        padding: 0,
        minHeight: '$px$240',
      },
    },
    invalid: {
      true: {
        borderColor: '$errorColor',
        backgroundColor: 'rgba(255,39,39,0.03)',
      },
    },
  },
});

export const ImagePreview = styled('img', {
  width: '$percent$100',
  height: '$percent$100',
  objectFit: 'cover',
  borderRadius: '$radius$xl',
  display: 'block',
  maxHeight: '$px$280',
});

export const DropZoneIcon = styled(Box, {
  width: '$px$56',
  height: '$px$56',
  borderRadius: '$radius$full',
  backgroundColor: '$dimWhite',
  display: 'flex !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  fontSize: '28px',
  flexShrink: 0,
  transition: 'background 0.18s ease',
});

export const DropZoneOverlay = styled(Box, {
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(160,48,72,0.55)',
  display: 'flex !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  gap: '$px$8',
  color: '$white',
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$semibold',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  borderRadius: '$radius$xl',
  cursor: 'pointer',

  '&:hover': {
    opacity: 1,
  },
});

export const SectionHeading = styled('h3', {
  fontSize: '$fontSize$xs',
  fontWeight: '$fontWeight$bold',
  color: '$slateGray',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  margin: '0 0 $px$10',
});

export const MultiPill = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'inline-flex !important',
  alignItems: 'center !important',
  gap: '$px$5',
  padding: '$px$8 $px$16',
  borderRadius: '$radius$full',
  fontSize: '$fontSize$sm',
  fontWeight: '$fontWeight$medium',
  border: '1.5px solid $lightGrayLine',
  color: '$slateGray',
  backgroundColor: '$white',
  transition: 'all 0.15s ease',
  userSelect: 'none',
  lineHeight: 1,

  '&:hover': {
    borderColor: '$main',
    color: '$main',
    backgroundColor: '$dimWhite',
  },

  variants: {
    selected: {
      true: {
        borderColor: '$main',
        backgroundColor: '$main',
        color: '$white',
        boxShadow: '0 2px 8px rgba(160,48,72,0.20)',
        '&:hover': {
          borderColor: '$main',
          backgroundColor: '$main',
          color: '$white',
        },
      },
    },
    invalid: {
      true: {
        borderColor: '$errorColor',
      },
    },
  },
});

export const CharSection = styled(Box, {
  display: 'flex !important',
  flexDirection: 'column !important',
  gap: '$px$8',
});
