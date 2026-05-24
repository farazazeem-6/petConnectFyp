import { Box } from "@/components/elements";
import { styled } from "@/theme";
import { fadeSlideIn } from "../Profile";

export const AboutWrapper = styled(Box, {
  width: '$percent$100',
  boxSizing: 'border-box',
  mx: 'auto',
  py: '$rem$2',
  px: '$px$100',
  animation: `${fadeSlideIn} 0.25s ease`,
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$40',

  '@lg_max': {
    px: '$px$70',
  },

  '@md_max': {
    px: '$px$50',
    py: '$rem$1_5',
  },

  '@sm_max': {
    px: '$px$10',
  },
});

export const Section = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$16',
});

export const SectionTitle = styled('h2', {
  fontSize: '$px$25',
  fontWeight: '600',
  color: '$textPrimary',
  position: 'relative',
  textAlign: 'center',
  paddingBottom: '$px$8',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150px',
    height: '3px',
    backgroundColor: '$main',
    borderRadius: '2px',
  },
  '@sm_max': {
    fontSize: '$px$15 !important',
  }

});

export const SectionText = styled('p', {
  fontSize: '$font$md',
  lineHeight: 1.7,
  color: '$textSecondary',
});

// Grid of core values
export const ValuesGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '$px$24',
  marginTop: '$px$8',
});

export const ValueCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$12',
  padding: '$px$24',
  backgroundColor: '$dimWhite',
  borderRadius: '12px',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
  }
});

export const ValueTitle = styled('h3', {
  fontSize: '$font$lg',
  fontWeight: '600',
  color: '$textPrimary',
});

export const ValueDescription = styled('p', {
  fontSize: '$font$sm',
  lineHeight: 1.6,
  color: '$textSecondary',
});

// Steps grid for "How it works"
export const StepsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '$px$24',
  marginTop: '$px$8',
});

export const StepCard = styled('div', {
  display: 'flex',
  gap: '$px$16',
  padding: '$px$24',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  backgroundColor: '$white',
});

export const StepNumber = styled('span', {
  fontSize: '$font$2xl',
  fontWeight: '700',
  color: '$main',
  opacity: 0.8,
});

export const StepContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$8',
});

export const StepTitle = styled('h4', {
  fontSize: '$font$md',
  fontWeight: '600',
  color: '$textPrimary',
});

export const StepDescription = styled('p', {
  fontSize: '$font$sm',
  lineHeight: 1.5,
  color: '$textSecondary',
});

// Team grid
export const TeamGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '$px$32',
  marginTop: '$px$8',
});

export const TeamCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '$px$20',
  backgroundColor: '$white',
  borderRadius: '12px',
  border: '1px solid rgba(0, 0, 0, 0.04)',
});

export const AvatarImg = styled('img', {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '$px$16',
  border: '2px solid $main',
  padding: '4px',
  backgroundColor: '$white',
});

export const CardTitle = styled('h3', {
  fontSize: '$font$md',
  fontWeight: '600',
  color: '$textPrimary',
  marginBottom: '$px$4',
});

export const CardRole = styled('p', {
  fontSize: '$font$sm',
  color: '$textTertiary',
});