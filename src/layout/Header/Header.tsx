import { HeaderEnum } from '@/utils/enums';
import {
  HeaderWrapper,
  LoginButton,
  NavLinkItem,
  NavList,
} from './Header.Style';
import { NAV_ITEMS } from '@/constants';
import { Box, WebLogo } from '@/components/elements';

interface HeaderProps {
  activeNav?: HeaderEnum;
}

export const Header = ({ activeNav = HeaderEnum.HOME }: HeaderProps) => {
  return (
    <HeaderWrapper>
      {/* Logo */}
      <WebLogo color="$black" />
      {/* Nav Items */}
      <Box>
        <NavList>
          {NAV_ITEMS.map(({ label, href }) => (
            <Box key={label}>
              <NavLinkItem href={href} active={activeNav === label}>
                {label}
              </NavLinkItem>
            </Box>
          ))}
        </NavList>
      </Box>

      {/* Login */}
      <LoginButton>Login</LoginButton>
    </HeaderWrapper>
  );
};
