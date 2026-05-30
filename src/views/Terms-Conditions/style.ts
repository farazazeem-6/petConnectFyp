import { Box } from '@/components/elements';
import { styled } from '@/theme';
import { fadeSlideIn } from '../Profile';

export const TermConditionsWrapper = styled(Box, {
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
    gap: '$px$32',
  },

  '@sm_max': {
    px: '$px$10',
    gap: '$px$24',
  },
});

export const ContentWrapper = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$40',
  width: '$percent$100',
  maxWidth: '960px',
  boxSizing: 'border-box',
  mx: 'auto',
  padding: '$px$40',
  backgroundColor: '$white',
  borderRadius: '16px',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '$shadows$formCard',

  '@md_max': {
    padding: '$px$32',
    gap: '$px$32',
  },

  '@sm_max': {
    padding: '$px$20',
    gap: '$px$24',
    borderRadius: '12px',
  },
});

export const IntroText = styled('p', {
  fontSize: '$font$md',
  lineHeight: 1.75,
  color: '$secondryHeading',
  textAlign: 'center',
  maxWidth: '820px',
  mx: 'auto',

  '@sm_max': {
    fontSize: '$font$sm',
    textAlign: 'left',
  },
});

export const TableOfContents = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$16',
  padding: '$px$24',
  backgroundColor: '$dimWhite',
  borderRadius: '12px',
  border: '1px solid rgba(0, 0, 0, 0.04)',

  '@sm_max': {
    padding: '$px$16',
  },
});

export const TocTitle = styled('h3', {
  fontSize: '$font$lg',
  fontWeight: '600',
  color: '$primaryHeading',
  margin: 0,
});

export const TocList = styled('ol', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '$px$8 $px$24',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  counterReset: 'toc',

  '@md_max': {
    gridTemplateColumns: '1fr',
  },
});

export const TocItem = styled('li', {
  counterIncrement: 'toc',
});

export const TocLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: '$px$8',
  fontSize: '$font$sm',
  lineHeight: 1.5,
  color: '$main',
  textDecoration: 'none',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: '$primary',
    textDecoration: 'underline',
  },

  '&::before': {
    content: 'counter(toc) "."',
    fontWeight: '600',
    flexShrink: 0,
  },
});

export const Section = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$16',
  scrollMarginTop: '$px$100',
});

export const SectionTitle = styled('h2', {
  fontSize: '$px$25',
  fontWeight: '600',
  color: '$primaryHeading',
  position: 'relative',
  paddingBottom: '$px$8',
  margin: 0,

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '120px',
    height: '3px',
    backgroundColor: '$main',
    borderRadius: '2px',
  },

  '@sm_max': {
    fontSize: '$px$20',
  },
});

export const SectionText = styled('p', {
  fontSize: '$font$md',
  lineHeight: 1.75,
  color: '$secondryHeading',
  margin: 0,

  '@sm_max': {
    fontSize: '$font$sm',
  },
});

export const SectionList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$12',
  margin: 0,
  padding: 0,
  paddingLeft: '$px$24',
  listStyle: 'disc',

  '@sm_max': {
    paddingLeft: '$px$20',
  },
});

export const SectionListItem = styled('li', {
  fontSize: '$font$md',
  lineHeight: 1.7,
  color: '$secondryHeading',

  '@sm_max': {
    fontSize: '$font$sm',
  },
});

export const ContactNote = styled(Box, {
  padding: '$px$24',
  borderRadius: '12px',
  backgroundColor: '$dimWhite',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  textAlign: 'center',

  '@sm_max': {
    padding: '$px$16',
    textAlign: 'left',
  },
});
