import { AnimalCardProps } from '@/utils/types';
import {
  AdoptButton,
  AnimalImage,
  Badge,
  BadgeRow,
  CardRoot,
  ContentWrapper,
  ImageWrapper,
  NameBlock,
  NameRow,
  AgeBadge,
  ButtonGroup,
  ViewDetailButton,
} from './AnimalCard.style';
import { Text, EmptyPlaceholder, Flex } from '@/components/elements';
import { PawIcon, LocationIcon } from '@/components/svgs';

export function AnimalCard({
  image,
  name,
  breed,
  age,
  location,
  badges,
  onAdopt,
  onViewDetail,
}: AnimalCardProps) {
  return (
    <CardRoot role="article" aria-label={`${name} — available for adoption`}>
      {/* Animal photo */}
      <ImageWrapper>
        {image ? (
          <AnimalImage src={image} alt={`Photo of ${name}`} loading="lazy" />
        ) : (
          <EmptyPlaceholder
            variant="card"
            title="No Image"
            icon={<PawIcon css={{ color: '$main' }} width={36} height={36} />}
          />
        )}
      </ImageWrapper>

      <ContentWrapper>
        <NameRow>
          <NameBlock css={{ flex: 1 }}>
            <Flex
              align="start"
              justify="between"
              css={{ width: '100%', gap: '8px' }}
            >
              <Text
                as="h3"
                heading="h4"
                color="main"
                css={{
                  fontWeight: '$fontWeight$bold',
                  wordBreak: 'break-word',
                  lineHeight: 1.2,
                }}
              >
                {name}
              </Text>
              <AgeBadge>{age}</AgeBadge>
            </Flex>

            <Flex align={'center'} justify={'between'}>
              {location && (
                <Flex gap={'2'} align="center">
                  <LocationIcon
                    css={{
                      color: '$main',
                      width: '16px',
                      height: '16px',
                      flexShrink: 0,
                    }}
                  />
                  <Text
                    heading="h4"
                    css={{
                      color: '$slateGray',
                      fontSize: '$px$13',
                      fontWeight: '$fontWeight$medium',
                      lineHeight: 1.2,
                    }}
                  >
                    {location}
                  </Text>
                </Flex>
              )}
              {/* Breed */}
              {breed && (
                <Text
                  heading="h8"
                  css={{
                    color: '$slateGray',
                    fontWeight: '$fontWeight$medium',
                    marginTop: '2px',
                  }}
                >
                  {breed}
                </Text>
              )}
            </Flex>
          </NameBlock>
        </NameRow>

        {badges.length > 0 && (
          <BadgeRow>
            {badges.map((badge) => {
              const isAvailable = badge.toLowerCase() === 'available';
              return (
                <Badge
                  key={badge}
                  css={{
                    ...(isAvailable && {
                      color: '$main',
                      backgroundColor: '$dimWhite',
                      borderColor: '$dimWhite',
                    }),
                  }}
                >
                  {badge}
                </Badge>
              );
            })}
          </BadgeRow>
        )}

        {/* CTA */}
        <ButtonGroup>
          <ViewDetailButton
            variant="default"
            size="md"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onViewDetail?.();
            }}
          >
            View
          </ViewDetailButton>

          <AdoptButton
            variant="default"
            size="md"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onAdopt?.();
            }}
          >
            Adopt
          </AdoptButton>
        </ButtonGroup>
      </ContentWrapper>
    </CardRoot>
  );
}
