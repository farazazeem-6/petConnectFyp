import { Box, Flex } from "@/components/elements";
import { styled } from "@/theme";

// ── Nav bar ──────────────────────────────────────────────────────
export const StepperNavRoot = styled('nav', {
    display: 'flex',
    alignItems: 'center',
    width: '$percent$100',
    marginBottom: '$px$8',
});

export const StepperItem = styled(Flex, {
    'defaultVariants': {
        align: 'center'
    },
    // All items stretch equally except the last one
    '&:not(:last-child)': {
        flex: 1,
    },
});

// ── Step trigger button ──────────────────────────────────────────
export const StepButton = styled('button', {
    display: 'flex',
    alignItems: 'center',
    gap: '$px$3',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: '$textMuted',
    fontFamily: 'inherit',
    transition: 'color $normal',

    '&:disabled': {
        cursor: 'default',
    },

    // Active variant — text becomes dark
    variants: {
        isActive: {
            true: {
                color: '$text',
            },
        },
    },
});

// ── Number / check circle ────────────────────────────────────────
export const StepCircle = styled('span', {
    width: '$px$32',
    height: '$px$32',
    borderRadius: '$full',
    border: '1.5px solid $border',
    background: '$bgWhite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$semibold',
    color: '$textFaint',
    flexShrink: 0,
    transition: 'background $normal, border-color $normal, color $normal',

    variants: {
        status: {
            pending: {
                // default styles above
            },
            active: {
                background: '$main',
                borderColor: '$white',
                color: '$white',
            },
            done: {
                background: '$success',
                borderColor: '$success',
                color: '$successText',
            },
            error: {
                background: '$error',
                borderColor: '$error',
                color: '$errorText',
            },
        },
    },

    defaultVariants: {
        status: 'pending',
    },
});

// ── Step label text ──────────────────────────────────────────────
export const StepLabels = styled('span', {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
});

export const StepLabel = styled('span', {
    fontSize: '$fontSize$sm',
    fontWeight: '$fontWeight$medium',
    lineHeight: 1.3,
});

export const StepSublabel = styled('span', {
    fontSize: '$fontSize$xs',
    color: '$textFaint',
    marginTop: '1px',
});

// ── Connector line between steps ─────────────────────────────────
export const StepConnector = styled(Box, {
    flex: 1,
    height: '1.5px',
    background: '$borderLight',
    margin: '0 $3',
    transition: 'background $normal',

    variants: {
        done: {
            true: {
                background: '$success',
            },
        },
    },
});

// ── Bottom controls row ───────────────────────────────────────────
export const StepperControlsRoot = styled(Flex, {
    'defaultVariants': {
        align: 'center',
        justify: 'between'
    },
    marginTop: '$px$6',
    paddingTop: '$px$5',
    borderTop: '1px solid $borderLight',
});

export const StepProgress = styled('span', {
    fontSize: '$fontSize$xs',
    color: '$textFaint',
});

export const ButtonGroup = styled(Flex, {
    gap: '$px$3',
});

// ── Buttons ───────────────────────────────────────────────────────
export const Button = styled('button', {
    height: '$px$38',
    padding: '0 $px$5',
    borderRadius: '$md',
    fontSize: '$fontSize$lg',
    fontWeight: '$fontWeight$medium',
    fontFamily: 'inherit',
    cursor: 'pointer',
    border: '1.5px solid transparent',
    transition: 'background $fast, opacity $fast',

    '&:active': {
        transform: 'scale(0.97)',
    },
    '&:disabled': {
        opacity: 0.4,
        cursor: 'default',
        transform: 'none',
    },

    variants: {
        variant: {
            // Outlined back button
            secondary: {
                background: '$bgWhite',
                borderColor: '$border',
                color: '$text',

                '&:hover:not(:disabled)': {
                    background: '$bgHover',
                },
            },
            // Solid primary continue/submit button
            primary: {
                background: '$primary',
                borderColor: '$primary',
                color: '$primaryText',

                '&:hover:not(:disabled)': {
                    background: '$primaryHover',
                },
            },
        },
    },

    defaultVariants: {
        variant: 'secondary',
    },
});