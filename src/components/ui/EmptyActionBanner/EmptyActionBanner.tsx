import React from 'react';
import { Text } from '@/components/elements';
import {
  BannerWrapper,
  IconRing,
  ContentBox,
  ActionPill,
} from './EmptyActionBanner.style';

export type EmptyActionBannerProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  icon: React.ReactNode;
  buttonIcon?: React.ReactNode;
  onClick: () => void;
  id?: string;
};

export function EmptyActionBanner({
  title,
  subtitle,
  buttonText,
  icon,
  buttonIcon,
  onClick,
  id,
}: EmptyActionBannerProps) {
  return (
    <BannerWrapper as="button" type="button" onClick={onClick} id={id}>
      <IconRing>{icon}</IconRing>

      <ContentBox>
        <Text
          heading="h3"
          css={{
            color: '$main',
            fontWeight: '$fontWeight$bold',
            lineHeight: 1.3,
            textAlign: 'center !important',
          }}
        >
          {title}
        </Text>
        <Text
          heading="h8"
          css={{
            color: '$slateGray',
            lineHeight: 1.6,
            textAlign: 'center !important',
          }}
        >
          {subtitle}
        </Text>
      </ContentBox>

      <ActionPill variant={'default'} as="div">
        {buttonIcon}
        {buttonText}
      </ActionPill>
    </BannerWrapper>
  );
}
