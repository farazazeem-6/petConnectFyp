// This common.ts is file for tocken like the common things that will same both in dark and light theme

import { Greycliff } from './font';
import type * as Stitches from '@stitches/react';

const defaultTokens = {
  fonts: {
    Greycliff: Greycliff.style.fontFamily,
  },

  rem: {
    '0_06': '0.0625rem',
    '0_12': '0.125rem',
    '0_18': '0.1875rem',
    '0_25': '0.25rem',
    '0_31': '0.3125rem',
    '0_37': '0.375rem',
    '0_43': '0.4375rem',
    '0_5': '0.5rem',
    '0_56': '0.5625rem',
    '0_62': '0.625rem',
    '0_68': '0.6875rem',
    '0_75': '0.75rem',
    '0_81': '0.8125rem',
    '0_87': '0.875rem',
    '0_93': '0.9375rem',
    '1': '1rem',
    '1_06': '1.0625rem',
    '1_12': '1.125rem',
    '1_18': '1.1875rem',
    '1_25': '1.25rem',
    '1_31': '1.3125rem',
    '1_37': '1.375rem',
    '1_43': '1.4375rem',
    '1_5': '1.5rem',
    '1_56': '1.5625rem',
    '1_62': '1.625rem',
    '1_68': '1.6875rem',
    '1_75': '1.75rem',
    '1_81': '1.8125rem',
    '1_87': '1.875rem',
    '2': '2rem',
    '2_25': '2.25rem',
    '2_5': '2.5rem',
    '2_75': '2.75rem',
    '3': '3rem',
    '3_12': '3.125rem',
    '3_25': '3.25rem',
    '3_5': '3.5rem',
    '3_75': '3.75rem',
    '4': '4rem',
    '4_5': '4.5rem',
    '5': '5rem',
    '5_5': '5.5rem',
    '6': '6rem',
    '6_25': '6.25rem',
  },
  fontWeight: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  px: {
    0.5: '0.5px',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    5: '5px',
    6: '6px',
    7: '7px',
    8: '8px',
    9: '9px',
    10: '10px',
    11: '11px',
    12: '12px',
    13: '13px',
    14: '14px',
    15: '15px',
    16: '16px',
    17: '17px',
    18: '18px',
    19: '19px',
    20: '20px',
    21: '21px',
    22: '22px',
    23: '23px',
    24: '24px',
    25: '25px',
    26: '26px',
    28: '28px',
    30: '30px',
    32: '32px',
    33: '33px',
    35: '35px',
    36: '36px',
    37: '37px',
    38: '38px',
    40: '40px',
    42: '42px',
    44: '44px',
    45: '45px',
    48: '48px',
    50: '50px',
    55: '55px',
    60: '60px',
    62: '62px',
    64: '64px',
    70: '70px',
    72: '72px',
    74: '74px',
    75: '75px',
    78: '78px',
    80: '80px',
    81: '81px',
    85: '85px',
    90: '90px',
    95: '95px',
    100: '100px',
    110: '110px',
    120: '120px',
    130: '130px',
    140: '140px',
    150: '150px',
    160: '160px',
    170: '170px',
    180: '180px',
    190: '190px',
    200: '200px',
    220: '220px',
    250: '250px',
    270: '270px',
    280: '280px',
    300: '300px',
    340: '340px',
    350: '350px',
    360: '360px',
    400: '400px',
    430: '430px',
    440: '440px',
    450: '450px',
    460: '460px',
    468: '468px',
    480: '480px',
    500: '500px',
    550: '550px',
    600: '600px',
    640: '640px',
    650: '650px',
    800: '800px',
    860: '860px',
  },
  fontSize: {
    xxs: '10px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
    display: '48px',
    heading: '55px',
  },
  radius: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    'round-sm': '50%',
    full: '9999px',
    circle: '50%',
  },
  dvh: {
    1.11: '1.111dvh', // 10px
    2.22: '2.222dvh', // 20px
    3.11: '3.111dvh', // 28px
    3.55: '3.556dvh', // 32px
    3.88: '3.889dvh', // 35px
    4.44: '4.444dvh', // 40px
    5.11: '5.111dvh', // 46px
    5.33: '5.333dvh', // 48px
    5.55: '5.556dvh', // 50px
    6.11: '6.111dvh', // 55px
    6.66: '6.667dvh', // 60px
    6.88: '6.889dvh', // 62px
    7.11: '7.111dvh', // 64px
    7.77: '7.778dvh', // 70px
    8.88: '8.889dvh', // 80px
    10: '10dvh', // 90px
    13.33: '13.333dvh', // 120px
    17.77: '17.778dvh', // 160px
    18.88: '18.889dvh', // 170px
    26.66: '26.667dvh', // 240px
    28.88: '28.889dvh', // 260px
    31.11: '31.111dvh', // 280px
    33.33: '33.333dvh', // 300px
    35.55: '35.556dvh', // 320px
    37.77: '37.778dvh', // 340px
    38.88: '38.889dvh', // 350px
    40: '40dvh', // 360px
    100: '100dvh',
  },

  vw: {
    0.69: '0.694vw', // 10px
    2.77: '2.778vw', // 40px
    3.33: '3.333vw', // 48px
    3.81: '3.819vw', // 55px
    4.44: '4.444vw', // 64px
    4.86: '4.861vw', // 70px
    5.55: '5.556vw', // 80px
    6.25: '6.25vw', // 90px
    6.94: '6.944vw', // 100px
    8.33: '8.333vw', // 120px
    15.27: '15.278vw', // 220px
    19.44: '19.444vw', // 280px
    23.61: '23.611vw', // 340px
    27.77: '27.778vw', // 400px
    30.55: '30.556vw', // 440px
    33.33: '33.333vw', // 480px
    44.44: '44.444vw', // 640px
    59.72: '59.722vw', // 860px
    100: '100vw',
  },

  ul: {
    0: 0,
    '0_25': 0.25,
    '0_5': 0.5,
    '0_75': 0.75,
    '0_8': 0.8,
    '0_9': 0.9,
    1: 1,
    1.5: 1.5,
    2: 2,
    2.5: 2.5,
    3: 3,
    3.5: 3.5,
    4: 4,
    5: 5,
    '0_55': 0.55,
    '0_6': 0.6,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
    100: 100,
    200: 200,
    300: 300,
    400: 400,
    500: 500,
    600: 600,
    700: 700,
    800: 800,
    900: 900,
    1000: 1000,
  },
  percent: {
    10: '10%',
    12: '12%',
    20: '20%',
    25: '25%',
    30: '30%',
    33: '33%',
    40: '40%',
    42: '42%',
    50: '50%',
    60: '60%',
    70: '70%',
    80: '80%',
    90: '90%',
    100: '100%',
    110: '110%',
  },

  breakpoints: {
    xxs: '380px',
    xs: '420px',
    sm: '576px',
    md: '768px',
    lg: '1000px',
    xl: '1200px',
    xxl: '1360px',
    xxxl: '1780px',
  },
  shadows: {
    cardShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.08)',
    card: '0 $px$2 $px$2 rgba(0, 0, 0, 0.3)',
    button: '0 $px$2 $px$10 rgba(,0,0,0.3)',
    sm: '0 $px$1 $px$3 rgba(0, 0, 0, 0.12)',
    md: '0 $px$4 $px$6 rgba(0, 0, 0, 0.15)',
    lg: '0 $px$10 $px$15 rgba(0, 0, 0, 0.2)',
    sideBarWrapper: '-$px$8 0 $px$24 rgba(0, 0, 0, 0.08)',
    sideBarOverlay: 'rgba(0, 0, 0, 0.5)',
    dropDown: '0 $px$10 $px$15 -$px$3 rgba(0, 0, 0, 0.1)',
    categoryCard: '0 8px 32px rgba(0, 0, 0, 0.01)',
    categoryCardHover:
      '0 20px 60px rgba(0, 0, 0, 0.15), 0 12px 40px rgba(34, 139, 34, 0.1)',
    imgOverlay:
      'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%)',
    mainShadow: 'rgba(160, 48, 72, 0.12)',
    formCard: '0 8px 40px rgba(160, 48, 72, 0.08)',
    inputFocusMain: '0 0 0 3px rgba(160, 48, 72, 0.1)',
    inputFocusError: '0 0 0 3px rgba(220, 38, 38, 0.12)',
    googleBtnHover: '0 2px 8px rgba(160, 48, 72, 0.1)',
    cardShadow2: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
};
const defaultColors = {
  appSwitchBackground: '',
  appSwitchColor: '',
  appSwitchColor2: '',
  background: '',
  lightBg: '',
  backgroundContrast: '',
  threeBarIcon: '',
  selectorHover: '',
  foreground: '',
  lighter: '',
  light: '',
  light10: '',
  main: '',
  dark: '',
  dark1: '',
  secondry: '',
  borderGreen: '',
  primaryHeading: '',
  secondryHeading: '',
  textOnHover: '',
  navBtnHover: '',
  btnHover: '',
  jetBlack: '',
  onlyGreen: '',
  darkPurple: '',
  lightGray: '',
  lightGrayLine: '',
  gray: '',
  grayDark: '',
  airdropBg: '',
  airdropBtnGray: '',
  lightPurple: '',
  lightPurple1: '',
  peach: '',
  lightYellow: '',
  lightGreen: '',
  searchInputBg: '',
  inputBg: '',
  modalBg: '',
  borderColor: '',
  gridIconStroke: '',
  errorColor: '',
  darkGreen: '',
  grayWhite: '',
  grayOynx: '',
  whiteOynx: '',
  oynxLightGrayLine: '',
  darkBlueWhite: '',
  scrollbarShadow: '',
  scrollbarBackground: '',
  dropdownBgColor: '',
  dropdownBorder: '',
  cardBgColor: '',
  cardBorderColor: '',
  cardHoverColor: '',
  gradientButtonBorder: '',
  footerTextColor: '',
  skeletonBaseColor: '',
  skeletonHighlightColor: '',
  profileCardBorder: '',
  stepperColor: '',
  slateGray: '',
  primary: '',
  white: '#ffffff',
  black: '#000000',
  orange: '#FFAB00',
  liteDark: '#1C1E21',
  blueText: '#1f2937',
  yellow: '#fece00',
  green: '#11dd7b',
  lightGreenColor: '#45d245',
  deepPink: '#FF008A',
  darkMain: '#721832',
  // brand colors
  primaryBase: '$blue1',
  primaryBgSubtle: '$blue2',
  primaryBg: '$blue3',
  primaryBgHover: '$blue4',
  primaryBgActive: '$blue5',
  primaryLine: '$blue6',
  primaryBorder: '$blue7',
  primaryBorderHover: '$blue8',
  primarySolid: '$blue9',
  primarySolidHover: '$blue10',
  primaryText: '$blue11',
  primaryTextContrast: '$blue12',
  skeletonWhite: '#f0f0f0',
  colorGray: '#f9fafb',
  lightGrayish: '#e2e8f0',
  accentColor: '#2AA952',
  veryLightGray: '#f5f5f5',
  veryLightGreen: '#e8f5e9',
  veryLightPeel: '#d0f0dc',
  mediumLightGray: '#ccc',
  dGreen: '#1E7B3D',
  disabledSlotColor: '#aaa',
  backgroundDisabledSlot: '#f3f3f3',
  homeDropdownBg: '#eef2ff',
  ghostBtn: '#F3F4F6',
  dimWhite: '#F5F0F1',
  neutralGray: '#ddd',
  whisperGray: '#f1f1f1',
  aliceBlue: '#e6f2ff',
  darkGray: '#666',
  secondary: '$purple9',
  success: '#1DC219',
  success1: '#22C55E',
  warning: '$yellow9',
  error: '#FF2727',
  error1: '#FF3333',
  lightRed: '#FE2A56',
  yellowColor: '#FFAB00',
  //gradients
  textGradient:
    'linear-gradient(90deg, #5E1BD6 3%, #912FFF 22%, #D555E2 45%, #FF943B 90%, #FFD057 100%)',
  sidebarGradient:
    'linear-gradient(90deg, #e2e2e2, $skeletonHighlightColor, #e2e2e2) !important',

  gradient:
    'linear-gradient(112deg, $cyan600 -63.59%, $pink600 -20.3%, $blue600 70.46%)',
  buttonBG:
    'linear-gradient(73.6deg, #912FFF -46.37%, #D555E2 -0.62%, #FF943B 46.54%, #FFD057 76.1%, #FFFDF9 94.4%)',
  StepCircleGradient:
    'linear-gradient(97.77deg, #5E1BD6 -437.34%, #912FFF -333.27%, #D555E2 -207.28%, #FF943B 39.22%, #FFD057 94%)',
  gradientAccent: 'linear-gradient(90deg, #FF2D55, #3F72FF)',
  sideBarBgGradient:
    'linear-gradient(135deg, $white 0%, #f8fafc 60%, #eef2f7 100%)',
  sideBarContentBg:
    'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
  categoryCardBg: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  skeletonGradient:
    'linear-gradient(90deg, #f0f0f0 0px, #ffffff 40px, #f0f0f0 80px)',
  // misc
  border: '$gray7',
  text: '$slate12',
  bgColor: '$slate1',
  footerBorder: 'rgba(255, 255, 255, 0.1)',
  codeLight: '$cyan5',
  code: '$cyan6',
  selection: '$pink8',
  footerBg: '#1a1a1a',

  // airdrop
  airdropInfo: '#EE86CB',
  airdropTask: '#8E33FF',
  redLight: '#D82122',
  lightGrayAirdrop: '#a3a3a3',
  darkGrayAirdrop: '#919EAB3D',
  protocalMinValueBg: '#D7D5E2',

  // ecosystem
  aquaMint: '#6CF9D8',
  deepMidnight: '#000302',
  skyBlue: '#2AD6E1',
  lavenderPink: '#F5B5FF',
  sunflowerYellow: '#f4d424',
  charcoalBlack: '#1f1f1f',
  neonGreen: '#26D370',
  royalPurple: '#5E1BD6',
  mediumGray: '#888888',
  electricPurple: '#9F37F9',
  vibrantOrange: '#FFA81D',
  goldenYellow: '#FFAB00',
};

const defaultMedia = {
  xs: '(max-width: 652px)',
  sm: `(min-width: 960px )`,
  md: `(min-width: 1280px )`,
  lg: `(min-width: 1400px)`,
  xl: `(min-width: 1600px)`,
  max_1550: `(max-width: 1550px)`,
  max_1400: `(max-width: 1400px)`,
  max_1300: `(max-width: 1300px)`,
  max_1100: `(max-width: 1100px)`,

  max_640: `(max-width: 640px)`,
  xxs_max: `(max-width: ${defaultTokens.breakpoints.xxs})`,
  xs_max: `(max-width: ${defaultTokens.breakpoints.xs})`,
  sm_max: `(max-width: ${defaultTokens.breakpoints.sm})`,
  md_max: `(max-width: ${defaultTokens.breakpoints.md})`,
  lg_max: `(max-width: ${defaultTokens.breakpoints.lg})`,
  xl_max: `(max-width: ${defaultTokens.breakpoints.xl})`,
  xxl_max: `(max-width: ${defaultTokens.breakpoints.xxl})`,

  motion: '(prefers-reduced-motion: reduce)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
};

const defaultUtils = {
  p: (value: Stitches.PropertyValue<'padding'>) => ({
    padding: value,
  }),
  pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
  }),
  pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
    paddingRight: value,
  }),
  pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
    paddingBottom: value,
  }),
  pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
  }),
  px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  m: (value: Stitches.PropertyValue<'margin'>) => ({
    margin: value,
  }),
  mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
    marginTop: value,
  }),
  mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
    marginRight: value,
  }),
  mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
    marginBottom: value,
  }),
  ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
  }),
  mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: Stitches.PropertyValue<'marginTop'>) => ({
    marginTop: value,
    marginBottom: value,
  }),

  bgColor: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
    backgroundColor: value,
  }),

  size: (value: Stitches.PropertyValue<'width'>) => ({
    width: value,
    height: value,
  }),
  bgClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value,
  }),
  bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({ boxShadow: value }),

  dflex: (value: Stitches.PropertyValue<'alignItems'>) => ({
    display: 'flex',
    alignItems: value,
    justifyContent: value,
  }),
  fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({
    flexDirection: value,
  }),
  fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),
  fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
  fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({
    flexShrink: value,
  }),
  fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),

  ai: (value: Stitches.PropertyValue<'alignItems'>) => ({
    alignItems: value,
  }),
  ac: (value: Stitches.PropertyValue<'alignContent'>) => ({
    alignContent: value,
  }),
  as: (value: Stitches.PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
  ji: (value: Stitches.PropertyValue<'justifyItems'>) => ({
    justifyItems: value,
  }),
  jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({
    justifyContent: value,
  }),

  w: (value: Stitches.PropertyValue<'width'>) => ({ width: value }),
  h: (value: Stitches.PropertyValue<'height'>) => ({ height: value }),

  minSize: (value: Stitches.PropertyValue<'minWidth'>) => ({
    minWidth: value,
    minHeight: value,
  }),
  maxSize: (value: Stitches.PropertyValue<'maxWidth'>) => ({
    maxWidth: value,
    maxWeight: value,
  }),
  ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
  oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),

  br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
    borderRadius: value,
  }),
  btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
    borderTopRightRadius: value,
  }),
  bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
    borderBottomRightRadius: value,
  }),
  bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
    borderBottomLeftRadius: value,
  }),
  btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
    borderTopLeftRadius: value,
  }),

  ta: (value: Stitches.PropertyValue<'textAlign'>) => ({ textAlign: value }),
  tt: (value: Stitches.PropertyValue<'textTransform'>) => ({
    textTransform: value,
  }),
  lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
    lineHeight: value,
  }),

  pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
    pointerEvents: value,
  }),
  us: (value: Stitches.PropertyValue<'userSelect'>) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),

  linearGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
    backgroundImage: `linear-gradient(${value})`,
  }),
  textGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
    backgroundImage: `linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '&::selection': {
      WebkitTextFillColor: '$colors$text',
    },
  }),
};

const commonTheme = {
  theme: {
    ...defaultTokens,
    colors: defaultColors,
  },
  media: defaultMedia,
  utils: defaultUtils,
};

export default commonTheme;
