import { HeaderEnum } from '@/utils/enums';
import { StaticRoutes } from '@/constants/staticRoutes';

/**
 * Returns the header nav item that matches the current route,
 * or null when the page is not part of the main nav (admin, profile, etc.).
 */
export const getActiveNavFromPath = (
  pathname: string | null | undefined,
): HeaderEnum | null => {
  if (!pathname) return null;

  if (
    pathname.startsWith(StaticRoutes.BROWSE_PETS) ||
    pathname.startsWith('/create-listing')
  ) {
    return HeaderEnum.PETS;
  }

  if (
    pathname.startsWith(StaticRoutes.LOST_FOUND) ||
    pathname.startsWith('/report-animal')
  ) {
    return HeaderEnum.LOSTFOUND;
  }

  if (pathname.startsWith(StaticRoutes.CONTACT_US)) {
    return HeaderEnum.CONTACT;
  }

  if (pathname === StaticRoutes.HOME) {
    return HeaderEnum.HOME;
  }

  return null;
};
