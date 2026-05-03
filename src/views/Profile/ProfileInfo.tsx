'use client';

import { useState, useEffect, useRef } from 'react';
import { Flex, Button, Input } from '@/components/elements';
import {
  FormSection,
  SectionLabel,
  FieldWrap,
  FieldLabel,
  GoogleFieldNote,
  BtnSpinner,
  SuccessText,
  ChangeButton,
} from './Profile.style';
import { TProfileInfoProps } from '@/utils/types';
import { REGEX } from '@/constants';

export const ProfileInfo = ({
  profile,
  isGoogleUser,
  actionLoading,
  onSave,
}: TProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sync with fresh profile data
  useEffect(() => {
    if (!isEditing) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile, isEditing]);

  // Focus name input when edit mode opens
  useEffect(() => {
    if (isEditing) {
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
  }, [isEditing]);

  const handleEditToggle = () => {
    setIsEditing(true);
    setLocalError('');
    setSuccess(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(profile.name);
    setEmail(profile.email);
    setConfirmPassword('');
    setLocalError('');
  };

  const validate = (): string => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 3) return 'Name must be at least 3 characters.';
    if (trimmedName === profile.name && trimmedEmail === profile.email)
      return 'No changes detected.';
    if (!REGEX.EMAIL.test(trimmedEmail))
      return 'Please enter a valid email address.';
    if (!isGoogleUser && trimmedEmail !== profile.email && !confirmPassword)
      return 'Enter your current password to confirm the email change.';

    return '';
  };

  const handleSave = async () => {
    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    setLocalError('');

    try {
      await onSave(name.trim(), email.trim(), confirmPassword);
      setIsEditing(false);
      setConfirmPassword('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.';
      setLocalError(message);
    }
  };

  return (
    <FormSection>
      {/* ── Section header ── */}
      <Flex
        direction="row"
        align="center"
        justify="between"
        css={{ mb: '$rem$1' }}
      >
        <SectionLabel>Personal Information</SectionLabel>
        {!isEditing && (
          <ChangeButton variant="default" onClick={handleEditToggle}>
            Change Profile
          </ChangeButton>
        )}
      </Flex>

      {/* ── Name ── */}
      <FieldWrap>
        <FieldLabel htmlFor="profile-name">Display Name</FieldLabel>
        <Input
          id="profile-name"
          ref={nameInputRef}
          value={name}
          readOnly={!isEditing}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Your full name"
          css={!isEditing ? { opacity: '$ul$0.7', cursor: 'default' } : {}}
        />
      </FieldWrap>

      {/* ── Email ── */}
      <FieldWrap>
        <FieldLabel htmlFor="profile-email">Email Address</FieldLabel>

        <>
          <Input
            id="profile-email"
            value={profile.email}
            readOnly
            disabled
            css={{ opacity: '$ul$0.7', cursor: 'not-allowed' }}
          />
          <GoogleFieldNote>You cannot change your email.</GoogleFieldNote>
        </>
      </FieldWrap>

      {/* ── Action buttons ── */}
      {isEditing && (
        <Flex direction="row" align="center" gap={10} css={{ mt: '$rem$1_25' }}>
          <ChangeButton
            variant="default"
            disabled={actionLoading}
            onClick={handleSave}
          >
            {actionLoading ? <BtnSpinner /> : 'Save Changes'}
          </ChangeButton>
          <Button
            variant="ghost"
            css={{
              padding: '$px$15 !important',
              '@sm_max': { padding: '$px$10 !important' },
            }}
            disabled={actionLoading}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {success && <SuccessText>Saved ✓</SuccessText>}
        </Flex>
      )}

      {!isEditing && success && (
        <Flex css={{ mt: '$rem$0_75' }}>
          <SuccessText>Changes saved ✓</SuccessText>
        </Flex>
      )}
    </FormSection>
  );
};
