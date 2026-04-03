import { HeaderEnum } from '../enums';

export type TNavItem = {
  label: HeaderEnum;
  href: string;
};

export type TSidebarProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  navItems: TNavItem[];
  handleNavigation: (item: TNavItem) => void;
  handleLogoClick: () => void;
  activeNav: HeaderEnum;
};
