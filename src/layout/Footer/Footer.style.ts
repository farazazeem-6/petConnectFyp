import { Box, Flex, Text, Button } from '@/components/elements';
import { styled } from '@/theme';

export const FooterWrapper = styled(Box, {
    width: '$percent$100',
    boxSizing: 'border-box',
    background: '$main',
    borderRadius: '$radius$xl $radius$xl 0 0',
    pt: '$px$50',
    pb: '$px$24',
    px: '$px$60',

    '@lg_max': {
        px: '$px$40',
    },
    '@md_max': {
        px: '$px$24',
        pt: '$px$40',
    },
    '@sm_max': {
        px: '$px$20',
        pt: '$px$36',
        borderRadius: '$radius$lg $radius$lg 0 0',
    },
});

export const FooterTopRow = styled(Flex, {
    width: '$percent$100',
    gap: '$px$40',
    alignItems: 'flex-start !important',
    justifyContent: 'space-between !important',
    pb: '$px$40',

    '@md_max': {
        flexDirection: 'column !important',
        gap: '$px$36',
        alignItems: 'center !important',
    },
});

// ---- Left column: logo + address + socials ----

export const FooterLeftCol = styled(Flex, {
    flexDirection: 'column !important',
    gap: '$px$16',
    flex: '1',
    maxWidth: '$px$320',
    minWidth: '$px$200',

    '@md_max': {
        maxWidth: '$percent$100',
        width: '$percent$100',
        alignItems: 'center !important',
        textAlign: 'center',
    },
});

export const FooterLogoWrapper = styled(Box, {
    mb: '$px$4',
});

export const FooterAddressBlock = styled(Flex, {
    flexDirection: 'column !important',
    gap: '$px$4',

    '@md_max': {
        alignItems: 'center !important',
    },
});

export const FooterAddressLine = styled(Text, {
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$normal',
    color: '$dimWhite !important',
    lineHeight: '1.6 !important',
    opacity: '0.9',
});

// ---- Social icons row ----

export const FooterSocialRow = styled(Flex, {
    gap: '$px$16',
    alignItems: 'center !important',
    mt: '$px$4',

    '@md_max': {
        justifyContent: 'center !important',
    },
});

export const FooterSocialLink = styled('a', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$dimWhite !important',

    opacity: '0.9',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',

    '&:hover': {
        opacity: '1',
        transform: 'translateY(-2px)',
    },

    '& svg': {
        width: '$px$22',
        height: '$px$22',
    },
});

// ---- Middle column: Quick Links ----

export const FooterMiddleCol = styled(Flex, {
    flexDirection: 'column !important',
    gap: '$px$16',
    flex: '1',
    minWidth: '$px$180',

    '@md_max': {
        width: '$percent$100',
        alignItems: 'center !important',
        textAlign: 'center',
    },
});

export const FooterColHeading = styled(Text, {
    fontSize: '$fontSize$lg',
    fontWeight: '$fontWeight$bold',
    color: '$white !important',
    mb: '$px$4',
});

export const FooterLinksList = styled(Flex, {
    flexDirection: 'column !important',
    gap: '$px$12',

    '@md_max': {
        alignItems: 'center !important',
    },
});

export const FooterLink = styled('a', {
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$normal',
    color: '$white !important',
    opacity: '0.9',
    textDecoration: 'none',
    cursor: 'pointer',
    width: 'fit-content',
    position: 'relative',
    transition: 'color 0.15s',

    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '1px',
        backgroundColor: '$white',
        transition: 'width 0.4s ease',
    },

    '&:hover': {
        opacity: '1',
        '&::after': {
            width: '$percent$100',
        },
    },
});

// ---- Right column: Newsletter ----

export const FooterRightCol = styled(Flex, {
    flexDirection: 'column !important',
    gap: '$px$16',
    flex: '1',
    maxWidth: '$px$380',
    minWidth: '$px$200',

    '@md_max': {
        maxWidth: '$px$380',
        alignItems: 'center !important',
        textAlign: 'center',
    },
});

export const FooterNewsletterDescription = styled(Text, {
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$normal',
    color: '$dimWhite !important',
    lineHeight: '1.6 !important',
    opacity: '0.9',
});

// ---- Subscribe row: input + button visually separated ----

export const FooterSubscribeRow = styled(Flex, {
    alignItems: 'stretch !important',
    width: '$percent$100',
    gap: '$px$8',
    boxSizing: 'border-box',

    '@sm_max': {
        gap: '$px$10',
    },
});

export const FooterEmailInput = styled('input', {
    flex: '1',
    border: '1px solid $backgroundDisabledSlot',
    outline: 'none',
    px: '$px$16',
    py: '$px$12',
    fontSize: '$fontSize$md',
    fontWeight: '$fontWeight$normal',
    color: '$black',
    background: 'white',
    br: '$radius$md',
    minWidth: '0',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',

    '&::placeholder': {
        color: '$secondryHeading',
        opacity: '0.55',
    },

    '&:focus': {
        borderColor: '$white',
        outline: 'none',
    },

    '@sm_max': {
        width: '$percent$100',
    },
});

export const FooterSubscribeButton = styled(Button, {
    defaultVariants: {
        variant: 'default',
    },
    background: '$white !important',
    color: '$main !important',
    border: 'none !important',
    br: '$radius$md !important',
    fontSize: '$fontSize$sm !important',
    fontWeight: '$fontWeight$bold !important',
    cursor: 'pointer',
    flexShrink: '0',
    transition: 'opacity 0.2s ease',
    whiteSpace: 'nowrap',

    '&:hover': {
        opacity: '0.9 !important',
    },

    '@sm_max': {
        width: '$percent$20',
    },
});

export const FooterSubscribeForm = styled('form', {
    display: 'flex',
    alignItems: 'stretch',
    width: '$percent$100',
    gap: '$px$8',
    boxSizing: 'border-box',
    margin: '0',

});
export const FooterSubscribeNote = styled(Text, {
    fontSize: '$fontSize$xs',
    color: '$white !important',
    mt: '-$px$4',

    variants: {
        isSuccess: {
            true: { opacity: '1' },
            false: { opacity: '0.7' },
        },
    },

    defaultVariants: { isSuccess: false },
});

// ---- Divider ----

export const FooterDivider = styled(Box, {
    width: '$percent$100',
    height: '1px',
    background: '$white',
    opacity: '0.25',
});

// ---- Copyright row ----

export const FooterBottomRow = styled(Flex, {
    width: '$percent$100',
    alignItems: 'center !important',
    justifyContent: 'flex-start !important',
    pt: '$px$24',

    '@md_max': {
        justifyContent: 'center !important',
    },
});

export const FooterCopyright = styled(Text, {
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$normal',
    color: '$dimWhite !important',
    opacity: '0.85',
});