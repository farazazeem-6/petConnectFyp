import { Box, Button, Flex, ImageWithSkeleton } from "@/components/elements";
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
    width: '$percent$100',
    minWidth: 0,

    '&:hover': {
        transform: 'translateY(-2px)',
    },
});

export const ImageWrapper = styled(Box, {
    position: 'relative',
    width: '$percent$100',
    paddingTop: '$percent$60',
    overflow: 'hidden',
    backgroundColor: '$lightGray',
});

export const AnimalImage = styled(ImageWithSkeleton, {
    position: 'absolute',
    inset: 0,
    width: '$percent$100',
    height: '$percent$100',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
});

export const ContentWrapper = styled(Flex, {
    'defaultVariants': {
        direction: 'column'
    },
    flex: 1,
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
    width: '$percent$100',
    minWidth: 0,
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
    flex: 1,
    boxSizing: 'border-box',
    backgroundColor: '$main !important',
    letterSpacing: '0.04em',
    color: '$white !important',

    '&:hover': {
        backgroundColor: '$darkMain !important',
    },
});

export const AgeBadge = styled('span', {
    display: 'inline-flex',
    alignItems: 'center',
    px: '$px$10',
    py: '$px$2',
    borderRadius: '$radius$lg',
    fontSize: '$px$12',
    fontWeight: '$fontWeight$semibold',
    letterSpacing: '0.03em',
    backgroundColor: '$dimWhite',
    color: '$main',
    border: '1px solid $main',
    whiteSpace: 'nowrap',
});

export const ButtonGroup = styled(Flex, {
    gap: '$px$8',
    width: '$percent$100',
    mt: 'auto',
    flexDirection: 'row',
    alignItems: 'stretch',
    '@xs_max': {
        flexDirection: 'column',
    },
});

export const ViewDetailButton = styled(Button, {
    flex: 1,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$px$6',
    backgroundColor: 'transparent !important',
    color: '$main !important',
    border: '1px solid $main !important',
    letterSpacing: '0.04em',

    '&:hover': {
        backgroundColor: '$dimWhite !important',
    },
});

// ── Owner action row (edit / delete) — only visible in My Listing ─────────────

export const OwnerActionRow = styled(Flex, {
    gap: '$px$6',
    width: '$percent$100',
    flexDirection: 'row',
    borderTop: '1px dashed rgba(160,48,72,0.2)',
    pt: '$px$8',
    mt: 'auto',

    '& button .btn-icon': {
        display: 'none',
    },
    '@md_max': {
        '& button .btn-text': {
            display: 'none',
        },
        '& button .btn-icon': {
            display: 'block',
        }
    }
});

export const EditButton = styled(Button, {
    flex: 1,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$px$6',
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$semibold',
    backgroundColor: 'transparent !important',
    color: '$main !important',
    border: '1px solid $main !important',
    letterSpacing: '0.03em',
    padding: '$px$10 $px$16 !important',

    '&:hover': {
        backgroundColor: '$dimWhite !important',
    },
});

export const DeleteButton = styled(Button, {
    flex: 1,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$px$6',
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$semibold',
    backgroundColor: 'transparent !important',
    color: '$error1 !important',
    border: '1px solid $error1 !important',
    letterSpacing: '0.03em',
    padding: '$px$10 $px$16 !important',

    '&:hover': {
        backgroundColor: 'rgba(220,38,38,0.06) !important',
    },
});

