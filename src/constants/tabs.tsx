import React from 'react';
import { PawIcon, SearchIcon, LocationIcon } from '@/components/svgs';
import { ReportTypeFilter } from '@/utils/types';
import { messages } from './messages';

const S = 14;
export const iconColor = (active: boolean) => (active ? '#ffffff' : '#64748b');

export const LOST_FOUND_TABS: {
  value: ReportTypeFilter;
  label: string;
  id: string;
  icon: (active: boolean) => React.ReactNode;
}[] = [
  {
    value: 'all',
    label: messages.lostFound.tabs.all,
    id: 'tab-all',
    icon: (a) => (
      <PawIcon width={S} height={S} css={{ color: iconColor(a), fill: iconColor(a) }} />
    ),
  },
  {
    value: 'lost',
    label: messages.lostFound.tabs.lost,
    id: 'tab-lost',
    icon: (a) => <SearchIcon width={S} height={S} css={{ color: iconColor(a) }} />,
  },
  {
    value: 'found',
    label: messages.lostFound.tabs.found,
    id: 'tab-found',
    icon: (a) => <LocationIcon width={S} height={S} css={{ color: iconColor(a) }} />,
  },
];
