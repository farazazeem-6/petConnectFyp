import { Box, Flex } from "@/components/elements";
import { styled } from "@/theme";

export const StepperNavRoot = styled('nav', {
    display: 'flex !important',
    alignItems: 'center !important',
    width: '$percent$100',
    marginBottom: '$px$24',
    overflowX: 'auto',
    '&::-webkit-scrollbar': { display: 'none' },
    scrollbarWidth: 'none',
});

export const StepperItem = styled(Flex, {
    'defaultVariants': {
        align: 'center'
    },
    '&:not(:last-child)': {
        flex: 1,
    },
});

export const StepButton = styled('button', {
    display: 'flex !important',
    alignItems: 'center !important',
    gap: '$px$8',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: '$slateGray',
    fontFamily: 'inherit',
    transition: 'color $normal',
    whiteSpace: 'nowrap',

    '&:disabled': {
        cursor: 'default',
    },

    variants: {
        isActive: {
            true: {
                color: '$main',
            },
        },
        isDone: {
            true: {
                color: '$main',
            },
        },
    },
});

export const StepCircle = styled('span', {
    width: '$px$36',
    height: '$px$36',
    borderRadius: '$radius$lg',
    border: '$px$2 solid $lightGrayLine',
    background: '$white',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$bold',
    color: '$slateGray',
    flexShrink: 0,
    transition: 'background 0.22s ease, border-color 0.22s ease, color 0.22s ease',

    variants: {
        status: {
            pending: {
            },
            active: {
                background: '$main',
                borderColor: '$main',
                color: '$white',
                boxShadow: '0 4px 12px rgba(160,48,72,0.22)',
            },
            done: {
                background: '$main',
                borderColor: '$main',
                color: '$white',
            },
            error: {
                background: '$error',
                borderColor: '$error',
                color: '$white',
            },
        },
    },

    defaultVariants: {
        status: 'pending',
    },
});

export const StepLabels = styled('span', {
    display: 'flex !important',
    flexDirection: 'column !important',
    textAlign: 'left',
    '@sm_max': {
        display: 'none !important',
    },
});

export const StepLabel = styled('span', {
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$semibold',
    lineHeight: 1.3,
});

export const StepSublabel = styled('span', {
    fontSize: '$fontSize$xs',
    color: '$slateGray',
    marginTop: '1px',
});

export const StepConnector = styled(Box, {
    flex: 1,
    height: '2.5px',
    background: '$lightGrayLine',
    margin: '0 $px$10',
    borderRadius: '$radius$full',
    transition: 'background 0.3s ease',
    flexShrink: 0,

    variants: {
        done: {
            true: {
                background: '$main',
            },
        },
    },
});

export const StepperControlsRoot = styled(Flex, {
    'defaultVariants': {
        align: 'center',
        justify: 'between'
    },
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'space-between !important',
    marginTop: '$px$24',
    paddingTop: '$px$20',
    borderTop: '1px solid $lightGrayLine',
    gap: '$px$12',
});

export const StepProgress = styled('span', {
    fontSize: '$fontSize$xs',
    color: '$slateGray',
    fontWeight: '$fontWeight$medium',
    flexShrink: 0,
});

export const ButtonGroup = styled(Flex, {
    gap: '$px$10',
    display: 'flex !important',
    alignItems: 'center !important',
});

export const Button = styled('button', {
    height: '$px$42',
    padding: '0 $px$24',
    borderRadius: '$radius$full',
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$medium',
    fontFamily: 'inherit',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'background 0.18s ease, opacity 0.18s ease, transform 0.15s ease',
    display: 'inline-flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    gap: '$px$6',
    letterSpacing: '0.01em',

    '&:active': {
        transform: 'scale(0.97)',
    },
    '&:disabled': {
        opacity: 0.38,
        cursor: 'default',
        transform: 'none',
    },

    variants: {
        variant: {
            secondary: {
                background: 'transparent',
                borderColor: '$main',
                color: '$main',

                '&:hover:not(:disabled)': {
                    background: '$dimWhite',
                },
            },
            primary: {
                background: '$main',
                borderColor: '$main',
                color: '$white',

                '&:hover:not(:disabled)': {
                    background: '$darkMain',
                    borderColor: '$darkMain',
                },
            },
        },
    },

    defaultVariants: {
        variant: 'secondary',
    },
});