import { Box, WebLogo } from '@/components/elements';
import { TSidebarProps } from '@/utils/types';
import {
  Logo,
  NavItem,
  SidebarCloseBox,
  SidebarContent,
  SidebarHeader,
  SidebarNav,
  SidebarOverlay,
  SidebarWrapper,
} from './SideBar.Style';
import { CloseIcon, MenuIcon } from '@/components/svgs';

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
            <Box></Box>
            <Logo
              onClick={handleLogoClick}
              css={{ cursor: 'pointer', gap: '$gap$8' }}
            >
              <WebLogo />
            </Logo>
            <SidebarCloseBox>
              <MenuIcon
                aria-hidden="true"
                css={{ color: '$white' }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </SidebarCloseBox>
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
          </SidebarNav>
        </SidebarContent>
      </SidebarWrapper>
    </Box>
  );
};
