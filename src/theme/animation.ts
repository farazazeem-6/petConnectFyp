import { keyframes } from './stitches.config';

const slideFromLeft = keyframes({
  '0%': { transform: 'translateX(-100%)', opacity: '0' },
  '100%': { transform: 'translateX(0)', opacity: '1' },
});

export const slideFromRight = keyframes({
  '0%': { transform: 'translateX(100%)', opacity: '0' },
  '100%': { transform: 'translateX(0)', opacity: '1' },
});

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(50%)' },
  '20%': { opacity: 0 },
  '50%': { transform: 'translateX(0%)', opacity: 1 },
  '100%': { opacity: 1, transform: 'translateY(0%)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-20%)' },
  '20%': { opacity: 0 },
  '50%': { opacity: 1, transform: 'translateX(0%)' },
  '100%': { opacity: 1, transform: 'translateX(0%)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-50%)' },
  '20%': { opacity: 0 },
  '50%': { transform: 'translateX(0%)', opacity: 1 },
  '100%': { opacity: 1, transform: 'translateY(0%)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(20%)' },
  '20%': { opacity: 0 },
  '50%': { opacity: 1, transform: 'translateX(0%)' },
  '100%': { opacity: 1, transform: 'translateX(0%)' },
});

const slideRight = keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(5px)' },
});

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'scale(.80)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

const backgroundMove = keyframes({
  '0%': { backgroundPosition: '0% 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' },
});

const popOutIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(1.3)' },
  '20%': { opacity: 0, transform: 'scale(1.1)' },
  '50%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});
const rotate360 = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});
const slideDown = keyframes({
  from: {
    height: 0,
  },
  to: {
    height: '100%',
  },
});
const slideUp = keyframes({
  from: {
    height: '100%',
  },
  to: {
    height: 0,
  },
});
const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});
const fadeInSlideRight = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(10px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});
const blinker = keyframes({
  '50%': {
    opacity: 0.4,
  },
});
export const blink = keyframes({
  '0%': { borderColor: 'transparent' },
  '50%': { borderColor: '$light' },
  '100%': { borderColor: 'transparent' },
});
export const openFromShade = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.5)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

export const float = keyframes({
  '0%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-10px)' },
  '100%': { transform: 'translateY(0px)' },
});
export const CardsShimmer = keyframes({
  '0%': {
    backgroundPosition: '-468px 0',
  },
  '100%': {
    backgroundPosition: '468px 0',
  },
});
const slideInLeft = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
});


export {
  slideFromLeft,
  slideUpAndFade,
  slideRightAndFade,
  slideDownAndFade,
  slideLeftAndFade,
  overlayShow,
  contentShow,
  backgroundMove,
  popOutIn,
  rotate360,
  slideDown,
  slideUp,
  fadeIn,
  fadeInSlideRight,
  blinker,
  slideRight,
  slideInLeft
};
