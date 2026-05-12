'use client';

import {
  BotAvatarSmall,
  Bubble,
  BubbleCol,
  MessageRow,
  Timestamp,
  UserAvatarSmall,
} from './ChatBot.style';

import { NavPawIcon, UserIcon } from '@/components/svgs';
import { useTypewriter } from '@/hooks/useTypewriter';
import type { TMessageBubbleProps } from '@/utils/types';

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ── Bot bubble content ─────────────────────────────────────────────
function BotBubbleContent({
  content,
  isLatest,
}: {
  content: string;
  isLatest: boolean;
}) {
  const safeContent = String(content ?? '');

  // Always pass real content to hook
  const { displayedText } = useTypewriter(safeContent, 22);

  // Latest bot message gets typing animation
  if (isLatest) {
    return <>{displayedText || ''}</>;
  }

  // Older messages render instantly
  return <>{safeContent}</>;
}

export function MessageBubble({
  message,
  isLatestBotMessage,
}: TMessageBubbleProps) {
  const isBot = message.role === 'assistant';

  const safeMessageContent = String(message.content ?? '');

  return (
    <MessageRow role={message.role}>
      {/* Bot avatar */}
      {isBot && (
        <BotAvatarSmall>
          <NavPawIcon width={13} height={13} css={{ color: '$white' }} />
        </BotAvatarSmall>
      )}

      <BubbleCol role={message.role}>
        <Bubble role={message.role}>
          {isBot ? (
            <BotBubbleContent
              content={safeMessageContent}
              isLatest={isLatestBotMessage}
            />
          ) : (
            safeMessageContent
          )}
        </Bubble>

        <Timestamp as="span" role={message.role}>
          {formatTime(new Date())}
        </Timestamp>
      </BubbleCol>

      {/* User avatar */}
      {!isBot && (
        <UserAvatarSmall>
          <UserIcon width={13} height={13} css={{ color: '$white' }} />
        </UserAvatarSmall>
      )}
    </MessageRow>
  );
}
