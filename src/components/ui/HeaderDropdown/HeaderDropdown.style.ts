import { Box, Flex } from '@/components/elements'
import { fadeIn, styled } from '@/theme'

export const UserSection = styled(Flex, {
    'defaultVariants': {
        align: 'center',
    },
    gap: '$px$10',
    cursor: 'pointer',
})

export const PopoverContent = styled(Box, {
    'position': 'absolute',
    'top': '$px$50',
    'right': '$px$5',
    'width': '$px$200',
    'minWidth': '$px$200',
    'borderRadius': '$px$10',
    'boxShadow': '$popupBoxShadow',
    'background': '$gradients$profileDropdownBg',
    'py': '$px$10',
    'px': '$px$10',
    'border': '1px solid $profileDropdownBorder',
    boxSizing: 'border-box',
    'zIndex': 320,
    'animation': `${fadeIn} 0.25s ease`,
    'transition': 'background 0.2s ease',
})

export const PopoverItem = styled(Box, {
    'padding': '$px$ $px$16',
    'cursor': 'pointer',
    'borderBottom': '1px solid $gray',
    'color': '$main',
    'fontWeight': '$fontWeight$medium',
    'borderRadius': 8,
    'py': '$px$8',
    'px': '$px$12',
    'mb': 4,
    'display': 'flex',
    'alignItems': 'center',
    'transition': 'background 0.18s',
    '&:hover': {
        background: '$homeDropdownBg',
    },
})