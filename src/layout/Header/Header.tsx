import { HeaderEnum } from '@/utils/enums';
import {
  HeaderWrapper,
  LoginButton,
  MobileMenuButton,
  NavLinkItem,
  NavList,
} from './Header.Style';
import { Box, Flex, WebLogo } from '@/components/elements';
import { MenuIcon } from '@/components/svgs';
import { Sidebar } from '../SideBar';
import { NAV_ITEMS } from '@/constants';
import { useHeader } from '@/hooks';

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

  return (
    <>
      <HeaderWrapper>
        <WebLogo color="$blue19" />
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
          <LoginButton>Login</LoginButton>
        </Flex>
        <MobileMenuButton
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <MenuIcon
            css={{ color: '$blue19' }}
            className={isMobileMenuOpen ? 'open' : ''}
          />
        </MobileMenuButton>
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
