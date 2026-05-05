import { TAnimal, TLostFoundReport } from '@/utils/types';

export type ListingTab = 'all' | 'donated' | 'lost' | 'found';

// Unified listing item for display
export type UnifiedListing =
  | { kind: 'donation'; data: TAnimal }
  | { kind: 'lostFound'; data: TLostFoundReport };
