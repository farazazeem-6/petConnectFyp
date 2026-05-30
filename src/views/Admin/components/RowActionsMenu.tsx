'use client';

import { useClickOutside } from '@/hooks';
import {
  ActionsMenu,
  ActionsMenuItem,
  ActionsTrigger,
  ActionsWrapper,
} from '../Admin.style';

type RowAction = {
  label: string;
  onClick: () => void;
  danger?: boolean;
};

type RowActionsMenuProps = {
  actions: RowAction[];
};

export const RowActionsMenu = ({ actions }: RowActionsMenuProps) => {
  const { avatarRef, closePopover, isOpen, togglePopover, popoverRef } =
    useClickOutside();

  return (
    <ActionsWrapper ref={avatarRef}>
      <ActionsTrigger
        type="button"
        onClick={togglePopover}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        Actions
      </ActionsTrigger>

      {isOpen && (
        <ActionsMenu ref={popoverRef} role="menu">
          {actions.map((action) => (
            <ActionsMenuItem
              key={action.label}
              role="menuitem"
              danger={action.danger}
              onMouseDown={() => {
                action.onClick();
                closePopover();
              }}
            >
              {action.label}
            </ActionsMenuItem>
          ))}
        </ActionsMenu>
      )}
    </ActionsWrapper>
  );
};
