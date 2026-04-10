import { popOutIn, slideDownAndFade, slideUpAndFade } from '@/theme';
import { styled } from '@/theme/stitches.config';

export const Text = styled('span', {
  margin: '0',
  fontWeight: '$fontWeight$normal',

  variants: {
    color: {
      primary: {
        color: '$black',
      },
      secondry: {
        color: '$secondryHeading',
      },
      light: { color: '$light' },
      gray: {
        color: '$gray',
      },
      main: {
        color: '$main',
      },
      white: {
        color: '$white',
      },
      footer: {
        color: '$footerTextColor !important',
      },
      success: {
        color: '$success !important',
      },
      error: {
        color: '$error1 !important',
      },
    },
    heading: {
      h1: {
        fontSize: '$rem$4',
        fontWeight: '$fontWeight$semibold',
        lineHeight: '$px$38',
      },
      h1XL: {
        fontSize: '$rem$3',
        fontWeight: '$fontWeight$semibold',
        lineHeight: '$rem$2_75',
      },
      h2: {
        fontSize: '$rem$2',
        fontWeight: '$fontWeight$semibold',
        lineHeight: '$rem$2_75',
      },
      h3: {
        fontSize: '$rem$1_75',
        fontWeight: '$fontWeight$bold',
        lineHeight: '$rem$2_75',
      },
      h4: {
        fontSize: '$rem$1_18',
        fontWeight: '$fontWeight$semibold',
        lineHeight: '$rem$1_75',
      },
      h5: {
        fontSize: '$rem$0_93',
        fontWeight: '$fontWeight$semibold',
        lineHeight: '$rem$1_62',
      },
      h6: {
        fontSize: '$rem$0_75',
        fontWeight: '$fontWeight$semibold',
        lineHeight: '$rem$1_75',
      },
      h6Bold: {
        fontSize: '$rem$0_75',
        fontWeight: '$fontWeight$semibold',
        lineHeight: '$rem$1_75',
      },
      h7: {
        fontSize: '$rem$0_75',
        fontWeight: '$fontWeight$semibold',
        lineHeight: '$rem$1_75',
      },
      h8: {
        fontSize: '$rem$0_87',
        fontWeight: '$fontWeight$thin',
        lineHeight: '$rem$1_75',
      },
      h8Bold: {
        fontSize: '$rem$1',
        fontWeight: '$fontWeight$normal',
      },
      h9: {
        fontSize: '$rem$0_62',
        fontWeight: '$fontWeight$semibold',
      },
      h5Bold: {
        fontSize: '$rem$1',
        fontWeight: '$fontWeight$bold',
        lineHeight: '$rem$1_75',
      },
      paragraph: {
        fontSize: '$rem$1',
        fontWeight: '$fontWeight$normal',
        lineHeight: '$rem$0_87',
      },
    },
    gradient: {
      1: {
        background: `$gradients$textualGradient`,
        'background-clip': 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
      },
      2: {
        background: '$textualGradient2',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      3: {
        background: `$gradients$greenishGradient`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
    animate: {
      sileUpFade: {
        animation: `1.5s ${slideUpAndFade}  ease-out`,
      },
      sileUpFade2: {
        animation: `2s ${slideUpAndFade}  ease-out`,
      },
      sileUpFade2AndHalf: {
        animation: `2.5s ${slideUpAndFade}  ease-out`,
      },
      sileUpFade3: {
        animation: `3s ${slideUpAndFade}  ease-out`,
      },
      sileUpFade4: {
        animation: `4s ${slideUpAndFade}  ease-out`,
      },
      sileUpFade5: {
        animation: `5s ${slideUpAndFade}  ease-out`,
      },
      sileUpFade6: {
        animation: `6s ${slideUpAndFade}  ease-out`,
      },
      sileDownFade: {
        animation: `1.5s ${slideDownAndFade}  ease-out`,
      },
      sileDownFade2: {
        animation: `2s ${slideDownAndFade}  ease-out`,
      },
      sileDownFade3: {
        animation: `3s ${slideDownAndFade}  ease-out`,
      },
      popOutIn: {
        animation: `1.5s ${popOutIn}  ease-out`,
      },
    },
    textEllipsis: {
      '1': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '1',
        lineClamp: '1',
        '-webkit-box-orient': 'vertical',
        textOverflow: 'ellipsis',
      },
      '2': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        lineClamp: '2',
        '-webkit-box-orient': 'vertical',
        textOverflow: 'ellipsis',
      },
      '3': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '3',
        lineClamp: '3',
        '-webkit-box-orient': 'vertical',
        textOverflow: 'ellipsis',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});
