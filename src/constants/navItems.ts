import {
  HeartIcon,
  HomeIcon,
  NavPawIcon,
  PetLostIcon,
  ProfileIcon,
} from '@/components/svgs';
import { HeaderEnum } from '@/utils/enums';
import { TMobileNavItems } from '@/utils/types';
import { StaticRoutes } from './staticRoutes';

export const NAV_ITEMS: { label: HeaderEnum; href: string }[] = [
  { label: HeaderEnum.HOME, href: '/' },
  { label: HeaderEnum.PETS, href: '/browse-pets' },
  { label: HeaderEnum.LOSTFOUND, href: '/lost-found' },
  { label: HeaderEnum.CONTACT, href: '/contact-us' },
];

export const MOBILE_NAV_ITEMS: TMobileNavItems[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    route: '/',
    headerEnum: HeaderEnum.HOME,
  },

  {
    id: 'browse-pets',
    label: 'Pets',
    icon: NavPawIcon,
    route: StaticRoutes.BROWSE_PETS,
  },

  {
    id: 'lost-found',
    label: 'Lost & Found',
    icon: PetLostIcon,
    route: StaticRoutes.LOST_FOUND,
  },
  {
    id: 'favourite',
    label: 'Favourites',
    route: StaticRoutes.FAVOURITES,
    icon: HeartIcon,
  },

  {
    id: 'profile',
    label: 'Profile',
    icon: ProfileIcon,
    route: StaticRoutes.PROFILE,
  },
];
