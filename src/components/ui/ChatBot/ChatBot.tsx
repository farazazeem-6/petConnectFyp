'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { ChatTrigger } from './ChatTrigger';
import {
  ChatWindow,
  ErrorBanner,
  ErrorText,
  MessagesBody,
  SuggestionChip,
  SuggestionChipsRow,
  WelcomeAvatar,
  WelcomeBody,
  WelcomeHeading,
  WelcomeWrap,
} from './ChatBot.style';
import { CHATBOT_DEFAULTS } from '@/constants';
import { useChatVet } from '@/hooks/useChatVet';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { closeChatBot, toggleChatBot } from '@/store/global/chatBotSlice';
import { NavPawIcon, AlertIcon } from '@/components/svgs';
import type { TChatbotProps } from '@/utils/types';
import type { RootState } from '@/store';
import { SkeletonMessage } from './MessageSkeleton';
import { Box } from '@/components/elements';

const SUGGESTION_CHIPS = [
  'Best pets for apartments?',
  'How to adopt a dog?',
  'Cat vs dog for families?',
  'Pet vaccination schedule',
];

export function Chatbot({
  botName = CHATBOT_DEFAULTS.botName,
  placeholder = CHATBOT_DEFAULTS.placeholder,
}: TChatbotProps) {
  const dispatch = useAppDispatch();
  const isOpen = useSelector<RootState, boolean>(
    (state) => state.chatBot.isOpen,
  );
  const [unreadCount, setUnreadCount] = useState(0);

  // ── Hook is always alive — never unmounts — so messages persist ───────────
  const { messages, isFetching, error, sendMessage, resetChat } = useChatVet();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ── Auto-scroll to bottom on new messages / skeleton ─────────────────────
  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isFetching, isOpen]);

  // ── Track unread bot replies received while chat is closed ────────────────
  const previousMessageLength = useRef(0);

  useEffect(() => {
    const hasNewMessage = messages.length > previousMessageLength.current;

    if (!isOpen && hasNewMessage) {
      const lastMessage = messages[messages.length - 1];

      if (lastMessage?.role === 'assistant') {
        setUnreadCount((c) => c + 1);
      }
    }

    previousMessageLength.current = messages.length;
  }, [messages, isOpen]);

  const handleToggle = useCallback(() => {
    dispatch(toggleChatBot());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(closeChatBot());
  }, [dispatch]);

  const handleReset = useCallback(() => {
    resetChat();
    setUnreadCount(0);
  }, [resetChat]);

  // ── Last bot message index — only that one gets the typewriter effect ─────
  const lastBotMessageIndex = messages.reduce(
    (lastIdx, msg, idx) => (msg.role === 'assistant' ? idx : lastIdx),
    -1,
  );

  const hasMessages = messages.length > 0;

  return (
    <>
      <ChatTrigger
        isOpen={isOpen}
        unreadCount={unreadCount}
        onClick={handleToggle}
      />

      {/*
        ── ChatWindow is ALWAYS mounted, never conditionally rendered.
           The `hidden` variant uses visibility/opacity/pointerEvents instead
           of unmounting, so useChatVet state (messages, session) is preserved
           across open/close cycles.
      ──────────────────────────────────────────────────────────────────────── */}
      <ChatWindow
        hidden={!isOpen}
        role="dialog"
        aria-modal={isOpen}
        aria-label="PetConnect AI chatbot"
      >
        <ChatHeader
          botName={botName}
          onReset={handleReset}
          onClose={handleClose}
        />

        <MessagesBody>
          {/* Welcome / empty state */}
          {!hasMessages && (
            <WelcomeWrap>
              <WelcomeAvatar>
                <NavPawIcon width={28} height={28} css={{ color: '$white' }} />
              </WelcomeAvatar>
              <WelcomeHeading as="p">
                {CHATBOT_DEFAULTS.welcomeHeading}
              </WelcomeHeading>
              <WelcomeBody as="p">{CHATBOT_DEFAULTS.welcomeBody}</WelcomeBody>
              <SuggestionChipsRow>
                {SUGGESTION_CHIPS.map((chip) => (
                  <SuggestionChip
                    key={chip}
                    type="button"
                    onClick={() => sendMessage(chip)}
                  >
                    {chip}
                  </SuggestionChip>
                ))}
              </SuggestionChipsRow>
            </WelcomeWrap>
          )}

          {/* Messages */}
          {messages.map((message, idx) => (
            <MessageBubble
              key={message.content}
              message={message}
              isLatestBotMessage={
                message.role === 'assistant' && idx === lastBotMessageIndex
              }
            />
          ))}

          {/* Skeleton while fetching */}
          {isFetching && <SkeletonMessage />}

          {/* Error banner */}
          {error && (
            <ErrorBanner>
              <AlertIcon width={14} height={14} css={{ color: '#dc2626' }} />
              <ErrorText as="p">{error}</ErrorText>
            </ErrorBanner>
          )}

          <Box ref={messagesEndRef} />
        </MessagesBody>

        <ChatInput
          onSend={sendMessage}
          isFetching={isFetching}
          placeholder={placeholder}
        />
      </ChatWindow>
    </>
  );
}
