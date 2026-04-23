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
} from './AnimalCard.style';
import { Text, EmptyPlaceholder } from '@/components/elements';
import { PawIcon } from '@/components/svgs';

export function AnimalCard({
  image,
  name,
  breed,
  age,
  badges,
  onAdopt,
}: AnimalCardProps) {
  return (
    <CardRoot role="article" aria-label={`${name} — available for adoption`}>
      {/* Animal photo */}
      <ImageWrapper>
        {image ? (
          <AnimalImage
            src={image}
            alt={`Photo of ${name}`}
            loading="lazy"
          />
        ) : (
          <EmptyPlaceholder
            variant="card"
            title="No Image"
            icon={<PawIcon css={{ color: '$main' }} width={36} height={36} />}
          />
        )}
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

            <Text heading="h8" css={{ color: '$slateGray', fontWeight: '$fontWeight$medium' }}>
              {breed} • {age}
            </Text>
          </NameBlock>
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
          variant="default"
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
