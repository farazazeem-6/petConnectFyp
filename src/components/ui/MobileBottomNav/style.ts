import { Box } from '@/components/elements'
import { styled } from '@/theme'

export const MobileBottomNavContainer = styled(Box, {
    'position': 'fixed',
    'bottom': 0,
    'left': 0,
    'right': 0,
    'zIndex': 100,
    'background': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    'borderTop': '1px solid #e2e8f0',
    'padding': '$px$8 $px$12 $px$12',
    'boxShadow': '0 -4px 20px rgba(0, 0, 0, 0.08)',
    'backdropFilter': 'blur(10px)',
    'display': 'none',

    '@sm_max': {
        display: 'block',
    },
})

export const NavItem = styled(Box, {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'borderRadius': '$radius$sm',
    'cursor': 'pointer',
    'transition': 'all 0.2s ease',
    'position': 'relative',
    'minWidth': '$px80',
    'flex': 1,
    'maxWidth': '80px',
    'WebkitTapHighlightColor': 'transparent',

    '&:hover': {
        transform: 'translateY(-1px)',
    },

    '&:focus': {
        outline: 'none',
    },

    '&:active': {
        transform: 'translateY(0)',
    },

    'variants': {
        active: {
            true: {},
        },
    },
})

export const NavItemIcon = styled(Box, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '$px$2',

    variants: {
        active: {
            true: {
                transform: 'scale(1.1)',
            },
        },
    },
})

export const NavItemLabel = styled('span', {
    fontSize: '$px$10',
    fontWeight: '$fontWeight$semibold',
    textAlign: 'center',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '$percent$100',

    variants: {
        active: {
            true: {
                color: '$main',
                fontWeight: '$fontWeight$semibold',
            },
            false: {
                color: '$secondryHeading',
            },
        },
    },
})
