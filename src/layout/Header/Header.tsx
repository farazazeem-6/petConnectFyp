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
        <HeaderContent css={{ '@lg_max': { position: 'relative' } }}>
          {/* Mobile: menu icon on the left */}
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
          {/* Desktop: logo on the left | Mobile: logo absolutely centered */}
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
          <LoginButton>Login</LoginButton>
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
