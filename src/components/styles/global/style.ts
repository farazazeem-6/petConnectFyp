import { Box, Text } from "@/components/elements";
import { styled } from "@/theme";
import { fadeSlideIn } from "@/views/Profile";

export const MainHeading = styled(Text, {
    fontSize: '$fontSize$display',
    fontWeight: '$fontWeight$black',
    color: '$black !important',
    lineHeight: '1 !important',

    '@md_max': {
        fontSize: '$fontSize$xxxl',
    },
    '@sm_max': {
        fontSize: '$px$22',
    },
});

export const MainSubHeading = styled(Text, {
    fontSize: '$fontSize$md',
    fontWeight: '$fontWeight$light',
    color: '$secondryHeading !important',
    textAlign: 'center',
    mt: '$px$8',
    mb: '$px$40',

    '@md_max': {
        mb: '$px$32',
    },
    '@sm_max': {
        fontSize: '$fontSize$sm',
        mb: '$px$24',
    },
});

export const scrollStyle = {
    '&::-webkit-scrollbar': {
        paddingRight: '$space$15',
        width: '5px',
        height: '5px',
    },
    '&::-webkit-scrollbar-track': {
        my: '$space$5',
        background: 'transparent',
        boxShadow: 'inset 0 0 5px $colors$scrollbarShadow',
        borderRadius: '$radius$20',
        borderLeft: '1.5px solid transparent',
        borderRight: '1.5px solid transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '$colors$scrollbarBackground',
        borderRadius: '$radius$20',
    },
}

export const RoutePageWrapper = styled(Box, {
    width: '$percent$100',
    boxSizing: 'border-box',
    mx: 'auto',
    py: '$rem$2',
    px: '$px$100',
    animation: `${fadeSlideIn} 0.25s ease`,
    display: 'flex',
    flexDirection: 'column',
    gap: '$px$20',
    '@lg_max': {
        px: '$px$70',
    },

    '@md_max': {
        px: '$px$50',
        py: '$rem$1_5',
    },

    '@sm_max': {
        px: '$px$10',
    },
});