import { DialogContent, DialogFooter, Text, Button } from '@/components/elements'
import { Flex } from '@/components/elements'
import { slideUpAndFade, styled } from '@/theme'

export const AlertDialogContent = styled(DialogContent, {
    'width': '420px',
    'minHeight': '220px',           // ✅ Fixed: prevents modal from collapsing too short
    'maxWidth': '90vw',
    'borderRadius': '$radius$xl',
    'boxShadow': '$shadows$cardShadow2',
    'transition': 'all 0.3s ease',
    'animation': `1.5s ${slideUpAndFade} ease-out`,
    'padding': '$px$30',
    'paddingBottom': '$px$0',       // ✅ Fixed: footer manages its own bottom spacing
    'boxSizing': 'border-box',
    'overflow': 'visible',          // ✅ Fixed: was missing — prevents clipping of sticky/visible children
    '@sm_max': {
        width: '100vw',
        maxWidth: '100vw',
        borderRadius: '$radius$none',
        padding: '$px$12',
        paddingBottom: '$px$0',
        maxHeight: '100dvh',
        overflowY: 'auto',
    },

    'variants': {
        type: {
            error: {
                border: '1px solid $alertErrorBorder',
                background: '$alertErrorBg',
                color: '$alertErrorText',
            },
            warning: {
                border: '1px solid $alertWarningBorder',
                background: '$alertWarningBg',
                color: '$alertWarningText',
            },
            success: {
                border: '1px solid $alertSuccessBorder',
                background: '$alertSuccessBg',
                color: '$alertSuccessText',
            },
            edit: {
                border: '1px solid $alertEditBorder',
                background: '$alertEditBg',
                color: '$alertEditText',
            },
            info: {
                border: '1px solid $alertInfoBorder',
                background: '$alertInfoBg',
                color: '$alertInfoText',
            },
        },
    },
    'defaultVariants': {
        type: 'info',
    },
})

export const IconContainer = styled(Flex, {
    alignItems: 'center !important',
    justifyContent: 'center !important',
    mb: '$px$20',
    fontSize: '$fontSize$display',
})

export const ContentWrapper = styled(Flex, {
    width: '100%',
    flexDirection: 'column !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    px: '$0',
    variants: {
        hasSubtitle: {
            true: {
                gap: '$px$12',
            },
            false: {
                gap: '$px$0',
            },
        },
    },
})

export const SubtitleText = styled(Text, {
    'fontWeight': '$fontWeight$normal !important',
    'maxWidth': '400px',
    'width': '100%',
    'textAlign': 'center',
    'lineHeight': '$lineHeight$1.4',
    'wordBreak': 'break-word',
    '@xs_max': {
        fontSize: '$fontSize$18',
        maxWidth: '100%',
    },
})

export const TitleText = styled(Text, {
    'fontWeight': '$fontWeight$bold !important',
    'maxWidth': '400px',
    'width': '100%',
    'textAlign': 'center',
    'wordBreak': 'break-word',
    '@xs_max': {
        fontSize: '$fontSize$14 !important',
        maxWidth: '100%',
    },
})

export const AlertFooter = styled(DialogFooter, {
    'mt': '$px$24',
    'mb': '$px$16',
    'gap': '$px$12',
    'justifyContent': 'center',
    'flexWrap': 'nowrap',
    'position': 'relative',         // ✅ Fixed: was `sticky` which breaks inside overflow:hidden parents
    'bottom': 'unset',              // ✅ Fixed: reset sticky bottom offset
    'zIndex': 'unset',              // ✅ Fixed: no longer needs elevated z-index
    '@xs_max': {
        gap: '$px$8',
        mt: '$px$16',
        mb: '$px$8',
    },
    'variants': {
        type: {
            error: {
                background: '$alertErrorBg',
            },
            warning: {
                background: '$alertWarningBg',
            },
            success: {
                background: '$alertSuccessBg',
            },
            edit: {
                background: '$alertEditBg',
            },
            info: {
                background: '$alertInfoBg',
            },
        },
    },
    'defaultVariants': {
        type: 'info',
    },
})

export const CancelButton = styled(Button, {
    width: '130px !important',
    variants: {
        type: {
            error: {
                'color': '$alertErrorText !important',
                'border': '1px solid $alertErrorText !important',
                'background': '$alertErrorBg !important',
                '&:hover': {
                    background: '$alertErrorBg !important',
                    color: '$alertErrorText !important',
                },
            },
            warning: {
                'color': '$alertWarningText !important',
                'border': '1px solid $alertWarningText !important',
                'background': '$alertWarningBg !important',
                '&:hover': {
                    background: '$alertWarningBg !important',
                    color: '$alertWarningText !important',
                },
            },
            success: {
                'color': '$alertSuccessText !important',
                'border': '1px solid $alertSuccessText !important',
                'background': '$alertSuccessBg !important',
                '&:hover': {
                    background: '$alertSuccessBg !important',
                    color: '$alertSuccessText !important',
                },
            },
            edit: {
                'color': '$alertEditText !important',
                'border': '1px solid $alertEditText !important',
                'background': '$alertEditBg !important',
                '&:hover': {
                    background: '$alertEditBg !important',
                    color: '$alertEditText !important',
                },
            },
            info: {
                'color': '$alertInfoText !important',
                'border': '1px solid $main !important',
                'background': '$alertInfoBg !important',
                '&:hover': {
                    background: '$alertInfoBg !important',
                    color: '$alertInfoText !important',
                },
            },
        },
    },
    defaultVariants: {
        type: 'info',
    },
})

export const AcceptButton = styled(Button, {
    width: '130px !important',

    variants: {
        type: {
            error: {
                'color': '$white !important',
                'background': '$alertErrorButton !important',
                '&:hover': {
                    background: '$alertErrorButton !important',
                    color: '$white !important',
                },
            },
            warning: {
                'color': '$white !important',
                'background': '$alertWarningButton !important',
                '&:hover': {
                    background: '$alertWarningButton !important',
                    color: '$white !important',
                },
            },
            success: {
                'color': '$white !important',
                'background': '$alertSuccessButton !important',
                '&:hover': {
                    background: '$alertSuccessButton !important',
                    color: '$white !important',
                },
            },
            edit: {
                'color': '$white !important',
                'background': '$alertEditButton !important',
                '&:hover': {
                    background: '$alertEditButton !important',
                    color: '$white !important',
                },
            },
            info: {
                'color': '$white !important',
                'background': '$main !important',
                '&:hover': {
                    background: '$main !important',
                    color: '$white !important',
                },
            },
        },
    },
    defaultVariants: {
        type: 'info',
    },
})