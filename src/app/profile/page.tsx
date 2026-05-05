'use client';

import { Divider, Loader } from '@/components/elements';
import { RoutePageWrapper } from '@/components/styles';
import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import { useProfile } from '@/hooks/useProfile';
import {
  ChangePassword,
  ProfileCard,
  ProfileInfo,
  ProfilePhoto,
} from '@/views/Profile';

export default function ProfilePage() {
  const {
    profile,
    pageLoading,
    actionLoading,
    photoLoading,
    isGoogleUser,
    handleSaveInfo,
    handleUpdatePhoto,
    handleRemovePhoto,
    handleUpdatePassword,
  } = useProfile();

  if (pageLoading) {
    if (pageLoading) return <Loader message="Fetching profile..." />;
  }

  if (!profile) return null;

  return (
    <>
   
    <RoutePageWrapper>
      <DashBoardHeader heading='My Profile'/>
      <ProfileCard>
        {/* ── Photo ── */}
        <ProfilePhoto
          photoURL={profile.photoURL}
          name={profile.name}
          photoLoading={photoLoading}
          onPhotoChange={handleUpdatePhoto}
          onPhotoRemove={handleRemovePhoto}
        />

        {/* ── Personal info ── */}
        <ProfileInfo
          profile={profile}
          isGoogleUser={isGoogleUser}
          actionLoading={actionLoading}
          onSave={handleSaveInfo}
        />

        <Divider />

        {/* ── Password ── always rendered, Google case handled internally ── */}
        <ChangePassword
          isGoogleUser={isGoogleUser}
          actionLoading={actionLoading}
          onPasswordChange={handleUpdatePassword}
        />
      </ProfileCard>
    </RoutePageWrapper>
     </>
  );
}
