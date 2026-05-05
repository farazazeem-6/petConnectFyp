'use client';

import { useRouter, usePathname } from 'next/navigation';
import { HeaderEnum } from '@/utils/enums';
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
} from '@/components/svgs';
import { Sidebar } from '../SideBar';
import { NAV_ITEMS, StaticRoutes } from '@/constants';
import { useHeader, useAuth, useScreenWidth } from '@/hooks';
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

  const activeNav = (() => {
    if (
      pathname?.startsWith('/browse-pets') ||
      pathname?.startsWith('/create-listing')
    )
      return HeaderEnum.PETS;
    if (
      pathname?.startsWith('/lost-found') ||
      pathname?.startsWith('/report-animal')
    )
      return HeaderEnum.LOSTFOUND;
    if (pathname?.startsWith('/contact')) return HeaderEnum.CONTACT;
    return HeaderEnum.HOME;
  })();

  const onLogout = async () => {
    await handleLogout();
    router.push(StaticRoutes.HOME);
  };

  const menuItems: TDropdownMenuItem[] = [
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
            css={{ '@lg': { display: 'none' } }}
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
