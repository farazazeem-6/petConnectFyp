'use client';
import React from 'react';
import {
  BotAvatarLarge,
  BotNameText,
  ChatHeader as StyledHeader,
  HeaderActions,
  HeaderIconBtn,
  HeaderLeft,
  HeaderTextBlock,
  OnlineDot,
  StatusLabel,
  StatusRow,
} from './ChatBot.style';
import { NavPawIcon, ResetIcon, WrongIcon } from '@/components/svgs';
import type { TChatHeaderProps } from '@/utils/types';

export function ChatHeader({ botName, onReset, onClose }: TChatHeaderProps) {
  return (
    <StyledHeader>
      <HeaderLeft>
        <BotAvatarLarge>
          <NavPawIcon width={20} height={20} css={{ color: '$white' }} />
        </BotAvatarLarge>

        <HeaderTextBlock>
          <BotNameText as="p">{botName}</BotNameText>
          <StatusRow>
            <OnlineDot />
            <StatusLabel as="span">Online · Always here</StatusLabel>
          </StatusRow>
        </HeaderTextBlock>
      </HeaderLeft>

      <HeaderActions>
        <HeaderIconBtn
          type="button"
          aria-label="Start new conversation"
          title="New conversation"
          onClick={onReset}
        >
          <ResetIcon width={16} height={16} css={{ color: 'inherit' }} />
        </HeaderIconBtn>

        <HeaderIconBtn
          type="button"
          aria-label="Close chatbot"
          onClick={onClose}
        >
          <WrongIcon width={20} height={20} css={{ color: 'inherit' }} />
        </HeaderIconBtn>
      </HeaderActions>
    </StyledHeader>
  );
}
