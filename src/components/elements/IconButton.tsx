import { styled } from '@/theme/stitches.config'

export const IconButton = styled('button', {
  'display': 'inline-flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'position': 'relative',
  'boxSizing': 'border-box',
  'backgroundColor': 'transparent',
  'outline': 0,
  'border': 0,
  'margin': 0,
  'padding': 0,
  'cursor': 'pointer',
  'userSelect': 'none',
  'verticalAlign': 'middle',
  'appearance': 'none',
  'textDecoration': 'none',
  'color': 'inherit',
  'fontFamily': 'inherit',

  'textAlign': 'center',
  'flex': '0 0 auto',
  'fontSize': '1.5rem',
  'borderRadius': '50%',
  'overflow': 'visible',
  'transition': 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  'WebkitTapHighlightColor': 'transparent',

  // Focus styles
  '&:focus-visible': {
    outline: '2px solid #1976d2',
    outlineOffset: '2px',
  },

  // Hover styles
  '&:hover': {
    'backgroundColor': 'rgba(0, 0, 0, 0.04)',
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },

  // Active/pressed state
  '&:active': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },

  '&:disabled': {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, 0.26)',
    cursor: 'default',
    pointerEvents: 'none',
  },

  // Icon styling - preserve original SVG colors
  'svg': {
    userSelect: 'none',
    width: '$width$18',
    height: '$height$18',
    display: 'inline-block',
    flexShrink: 0,
    fontSize: 'inherit',
    color: '$secondryHeading',
  },

  // Ripple effect container (for future implementation)
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },

  'variants': {
    size: {
      small: {
        padding: '5px',
        fontSize: '1.125rem', // 18px
      },
      medium: {
        padding: '8px',
        fontSize: '1.5rem', // 24px
      },
      large: {
        padding: '12px',
        fontSize: '1.75rem', // 28px
      },
    },
    color: {
      inherit: {
        color: 'inherit',
      },
      default: {
        'color': 'rgba(0, 0, 0, 0.54)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        '&:active': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
      primary: {
        'color': '#1976d2',
        '&:hover': {
          backgroundColor: 'rgba(25, 118, 210, 0.04)',
        },
        '&:active': {
          backgroundColor: 'rgba(25, 118, 210, 0.08)',
        },
      },
      secondary: {
        'color': '#dc004e',
        '&:hover': {
          backgroundColor: 'rgba(220, 0, 78, 0.04)',
        },
        '&:active': {
          backgroundColor: 'rgba(220, 0, 78, 0.08)',
        },
      },
      error: {
        'color': '#d32f2f',
        '&:hover': {
          backgroundColor: 'rgba(211, 47, 47, 0.04)',
        },
        '&:active': {
          backgroundColor: 'rgba(211, 47, 47, 0.08)',
        },
      },
      info: {
        'color': '#0288d1',
        '&:hover': {
          backgroundColor: 'rgba(2, 136, 209, 0.04)',
        },
        '&:active': {
          backgroundColor: 'rgba(2, 136, 209, 0.08)',
        },
      },
      success: {
        'color': '#2e7d32',
        '&:hover': {
          backgroundColor: 'rgba(46, 125, 50, 0.04)',
        },
        '&:active': {
          backgroundColor: 'rgba(46, 125, 50, 0.08)',
        },
      },
      warning: {
        'color': '#ed6c02',
        '&:hover': {
          backgroundColor: 'rgba(237, 108, 2, 0.04)',
        },
        '&:active': {
          backgroundColor: 'rgba(237, 108, 2, 0.08)',
        },
      },
    },
    edge: {
      start: {
        'marginLeft': '-12px',
        '&[data-size="small"]': {
          marginLeft: '-3px',
        },
      },
      end: {
        'marginRight': '-12px',
        '&[data-size="small"]': {
          marginRight: '-3px',
        },
      },
    },
    disableRipple: {
      true: {
        '&::after': {
          display: 'none',
        },
      },
    },
  },

  'compoundVariants': [
    {
      size: 'small',
      edge: 'start',
      css: {
        marginLeft: '-3px',
      },
    },
    {
      size: 'small',
      edge: 'end',
      css: {
        marginRight: '-3px',
      },
    },
  ],

  'defaultVariants': {
    size: 'medium',
    color: 'default',
  },
})
