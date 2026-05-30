'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  HeaderContent,
  HeaderWrapper,
  LoginButton,
  MobileMenuButton,
  NavLinkItem,
  NavList,
} from './Header.Style';
import { Box, Flex, WebLogo } from '@/components/elements';
import {
  MenuIcon,
  UserIcon,
  SignOutIcon,
  ListingIcon,
  HeartIcon,
  CrownIcon,
} from '@/components/svgs';
import { Sidebar } from '../SideBar';
import { NAV_ITEMS, StaticRoutes } from '@/constants';
import { useHeader, useAuth, useScreenWidth } from '@/hooks';
import { isAdminRole } from '@/utils/types';
import { getActiveNavFromPath } from '@/utils/getActiveNav';
import {
  HeaderDropdown,
  TDropdownMenuItem,
} from '@/components/ui/HeaderDropdown';

export const Header = () => {
  const pathname = usePathname();
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    handleLogoClick,
    handleNavigation,
  } = useHeader();

  // user here is TAuthUser from Redux — has .photo and .name typed correctly
  const { user, handleLogout, loading } = useAuth();
  const router = useRouter();
  const { isMobile } = useScreenWidth();

  const activeNav = getActiveNavFromPath(pathname);

  const onLogout = async () => {
    await handleLogout();
    router.push(StaticRoutes.HOME);
  };

  const menuItems: TDropdownMenuItem[] = [
    ...(isAdminRole(user?.role)
      ? [
          {
            label: 'Go to Admin',
            icon: (
              <CrownIcon
                css={{ height: '$px$20', color: '$main', fill: '$main' }}
              />
            ),
            onClick: () => router.push(StaticRoutes.ADMIN),
          },
        ]
      : []),
    {
      label: 'My Profile',
      icon: (
        <UserIcon css={{ height: '$px$20', color: '$main', stroke: '$main' }} />
      ),
      onClick: () => router.push(StaticRoutes.PROFILE),
    },
    {
      label: 'My Listing',
      icon: (
        <ListingIcon
          css={{ height: '$px$20', color: '$main', stroke: '$main' }}
        />
      ),
      onClick: () => router.push(StaticRoutes.MY_LISTING),
    },
    {
      label: 'My Favorites',
      icon: (
        <HeartIcon
          css={{ height: '$px$20', color: '$main', stroke: '$main' }}
        />
      ),
      onClick: () => router.push(StaticRoutes.FAVOURITES),
    },
    {
      label: 'Sign Out',
      icon: <SignOutIcon css={{ height: '$px$20', color: '$main' }} />,
      onClick: onLogout,
      css: { color: '$main' },
    },
  ];

  return (
    <>
      <HeaderWrapper>
        <HeaderContent css={{ '@lg_max': { position: 'relative' } }}>
          <MobileMenuButton
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            css={{ '@lg': { display: 'none' }, '@sm_max': { display: 'none' } }}
          >
            <MenuIcon
              css={{ color: '$white' }}
              className={isMobileMenuOpen ? 'open' : ''}
            />
          </MobileMenuButton>

          <Box
            css={{
              '@lg_max': {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              },
              '@sm_max': {
                position: 'relative',
                left: '80px',
              },
            }}
          >
            <WebLogo onClick={() => router.push(StaticRoutes.HOME)} />
          </Box>

          <Flex css={{ '@lg_max': { display: 'none' } }} gap={'20'}>
            <NavList>
              {NAV_ITEMS.map(({ label, href }) => (
                <Box key={label}>
                  <NavLinkItem href={href} active={activeNav === label}>
                    {label}
                  </NavLinkItem>
                </Box>
              ))}
            </NavList>
          </Flex>

          {loading ? (
            <Box css={{ width: '$px$70' }} />
          ) : user ? (
            <HeaderDropdown
              avatarSrc={user.photo ?? undefined} // ← typed, no cast
              avatarFallbackText={user.name ?? user.email ?? 'U'} // ← typed, no cast
              avatarSize={isMobile ? 'sm' : 'md'}
              menuItems={menuItems}
            />
          ) : (
            <LoginButton onClick={() => router.push(StaticRoutes.AUTH)}>
              Login
            </LoginButton>
          )}
        </HeaderContent>
      </HeaderWrapper>

      <Box css={{ height: '$px$85', width: '$percent$100', flexShrink: 0 }} />

      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={NAV_ITEMS}
        handleLogoClick={handleLogoClick}
        handleNavigation={handleNavigation}
        activeNav={activeNav}
      />
    </>
  );
};
