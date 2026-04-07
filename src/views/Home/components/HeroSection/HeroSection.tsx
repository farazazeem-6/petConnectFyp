import { Flex, Text } from '@/components/elements';
import { HeartArrowIcon, PawIcon } from '@/components/svgs';
import {
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

export const HeroSection = () => {
  return (
    <HeroSectionWrapper>
      {/* ---- Left Column ---- */}
      <HeroSectionContentLeft>
        <Flex gap={'5'} align="center">
          <HeartArrowIcon css={{ color: '#8B2040' }} width={20} height={20} />
          <HeroSubHeading>
            Connecting pets and parents across <b>Pakistan</b>
          </HeroSubHeading>
        </Flex>

        <Flex direction="column" gap={'3'}>
          <HeroHeading>PAKISTAN&apos;S</HeroHeading>
          <HeroHeading css={{ color: '#8B2040 !important' }}>
            FIRST EVER
          </HeroHeading>
          <HeroHeading>PAW PORTAL</HeroHeading>
        </Flex>

        <HeroShopLine>
          Get the Best for Your Pet — <span>Shop Bazaar</span>
        </HeroShopLine>

        <Flex direction="column" gap={'3'}>
          <HeroDescription>
            <HeroBrandName>PetConnect </HeroBrandName>
            is Pakistan&apos;s first pet adoption and pet care platform, helping
            you <b>adopt dogs and cats</b>, <b>connect with vets</b>, and{' '}
            <b>shop</b> pet products online.
          </HeroDescription>
        </Flex>
      </HeroSectionContentLeft>

      {/* ---- Right Column: Why Choose Card ---- */}
      <HeroSectionContentRight>
        <WhyChooseCard>
          <WhyChooseTitle>
            Why choose{' '}
            <Text css={{ color: '#8B2040 !important', fontWeight: '$fontWeight$black' }}>
              PetConnect
            </Text>
          </WhyChooseTitle>

          <WhyChooseBullet>
            Find and <b>adopt pets in Pakistan</b> from trusted shelters.
          </WhyChooseBullet>
          <WhyChooseBullet>
            Connect with <b>shelters in Karachi, Lahore, and Islamabad</b>.
          </WhyChooseBullet>
          <WhyChooseBullet>
            Shop <b>pet food & accessories</b> online with nationwide delivery.
          </WhyChooseBullet>
          <WhyChooseBullet>
            Find <b>vets in Pakistan</b> and get expert pet care guidance.
          </WhyChooseBullet>
          <WhyChooseBullet>
            <b>Adopt pets near you</b> with our matching algorithm.
          </WhyChooseBullet>

          <GoToButton>
            <PawIcon
              css={{ fill: '#ffffff', stroke: '#ffffff' }}
              width={18}
              height={18}
            />
            Go To PetConnect
          </GoToButton>
        </WhyChooseCard>

        {/* Dog image — bottom-left of card (absolute positioned) */}
        <HeroDogImageWrapper>
          {/* Add your dog image here: <img src="/images/hero-dog.png" alt="Dog" /> */}
        </HeroDogImageWrapper>

        {/* Cat image — top-right of card (absolute positioned) */}
        <HeroCatImageWrapper>
          {/* Add your cat image here: <img src="/images/hero-cat.png" alt="Cat" /> */}
        </HeroCatImageWrapper>
      </HeroSectionContentRight>
    </HeroSectionWrapper>
  );
};
