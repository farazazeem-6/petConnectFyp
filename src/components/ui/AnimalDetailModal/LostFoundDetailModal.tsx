import { TLostFoundReport } from '@/utils/types';
import {
  Dialog,
  DialogContent,
  Text,
  Flex,
  EmptyPlaceholder,
  Badge,
  DialogTitle,
} from '@/components/elements';
import { PawIcon, LocationIcon, SearchIcon, CalendarIcon, PaletteIcon } from '@/components/svgs';
import {
  ModalContent,
  ImageSection,
  AnimalImage,
  DetailsSection,
  InfoHeader,
  InfoGrid,
  InfoItem,
  TagsContainer,
  DescriptionBox,
} from './AnimalDetailModal.style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  report: TLostFoundReport | null;
}

const REPORT_BADGE_STYLES = {
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
} as const;

export function LostFoundDetailModal({ isOpen, onClose, report }: Props) {
  if (!report) return null;

  const badgeStyle = REPORT_BADGE_STYLES[report.reportType];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        css={{
          maxWidth: '800px',
          padding: '$px$24',
          paddingTop: '$px$40',
          '@md_max': { padding: '$px$16', paddingTop: '$px$40' },
        }}
      >
        <DialogTitle></DialogTitle>
        <ModalContent>
          {/* Left: Image */}
          <ImageSection>
            {report.image ? (
              <AnimalImage src={report.image} alt={report.name} />
            ) : (
              <EmptyPlaceholder
                variant="card"
                title="No Image"
                icon={
                  <PawIcon
                    css={{ color: '$slateGray' }}
                    width={48}
                    height={48}
                  />
                }
              />
            )}
          </ImageSection>

          {/* Right: Info */}
          <DetailsSection>
            <InfoHeader>
              <Flex direction="column" gap="4">
                <Text
                  as="h2"
                  heading="h3"
                  color="main"
                  css={{
                    fontWeight: '$fontWeight$bold',
                    wordBreak: 'break-word',
                    lineHeight: 1.2,
                  }}
                >
                  {report.name}
                </Text>

                {/* Location */}
                {report.lastSeenLocation && (
                  <Flex align="center" gap="4">
                    <LocationIcon css={{ color: '$slateGray', width: '14px' }} />
                    <Text heading="h8" color="secondry">
                      {report.lastSeenLocation}
                    </Text>
                  </Flex>
                )}
              </Flex>

              {/* Report type badge + Status */}
              <Flex direction="column" align="end" gap="4">
                <span
                  style={{
                    ...badgeStyle,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {report.reportType === 'lost' ? (
                    <SearchIcon width={11} height={11} css={{ color: '#dc2626' }} />
                  ) : (
                    <LocationIcon width={11} height={11} css={{ color: '#16a34a' }} />
                  )}
                  {report.reportType === 'lost' ? 'Lost' : 'Found'}
                </span>

                <Badge
                  css={
                    report.status === 'resolved'
                      ? {
                          backgroundColor: 'rgba(34,197,94,0.1)',
                          color: '#16a34a',
                          border: '1px solid rgba(34,197,94,0.3)',
                          px: '$px$12',
                          py: '$px$6',
                          borderRadius: '$radius$full',
                          fontSize: '$fontSize$xs',
                          fontWeight: '$fontWeight$bold',
                          whiteSpace: 'nowrap',
                        }
                      : {
                          backgroundColor: '$dimWhite',
                          color: '$main',
                          border: '1px solid $main',
                          px: '$px$12',
                          py: '$px$6',
                          borderRadius: '$radius$full',
                          fontSize: '$fontSize$xs',
                          fontWeight: '$fontWeight$bold',
                          whiteSpace: 'nowrap',
                        }
                  }
                >
                  {report.status === 'resolved' ? 'Resolved ✓' : 'Open'}
                </Badge>
              </Flex>
            </InfoHeader>

            {/* Info Grid */}
            <InfoGrid>
              <InfoItem>
                <Text heading="h8" color="secondry" css={{ fontWeight: '$fontWeight$medium' }}>
                  Type
                </Text>
                <Text heading="h7" color="primary" css={{ textTransform: 'capitalize' }}>
                  {report.type || 'N/A'}
                </Text>
              </InfoItem>

              <InfoItem>
                <Text heading="h8" color="secondry" css={{ fontWeight: '$fontWeight$medium' }}>
                  Breed
                </Text>
                <Text heading="h7" color="primary">
                  {report.breed || 'Unknown'}
                </Text>
              </InfoItem>

              <InfoItem>
                <Text heading="h8" color="secondry" css={{ fontWeight: '$fontWeight$medium' }}>
                  Gender
                </Text>
                <Text heading="h7" color="primary" css={{ textTransform: 'capitalize' }}>
                  {report.sex || 'Unknown'}
                </Text>
              </InfoItem>

              <InfoItem>
                <Text heading="h8" color="secondry" css={{ fontWeight: '$fontWeight$medium' }}>
                  Age
                </Text>
                <Text heading="h7" color="primary">
                  {report.age || 'Unknown'}
                </Text>
              </InfoItem>
            </InfoGrid>

            {/* Color tag */}
            {report.color && (
              <Flex direction="column" gap="4" css={{ mt: '$px$10' }}>
                <Text heading="h8" color="secondry" css={{ fontWeight: '$fontWeight$medium' }}>
                  Color / Markings
                </Text>
                <TagsContainer>
                  <Badge
                    css={{
                      backgroundColor: '$dimWhite',
                      color: '$main',
                      border: '1px solid $main',
                    }}
                  >
                    <Flex align="center" gap="2">
                      <PaletteIcon css={{ color: '$main', width: '12px', height: '12px' }} />
                      {report.color}
                    </Flex>
                  </Badge>
                </TagsContainer>
              </Flex>
            )}

            {/* Date & Time seen */}
            {(report.lastSeenDate || report.lastSeenTime) && (
              <Flex direction="column" gap="4" css={{ mt: '$px$10' }}>
                <Text heading="h8" color="secondry" css={{ fontWeight: '$fontWeight$medium' }}>
                  Last Seen
                </Text>
                <Flex align="center" gap="4">
                  <CalendarIcon css={{ color: '$main', width: '14px', height: '14px' }} />
                  <Text heading="h8" color="primary">
                    {[report.lastSeenDate, report.lastSeenTime].filter(Boolean).join(' at ')}
                  </Text>
                </Flex>
              </Flex>
            )}

            {/* Description & Contact */}
            {(report.distinguishingFeatures || report.additionalDetails || report.contactNumber) && (
              <DescriptionBox>
                {report.distinguishingFeatures && (
                  <Flex direction="column" css={{ mb: '$px$16' }}>
                    <Text
                      heading="h8"
                      color="main"
                      css={{ fontWeight: '$fontWeight$bold', mb: '$px$4' }}
                    >
                      Distinguishing Features
                    </Text>
                    <Text
                      heading="h8"
                      color="secondry"
                      css={{ lineHeight: 1.5, whiteSpace: 'pre-line' }}
                    >
                      {report.distinguishingFeatures}
                    </Text>
                  </Flex>
                )}

                {report.additionalDetails && (
                  <Flex direction="column" css={{ mb: '$px$16' }}>
                    <Text
                      heading="h8"
                      color="main"
                      css={{ fontWeight: '$fontWeight$bold', mb: '$px$4' }}
                    >
                      Additional Details
                    </Text>
                    <Text
                      heading="h8"
                      color="secondry"
                      css={{ lineHeight: 1.5, whiteSpace: 'pre-line' }}
                    >
                      {report.additionalDetails}
                    </Text>
                  </Flex>
                )}

                {report.contactNumber && (
                  <Flex direction="column" gap="4">
                    <Text
                      heading="h8"
                      color="main"
                      css={{ fontWeight: '$fontWeight$bold' }}
                    >
                      Contact Number
                    </Text>
                    <Text heading="h8" color="secondry">
                      {report.contactNumber}
                    </Text>
                  </Flex>
                )}
              </DescriptionBox>
            )}
          </DetailsSection>
        </ModalContent>
      </DialogContent>
    </Dialog>
  );
}
