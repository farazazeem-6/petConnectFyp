import React from 'react';

export type ReportTypeFilter = 'all' | 'lost' | 'found';

export interface TabPillProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}
