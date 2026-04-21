import { HeaderEnum } from '@/utils/enums';

export const NAV_ITEMS: { label: HeaderEnum; href: string }[] = [
  { label: HeaderEnum.HOME, href: '/' },
  { label: HeaderEnum.PETS, href: '/browse-pets' },
  { label: HeaderEnum.LOSTFOUND, href: '/lost-found' },
  { label: HeaderEnum.CONTACT, href: '/contact' },
];
