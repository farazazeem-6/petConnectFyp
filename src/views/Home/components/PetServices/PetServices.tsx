import { PET_SERVICE_CARDS } from '@/constants';
import {
  CardButton,
  CardDescription,
  CardIconWrapper,
  CardTitle,
  CardsGrid,
  PetServicesHeader,
  PetServicesSubtitle,
  PetServicesSubtitleBold,
  PetServicesTitle,
  PetServicesWrapper,
  ServiceCard,
} from './PetServices.style';
import { Box } from '@/components/elements';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openChatBot } from '@/store/global/chatBotSlice';
import Link from 'next/link';

export const PetServices = () => {
  const dispatch = useAppDispatch();

  const handleCardButtonClick = (cardId: string) => {
    if (cardId === 'animal-doctor') {
      dispatch(openChatBot());
    }
  };

  return (
    <PetServicesWrapper>
      <Box css={{ maxWidth: '$breakpoints$xxl', margin: '0 auto' }}>
        {/* Section header */}
        <PetServicesHeader>
          <PetServicesTitle>Everything You Need For Your Pet</PetServicesTitle>
          <PetServicesSubtitle>
            Pet Connect is your trusted platform for {''}
            <PetServicesSubtitleBold>pet adoption</PetServicesSubtitleBold> to
            helping you connect with loving companions and give them a{' '}
            <PetServicesSubtitleBold>forever home.</PetServicesSubtitleBold>
          </PetServicesSubtitle>
        </PetServicesHeader>

        {/* Cards grid */}
        <CardsGrid>
          {PET_SERVICE_CARDS.map((card) => (
            <ServiceCard key={card.id}>
              <CardIconWrapper>{card.icon}</CardIconWrapper>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
              {card.id === 'animal-doctor' ? (
                <CardButton
                  onClick={() => handleCardButtonClick(card.id)}
                  type="button"
                >
                  {card.buttonLabel}
                </CardButton>
              ) : (
                <CardButton href={card.href} as={Link} type="button">
                  {card.buttonLabel}
                </CardButton>
              )}
            </ServiceCard>
          ))}
        </CardsGrid>
      </Box>
    </PetServicesWrapper>
  );
};
