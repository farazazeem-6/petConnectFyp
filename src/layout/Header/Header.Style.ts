import { styled } from '@/theme';

export const HeaderWrapper = styled('header', {
  height: '$px$80',
  borderBottom: '1px solid $slate12',
  backgroundColor: '$white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  padding: '0 $px$30',
  top: 0,
  right: 0,
  position: 'fixed',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  zIndex: 100,
});
