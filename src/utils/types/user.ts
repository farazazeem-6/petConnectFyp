export type UserRole = 'user' | 'admin';

export type TAdminUser = {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: UserRole;
  createdAt?: string;
  favouritePetIds?: string[];
};

export const DEFAULT_USER_ROLE: UserRole = 'user';

export const isAdminRole = (role?: UserRole | null): boolean => role === 'admin';
