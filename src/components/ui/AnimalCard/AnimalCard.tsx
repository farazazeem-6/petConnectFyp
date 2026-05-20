import { AnimalCardProps } from '@/utils/types';
import {
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
  OwnerActionRow,
  AnimalName,
  LocationWrapper,
  LocationText,
  BreedText,
  AnimalCardButton,
  ReportTypeBadge,
  StatusBadge,
  IconWrapper,
} from './AnimalCard.style';
import { EmptyPlaceholder, Flex } from '@/components/elements';
import {
  PawIcon,
  LocationIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  HeartIcon,
} from '@/components/svgs';

// ─── Shared sub-components ───────────────────────────────────────────────────

function AnimalImageBlock({ image, name }: { image?: string; name: string }) {
  return (
    <ImageWrapper>
      <IconWrapper title="Favorite">
        <HeartIcon width={20} height={20} />
      </IconWrapper>
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
  );
}

function OwnerActions({
  onViewDetail,
  onEdit,
  onDelete,
}: Pick<AnimalCardProps, 'onViewDetail' | 'onEdit' | 'onDelete'>) {
  const stop = (fn?: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn?.();
  };

  return (
    <OwnerActionRow>
      <AnimalCardButton size="md" onClick={stop(onViewDetail)}>
        <span className="btn-text">View</span>
        <EyeIcon className="btn-icon" css={{ color: '$main', flexShrink: 0 }} />
      </AnimalCardButton>

      {onEdit && (
        <AnimalCardButton size="md" onClick={stop(onEdit)}>
          <span className="btn-text">Edit</span>
          <EditIcon
            className="btn-icon"
            css={{ color: '$main', flexShrink: 0 }}
          />
        </AnimalCardButton>
      )}

      {onDelete && (
        <AnimalCardButton size="md" variant="main" onClick={stop(onDelete)}>
          <span className="btn-text">Delete</span>
          <TrashIcon className="btn-icon" css={{ flexShrink: 0 }} />
        </AnimalCardButton>
      )}
    </OwnerActionRow>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function AnimalCard({
  image,
  name,
  breed,
  age,
  location,
  badges = [],
  onViewDetail,
  onEdit,
  onDelete,
  variant = 'adoption',
  reportType,
  reportStatus,
}: AnimalCardProps) {
  const isOwner = !!(onEdit || onDelete);
  const stop = (fn?: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn?.();
  };

  // ── REPORT VARIANT ────────────────────────────────────────────────
  if (variant === 'report') {
    return (
      <CardRoot
        role="article"
        aria-label={`${name} — ${reportType ?? 'report'}`}
      >
        <AnimalImageBlock image={image} name={name} />

        <ContentWrapper>
          <NameRow>
            <NameBlock css={{ flex: 1 }}>
              <Flex
                align="start"
                justify="between"
                css={{ width: '$percent$100', gap: '$px$8' }}
              >
                <AnimalName>{name}</AnimalName>
                {reportType && (
                  <ReportTypeBadge reportType={reportType}>
                    {reportType === 'lost' ? (
                      <SearchIcon width={10} height={10} />
                    ) : (
                      <LocationIcon width={10} height={10} />
                    )}
                    {reportType === 'lost' ? 'Lost' : 'Found'}
                  </ReportTypeBadge>
                )}
              </Flex>

              {location && (
                <LocationWrapper>
                  <LocationIcon />
                  <LocationText>{location}</LocationText>
                </LocationWrapper>
              )}
            </NameBlock>
          </NameRow>

          {reportStatus && (
            <BadgeRow>
              <StatusBadge resolved={reportStatus === 'resolved'}>
                {reportStatus === 'resolved' ? 'Resolved ✓' : 'Open'}
              </StatusBadge>
            </BadgeRow>
          )}

          {isOwner ? (
            <OwnerActions
              onViewDetail={onViewDetail}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ) : (
            <ButtonGroup>
              <AnimalCardButton size="md" onClick={stop(onViewDetail)}>
                View Details
              </AnimalCardButton>
            </ButtonGroup>
          )}
        </ContentWrapper>
      </CardRoot>
    );
  }

  // ── ADOPTION VARIANT (default) ────────────────────────────────────
  return (
    <CardRoot role="article" aria-label={`${name} — available for adoption`}>
      <AnimalImageBlock image={image} name={name} />

      <ContentWrapper>
        <NameRow>
          <NameBlock css={{ flex: 1 }}>
            <Flex
              align="start"
              justify="between"
              css={{ width: '$percent$100', gap: '$px$8' }}
            >
              <AnimalName>{name}</AnimalName>
              {age && <AgeBadge>{age}</AgeBadge>}
            </Flex>

            <Flex align="center" justify="between" css={{ mt: '$px$5' }}>
              {location && (
                <LocationWrapper>
                  <LocationIcon />
                  <LocationText title={`${location} Location`}>
                    {location}
                  </LocationText>
                </LocationWrapper>
              )}
              {breed && <BreedText title={`${breed} Breed`}>{breed}</BreedText>}
            </Flex>
          </NameBlock>
        </NameRow>

        {badges.length > 0 && (
          <BadgeRow>
            {badges.map((badge) => (
              <Badge
                key={badge}
                css={
                  badge.toLowerCase() === 'available'
                    ? {
                        color: '$main',
                        backgroundColor: '$dimWhite',
                        borderColor: '$dimWhite',
                      }
                    : undefined
                }
              >
                {badge}
              </Badge>
            ))}
          </BadgeRow>
        )}

        {isOwner ? (
          <OwnerActions
            onViewDetail={onViewDetail}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : (
          <ButtonGroup>
            <AnimalCardButton onClick={stop(onViewDetail)}>
              View Details
            </AnimalCardButton>
          </ButtonGroup>
        )}
      </ContentWrapper>
    </CardRoot>
  );
}
