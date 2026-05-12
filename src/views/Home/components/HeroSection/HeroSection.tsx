import { Flex, NextJSImage, Text, WebLogo } from '@/components/elements';
import { HeartArrowIcon, PawIcon } from '@/components/svgs';
import {
  CardTitle,
  GoToButton,
  HeroBrandName,
  HeroCatImageWrapper,
  HeroDescription,
  HeroDogImageWrapper,
  HeroHeading,
  HeroSectionContentLeft,
  HeroSectionContentRight,
  HeroSectionWrapper,
  HeroShopLine,
  HeroSubHeading,
  WhyChooseBullet,
  WhyChooseCard,
  WhyChooseTitle,
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
            <HeartArrowIcon
              css={{ color: '$main', '@sm_max': { display: 'none' } }}
              width={20}
              height={20}
            />
            <HeroSubHeading>
              Connecting pets and parents across <b>Pakistan</b>
            </HeroSubHeading>
          </Flex>

          <Flex direction="column" gap={'3'}>
            <HeroHeading>PAKISTAN&apos;S</HeroHeading>
            <HeroHeading css={{ color: '$main !important' }}>
              First Launch
            </HeroHeading>
            <HeroHeading>PAW PORTAL</HeroHeading>
          </Flex>

          <HeroShopLine>Adopt, Donate, and Make a Difference</HeroShopLine>

          <Flex direction="column" gap={'3'}>
            <HeroDescription>
              <HeroBrandName>PetConnect </HeroBrandName>
              is Pakistan&apos;s premier pet adoption and care hub,helping you{' '}
              <b onClick={() => router.push(StaticRoutes.BROWSE_PETS)}>
                adopt dogs and cats
              </b>
              , all in one seamless online platform.
            </HeroDescription>
          </Flex>
        </HeroSectionContentLeft>

        {/* ---- Right Side---- */}
        <HeroSectionContentRight>
          <WhyChooseCard>
            <CardTitle>
              <WhyChooseTitle>Why choose</WhyChooseTitle>
              <WebLogo color="$main" />
            </CardTitle>

            <WhyChooseBullet>
              Connect with pet owners nationwide.
            </WhyChooseBullet>
            <WhyChooseBullet>
              Find and{' '}
              <b
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(StaticRoutes.BROWSE_PETS)}
              >
                adopt pets in Pakistan
              </b>{' '}
              with ease.
            </WhyChooseBullet>
            <WhyChooseBullet>
              Discover adoption stories and <b>tips</b> for pet care.
            </WhyChooseBullet>
            <WhyChooseBullet>
              Join Pakistan’s trusted online pet‑lover community.
            </WhyChooseBullet>
            <WhyChooseBullet>
              <b
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(StaticRoutes.BROWSE_PETS)}
              >
                Adopt pets near you
              </b>{' '}
              with our matching algorithm.
            </WhyChooseBullet>

            <GoToButton onClick={() => router.push(StaticRoutes.BROWSE_PETS)}>
              <PawIcon
                css={{ fill: '$white', stroke: '$white' }}
                width={18}
                height={18}
              />
              Explore PetConnect
            </GoToButton>
          </WhyChooseCard>

          {/* Dog image — bottom-left of card (absolute positioned) */}
          <HeroDogImageWrapper>
            <NextJSImage imageUrl="./images/dog-peekingi.webp" />
          </HeroDogImageWrapper>

          {/* Cat image — top-right of card (absolute positioned) */}
          <HeroCatImageWrapper>
            <NextJSImage imageUrl="./images/cat-on-box.webp" />
          </HeroCatImageWrapper>
        </HeroSectionContentRight>
      </HeroSectionWrapper>
    </Container>
  );
};
