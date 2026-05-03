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
import { MenuIcon, UserIcon, SignOutIcon } from '@/components/svgs';
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

  const { user, handleLogout, loading } = useAuth();
  const router = useRouter();
  const { isMobile } = useScreenWidth();

  // ── Derive active nav from current route ──────────────────────────
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
      label: 'Sign Out',
      icon: <SignOutIcon css={{ height: '$px$20', color: '$main' }} />,
      onClick: onLogout,
      css: {
        color: '$main',
      },
    },
  ];

  return (
    <>
      <HeaderWrapper>
        <HeaderContent css={{ '@lg_max': { position: 'relative' } }}>
          {/* Mobile menu icon */}
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

          {/* Logo */}
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

          {/* Desktop nav */}
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

          {/* Auth area */}
          {loading ? (
            <Box css={{ width: '$px$70' }} />
          ) : user ? (
            <HeaderDropdown
              avatarSrc={(user as any).photo ?? undefined}
              avatarFallbackText={
                (user as any).name ?? (user as any).email ?? 'U'
              }
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

      {/* Spacer to prevent layout shift because HeaderWrapper is now position fixed instead of sticky */}
      <Box css={{ height: '$px$85', width: '100%', flexShrink: 0 }} />

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
