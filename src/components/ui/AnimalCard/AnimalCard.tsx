// ─── Component ───────────────────────────────────────────────────

import { AnimalCardProps } from '@/utils/types';
import {
  AdoptButton,
  AnimalImage,
  Badge,
  BadgeRow,
  CardRoot,
  ContentWrapper,
  ImageWrapper,
  LocationBtn,
  NameBlock,
  NameRow,
} from './AnimalCard.style';
import { Text } from '@/components/elements';
import { LocationIcon } from '@/components/svgs';

export function AnimalCard({
  image,
  name,
  breed,
  age,
  badges,
  onAdopt,
  onLocationClick,
}: AnimalCardProps) {
  return (
    <CardRoot role="article" aria-label={`${name} — available for adoption`}>
      {/* Animal photo */}
      <ImageWrapper>
        <AnimalImage src={image} alt={`Photo of ${name}`} loading="lazy" />
      </ImageWrapper>

      <ContentWrapper>
        {/* Name + location icon */}
        <NameRow>
          <NameBlock>
            <Text
              as="h3"
              heading="h4"
              color="main"
              css={{ fontWeight: '$fontWeight$bold' }}
            >
              {name}
            </Text>

            <Text heading="h8" color="gray">
              {breed} • {age}
            </Text>
          </NameBlock>

          {/* Drop your LocationIcon here */}
          <LocationBtn
            type="button"
            aria-label="View location"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onLocationClick?.();
            }}
          >
            <LocationIcon css={{ color: '$main' }} width={16} height={16} />
          </LocationBtn>
        </NameRow>

        {/* Health / status badges */}
        {badges.length > 0 && (
          <BadgeRow>
            {badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </BadgeRow>
        )}

        {/* CTA */}
        <AdoptButton
          variant="primary"
          size="md"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onAdopt?.();
          }}
        >
          Adopt Me
        </AdoptButton>
      </ContentWrapper>
    </CardRoot>
  );
}
