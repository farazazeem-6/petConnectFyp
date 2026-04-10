import { EyeIcon, HomeIcon, SearchIcon, UsersIcon } from '@/components/svgs';

export const STEPS = [
  {
    id: 'discover',
    icon: (
      <SearchIcon
        width={30}
        height={30}
        css={{ color: '$main', stroke: '$main' }}
      />
    ),
    title: 'Discover',
    description: 'Find adoptable pets in your city',
  },
  {
    id: 'apply',
    icon: <UsersIcon width={30} height={30} css={{ color: '$main' }} />,
    title: 'Apply & Connect',
    description: 'Fill the adoption form and contact the owner of animal',
  },
  {
    id: 'verify',
    icon: <EyeIcon width={30} height={30} css={{ color: '$main' }} />,
    title: 'Verify & Decide',
    description: 'Ask questions and confirm suitability',
  },
  {
    id: 'welcome',
    icon: <HomeIcon width={30} height={30} css={{ color: '$main' }} />,
    title: 'Welcome Them Home',
    description: 'Arrange pickup and get your animal home',
  },
] as const;
