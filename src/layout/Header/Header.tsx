'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderEnum } from '@/utils/enums';
import {
  HeaderContent,
  HeaderWrapper,
  LoginButton,
  MobileMenuButton,
  NavLinkItem,
  NavList,
  UserMenu,
  UserMenuDivider,
  UserMenuDropdown,
  UserMenuItem,
} from './Header.Style';
import { Avatar, Box, Flex, WebLogo } from '@/components/elements';
import { MenuIcon } from '@/components/svgs';
import { Sidebar } from '../SideBar';
import { NAV_ITEMS } from '@/constants';
import { useHeader, useAuth } from '@/hooks';

interface HeaderProps {
  activeNav?: HeaderEnum;
}

export const Header = ({ activeNav = HeaderEnum.HOME }: HeaderProps) => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    handleLogoClick,
    handleNavigation,
  } = useHeader();

  const { user, handleLogout } = useAuth();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const onLogout = async () => {
    setMenuOpen(false);
    await handleLogout();
    router.push('/');
  };

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
            <WebLogo />
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
          {user ? (
            <UserMenu ref={menuRef}>
              {/* Avatar trigger button */}
              <button
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  borderRadius: '50%',
                  transition: 'opacity 0.2s',
                }}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="User menu"
                aria-expanded={menuOpen}
              >
                <Avatar
                  src={(user as any).photo ?? undefined}
                  fallbackText={(user as any).name ?? (user as any).email ?? 'U'}
                  size="sm"
                  css={{ border: '2px solid rgba(255,255,255,0.75)' }}
                />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <UserMenuDropdown>
                  {/* User info header */}
                  <li style={{
                    padding: '10px 16px 8px',
                    borderBottom: '1px solid #f0f0f0',
                    listStyle: 'none',
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', lineHeight: 1.4 }}>
                      {(user as any).name ?? 'User'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 2, wordBreak: 'break-all' }}>
                      {(user as any).email}
                    </div>
                  </li>

                  <li>
                    <UserMenuItem
                      type="button"
                      onClick={() => { setMenuOpen(false); router.push('/profile'); }}
                    >
                      My Profile
                    </UserMenuItem>
                  </li>

                  <UserMenuDivider />

                  <li>
                    <UserMenuItem type="button" onClick={onLogout} danger>
                      Sign Out
                    </UserMenuItem>
                  </li>
                </UserMenuDropdown>
              )}
            </UserMenu>
          ) : (
            <LoginButton onClick={() => router.push('/auth')}>Login</LoginButton>
          )}
        </HeaderContent>
      </HeaderWrapper>

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
