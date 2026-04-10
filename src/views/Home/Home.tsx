import { Box } from '@/components/elements';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';

export const Home = () => {
  return (
    <Box>
      <HeroSection />
      <HowItWorks />
    </Box>
  );
};
