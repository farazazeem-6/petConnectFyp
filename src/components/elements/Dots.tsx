import { keyframes, styled } from '@/theme';

const dotty = keyframes({
  '0%': {
    content: '',
  },
  '25%': {
    content: '.',
  },
  '50%': {
    content: '..',
  },
  '75%': {
    content: '...',
  },
  '100%': {
    content: '',
  },
});
const StyledDots = styled('span', {
  '&::before': {
    display: 'inline-block',
    content: '',
    width: '$space$20',
  },
  '&::after': {
    content: '',
    width: '$space$20',
    textAlign: 'left',
    display: 'inline-block',
    animation: `${dotty} steps(1,end) 1.25s infinite`,
  },
});

export const Dots = ({ children = '' }) => {
  return <StyledDots>{children}</StyledDots>;
};
