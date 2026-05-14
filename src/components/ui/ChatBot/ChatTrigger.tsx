'use client';
import { SparkIcon } from '@/components/svgs';
import type { TChatTriggerProps } from '@/utils/types';
import { TriggerButton, TriggerWrapper } from './ChatBot.style';

export function ChatTrigger({
  isOpen,
  unreadCount,
  onClick,
}: TChatTriggerProps) {
  return (
    <TriggerWrapper>
      <TriggerButton
        type="button"
        open={isOpen}
        onClick={isOpen ? undefined : onClick}
        aria-label="Open PetConnect AI"
        aria-expanded={isOpen}
      >
        <SparkIcon width={18} height={18} css={{ color: '$white' }} />
        <span>Pet Connect AI</span>
      </TriggerButton>
    </TriggerWrapper>
  );
}
