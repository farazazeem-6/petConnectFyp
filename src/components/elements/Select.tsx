'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { ArrowIcon, CircleTickIcon, WrongIcon } from '../svgs';
import { Text } from './Text';
import { Flex } from './Flex';
import { Box } from './Box';
import { SkeletonLoader } from './Skeleton';
import type { CSS } from '@/theme';
import {
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
  slideUpAndFade,
  styled,
} from '@/theme';
import { isMobileDevice } from '@/utils';
import { IconButton } from './IconButton';
import { FixedSizeList } from 'react-window';

// -----------------------------------------------------------------------------
// Styled primitives & helpers
// -----------------------------------------------------------------------------
const SelectRoot = SelectPrimitive.Root;

export const SelectTrigger = styled(SelectPrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '$10 $14',
  borderRadius: '$radius$10',
  border: '1px solid $colors$borderColor',
  fontSize: '$16',
  lineHeight: 1,
  color: '$colors$textPrimary',
  gap: '8px',
  height: '$height$60',
  boxSizing: 'border-box',
  transition:
    'border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
  outline: 'none',

  '&:hover': {
    borderColor: '$colors$light',
    backgroundColor: 'rgba(30, 123, 61, 0.05)',
  },

  '&:focus': {
    borderColor: '$colors$light',
    backgroundColor: '$colors$inputBg',
  },

  '&:focus-visible': {
    outline: 'none',
    borderColor: '$colors$light',
  },

  '&[data-state="open"]': {
    borderColor: '$colors$light',
  },

  '&[data-state="closed"]': {
    borderColor: '$colors$borderColor',
  },

  '&[data-placeholder]': {
    color: '$colors$gray8',
    fontSize: '$fontSize$14',
    fontWeight: '$fontWeight$medium',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
    backgroundColor: '$colors$gray1',
  },

  variants: {
    variant: {
      default: {},
      borderless: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: 'none !important',
        boxShadow: 'none !important',
        padding: '12px 16px',
        height: '50px',

        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        },

        '&:focus': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: 'none !important',
          border: 'none !important',
          outline: 'none',
        },

        '&:focus-visible': {
          outline: 'none !important',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

const SelectContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  backgroundColor: '$white',
  background: 'linear-gradient(135deg, #f8fafc 60%, #f3f3f4 100%)',
  transition: 'background 0.2s ease',
  zIndex: 2000,
  borderRadius: 16,
  boxShadow: '0 $8 $32 rgba(0,0,0,0.18)',
  border: '1px solid $colors$dropdownBorder',
  position: 'relative',
  minWidth: '200px',
  width: 'var(--radix-select-trigger-width) !important',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
  variants: {
    side: {
      bottom: {
        mt: '4px',
      },
    },
  },
});

const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: '5px',
  maxHeight: '200px',
  overflowY: 'auto',
});

const SelectItem = styled(SelectPrimitive.Item, {
  fontSize: '14px',
  padding: '8px 12px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  color: '$colors$textPrimary',
  transition: 'background-color 0.2s ease',

  '&:hover': {
    backgroundColor: '$colors$gray1',
  },

  '&[data-highlighted]': {
    backgroundColor: '$colors$gray2',
    outline: 'none',
  },

  '@sm_max': {
    fontSize: '12px',
  },
});

const SelectItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  marginLeft: 'auto',
  color: '$colors$light',
});

const Label = styled('label', {
  fontWeight: '$fontWeight$semibold',
  fontSize: '$fontSize$16',
  '@sm_max': { fontSize: '$fontSize$13' },
});

export const InputSearch = styled('input', {
  padding: '8px 12px',
  fontSize: '14px',
  border: '1px solid $dropdownBorder',
  borderRadius: '6px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',

  '&:focus': {
    borderColor: '$colors$light',
    backgroundColor: 'rgba(144, 248, 168, 0.2)',
  },
});

const ErrorText = styled('span', {
  color: 'red',
  fontSize: '12px',
  marginTop: '4px',
});

type TOption = {
  label: string;
  value: string;
};

type TGenericSelectProps = {
  options: TOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string | React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'borderless';
  enableClear?: boolean;
  width?: string;
  enableSearch?: boolean;
  label?: string;
  error?: string;
  htmlFor?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  loading?: boolean;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  gap?: React.ComponentProps<typeof Flex>['gap'];
  id?: string;
  triggerCss?: CSS;
};

type SelectItemProps = {
  option: TOption;
};

const MemoizedSelectItem: React.FC<SelectItemProps> = React.memo(
  ({ option }) => (
    <SelectItem value={option.value}>
      <SelectPrimitive.ItemText>
        <Text
          heading="h8Bold"
          css={{
            whiteSpace: 'nowrap',
            '@sm_max': {
              fontSize: '$fontSizes$10',
            },
          }}
        >
          {option.label}
        </Text>
      </SelectPrimitive.ItemText>
      <SelectItemIndicator>
        <CircleTickIcon />
      </SelectItemIndicator>
    </SelectItem>
  ),
);
MemoizedSelectItem.displayName = 'MemoizedSelectItem';

// Memoized virtualized item component
const VirtualizedItem = React.memo(
  ({
    index,
    style,
    data,
  }: {
    index: number;
    style: React.CSSProperties;
    data: TOption[];
  }) => (
    <div style={style}>
      <MemoizedSelectItem option={data[index]} />
    </div>
  ),
);
VirtualizedItem.displayName = 'VirtualizedItem';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export const Selection: React.FC<
  TGenericSelectProps & { onClear?: () => void }
> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  variant = 'default',
  enableClear = false,
  width = 'auto',
  enableSearch = true,
  label,
  error,
  htmlFor,
  open,
  onOpenChange,
  loading = false,
  onClear,
  required = false,
  leftIcon,
  rightIcon,
  gap = 3,
  id,
  triggerCss,
  // enableSearch = true,
}) => {
  const listRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term with 300ms delay to reduce re-renders
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === 'boolean';
  const isOpen = isControlled ? open : internalOpen;

  // Detect if device is mobile/touch device
  const isMobile = useMemo(() => isMobileDevice(), []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    } else if (enableSearch && !isMobile) {
      // Focus the search input when dropdown opens (only on desktop, on mobile we let the user manually focus to avoid keyboard conflicts)
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, enableSearch, isMobile]);

  // Memoized filtered options with stable reference
  const filteredOptions = useMemo(() => {
    if (!enableSearch) {
      return options;
    }
    const term = debouncedSearchTerm.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(term),
    );
  }, [options, debouncedSearchTerm, enableSearch]);

  const showCrossIcon = enableClear && value !== '';
  const shouldShowClearIcon = showCrossIcon && onClear;

  useEffect(() => {
    if (isOpen && listRef.current && filteredOptions.length > 20) {
      const index = filteredOptions.findIndex((opt) => opt.value === value);
      if (index !== -1) {
        listRef.current.scrollToItem(index, 'center');
      }
    }
  }, [isOpen, filteredOptions, value]);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    },
    [],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  return (
    <Flex direction="column" gap={gap} css={{ width: `${width}` }}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </Label>
      )}
      <Box css={{ position: 'relative' }} id={id}>
        <SelectRoot
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          open={open}
          onOpenChange={isControlled ? onOpenChange : setInternalOpen}
        >
          <SelectTrigger
            variant={variant}
            aria-describedby={error ? `${htmlFor}-error` : undefined}
            css={{
              position: 'relative',
              '@sm_max': { height: '46px' },
              ...triggerCss,
            }}
          >
            {leftIcon && (
              <Flex align="center" css={{ marginRight: '-$36', flexShrink: 0 }}>
                {leftIcon}
              </Flex>
            )}
            <SelectPrimitive.Value placeholder={placeholder} />
            {rightIcon && (
              <Flex align="center" css={{ marginLeft: '$1', flexShrink: 0 }}>
                {rightIcon}
              </Flex>
            )}
            <SelectPrimitive.Icon>
              <Flex align={'center'}>
                {!shouldShowClearIcon && (
                  <ArrowIcon
                    css={{
                      transform: `rotate(${isOpen ? '270deg' : '90deg'})`,
                      transition: 'transform 0.3s ease',
                    }}
                  />
                )}
              </Flex>
            </SelectPrimitive.Icon>
          </SelectTrigger>

          <SelectPrimitive.Portal>
            <SelectContent position="popper" sideOffset={4}>
              {/* Optional search input */}
              {enableSearch && (
                <Box
                  css={{
                    padding: '8px',
                    boxSizing: 'border-box',
                    width: '100%',
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <InputSearch
                    ref={searchInputRef}
                    type="text"
                    aria-label="Search options"
                    value={searchTerm}
                    onKeyDown={handleSearchKeyDown}
                    onChange={handleSearchChange}
                    onFocus={(e) => e.stopPropagation()}
                    onBlur={(e) => {
                      // Only refocus if blur was caused by interaction with dropdown items
                      if (isOpen && e.relatedTarget) {
                        // Check if relatedTarget is inside the dropdown
                        const dropdown = e.currentTarget.closest(
                          '[data-radix-select-content]',
                        );
                        if (
                          dropdown &&
                          dropdown.contains(e.relatedTarget as Node)
                        ) {
                          requestAnimationFrame(() => {
                            searchInputRef.current?.focus();
                          });
                        }
                      }
                    }}
                    placeholder="Search..."
                    autoComplete="off"
                    inputMode="text"
                  />
                </Box>
              )}

              <SelectViewport
                onMouseMove={() => {
                  // Keep typing active in the search field even when hovering the list
                  if (enableSearch) {
                    searchInputRef.current?.focus();
                  }
                }}
              >
                {loading ? (
                  // Skeleton loading state...
                  Array.from({ length: 4 }, (_, index) => (
                    <Box key={`loading-${index}`}>
                      <SkeletonLoader height={40} width="100%" />
                    </Box>
                  ))
                ) : filteredOptions.length > 0 ? (
                  filteredOptions.length > 20 ? (
                    <FixedSizeList
                      ref={listRef}
                      height={Math.min(filteredOptions.length, 6) * 44}
                      itemCount={filteredOptions.length}
                      itemSize={44}
                      itemData={filteredOptions} // Pass data as itemData for stability
                      width="100%"
                      style={{ overflowX: 'hidden' }}
                    >
                      {VirtualizedItem}
                    </FixedSizeList>
                  ) : (
                    filteredOptions.map((option) => (
                      <MemoizedSelectItem key={option.value} option={option} />
                    ))
                  )
                ) : (
                  <Flex
                    align="center"
                    justify="center"
                    css={{ padding: '8px', color: '$gray8', cursor: 'auto' }}
                  >
                    <Text heading="h7">No record found</Text>
                  </Flex>
                )}
              </SelectViewport>
            </SelectContent>
          </SelectPrimitive.Portal>
        </SelectRoot>

        {shouldShowClearIcon && (
          <IconButton
            aria-label="Clear selection"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              onClear();
            }}
            css={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
            }}
          >
            <WrongIcon width={10} height={10} />
          </IconButton>
        )}
      </Box>

      {error && <ErrorText id={`${htmlFor}-error`}>{error}</ErrorText>}
    </Flex>
  );
};
