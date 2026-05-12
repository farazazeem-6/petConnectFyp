'use client';
import { NavPawIcon, WrongIcon } from '@/components/svgs';
import type { TChatTriggerProps } from '@/utils/types';
import { TriggerButton, TriggerWrapper, UnreadBadge, CircularTextSvg } from './ChatBot.style';

export function ChatTrigger({
  isOpen,
  unreadCount,
  onClick,
}: TChatTriggerProps) {
  return (
    <TriggerWrapper>
      {/* Circular text around button */}
      <CircularTextSvg viewBox="0 0 106 106" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            id="circlePath"
            d="M 53, 53 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
            fill="none"
          />
        </defs>
        <text
          fontSize="12"
          fontWeight="600"
          fill="#8b2042"
          letterSpacing="2"
        >
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            CHAT WITH PETCONNECT AI • CHAT WITH PETCONNECT AI •
          </textPath>
        </text>
      </CircularTextSvg>

      <TriggerButton
        type="button"
        open={isOpen}
        onClick={onClick}
        aria-label={isOpen ? 'Close chatbot' : 'Open PetConnect AI'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <WrongIcon width={18} height={18} css={{ color: '$white' }} />
        ) : (
          <NavPawIcon width={24} height={24} css={{ color: '$white' }} />
        )}

        {/* Unread badge — only shown when closed and there are unread messages */}
        {!isOpen && unreadCount && unreadCount > 0 ? (
          <UnreadBadge>{unreadCount > 9 ? '9+' : unreadCount}</UnreadBadge>
        ) : null}
      </TriggerButton>
    </TriggerWrapper>
  );
}
