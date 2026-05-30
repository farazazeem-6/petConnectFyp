'use client';

import { type FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Flex } from '@/components/elements';
import { useAuth } from '@/hooks/useAuth';

import {
  MobileBottomNavContainer,
  NavItem,
  NavItemIcon,
  NavItemLabel,
} from './style';

import { MOBILE_NAV_ITEMS } from '@/constants/navItems';
import { StaticRoutes } from '@/constants';
import { getActiveNavFromPath } from '@/utils/getActiveNav';
import { HeaderEnum } from '@/utils/enums';

type TMobileBottomNavProps = {
  onPostTask?: () => void;
  onChatClick?: () => void;
};

export const MobileBottomNav: FC<TMobileBottomNavProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const isActiveRoute = (route: string, headerEnum?: HeaderEnum) => {
    const activeNav = getActiveNavFromPath(pathname);

    if (headerEnum) {
      return activeNav === headerEnum;
    }

    if (route === StaticRoutes.FAVOURITES) {
      return pathname.startsWith(StaticRoutes.FAVOURITES);
    }

    if (route === StaticRoutes.PROFILE) {
      return pathname.startsWith(StaticRoutes.PROFILE);
    }

    return pathname.startsWith(route);
  };

  // Filter nav items: only show profile if user is logged in
  const visibleNavItems = MOBILE_NAV_ITEMS.filter((item) => {
    if (item.id === 'profile') {
      return user !== null;
    }
    return true;
  });

  return (
    <MobileBottomNavContainer>
      <Flex
        justify="around"
        align="center"
        css={{ width: '$percent$100', position: 'relative' }}
      >
        {visibleNavItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveRoute(item.route, item.headerEnum);

          return (
            <NavItem
              key={item.id}
              onClick={() => router.push(item.route)}
              aria-label={item.label}
              css={{
                color: isActive ? '$main' : '$secondryHeading',
              }}
            >
              <NavItemIcon
                css={{
                  color: isActive ? '$main' : '$secondryHeading',
                }}
              >
                {IconComponent && (
                  <IconComponent size={22} width={22} height={22} />
                )}
              </NavItemIcon>

              <NavItemLabel
                css={{
                  mt: IconComponent ? '' : '$25',
                  color: isActive ? '$main' : '$secondryHeading',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </NavItemLabel>
            </NavItem>
          );
        })}
      </Flex>
    </MobileBottomNavContainer>
  );
};

export default MobileBottomNav;
