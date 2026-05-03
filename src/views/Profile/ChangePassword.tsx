'use client';

import { useState } from 'react';
import { Flex } from '@/components/elements';
import {
  FormSection,
  SectionLabel,
  FieldWrap,
  FieldLabel,
  GooglePasswordNotice,
  BtnSpinner,
  SuccessText,
  ErrorText,
  ChangeButton,
} from './Profile.style';
import { TChangePasswordProps } from '@/utils/types';
import { PasswordInput } from '../auth/components';

export const ChangePassword = ({
  isGoogleUser,
  actionLoading,
  onPasswordChange,
}: TChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

  const validate = (): string => {
    if (!currentPassword || !newPassword || !confirmPassword)
      return 'Please fill in all password fields.';
    if (newPassword.length < 8)
      return 'New password must be at least 8 characters.';
    if (newPassword !== confirmPassword) return 'New passwords do not match.';
    return '';
  };

  const handleUpdate = async () => {
    setLocalError('');

    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    try {
      await onPasswordChange(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.';
      if (message.includes('invalid-credential')) {
        setLocalError('Enter valid old password');
      } else {
        setLocalError(message);
      }
    }
  };

  return (
    <FormSection>
      <SectionLabel css={{ mb: '$rem$1' }}>Security</SectionLabel>

      {/* ── Google notice — always visible, fields just disabled ── */}
      {isGoogleUser && (
        <GooglePasswordNotice>
          You signed in with Google — password management is handled through
          your Google account. Password changes are not available here.
        </GooglePasswordNotice>
      )}

      {/* ── Current password ── */}
      <FieldWrap>
        <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
        <PasswordInput
          id="current-password"
          value={currentPassword}
          disabled={isGoogleUser}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentPassword(e.target.value)
          }
          placeholder="••••••••••"
          css={
            isGoogleUser ? { opacity: '$ul$0.5', cursor: 'not-allowed' } : {}
          }
        />
      </FieldWrap>

      {/* ── New password ── */}
      <FieldWrap>
        <FieldLabel htmlFor="new-password">New Password</FieldLabel>
        <PasswordInput
          id="new-password"
          value={newPassword}
          disabled={isGoogleUser}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
          placeholder="Enter new password"
          css={
            isGoogleUser ? { opacity: '$ul$0.5', cursor: 'not-allowed' } : {}
          }
        />
      </FieldWrap>

      {/* ── Confirm new password ── */}
      <FieldWrap>
        <FieldLabel htmlFor="confirm-new-password">
          Confirm New Password
        </FieldLabel>
        <PasswordInput
          id="confirm-new-password"
          value={confirmPassword}
          disabled={isGoogleUser}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Repeat new password"
          css={
            isGoogleUser ? { opacity: '$ul$0.5', cursor: 'not-allowed' } : {}
          }
        />
      </FieldWrap>

      {localError && <ErrorText>{localError}</ErrorText>}

      <Flex direction="row" align="center" gap={10} css={{ mt: '$rem$1_25' }}>
        <ChangeButton
          variant="default"
          disabled={isGoogleUser || actionLoading}
          onClick={handleUpdate}
        >
          {actionLoading ? <BtnSpinner /> : 'Update Password'}
        </ChangeButton>
        {success && <SuccessText>Password updated ✓</SuccessText>}
      </Flex>
    </FormSection>
  );
};
