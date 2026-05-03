export type TUserProfile = {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  createdAt?: string;
};

export type TProfileInfoForm = {
  name: string;
  email: string;
};

export type TPasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type TProfilePhotoProps = {
  photoURL: string;
  name: string;
  photoLoading: boolean;
  onPhotoChange: (file: File) => Promise<void>;
  onPhotoRemove: () => Promise<void>;
};

export type TProfileInfoProps = {
  profile: TUserProfile;
  isGoogleUser: boolean;
  actionLoading: boolean;
  onSave: (
    name: string,
    email: string,
    currentPassword: string,
  ) => Promise<void>;
};

export type TChangePasswordProps = {
  isGoogleUser: boolean;
  actionLoading: boolean;
  onPasswordChange: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
};
