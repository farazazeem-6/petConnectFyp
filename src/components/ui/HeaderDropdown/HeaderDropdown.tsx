'use client';

import { CSS } from '@/theme';
import { ArrowIcon } from '@/components/svgs';
import {
  UserSection,
  PopoverContent,
  PopoverItem,
} from './HeaderDropdown.style';
import { useClickOutside } from '@/hooks';
import { Avatar, Box } from '@/components/elements';

export type TDropdownMenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  /** Optional override styles for this specific item */
  css?: CSS;
};

type THeaderDropdownProps = {
  /** Avatar image URL */
  avatarSrc?: string;
  /** Fallback initials text shown when image is unavailable */
  avatarFallbackText?: string;
  avatarSize?: 'sm' | 'md' | 'lg';
  avatarCss?: CSS;
  /** Menu items rendered inside the popover */
  menuItems: TDropdownMenuItem[];
  /** Extra css on the trigger wrapper */
  triggerCss?: CSS;
};

export const HeaderDropdown = ({
  avatarSrc,
  avatarFallbackText,
  avatarSize = 'md',
  avatarCss,
  menuItems,
  triggerCss,
}: THeaderDropdownProps) => {
  const { avatarRef, closePopover, isOpen, togglePopover, popoverRef } =
    useClickOutside();

  return (
    <Box css={{ position: 'relative' }}>
      {/* Trigger */}
      <UserSection
        ref={avatarRef}
        onClick={togglePopover}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePopover();
          }
        }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        css={triggerCss}
      >
        <Avatar
          src={avatarSrc}
          alt=""
          size={avatarSize}
          fallbackText={avatarFallbackText}
          css={{ borderColor: '$white', ...avatarCss }}
        />
        <ArrowIcon
          css={{
            rotate: isOpen ? '270deg' : '90deg',
            transition: 'rotate 200ms ease',
            color: '$white',
          }}
        />
      </UserSection>

      {/* Popover */}
      {isOpen && (
        <PopoverContent ref={popoverRef} role="menu">
          {menuItems.map((item, index) => (
            <PopoverItem
              key={index}
              role="menuitem"
              tabIndex={0}
              onMouseDown={() => {
                item.onClick();
                closePopover();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  item.onClick();
                  closePopover();
                }
              }}
              css={item.css}
            >
              {item.icon && (
                <span
                  style={{
                    marginRight: 8,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {item.icon}
                </span>
              )}
              {item.label}
            </PopoverItem>
          ))}
        </PopoverContent>
      )}
    </Box>
  );
};
