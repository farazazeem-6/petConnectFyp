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
  OwnerActionRow,
  EditButton,
  DeleteButton,
} from './AnimalCard.style';
import { Text, EmptyPlaceholder, Flex } from '@/components/elements';
import { PawIcon, LocationIcon, SearchIcon, PaletteIcon, CalendarIcon, EditIcon, TrashIcon, EyeIcon } from '@/components/svgs';

// ── Report-type badge colours ─────────────────────────────────────
const REPORT_BADGE_STYLES: Record<
  'lost' | 'found',
  { backgroundColor: string; color: string; border: string }
> = {
  lost: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    color: '#dc2626',
    border: '1px solid rgba(239,68,68,0.3)',
  },
  found: {
    backgroundColor: 'rgba(34,197,94,0.1)',
    color: '#16a34a',
    border: '1px solid rgba(34,197,94,0.3)',
  },
};

export function AnimalCard({
  image,
  name,
  breed,
  age,
  location,
  badges = [],
  color,
  onAdopt,
  onViewDetail,
  onEdit,
  onDelete,
  // report variant
  variant = 'adoption',
  reportType,
  dateSeen,
  reportStatus,
}: AnimalCardProps) {
  // ──────────────────── REPORT VARIANT ─────────────────────────────
  if (variant === 'report') {
    const badgeStyle = reportType ? REPORT_BADGE_STYLES[reportType] : undefined;
    return (
      <CardRoot role="article" aria-label={`${name} — ${reportType ?? 'report'}`}>
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
              <Flex align="start" justify="between" css={{ width: '100%', gap: '8px' }}>
                <Text
                  as="h3"
                  heading="h4"
                  color="main"
                  textEllipsis="1"
                  css={{ fontWeight: '$fontWeight$bold', lineHeight: 1.2, minWidth: 0 }}
                >
                  {name}
                </Text>
                {/* Report-type badge */}
                  {reportType && badgeStyle && (
                  <span
                    style={{
                      ...badgeStyle,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 10px',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {reportType === 'lost' ? (
                      <SearchIcon width={10} height={10} css={{ color: '#dc2626' }} />
                    ) : (
                      <LocationIcon width={10} height={10} css={{ color: '#16a34a' }} />
                    )}
                    {reportType === 'lost' ? 'Lost' : 'Found'}
                  </span>
                )}
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
              </Flex>
            </NameBlock>
          </NameRow>

          {/* Status badge */}
          {reportStatus && (
            <BadgeRow>
              <Badge
                css={
                  reportStatus === 'resolved'
                    ? {
                        backgroundColor: 'rgba(34,197,94,0.1)',
                        color: '#16a34a',
                        border: '1px solid rgba(34,197,94,0.3)',
                      }
                    : { color: '$main', backgroundColor: '$dimWhite', borderColor: '$dimWhite' }
                }
              >
                {reportStatus === 'resolved' ? 'Resolved ✓' : 'Open'}
              </Badge>
            </BadgeRow>
          )}

          {/* View detail */}
          {!(onEdit || onDelete) && (
            <ButtonGroup>
              <ViewDetailButton
                variant="default"
                size="md"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onViewDetail?.();
                }}
              >
                View Details
              </ViewDetailButton>
            </ButtonGroup>
          )}

          {/* Edit / Delete — only when owner actions are provided */}
          {(onEdit || onDelete) && (
            <OwnerActionRow>
              <ViewDetailButton
                variant="default"
                size="md"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onViewDetail?.();
                }}
              >
                <span className="btn-text">View</span>
                <EyeIcon className="btn-icon" width={16} height={16} css={{ color: '$main', flexShrink: 0 }} />
              </ViewDetailButton>
              {onEdit && (
                <EditButton
                  variant="default"
                  size="md"
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); onEdit(); }}
                >
                  <span className="btn-text">Edit</span>
                  <EditIcon className="btn-icon" width={16} height={16} css={{ color: '$main', flexShrink: 0 }} />
                </EditButton>
              )}
              {onDelete && (
                <DeleteButton
                  variant="default"
                  size="md"
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); onDelete(); }}
                >
                  <span className="btn-text">Delete</span>
                  <TrashIcon className="btn-icon" width={16} height={16} css={{ color: '$error1', flexShrink: 0 }} />
                </DeleteButton>
              )}
            </OwnerActionRow>
          )}
        </ContentWrapper>
      </CardRoot>
    );
  }

  // ──────────────────── ADOPTION VARIANT (default) ──────────────────
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
                textEllipsis="1"
                css={{
                  fontWeight: '$fontWeight$bold',
                  lineHeight: 1.2,
                  minWidth: 0,
                }}
              >
                {name}
              </Text>
              {age && <AgeBadge>{age}</AgeBadge>}
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
        {!(onEdit || onDelete) && (
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
        )}

        {/* Edit / Delete — only when owner actions are provided */}
        {(onEdit || onDelete) && (
          <OwnerActionRow>
            <ViewDetailButton
              variant="default"
              size="md"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onViewDetail?.();
              }}
            >
              <span className="btn-text">View</span>
              <EyeIcon className="btn-icon" width={16} height={16} css={{ color: '$main', flexShrink: 0 }} />
            </ViewDetailButton>
            {onEdit && (
              <EditButton
                variant="default"
                size="md"
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); onEdit(); }}
              >
                <span className="btn-text">Edit</span>
                <EditIcon className="btn-icon" width={16} height={16} css={{ color: '$main', flexShrink: 0 }} />
              </EditButton>
            )}
            {onDelete && (
              <DeleteButton
                variant="default"
                size="md"
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); onDelete(); }}
              >
                <span className="btn-text">Delete</span>
                <TrashIcon className="btn-icon" width={16} height={16} css={{ color: '$error1', flexShrink: 0 }} />
              </DeleteButton>
            )}
          </OwnerActionRow>
        )}
      </ContentWrapper>
    </CardRoot>
  );
}
