import { Box, WebLogo } from '@/components/elements';
import { TSidebarProps } from '@/utils/types';
import {
  Logo,
  NavItem,
  SidebarContent,
  SidebarHeader,
  SidebarNav,
  SidebarOverlay,
  SidebarWrapper,
} from './SideBar.Style';
import { CloseIcon } from '@/components/svgs';
import { LoginButton } from '../Header/Header.Style';

export const Sidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navItems,
  handleLogoClick,
  handleNavigation,
  activeNav,
}: TSidebarProps) => {
  return (
    <Box>
      <SidebarOverlay
        className={isMobileMenuOpen ? 'open' : ''}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <SidebarWrapper
        className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}
      >
        <SidebarContent>
          <SidebarHeader>
            <Logo
              onClick={handleLogoClick}
              css={{ cursor: 'pointer', gap: '$gap$8' }}
            >
              <WebLogo color="$blue19" />
            </Logo>
            <Box css={{ cursor: 'pointer' }}>
              <CloseIcon
                aria-hidden="true"
                css={{ fill: '$blue19' }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </Box>
          </SidebarHeader>
          <SidebarNav>
            {navItems.map((item) => (
              <NavItem
                href={item.href}
                active={activeNav === item.label}
                key={item.label}
                onClick={() => handleNavigation(item)}
              >
                {item.label}
              </NavItem>
            ))}
            <LoginButton>Login</LoginButton>
          </SidebarNav>
        </SidebarContent>
      </SidebarWrapper>
    </Box>
  );
};
