import { Box } from "@/components/elements";
import { styled } from "@/theme";
import { fadeSlideIn } from "../Profile";

export const FavouritesWrapper = styled(Box, {
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
export const FavouriteContent = styled(Box, {

})