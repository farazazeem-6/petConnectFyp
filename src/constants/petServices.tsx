import { CatIcon, DogIcon, PetLitterIcon } from '@/components/svgs';

export const PET_SERVICE_CARDS = [
  {
    id: 'adopt-pets',
    icon: (
      <DogIcon width={40} height={40} css={{ color: '$main', fill: '$main' }} />
    ),
    title: 'Adopt Pets',
    description: 'Find cats, dogs & more looking for loving homes',
    buttonLabel: 'Adopt Now',
    href: '/adopt',
  },
  {
    id: 'lost-animal',
    icon: (
      <CatIcon width={40} height={40} css={{ color: '$main', fill: '$main' }} />
    ),
    title: 'Lost Pets',
    description: 'Report missing pets and spread the word quickly.',
    buttonLabel: 'Lost Pet',
    href: '/',
  },
  {
    id: 'found-animal',
    icon: (
      <DogIcon width={40} height={40} css={{ color: '$main', fill: '$main' }} />
    ),
    title: 'Found Animals',
    description:
      'Share details of animals you’ve found so owners can reconnect.',
    buttonLabel: 'Report Founds',
    href: '/',
  },
  {
    id: 'animal-doctor',
    icon: <PetLitterIcon width={40} height={40} css={{ color: '$main' }} />,
    title: 'Ask a Pet Doctor',
    description: 'Get answers to your pet health questions instantly.',
    buttonLabel: 'Ask Now',
    href: '/',
  },
] as const;
