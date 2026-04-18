'use client';

import { ChangeEvent, useState, type FC } from 'react';
import toast from 'react-hot-toast';
import { AlertModal } from '@/components/ui';
import { sendPasswordReset } from '@/lib/firebase';
import { messages } from '@/constants';
import { validateResetEmail } from '@/utils/validation';
import { AuthInput } from './AuthInput';
import { ErrorText } from '../Auth.Style';
import { LockIcon } from '@/components/svgs';

type TForgotPasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ForgotPasswordModal: FC<TForgotPasswordModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClose = (isOpen: boolean) => {
    if (!loading) {
      // Reset state when modal closes
      if (!isOpen) {
        setEmail('');
        setEmailError(null);
      }
      onOpenChange(isOpen);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(null);
  };

  const handleSend = async () => {
    const error = validateResetEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      toast.success(messages.auth.resetPasswordSent);
      handleClose(false);
    } catch (err: any) {
      // Show firebase error as field error so user can take action
      const msg =
        err?.code === 'auth/user-not-found'
          ? messages.errors.userNotFound
          : (err?.message ?? 'Failed to send reset link. Try again.');
      setEmailError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertModal
      icon={<LockIcon width={80} height={80} css={{ color: '$main' }} />}
      open={open}
      onOpenChange={handleClose}
      subtitle={messages.auth.resetPasswordSubtitle}
      title={messages.auth.resetPasswordTitle}
      type="info"
      showCancel
      cancelText="Cancel"
      acceptText={messages.auth.sendLink}
      loadingText={messages.auth.sendingLink}
      loading={loading}
      onAccept={handleSend}
    >
      <AuthInput
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
        error={emailError ?? undefined}
      />
      {/* Spacer when no email error so footer position is stable */}
      {!emailError && (
        <ErrorText css={{ visibility: 'hidden' }}>&nbsp;</ErrorText>
      )}
    </AlertModal>
  );
};
