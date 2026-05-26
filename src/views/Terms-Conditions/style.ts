import { Box } from "@/components/elements";
import { styled } from "@/theme";

export const TermConditionsWrapper = styled(Box, {
    width: '$percent$100',
    boxSizing: 'border-box',
    mx: 'auto',
    py: '$rem$2',
    px: '$px$100',
    display: 'flex',
    flexDirection: 'column',
    gap: '$px$40',

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
})