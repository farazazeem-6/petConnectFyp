'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import React, { useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowIcon, CircleTickIcon } from '../svgs';
import { Text } from './Text';
import { Box } from './Box';
import { SkeletonLoader } from './Skeleton';
import { styled } from '@/theme';

const SelectRoot = SelectPrimitive.Root;

const SelectTrigger = styled(SelectPrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '$px$10 $px$14',
  borderRadius: '$radius$md',
  border: '1px solid $main',
  cursor: 'pointer',
  fontSize: '$rem$0_87',
  color: '$foreground',
  backgroundColor: '$white',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
  gap: '$px$8',
  '&:hover': { borderColor: '$main' },
  '&:focus': { outline: 'none', borderColor: '$main' },
  // Placeholder text color
  '& [data-placeholder]': { color: '$slateGray' },
});

const SelectContent = styled(SelectPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: '$radius$lg',
  overflow: 'hidden',
  border: '1px solid $lightGrayLine',
  zIndex: 9999,
  width: 'var(--radix-select-trigger-width)',
  maxHeight: 'var(--radix-select-content-available-height)',
  boxShadow: '$dropDown',
});

const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: '5px',
});

const SelectItem = styled(SelectPrimitive.Item, {
  padding: '$px$8 $px$12',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '$radius$md',
  fontSize: '$rem$0_87',
  outline: 'none',
  transition: 'background 0.15s ease',
  '&[data-highlighted]': {
    backgroundColor: '$colorGray',
    color: '$main',
  },
  '&[data-state="checked"]': {
    fontWeight: '$fontWeight$semibold',
    color: '$main',
  },
});

// ------------------- TYPES -------------------
type TOption = {
  label: string;
  value: string;
};

type Props = {
  options: readonly TOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  enableSearch?: boolean;
  enableClear?: boolean;
  loading?: boolean;
};

// ------------------- ITEM -------------------
const MemoItem = React.memo(({ option }: { option: TOption }) => (
  <SelectItem value={option.value}>
    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <CircleTickIcon width={16} height={16} />
    </SelectPrimitive.ItemIndicator>
  </SelectItem>
));

// ------------------- COMPONENT -------------------
export const Selection = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
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

  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 5,
  });

  const showVirtual = filtered.length > 20;

  const selectValue = value && value.trim() !== '' ? value : undefined;

  return (
    <SelectRoot value={selectValue} onValueChange={onChange}>
      <SelectTrigger>
        <SelectPrimitive.Value placeholder={placeholder} />
        <ArrowIcon css={{ fill: '$main', transform: 'rotate(90deg)', flexShrink: 0, width: '16px', height: '16px' }} />
      </SelectTrigger>

      <SelectPrimitive.Portal>
        <SelectContent position="popper" sideOffset={4}>
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
              filtered.map((o) => <MemoItem key={o.value} option={o} />)
            )}
          </SelectViewport>
        </SelectContent>
      </SelectPrimitive.Portal>
    </SelectRoot>
  );
};
