import { keyframes, styled } from '@/theme/stitches.config';
import { Box } from '@/components/elements/Box';
import { Flex } from '@/components/elements/Flex';
import { Text } from '@/components/elements/Text';

// ── Keyframes ─────────────────────────────────────────────────────────────────

const slideUpSheet = keyframes({
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
});

const fadeInOverlay = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
});

const scaleInModal = keyframes({
    from: { opacity: 0, transform: 'scale(0.96) translateY(8px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' },
});

const shimmerPulse = keyframes({
    '0%, 100%': { boxShadow: '0 0 0 0 rgba(139, 32, 66, 0.4)' },
    '55%': { boxShadow: '0 0 0 8px rgba(139, 32, 66, 0)' },
});

// ── Modal overlay ─────────────────────────────────────────────────────────────

export const ModalOverlay = styled(Box, {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(3px)',
    zIndex: '$ul$1000',
    animation: `${fadeInOverlay} 0.25s ease`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '$px$20',

    // On mobile: snap to bottom like a drawer
    '@md_max': {
        alignItems: 'flex-end',
        padding: 0,
    },
});

// ── Modal / bottom-sheet panel ────────────────────────────────────────────────

export const ModalPanel = styled(Box, {
    backgroundColor: '$white',
    borderRadius: '$radius$xl',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: `${scaleInModal} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)`,

    // On mobile: slide up from bottom, full width, rounded top corners only
    '@md_max': {
        borderRadius: '$radius$xl $radius$xl 0 0',
        maxWidth: '100%',
        maxHeight: '92dvh',
        animation: `${slideUpSheet} 0.32s cubic-bezier(0.4, 0, 0.2, 1)`,
    },
});

// ── Mobile drawer handle ──────────────────────────────────────────────────────

export const DrawerHandle = styled(Box, {
    display: 'none',
    '@md_max': {
        display: 'flex',
        justifyContent: 'center',
        padding: '$px$12 0 $px$4',
        flexShrink: 0,
    },
});

export const DrawerHandleBar = styled(Box, {
    width: '36px',
    height: '4px',
    borderRadius: '$radius$full',
    backgroundColor: '$lightGrayLine',
});

// ── Modal header ──────────────────────────────────────────────────────────────

export const ModalHeader = styled(Flex, {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '$px$20 $px$24 $px$16',
    borderBottom: '1px solid $lightGrayLine',
    flexShrink: 0,

    '@md_max': {
        padding: '$px$10 $px$20 $px$14',
    },
});

export const ModalTitle = styled(Text, {
    fontSize: '$rem$1_12',
    fontWeight: '$fontWeight$bold',
    color: '$main',
    display: 'flex',
    alignItems: 'center',
    gap: '$px$8',
});

export const CloseButton = styled('button', {
    all: 'unset',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '$radius$full',
    transition: 'background 0.15s ease',
    flexShrink: 0,
    '&:hover': { backgroundColor: '$colorGray' },
});

// ── Progress bar ──────────────────────────────────────────────────────────────

export const ProgressBarWrapper = styled(Box, {
    padding: '$px$14 $px$24 0',
    flexShrink: 0,
    '@md_max': { padding: '$px$12 $px$20 0' },
});

export const ProgressTrack = styled(Box, {
    height: '4px',
    backgroundColor: '$lightGrayLine',
    borderRadius: '$radius$full',
    overflow: 'hidden',
});

export const ProgressFill = styled(Box, {
    height: '100%',
    backgroundColor: '$main',
    borderRadius: '$radius$full',
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
});

export const ProgressLabel = styled(Text, {
    fontSize: '$rem$0_75',
    color: '$slateGray',
    marginTop: '$px$6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

// ── Scrollable body ───────────────────────────────────────────────────────────

export const ModalBody = styled(Box, {
    flex: 1,
    overflowY: 'auto',
    padding: '$px$20 $px$24',

    '&::-webkit-scrollbar': { width: '4px' },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
    '&::-webkit-scrollbar-thumb': {
        background: '$lightGrayLine',
        borderRadius: '$radius$full',
    },

    '@md_max': { padding: '$px$16 $px$20' },
});

// ── Question & hint text ──────────────────────────────────────────────────────

export const QuestionText = styled(Text, {
    fontSize: '$rem$1_06',
    fontWeight: '$fontWeight$bold',
    color: '$textPrimary',
    marginBottom: '$px$4',
    lineHeight: 1.35,
});

export const HintText = styled(Text, {
    fontSize: '$rem$0_81',
    color: '$slateGray',
    marginBottom: '$px$16',
});

// ── Column layout ─────────────────────────────────────────────────────────────

export const OptionColumn = styled(Box, {
    display: 'flex',
    flexDirection: 'column',
    gap: '$px$8',
});

export const OptionRow = styled('button', {
    all: 'unset',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '$px$12',
    padding: '$px$12 $px$14',
    border: '1.5px solid $lightGrayLine',
    borderRadius: '$radius$lg',
    backgroundColor: '$white',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease, background 0.15s ease, transform 0.12s ease',

    '&:hover': {
        borderColor: '$main',
        backgroundColor: '$dimWhite',
        transform: 'translateX(2px)',
    },

    variants: {
        selected: {
            true: {
                borderColor: '$main',
                backgroundColor: '#c9f4ceff',
                '&:hover': { transform: 'none' },
            },
        },
    },
});

export const OptionIconWrapper = styled(Box, {
    width: '40px',
    height: '40px',
    borderRadius: '$radius$md',
    backgroundColor: '$colorGray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.15s ease',

    variants: {
        selected: {
            true: { backgroundColor: '$main' },
        },
    },
});

export const OptionLabel = styled(Text, {
    fontSize: '$rem$0_93',
    fontWeight: '$fontWeight$semibold',
    color: '$textPrimary',
    display: 'block',
    variants: {
        selected: { true: { color: '$main' } },
    },
});

export const OptionDescription = styled(Text, {
    fontSize: '$rem$0_75',
    color: '$slateGray',
    display: 'block',
    variants: {
        selected: { true: { color: '#1e4817ff' } },
    },
});

export const CheckIconWrapper = styled(Box, {
    marginLeft: 'auto',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

// ── Grid layout ───────────────────────────────────────────────────────────────

export const OptionGrid = styled(Box, {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '$px$8',
});

export const OptionCard = styled('button', {
    all: 'unset',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '$px$8',
    padding: '$px$16 $px$8 $px$14',
    border: '1.5px solid $lightGrayLine',
    borderRadius: '$radius$lg',
    backgroundColor: '$white',
    textAlign: 'center',
    boxSizing: 'border-box',
    width: '100%',
    transition: 'border-color 0.15s ease, background 0.15s ease, transform 0.12s ease',

    '&:hover': {
        borderColor: '$main',
        backgroundColor: '$dimWhite',
        transform: 'translateY(-2px)',
    },

    variants: {
        selected: {
            true: {
                borderColor: '$main',
                backgroundColor: '#3c6b33ff',
                '&:hover': { transform: 'none' },
            },
        },
    },
});

export const CardIconWrapper = styled(Box, {
    width: '48px',
    height: '48px',
    borderRadius: '$radius$md',
    backgroundColor: '$colorGray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s ease',

    variants: {
        selected: {
            true: { backgroundColor: '$main' },
        },
    },
});

export const CardLabel = styled(Text, {
    fontSize: '$rem$0_87',
    fontWeight: '$fontWeight$semibold',
    color: '$textPrimary',
    variants: {
        selected: { true: { color: '$main' } },
    },
});

// ── Tags layout ───────────────────────────────────────────────────────────────

export const TagsWrap = styled(Box, {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '$px$8',
});

export const TagChip = styled('button', {
    all: 'unset',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '$px$6',
    padding: '$px$8 $px$14',
    border: '1.5px solid $lightGrayLine',
    borderRadius: '$radius$full',
    fontSize: '$rem$0_81',
    fontWeight: '$fontWeight$medium',
    color: '$textPrimary',
    backgroundColor: '$white',
    whiteSpace: 'nowrap',
    transition: 'border-color 0.15s ease, background 0.15s ease, transform 0.12s ease',

    '&:hover': {
        borderColor: '$main',
        backgroundColor: '$dimWhite',
        transform: 'scale(1.03)',
    },

    variants: {
        selected: {
            true: {
                borderColor: '$main',
                backgroundColor: '#c9f4ceff',
                color: '$main',
                '&:hover': { transform: 'none' },
            },
        },
    },
});

// ── Step dots ─────────────────────────────────────────────────────────────────

export const StepDots = styled(Flex, {
    justifyContent: 'center',
    gap: '$px$6',
    paddingTop: '$px$20',
});

export const StepDot = styled(Box, {
    width: '6px',
    height: '6px',
    borderRadius: '$radius$full',
    backgroundColor: '$lightGrayLine',
    transition: 'background 0.2s ease, width 0.2s ease',

    variants: {
        active: {
            true: {
                backgroundColor: '$main',
                width: '18px',
                borderRadius: '3px',
            },
        },
    },
});

// ── Footer nav ────────────────────────────────────────────────────────────────

export const ModalFooter = styled(Flex, {
    alignItems: 'center',
    gap: '$px$10',
    padding: '$px$16 $px$24 $px$20',
    borderTop: '1px solid $lightGrayLine',
    flexShrink: 0,
    '@md_max': { padding: '$px$12 $px$20 $px$20' },
});

export const BackButton = styled('button', {
    all: 'unset',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '$px$6',
    padding: '$px$10 $px$18',
    border: '1.5px solid $lightGrayLine',
    borderRadius: '$radius$full',
    fontSize: '$rem$0_87',
    fontWeight: '$fontWeight$semibold',
    color: '$slateGray',
    transition: 'border-color 0.15s ease, background 0.15s ease',
    flexShrink: 0,

    '&:hover': {
        borderColor: '$main',
        color: '$main',
        backgroundColor: '$dimWhite',
    },
});

export const NextButton = styled('button', {
    all: 'unset',
    cursor: 'pointer',
    flex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$px$8',
    padding: '$px$12 $px$20',
    backgroundColor: '$main',
    color: '$white',
    borderRadius: '$radius$full',
    fontSize: '$rem$0_87',
    fontWeight: '$fontWeight$bold',
    boxShadow: '$shadows$ctaShadow',
    transition: 'background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease',

    '&:hover': {
        backgroundColor: '$darkMain',
        boxShadow: '$shadows$ctaShadow',
        transform: 'translateY(-1px)',
    },
    '&:active': { transform: 'translateY(0)' },

    variants: {
        disabled: {
            true: {
                opacity: 0.45,
                cursor: 'not-allowed',
                '&:hover': {
                    transform: 'none',
                    backgroundColor: '$main',
                    boxShadow: '$shadows$ctaShadow',
                },
            },
        },
    },
});

// ── Smart Match trigger button (in BrowsePets action bar) ─────────────────────

export const SmartMatchButton = styled('button', {
    all: 'unset',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '$px$8',
    padding: '$px$10 $px$20',
    border: '2px solid $main',
    color: '$main',
    borderRadius: '$radius$full',
    fontSize: '$rem$0_87',
    fontWeight: '$fontWeight$bold',
    lineHeight: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    animation: `${shimmerPulse} 2.4s ease-in-out infinite`,
    transition: 'background 0.2s ease, color 0.2s ease, transform 0.12s ease, box-shadow 0.2s ease',

    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background:
            'linear-gradient(120deg, transparent 0%, rgba(65, 112, 71, 0.07) 50%, transparent 100%)',
        transform: 'translateX(-100%)',
        transition: 'transform 0.4s ease',
    },

    '&:hover': {
        backgroundColor: '$main',
        color: '$white',
        transform: 'translateY(-1px)',
        boxShadow: '$shadows$ctaShadow',
        animation: 'none',
        '&::before': { transform: 'translateX(100%)' },
    },

    '&:active': { transform: 'translateY(0)' },
});

// ── Smart Match result banner (replaces count text when active) ───────────────

export const SmartMatchBanner = styled(Flex, {
    alignItems: 'center',
    gap: '$px$8',
    flexWrap: 'wrap',
});

export const SmartMatchLabel = styled(Text, {
    fontSize: '$rem$0_87',
    fontWeight: '$fontWeight$semibold',
    color: '$main',
    display: 'flex',
    alignItems: 'center',
    gap: '$px$6',
});

export const ClearMatchButton = styled('button', {
    all: 'unset',
    cursor: 'pointer',
    fontSize: '$rem$0_75',
    color: '$slateGray',
    borderBottom: '1px dashed $slateGray',
    lineHeight: 1.2,
    transition: 'color 0.15s ease, border-color 0.15s ease',
    '&:hover': { color: '$main', borderColor: '$main' },
});