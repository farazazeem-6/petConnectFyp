'use client';
import { Flex, NextJSImage } from '@/components/elements';
import { ArrowForward, HeartIcon } from '@/components/svgs';
import {
  FindMatchButton,
  HeroDescription,
  HeroHeading,
  HeroSectionContentLeft,
  HeroSectionContentRight,
  HeroSectionWrapper,
  HeroShopLine,
  HeroSubHeading,
} from './HeroSection.style';
import { Container } from '@/components/elements';
import { StaticRoutes } from '@/constants';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const router = useRouter();
  return (
    <Container>
      <HeroSectionWrapper>
        {/* ---- Left Side ---- */}
        <HeroSectionContentLeft>
          <Flex gap={'5'} align="center">
            <HeartIcon css={{ color: '$main !important' }} />
            <HeroSubHeading>
              Start your journey today with Pet Connect
            </HeroSubHeading>
          </Flex>

          <Flex direction="column" gap={'3'}>
            <HeroHeading>Bring home</HeroHeading>
            <HeroHeading css={{ color: '$main !important' }}>
              a friend
            </HeroHeading>
            <HeroHeading>not purchase</HeroHeading>
          </Flex>

          <HeroShopLine>Adopt, Donate, and Make a Difference</HeroShopLine>

          <Flex direction="column" gap={'3'}>
            <HeroDescription>
              Opening your home to a pet doesn&apos;t just change their life —
              it completes yours.Discover furry friends waiting for their
              forever family.
            </HeroDescription>
          </Flex>
          <Flex>
            <FindMatchButton
              onClick={() => router.push(StaticRoutes.BROWSE_PETS)}
            >
              Find My Match <ArrowForward />
            </FindMatchButton>
          </Flex>
        </HeroSectionContentLeft>
        {/* ---- Right Side---- */}
        <HeroSectionContentRight>
          <NextJSImage imageUrl="/heroimg.jpg" />
        </HeroSectionContentRight>
      </HeroSectionWrapper>
    </Container>
  );
};
