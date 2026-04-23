import { Box, Button, Flex } from "@/components/elements";
import { styled } from "@/theme";

export const CardRoot = styled(Flex, {
    'defaultVariants': {
        direction: 'column'
    },
    backgroundColor: '$cardBgColor',
    borderRadius: '$radius$xl',
    overflow: 'hidden',
    border: '1px solid $main',
    boxShadow: '$shadows$cardShadow',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    width: '$px$280',

    '&:hover': {
        transform: 'translateY(-2px)',
    },
    '@xs_max': {
        width: '$percent$100',
    },
});

export const ImageWrapper = styled(Box, {
    position: 'relative',
    width: '$percent$100',
    paddingTop: '60%',
    overflow: 'hidden',
    backgroundColor: '$lightGray',
});

export const AnimalImage = styled('img', {
    position: 'absolute',
    inset: 0,
    width: '$percent$100',
    height: '$percent$100',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',

    [`${CardRoot}:hover &`]: {
        transform: 'scale(1.03)',
    },
});

export const ContentWrapper = styled(Flex, {
    'defaultVariants': {
        direction: 'column'
    },
    gap: '$px$10',
    p: '$px$14',
});

export const NameRow = styled(Flex, {
    alignItems: 'flex-start !important',
    justifyContent: 'space-between !important',
    gap: '$px$8',
});

export const NameBlock = styled(Flex, {
    'defaultVariants': {
        direction: 'column'
    },
    gap: '$px$2',
});

export const BadgeRow = styled(Flex, {
    flexWrap: 'wrap !important',
    gap: '$px$6',
});

export const Badge = styled('span', {
    display: 'inline-flex',
    alignItems: 'center',
    px: '$px$10',
    py: '$px$4',
    borderRadius: '$radius$full',
    fontSize: '$fontSize$xxs',
    fontWeight: '$fontWeight$semibold',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    backgroundColor: '$veryLightGreen',
    color: '$dGreen',
    border: '1px solid $borderGreen',
});

export const AdoptButton = styled(Button, {
    width: '$percent$100',
    boxSizing: 'border-box',
    mt: '$px$4',
    backgroundColor: '$main !important',
    letterSpacing: '0.04em',
    color: '$white !important',

    '&:hover': {
        backgroundColor: '$darkMain !important',
    },
});
