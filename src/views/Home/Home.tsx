import { Box } from '@/components/elements';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { HowItWorks } from './components/HowItWorks';
import { PetServices } from './components/PetServices';

export const Home = () => {
  return (
    <Box>
      <HeroSection />
      <HowItWorks />
      <PetServices />
      <StatsBar />
    </Box>
  );
};
