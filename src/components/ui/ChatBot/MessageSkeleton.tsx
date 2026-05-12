'use client';
import {
  BotAvatarSmall,
  SkeletonBubble,
  SkeletonDot,
  SkeletonDotsRow,
  SkeletonLine,
  SkeletonRow,
} from './ChatBot.style';
import { NavPawIcon } from '@/components/svgs';

export function SkeletonMessage() {
  return (
    <SkeletonRow>
      {/* Bot avatar */}
      <BotAvatarSmall>
        <NavPawIcon width={13} height={13} css={{ color: '$white' }} />
      </BotAvatarSmall>

      {/* Shimmer bubble — mimics a 2-line bot reply like WhatsApp */}
      <SkeletonBubble>
        <SkeletonDotsRow>
          <SkeletonDot delay="0" />
          <SkeletonDot delay="1" />
          <SkeletonDot delay="2" />
        </SkeletonDotsRow>
        <SkeletonLine width="full" />
        <SkeletonLine width="long" />
        <SkeletonLine width="short" />
      </SkeletonBubble>
    </SkeletonRow>
  );
}