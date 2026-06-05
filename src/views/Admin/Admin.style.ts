import { Box, Flex } from '@/components/elements';
import { styled } from '@/theme';
import { fadeSlideIn } from '../Profile';

export const AdminWrapper = styled(Box, {
  width: '$percent$100',
  boxSizing: 'border-box',
  mx: 'auto',
  py: '$rem$2',
  px: '$px$100',
  animation: `${fadeSlideIn} 0.25s ease`,
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$32',

  '@lg_max': { px: '$px$70' },
  '@md_max': { px: '$px$50', py: '$rem$1_5', gap: '$px$24' },
  '@sm_max': { px: '$px$10', gap: '$px$20' },
});

export const StatsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '$px$20',

  '@lg_max': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },

  '@md_max': {
    gridTemplateColumns: '1fr',
  },
});

export const StatCard = styled(Box, {
  padding: '$px$24',
  borderRadius: '14px',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  backgroundColor: '$white',
  boxShadow: '$shadows$formCard',
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$8',

  '@sm_max': {
    padding: '$px$16',
  },
});

export const StatLabel = styled('span', {
  fontSize: '$font$sm',
  color: '$slateGray',
  fontWeight: '500',
});

export const StatValue = styled('span', {
  fontSize: '$px$32',
  fontWeight: '700',
  color: '$main',
  lineHeight: 1.1,

  '@sm_max': {
    fontSize: '$px$28',
  },
});

export const FiltersBar = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '2fr repeat(3, minmax(140px, 1fr))',
  gap: '$px$16',
  padding: '$px$20',
  borderRadius: '14px',
  backgroundColor: '$dimWhite',
  border: '1px solid rgba(0, 0, 0, 0.04)',

  '@lg_max': {
    gridTemplateColumns: '1fr 1fr',
  },

  '@sm_max': {
    gridTemplateColumns: '1fr',
    padding: '$px$16',
  },
});

export const SearchInput = styled('input', {
  width: '$percent$100',
  padding: '$rem$1 $rem$1',
  borderRadius: '$radius$md',
  border: '1px solid $main',
  backgroundColor: '$white',
  fontSize: '$rem$0_87',
  color: '$primaryHeading',
  boxSizing: 'border-box',
  outline: 'none',

  '&::placeholder': {
    color: '$slateGray',
  },

  '&:focus': {
    borderColor: '$primary',
  },
});

export const TabBar = styled(Flex, {
  gap: '$px$10',
  flexWrap: 'wrap',
});

export const TabButton = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  cursor: 'pointer',
  padding: '$px$12 $px$20',
  borderRadius: '999px',
  fontSize: '$font$sm',
  fontWeight: '600',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  backgroundColor: '$white',
  color: '$secondryHeading',
  transition: 'all 0.2s ease',

  '&:hover': {
    borderColor: '$main',
    color: '$main',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$main',
        borderColor: '$main',
        color: '$white',
      },
    },
  },
});

export const TableCard = styled(Box, {
  borderRadius: '$px$14',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  backgroundColor: '$white',
  boxShadow: '$shadows$formCard',
  overflow: 'hidden',
});

export const TableScroll = styled(Box, {
  width: '$percent$100',
  overflowX: 'auto',
});

export const Table = styled('table', {
  width: '100%',
  minWidth: '860px',
  borderCollapse: 'collapse',
});

export const Th = styled('th', {
  textAlign: 'left',
  padding: '$px$16 $px$20',
  fontSize: '$font$xs',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: '$slateGray',
  backgroundColor: '$dimWhite',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  whiteSpace: 'nowrap',
});

export const Td = styled('td', {
  padding: '$px$16 $px$20',
  fontSize: '$font$sm',
  color: '$primaryHeading',
  borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
  verticalAlign: 'middle',
});

export const UserCell = styled(Flex, {
  alignItems: 'center',
  gap: '$px$12',
  minWidth: '180px',
});

export const UserAvatar = styled('img', {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid $main',
  flexShrink: 0,
});

export const UserMeta = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$4',
  minWidth: 0,
});

export const UserName = styled('span', {
  fontWeight: '600',
  color: '$primaryHeading',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const UserEmail = styled('span', {
  fontSize: '$font$xs',
  color: '$slateGray',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const PetThumb = styled('img', {
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  objectFit: 'cover',
  border: '1px solid rgba(0, 0, 0, 0.06)',
});

export const RoleBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '$px$4 $px$10',
  borderRadius: '999px',
  fontSize: '$font$xs',
  fontWeight: '600',

  variants: {
    role: {
      admin: {
        backgroundColor: 'rgba(22, 102, 52, 0.12)',
        color: '$main',
      },
      user: {
        backgroundColor: 'rgba(102, 112, 133, 0.12)',
        color: '$slateGray',
      },
    },
  },
});

export const StatusBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '$px$4 $px$10',
  borderRadius: '999px',
  fontSize: '$font$xs',
  fontWeight: '600',
  textTransform: 'capitalize',
  backgroundColor: 'rgba(22, 102, 52, 0.1)',
  color: '$main',
});

export const EmptyState = styled(Box, {
  padding: '$px$40',
  textAlign: 'center',
  color: '$slateGray',
  fontSize: '$font$sm',
});

export const ActionsWrapper = styled(Box, {
  position: 'relative',
  display: 'inline-flex',
});

export const ActionsTrigger = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  cursor: 'pointer',
  padding: '$px$8 $px$12',
  borderRadius: '$radius$md',
  fontSize: '$font$sm',
  fontWeight: '600',
  color: '$main',
  border: '1px solid $main',
  backgroundColor: '$white',
  transition: 'background-color 0.2s ease',

  '&:hover': {
    backgroundColor: '$dimWhite',
  },
});

export const ActionsMenu = styled('div', {
  position: 'absolute',
  top: 'calc(100% + 6px)',
  right: 0,
  minWidth: '180px',
  backgroundColor: '$white',
  borderRadius: '$radius$lg',
  border: '1px solid $lightGrayLine',
  boxShadow: '$dropDown',
  zIndex: 20,
  overflow: 'hidden',
});

export const ActionsMenuItem = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
  cursor: 'pointer',
  padding: '$px$12 $px$16',
  fontSize: '$font$sm',
  color: '$primaryHeading',
  transition: 'background-color 0.15s ease',

  '&:hover': {
    backgroundColor: '$colorGray',
    color: '$main',
  },

  variants: {
    danger: {
      true: {
        color: '$errorColor',
        '&:hover': {
          backgroundColor: 'rgba(220, 38, 38, 0.08)',
          color: '$errorColor',
        },
      },
    },
  },
});

export const CountLabel = styled('span', {
  fontSize: '$font$sm',
  color: '$slateGray',
  fontWeight: '500',
});

export const TableHeaderRow = styled(Flex, {
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$px$16 $px$20',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  backgroundColor: '$white',
  flexWrap: 'wrap',
  gap: '$px$12',
});

export const TableTitle = styled('h3', {
  margin: 0,
  fontSize: '$font$lg',
  fontWeight: '600',
  color: '$primaryHeading',
});

export const MonoText = styled('span', {
  fontFamily: 'monospace',
  fontSize: '$font$xs',
  color: '$slateGray',
});
