import React, { type FC } from 'react';
import { Dialog, DialogTitle, DialogDescription } from '@/components/elements';
import {
  AlertDialogContent,
  IconContainer,
  ContentWrapper,
  SubtitleText,
  TitleText,
  AlertFooter,
  CancelButton,
  AcceptButton,
} from './AlertModal.style';
import type { TAlertType } from '@/utils/types';
import { getAlertStyles } from '@/constants';

type TAlertModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  onCancel?: () => void;
  onAccept?: () => void;
  cancelText?: string;
  acceptText?: string;
  loading?: boolean;
  loadingText?: string | React.ReactNode;
  isAcceptDisabled?: boolean;
  children?: React.ReactNode;
  type?: TAlertType;
  showCancel?: boolean;
  icon?: React.ReactNode;
};

export const AlertModal: FC<TAlertModalProps> = ({
  open,
  onOpenChange,
  title,
  subtitle,
  onCancel,
  onAccept,
  cancelText = 'Cancel',
  acceptText = 'OK',
  loading = false,
  loadingText,
  isAcceptDisabled = false,
  children,
  type = 'info',
  showCancel = true,
  icon,
}) => {
  const styles = getAlertStyles(type);

  const handleCancel = () => (onCancel ? onCancel() : onOpenChange(false));
  const handleAccept = () => {
    if (loading || isAcceptDisabled) return;
    if (onAccept) {
      onAccept();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        showCloseIcon={false} // ✅ Fixed: was `!open` which is always false when modal is open
        type={type}
      >
        <DialogTitle>
          <IconContainer>{icon ?? styles.icon}</IconContainer>
        </DialogTitle>

        <DialogDescription asChild>
          <div>
            <ContentWrapper hasSubtitle={!!subtitle}>
              <TitleText heading="h3">{title}</TitleText>
              {subtitle && <SubtitleText heading="h5">{subtitle}</SubtitleText>}
            </ContentWrapper>
          </div>
        </DialogDescription>

        {children}

        <AlertFooter type={type}>
          {showCancel && (
            <CancelButton
              type={type}
              color="gray"
              onClick={handleCancel}
              disabled={loading}
            >
              {cancelText}
            </CancelButton>
          )}
          {onAccept && (
            <AcceptButton
              type={type}
              onClick={handleAccept}
              disabled={loading || isAcceptDisabled}
            >
              {loading ? loadingText || 'Loading...' : acceptText}
            </AcceptButton>
          )}
        </AlertFooter>
      </AlertDialogContent>
    </Dialog>
  );
};
