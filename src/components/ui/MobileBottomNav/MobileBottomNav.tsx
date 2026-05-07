'use client';

import { type FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Flex } from '@/components/elements';

import {
  MobileBottomNavContainer,
  NavItem,
  NavItemIcon,
  NavItemLabel,
} from './style';

import { MOBILE_NAV_ITEMS } from '@/constants/navItems';
import { StaticRoutes } from '@/constants';

type TMobileBottomNavProps = {
  onPostTask?: () => void;
  onChatClick?: () => void;
};

export const MobileBottomNav: FC<TMobileBottomNavProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveRoute = (route: string) => {
    // Home route
    if (route === StaticRoutes.HOME) {
      return pathname === '/';
    }

    // Pets route + nested routes
    if (route === StaticRoutes.BROWSE_PETS) {
      return (
        pathname.startsWith('/browse-pets') ||
        pathname.startsWith('/create-listing')
      );
    }

    // Lost & Found route + nested routes
    if (route === StaticRoutes.LOST_FOUND) {
      return (
        pathname.startsWith('/lost-found') ||
        pathname.startsWith('/report-animal')
      );
    }

    // Default matching
    return pathname.startsWith(route);
  };

  return (
    <MobileBottomNavContainer>
      <Flex
        justify="around"
        align="center"
        css={{ width: '$percent$100', position: 'relative' }}
      >
        {MOBILE_NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveRoute(item.route);

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
