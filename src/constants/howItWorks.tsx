import { HeartIcon, HomeIcon, SearchIcon } from '@/components/svgs';

export const STEPS = [
  {
    id: 'browse',
    icon: (
      <SearchIcon
        width={30}
        height={30}
        css={{ color: '$main', stroke: '$main' }}
      />
    ),
    title: '1.Browse',
    description: 'Find your match from our diverse database of pets.',
  },
  {
    id: 'meet',
    icon: <HeartIcon width={30} height={30} css={{ color: '$main' }} />,
    title: '2.Meet',
    description: 'Schedule a meeting with the pet and their guardian',
  },
  {
    id: 'adopt',
    icon: <HomeIcon width={30} height={30} css={{ color: '$main' }} />,
    title: '3.Adopt',
    description:
      'Complete the adoption process and bring your new friend home.',
  },
] as const;
