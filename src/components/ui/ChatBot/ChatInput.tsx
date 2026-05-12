'use client';
import React, { useCallback, useRef, useState } from 'react';
import { ChatTextarea, InputArea, SendButton } from './ChatBot.style';
import { SendIcon } from '@/components/svgs';
import type { TChatInputProps } from '@/utils/types';

export function ChatInput({
  onSend,
  isFetching,
  placeholder,
}: TChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isFetching) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, isFetching, onSend]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      // Auto-grow
      const el = e.target;
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const isEmpty = value.trim().length === 0;
  const isDisabled = isEmpty || isFetching;

  return (
    <InputArea>
      <ChatTextarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={isFetching ? 'Waiting for reply...' : placeholder}
        rows={1}
        aria-label="Type your message"
        disabled={isFetching}
      />
      <SendButton
        type="button"
        aria-label="Send message"
        disabled={isDisabled}
        onClick={isDisabled ? undefined : handleSend}
      >
        <SendIcon width={16} height={16} css={{ color: '$white' }} />
      </SendButton>
    </InputArea>
  );
}
