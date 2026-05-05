import { slate, blackAlpha, slateDark, green, blue } from './colors';
const lightThemeOpt = {
  colors: {
    appSwitchBackground: '$white',
    appSwitchColor: '$onlyPurple',
    appSwitchColor2: '$gray',
    background:
      'linear-gradient(135deg, #F0FDF4 0%, #D0F0DC 50%, #E8F9EF 100%)',
    lightBg: '$white',
    backgroundContrast: '$accents0',
    threeBarIcon: '#4A2985',
    selectorHover: '#ddd7d7ff',
    profileDropdownBorder: '#e0e7ff',
    //semantic colors
    ...slate,
    ...blackAlpha,
    ...slateDark,
    ...green,
    ...blue,
    // mutate colors if needed
    foreground: '$black',
    // main color schema...
    lighter: '#D9FBE5',
    light: '#2AA952',
    light10: '$success1',
    main: '#a03048',
    dark: '#228B22',
    dark1: '#3EB489',
    // dark: '#2AA952',
    secondry: '#FD2692',
    // ------------
    primaryHeading: '#1C1E21',
    secondryHeading: '#555',

    textOnHover: '#1E7B3D',
    btnHover: '#ECFDF5',
    navBtnHover: '#E4FDF1',

    borderGreen: '#1E7B3D',

    // colors...
    primary: '#1E7B3D',

    // typography colors.
    slateGray: '#667085',
    darkPurple: '#391C6D',
    lightGray: '#FBFBFF',
    lightGrayLine: '#EAE9F1',
    gray: '#EAEBEE',
    grayDark: '#9E9AB6',
    airdropBg: '#D9FFBB',
    lightPurple: '#CFC8FB',
    lightPurple1: '#9F7AE2',
    peach: '#FFC9B2',
    lightYellow: '#FFE68C',
    lightGreen: '#9DEEAF',
    searchInputBg: '#F8F5FF',
    inputBg: 'white',
    modalBg: '$white',
    success: '#38A169',
    borderColor: '#1E7B3D',
    gridIconStroke: '#1E7B3D',
    dropdownBgColor: 'white',
    dropdownBorder: 'white',
    stepperColor: '$white',
    errorColor: '#FF3333',
    darkGreen: '#26D370',
    grayWhite: '#9E9AB6',
    grayOynx: '#9E9AB6',
    whiteOynx: '#ffffff',
    oynxLightGrayLine: '#EAE9F1',
    darkBlueWhite: '#ffffff',
    scrollbarShadow: '#dddddd',
    scrollbarBackground: '#DBDBDB',
    footerTextColor: '#9E9AB6',
    skeletonBaseColor: '#f5f5f7',
    skeletonHighlightColor: '#f0eaea5c',
    cardBgColor: 'white',
    cardBorderColor: '#FF008A',
    cardHoverColor: '#FFF5FA',
    white: '#FFFFFF',
    profileCardBorder: '#e4e5e7',
    authBg: '#f7f8fc',
    white75: 'rgba(255,255,255,0.75)',
    white22: 'rgba(255,255,255,0.22)',
    white12: 'rgba(255,255,255,0.12)',

    // Empty Banner Colors
    bannerBorder: 'rgba(160,48,72,0.35)',
    bannerIconBg: 'rgba(160,48,72,0.1)',


    // Alert Modal Colors
    alertErrorBg: '#FEE2E2',
    alertErrorBorder: '#FCA5A5',
    alertErrorText: '#991B1B',
    alertErrorButton: '#DC2626',

    alertWarningBg: '#FEF3C7',
    alertWarningBorder: '#FCD34D',
    alertWarningText: '#92400E',
    alertWarningButton: '#D97706',

    alertSuccessBg: '#D1FAE5',
    alertSuccessBorder: '#6EE7B7',
    alertSuccessText: '#065F46',
    alertSuccessButton: '#059669',

    alertEditBg: '#F3E8FF',
    alertEditBorder: '#D8B4FE',
    alertEditText: '#6B21A8',
    alertEditButton: '#9333EA',

    alertInfoBg: '#F8FAFC',
    alertInfoBorder: '#E2E8F0',
    alertInfoText: '#334155',
    alertInfoButton: '#3B82F6',

    // Gray scale
    gray1: '#F8F9FA',
    gray2: '#E9ECEF',
    gray3: '#DEE2E6',
    gray4: '#CED4DA',
    gray5: '#ADB5BD',
    gray6: '#6C757D',
    gray7: '#495057',
    gray8: '#343A40',
    gray9: '#212529',
    gray10: '#1A1D20',
    gray11: '#141517',
    gray12: '#0A0B0C',
  },
  gradients: {
    primaryButton: 'linear-gradient(90deg, #1E7B3D, #145F2D)',
    primaryHover: 'linear-gradient(90deg, #145F2D, #0F4723)',
    textualGradient: 'linear-gradient(to top, #3B5323, #B87333)',
    textualGradient2: 'linear-gradient(90deg, #228B22 0%, #DAA520 100%)',
    greenGradient1: 'linear-gradient(to right, #1E7B3D, #3ABF78)',
    greenGradient2: 'linear-gradient(to right, #15803D, #34D399)',
    greenishGradient: 'linear-gradient(to top, #006400, #228B22, #32CD32)',
    profileDropdownBg: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
    bannerGradient: 'linear-gradient(135deg, rgba(160,48,72,0.08) 0%, rgba(160,48,72,0.03) 100%)',
    bannerGradientHover: 'linear-gradient(135deg, rgba(160,48,72,0.12) 0%, rgba(160,48,72,0.05) 100%)',
  },
  opacity: {
    mid: '$ul$0.9',
  },
};

export default lightThemeOpt;
