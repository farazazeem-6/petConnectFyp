import { blackAlpha, blue, green, slate, slateDark } from './colors';

const darkThemeOpt = {
  colors: {
    appSwitchBackground: '#20232D',
    appSwitchColor: '$white',
    appSwitchColor2: '#785EDF',
    background:
      'linear-gradient(135deg, #1c1f26 0%, #121620 50%, #0a0f14 100%)',
    lightBg: '#20232D',
    backgroundContrast: '$accents0',
    threeBarIcon: '$white',
    selectorHover: '#ddd7d7ff',
    //semantic colors
    ...slateDark,
    ...blackAlpha,
    ...slate,
    ...green,
    ...blue,
    // mutate colors if needed
    foreground: '$white',
    // main color schema...
    lighter: '#D9FBE5',
    light: '#2AA952',
    light10: '#1F5233',
    main: '#a03048',
    dark: '#196619',
    dark1: '#2E8B57',
    secondry: '#FD2692',
    borderGreen: '#1E7B3D',
    // ------------

    primaryHeading: '#F1F2F6',
    secondryHeading: '#A3A3A3',

    textOnHover: '#E4FDF1',
    navBtnHover: '#E4FDF1',
    btnHover: '#0B3C2C',
    jetBlack: '#1C1E21',
    onlyGreen: '#A8E6CF',
    darkPurple: '#391C6D',
    lightGray: '#FBFBFF',
    lightGrayLine: '#575758',
    gray: '#1C1E21',
    grayDark: '#575758',
    airdropBg: '#3B3B3B',
    airdropBtnGray: '#9E9AB6',
    lightPurple: '#CFC8FB',
    lightPurple1: '#9F7AE2',
    peach: '#FFC9B2',
    lightYellow: '#FFE68C',
    lightGreen: '#9DEEAF',
    searchInputBg: '#2C2F3A',
    inputBg: '#2C2F3A',
    modalBg: '#1C2730',
    success: '#38A169',
    borderColor: '#FFFFFF4D',
    gridIconStroke: '#1E7B3D',
    errorColor: '#940000',
    darkGreen: '#1B9E55',
    grayWhite: '#ffffff',
    grayOynx: '#353945',
    whiteOynx: '#353945',
    oynxLightGrayLine: '#353945',
    darkBlueWhite: '#20232D',
    scrollbarShadow: '#36454f',
    scrollbarBackground: 'gray',
    dropdownBgColor: '#20232D',
    dropdownBorder: '#353945',

    cardBgColor: '#20232D',
    cardBorderColor: '#ffffff',
    cardHoverColor: '#2A2D38',

    authBg: '#121620',

    gradientButtonBorder: 'transparent',
    footerTextColor: '#575758',
    skeletonBaseColor: '#2d2f3a',
    skeletonHighlightColor: '#f5f5f51a',

    // Empty Banner Colors
    bannerBorder: 'rgba(160,48,72,0.4)',
    bannerIconBg: 'rgba(160,48,72,0.15)',


    // Alert Modal Colors
    alertErrorBg: '#450A0A',
    alertErrorBorder: '#7F1D1D',
    alertErrorText: '#FECACA',
    alertErrorButton: '#DC2626',

    alertWarningBg: '#451A03',
    alertWarningBorder: '#78350F',
    alertWarningText: '#FDE68A',
    alertWarningButton: '#D97706',

    alertSuccessBg: '#022C22',
    alertSuccessBorder: '#064E3B',
    alertSuccessText: '#A7F3D0',
    alertSuccessButton: '#059669',

    alertEditBg: '#2E1065',
    alertEditBorder: '#4C1D95',
    alertEditText: '#E9D5FF',
    alertEditButton: '#9333EA',

    alertInfoBg: '#1E293B',
    alertInfoBorder: '#334155',
    alertInfoText: '#CBD5E1',
    alertInfoButton: '#3B82F6',

    // Gray scale
    gray1: '#1A1D20',
    gray2: '#212529',
    gray3: '#343A40',
    gray4: '#495057',
    gray5: '#6C757D',
    gray6: '#ADB5BD',
    gray7: '#CED4DA',
    gray8: '#DEE2E6',
    gray9: '#E9ECEF',
    gray10: '#F8F9FA',
    gray11: '#F8F9FA',
    gray12: '#FFFFFF',
  },
  gradients: {
    primaryButton: 'linear-gradient(90deg, #0F4E29, #0B3A1F)',
    primaryHover: 'linear-gradient(90deg, #0A3A1B, #062C16)',
    textualGradient: 'linear-gradient(to top, #A4C28C, #E6A97D)',
    textualGradient2: 'linear-gradient(90deg, #228B22 0%, #DAA520 100%)',
    greenGradient1: 'linear-gradient(to right, #1E7B3D, #3ABF78)',
    greenGradient2: 'linear-gradient(to right, #15803D, #34D399)',
    greenishGradient: 'linear-gradient(to top, #006400, #228B22, #32CD32)',
    bannerGradient: 'linear-gradient(135deg, rgba(160,48,72,0.15) 0%, rgba(160,48,72,0.05) 100%)',
    bannerGradientHover: 'linear-gradient(135deg, rgba(160,48,72,0.2) 0%, rgba(160,48,72,0.08) 100%)',
  },
  opacity: {
    mid: '$ul$0.5',
  },
};

export default darkThemeOpt;
