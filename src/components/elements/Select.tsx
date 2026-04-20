'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import React, { useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowIcon, CircleTickIcon } from '../svgs';
import { Text } from './Text';
import { Box } from './Box';
import { SkeletonLoader } from './Skeleton';
import { styled } from '@/theme';

// ------------------- STYLES (same as yours, trimmed a bit) -------------------
const SelectRoot = SelectPrimitive.Root;

const SelectTrigger = styled(SelectPrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '$10 $14',
  borderRadius: '$radius$10',
  border: '1px solid $colors$borderColor',
});

const SelectContent = styled(SelectPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 12,
  overflow: 'hidden',
});

const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: '5px',
});

const SelectItem = styled(SelectPrimitive.Item, {
  padding: '8px 12px',
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
});

// ------------------- TYPES -------------------
type TOption = {
  label: string;
  value: string;
};

type Props = {
  options: TOption[];
  value: string;
  onChange: (v: string) => void;
  enableSearch?: boolean;
  enableClear?: boolean;
  loading?: boolean;
};

// ------------------- ITEM -------------------
const MemoItem = React.memo(({ option }: { option: TOption }) => (
  <SelectItem value={option.value}>
    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <CircleTickIcon />
    </SelectPrimitive.ItemIndicator>
  </SelectItem>
));

// ------------------- COMPONENT -------------------
export const Selection = ({
  options,
  value,
  onChange,
  enableSearch = true,
  enableClear = false,
  loading = false,
}: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!enableSearch) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search, enableSearch]);

  // ✅ Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 5,
  });

  const showVirtual = filtered.length > 20;

  return (
    <SelectRoot value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectPrimitive.Value placeholder="Select..." />
        <ArrowIcon />
      </SelectTrigger>

      <SelectPrimitive.Portal>
        <SelectContent>
          {/* Search */}
          {enableSearch && (
            <Box css={{ padding: 8 }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
            </Box>
          )}

          <SelectViewport>
            {loading ? (
              <SkeletonLoader height={40} width="100%" />
            ) : filtered.length === 0 ? (
              <Text>No record found</Text>
            ) : showVirtual ? (
              // ✅ Virtualized list
              <div
                ref={parentRef}
                style={{
                  height: Math.min(filtered.length, 6) * 44,
                  overflow: 'auto',
                }}
              >
                <div
                  style={{
                    height: rowVirtualizer.getTotalSize(),
                    position: 'relative',
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((row) => {
                    const item = filtered[row.index];
                    return (
                      <div
                        key={item.value}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          transform: `translateY(${row.start}px)`,
                        }}
                      >
                        <MemoItem option={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // ✅ Normal list
              filtered.map((o) => <MemoItem key={o.value} option={o} />)
            )}
          </SelectViewport>
        </SelectContent>
      </SelectPrimitive.Portal>
    </SelectRoot>
  );
};
