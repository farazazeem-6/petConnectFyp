import { Box } from '@/components/elements';
import { styled } from '@/theme';

// ── Re-export all shared styled components from CreateListing ─────
export {
  PageRoot,
  FormCard,
  PageHeader,
  BackBtn,
  FieldGroup,
  FieldLabel,
  FieldError,
  TwoColRow,
  PillGroup,
  GenderPill,
  StepContent,
  ImageDropZone,
  ImagePreview,
  DropZoneIcon,
  DropZoneOverlay,
} from '../CreateListing/CreateListing.style';

// ── Report-type step specific ─────────────────────────────────────

export const ReportTypeGrid = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '$px$16',
  paddingTop: '$px$8',
  paddingBottom: '$px$4',

  '@sm_max': {
    gridTemplateColumns: '1fr',
  },
});

export const ReportTypeCard = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$10',
  padding: '$px$24',
  borderRadius: '$radius$xl',
  border: '2px solid $lightGrayLine',
  backgroundColor: '$white',
  textAlign: 'left',
  transition: 'border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
  boxSizing: 'border-box',

  '&:hover': {
    borderColor: '$main',
    boxShadow: '0 4px 16px rgba(160,48,72,0.12)',
  },

  variants: {
    selected: {
      true: {
        borderColor: '$main',
        backgroundColor: 'rgba(160,48,72,0.04)',
        boxShadow: '0 4px 20px rgba(160,48,72,0.14)',
      },
    },
    invalid: {
      true: {
        borderColor: '$errorColor',
      },
    },
  },
});

export const ReportCardIcon = styled(Box, {
  width: '$px$48',
  height: '$px$48',
  borderRadius: '$radius$full',
  backgroundColor: '$colorGray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  flexShrink: 0,
  transition: 'background 0.18s ease',
});

export const ReportCardTitle = styled('p', {
  margin: 0,
  fontSize: '$fontSize$base',
  fontWeight: '$fontWeight$bold',
  color: '$darkSlate',
  lineHeight: 1.3,
});

export const ReportCardSubtitle = styled('p', {
  margin: 0,
  fontSize: '$fontSize$sm',
  color: '$slateGray',
  lineHeight: 1.5,
});

// ── Textarea styled like our inputs ──────────────────────────────
export const StyledTextarea = styled('textarea', {
  width: '$percent$100',
  boxSizing: 'border-box',
  borderRadius: '12px',
  border: '1.5px solid #e2e8f0',
  padding: '12px 16px',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  color: '#1e293b',
  backgroundColor: '$white',
  resize: 'vertical',
  outline: 'none',
  transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
  lineHeight: 1.6,

  '&:focus': {
    borderColor: '#a03048',
    boxShadow: '0 0 0 3px rgba(160,48,72,0.12)',
  },

  variants: {
    invalid: {
      true: {
        borderColor: '$errorColor',
        backgroundColor: 'rgba(255,39,39,0.03)',
      },
    },
  },
});

// Re-export for step 1 multi-pill (used in CreateListing style)
export {
  SectionHeading,
  MultiPill,
  CharSection,
  DummyStepBox,
} from '../CreateListing/CreateListing.style';
