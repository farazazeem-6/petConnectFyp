import { Box, Flex, Text } from '@/components/elements';
import { keyframes, styled } from '@/theme';

// ── Keyframes ─────────────────────────────────────────────────────────────────

export const slideUpIn = keyframes({
  from: { opacity: 0, transform: 'translateY(20px) scale(0.96)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

export const fadeScaleIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.85)' },
  '70%': { transform: 'scale(1.04)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const messageFadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(6px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const shimmer = keyframes({
  '0%': { backgroundPosition: '-400px 0' },
  '100%': { backgroundPosition: '400px 0' },
});

export const dotBounce = keyframes({
  '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.35 },
  '30%': { transform: 'translateY(-5px)', opacity: 1 },
});

// ── Trigger ───────────────────────────────────────────────────────────────────

export const TriggerWrapper = styled(Box, {
  position: 'fixed',
  bottom: '$px$24',
  right: '$px$24',
  zIndex: '$ul$900',
  '@sm_max': { bottom: '$px$60', right: '$px$12' },
});

export const TriggerButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  borderRadius: '$radius$md',
  backgroundColor: '$main',
  display: 'flex',
  alignItems: 'center',
  gap: '$px$8',
  padding: '$px$12 $px$16',
  boxShadow: '$shadows$ctaShadow',
  transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
  color: '$white',
  fontWeight: '$fontWeight$bold',
  fontSize: '$rem$0_87',
  position: 'relative',
  '&:hover': {
    backgroundColor: '$darkMain',
    transform: 'translateY(-2px)',
  },
  '&:active': { transform: 'translateY(0)' },
  variants: {
    open: {
      true: {
        cursor: 'default',
        opacity: 0.9,
        '&:hover': {
          transform: 'none',
        },
      },
    },
  },
});

// ── Chat window ───────────────────────────────────────────────────────────────

export const ChatWindow = styled(Box, {
  position: 'fixed',
  bottom: '100px',
  right: '$px$24',
  width: '340px',
  height: '450px',
  backgroundColor: '$white',
  borderRadius: '$radius$xl',
  boxShadow: '0 12px 48px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  overscrollBehavior: 'contain',
  zIndex: '$ul$900',
  border: '1px solid $lightGrayLine',
  animation: `${slideUpIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`,
  transition: 'opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease',

  '@md_max': {
    right: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '78dvh',
    borderRadius: '$radius$xl $radius$xl 0 0',
    animation: `${slideUpIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
  },

  // Always mounted — hidden variant uses visibility/opacity NOT unmount
  // so useChatVet state (messages, sessionStorage) survives open/close
  variants: {
    hidden: {
      true: {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        transform: 'translateY(12px) scale(0.97)',
      },
    },
  },
});

// ── Header ────────────────────────────────────────────────────────────────────

export const ChatHeader = styled(Flex, {
  alignItems: 'center !important',
  justifyContent: 'space-between !important',
  padding: '$px$12 $px$16',
  background: '$main',
  flexShrink: 0,
  gap: '$px$10',
});

export const HeaderLeft = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$10',
  flex: 1,
  minWidth: 0,
});

export const BotAvatarLarge = styled(Box, {
  width: '38px',
  height: '38px',
  borderRadius: '$radius$full',
  backgroundColor: 'rgba(255,255,255,0.18)',
  border: '1.5px solid rgba(255,255,255,0.35)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const HeaderTextBlock = styled(Box, {
  minWidth: 0,
  flex: 1,
});

export const BotNameText = styled(Text, {
  fontSize: '$rem$0_87 !important',
  fontWeight: '$fontWeight$bold',
  color: '$white !important',
  display: 'block',
  lineHeight: 1.2,
});

export const StatusRow = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$5',
  marginTop: '$px$2',
});

export const OnlineDot = styled(Box, {
  width: '6px',
  height: '6px',
  borderRadius: '$radius$full',
  backgroundColor: '#4ade80',
  flexShrink: 0,
});

export const StatusLabel = styled(Text, {
  fontSize: '$rem$0_68 !important',
  color: 'rgba(255,255,255,0.78) !important',
  lineHeight: 1,
});

export const HeaderActions = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$2',
  flexShrink: 0,
});

export const HeaderIconBtn = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  width: '30px',
  height: '30px',
  borderRadius: '$radius$full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255,255,255,0.75)',
  transition: 'background 0.15s ease, color 0.15s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '$white',
  },
});

// ── Messages scroll area ──────────────────────────────────────────────────────

export const MessagesBody = styled(Box, {
  flex: 1,
  overflowY: 'auto',
  padding: '$px$14 $px$12 $px$8',
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$8',
  backgroundColor: '#f8f4f5',
  overscrollBehavior: 'contain',
  '&::-webkit-scrollbar': { width: '3px' },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: '$lightGrayLine',
    borderRadius: '$radius$full',
  },
});

// ── Message row ───────────────────────────────────────────────────────────────

export const MessageRow = styled(Flex, {
  alignItems: 'flex-end !important',
  gap: '$px$6',
  animation: `${messageFadeIn} 0.22s ease`,
  variants: {
    role: {
      user: { justifyContent: 'flex-end !important' },
      assistant: { justifyContent: 'flex-start !important' },
    },
  },
});

// ── Avatars ───────────────────────────────────────────────────────────────────

export const BotAvatarSmall = styled(Box, {
  width: '28px',
  height: '28px',
  borderRadius: '$radius$full',
  background: 'linear-gradient(135deg, $main 0%, #166f3bff 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  alignSelf: 'flex-end',
});

export const UserAvatarSmall = styled(Box, {
  width: '28px',
  height: '28px',
  borderRadius: '$radius$full',
  backgroundColor: '$slateGray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  alignSelf: 'flex-end',
});

// ── Bubble ────────────────────────────────────────────────────────────────────

export const BubbleCol = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '78%',
  variants: {
    role: {
      user: { alignItems: 'flex-end' },
      assistant: { alignItems: 'flex-start' },
    },
  },
});

export const Bubble = styled(Box, {
  padding: '$px$8 $px$12',
  borderRadius: '$radius$lg',
  fontSize: '$rem$0_81',
  lineHeight: 1.55,
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  variants: {
    role: {
      user: {
        background: 'linear-gradient(135deg, $main 0%, #15663aff 100%)',
        color: '$white',
        borderRadius: '$radius$lg',
        borderBottomRightRadius: '$radius$xs',
      },
      assistant: {
        backgroundColor: '$white',
        color: '$textPrimary',
        border: '1px solid $lightGrayLine',
        borderRadius: '$radius$lg',
        borderBottomLeftRadius: '$radius$xs',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      },
    },
  },
});

export const Timestamp = styled(Text, {
  fontSize: '$rem$0_62 !important',
  color: '$slateGray !important',
  marginTop: '$px$3',
  lineHeight: 1,
  variants: {
    role: {
      user: { textAlign: 'right' },
      assistant: { textAlign: 'left' },
    },
  },
});

// ── Skeleton ──────────────────────────────────────────────────────────────────

export const SkeletonRow = styled(Flex, {
  alignItems: 'flex-end !important',
  gap: '$px$6',
  justifyContent: 'flex-start',
  animation: `${messageFadeIn} 0.22s ease`,
});

export const SkeletonBubble = styled(Box, {
  backgroundColor: '$white',
  border: '1px solid $lightGrayLine',
  borderRadius: '$radius$lg',
  borderBottomLeftRadius: '$radius$xs',
  padding: '$px$10 $px$14',
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$6',
  minWidth: '140px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
});

export const SkeletonLine = styled(Box, {
  height: '10px',
  borderRadius: '$radius$full',
  background: 'linear-gradient(90deg, #f0e8ea 25%, #f9f2f4 50%, #f0e8ea 75%)',
  backgroundSize: '400px 100%',
  animation: `${shimmer} 1.4s ease-in-out infinite`,
  variants: {
    width: {
      full: { width: '100%' },
      long: { width: '85%' },
      mid: { width: '65%' },
      short: { width: '45%' },
    },
  },
});

export const SkeletonDotsRow = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$4',
  marginTop: '$px$2',
});

export const SkeletonDot = styled(Box, {
  width: '5px',
  height: '5px',
  borderRadius: '$radius$full',
  backgroundColor: '#d4b8bf',
  variants: {
    delay: {
      '0': { animation: `${dotBounce} 1.1s ease-in-out infinite` },
      '1': { animation: `${dotBounce} 1.1s ease-in-out 0.18s infinite` },
      '2': { animation: `${dotBounce} 1.1s ease-in-out 0.36s infinite` },
    },
  },
});

// ── Error banner ──────────────────────────────────────────────────────────────

export const ErrorBanner = styled(Flex, {
  alignItems: 'center !important',
  gap: '$px$8',
  padding: '$px$8 $px$12',
  backgroundColor: '#fff5f5',
  border: '1px solid #fecaca',
  borderRadius: '$radius$md',
  margin: '0 $px$4',
  animation: `${messageFadeIn} 0.2s ease`,
});

export const ErrorText = styled(Text, {
  fontSize: '$rem$0_75 !important',
  color: '#dc2626 !important',
  flex: 1,
});

// ── Welcome state ─────────────────────────────────────────────────────────────

export const WelcomeWrap = styled(Flex, {
  flexDirection: 'column !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
  flex: 1,
  gap: '$px$10',
  padding: '$px$24 $px$20',
  textAlign: 'center',
});

export const WelcomeAvatar = styled(Box, {
  width: '56px',
  height: '56px',
  borderRadius: '$radius$full',
  background: 'linear-gradient(135deg, #187e3fff 0%, #1c824aff 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '$px$4',
  animation: `${fadeScaleIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
});

export const WelcomeHeading = styled(Text, {
  fontSize: '$rem$0_93 !important',
  fontWeight: '$fontWeight$bold',
  color: '$main !important',
  display: 'block !important',
});

export const WelcomeBody = styled(Text, {
  fontSize: '$rem$0_75 !important',
  color: '$slateGray !important',
  lineHeight: 1.55,
  display: 'block',
});

export const SuggestionChipsRow = styled(Flex, {
  flexWrap: 'wrap !important',
  justifyContent: 'center !important',
  gap: '$px$6',
  marginTop: '$px$4',
});

export const SuggestionChip = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  padding: '$px$6 $px$12',
  borderRadius: '$radius$full',
  fontSize: '$rem$0_75',
  color: '$white',
  backgroundColor: '$main',
  transition: 'background 0.15s ease, border-color 0.15s ease',
  lineHeight: 1.3,
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '$main',
    color: '$white',
    borderColor: '$main',
  },
});

// ── Input area ────────────────────────────────────────────────────────────────

export const InputArea = styled(Flex, {
  alignItems: 'flex-end !important',
  gap: '$px$8',
  padding: '$px$10 $px$12',
  borderTop: '1px solid $lightGrayLine',
  backgroundColor: '$white',
  flexShrink: 0,
});

export const ChatTextarea = styled('textarea', {
  flex: 1,
  resize: 'none',
  border: '1.5px solid $lightGrayLine',
  borderRadius: '$radius$lg',
  padding: '$px$2 $px$12',
  fontSize: '$rem$0_81',
  lineHeight: 1.5,
  fontFamily: 'inherit',
  color: '$textPrimary',
  backgroundColor: '$colorGray',
  outline: 'none',
  minHeight: '35px',
  maxHeight: '35px',
  transition: 'border-color 0.15s ease, background 0.15s ease',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  '&::placeholder': { color: '$slateGray' },
  '&:focus': { borderColor: '$main', backgroundColor: '$white' },
  '&:disabled': { opacity: 0.55, cursor: 'not-allowed' },
  '&::-webkit-scrollbar': { width: '3px' },
  '&::-webkit-scrollbar-thumb': {
    background: '$lightGrayLine',
    borderRadius: '$radius$full',
  },
});

export const SendButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  width: '38px',
  height: '38px',
  borderRadius: '$radius$full',
  background: '$main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
  '&:hover': {
    transform: 'scale(1.08)',
  },
  '&:active': { transform: 'scale(0.94)' },
  variants: {
    disabled: {
      true: {
        opacity: 0.4,
        cursor: 'not-allowed',
        boxShadow: 'none',
        '&:hover': { transform: 'none', boxShadow: 'none' },
      },
    },
  },
});
