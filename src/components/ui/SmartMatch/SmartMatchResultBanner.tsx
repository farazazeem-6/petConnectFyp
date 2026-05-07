'use client';
import React from 'react';
import { Text } from '@/components/elements';
import { SparkIcon } from '@/components/svgs';
import type { TSmartMatchResultBannerProps } from '@/utils/types';
import {
  ClearMatchButton,
  SmartMatchBanner,
  SmartMatchLabel,
} from './style';

export function SmartMatchResultBanner({
  matchedTags,
  resultCount,
  onClear,
}: TSmartMatchResultBannerProps) {
  return (
    <SmartMatchBanner>
      <SmartMatchLabel as="p">
        <SparkIcon width={14} height={14} css={{ color: '$main' }} />
        {resultCount === 0
          ? 'No smart matches found'
          : `${resultCount} smart match${resultCount !== 1 ? 'es' : ''}`}
      </SmartMatchLabel>

      {matchedTags.length > 0 && (
        <Text as="span" css={{ fontSize: '$rem$0_75', color: '$slateGray' }}>
          based on {matchedTags.length} trait
          {matchedTags.length !== 1 ? 's' : ''}
        </Text>
      )}

      <ClearMatchButton
        type="button"
        onClick={onClear}
        aria-label="Clear smart match results"
      >
        Clear match
      </ClearMatchButton>
    </SmartMatchBanner>
  );
}
