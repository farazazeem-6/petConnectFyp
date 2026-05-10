import { TAnimal } from '@/utils/types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/elements/Dialog';
import { PawIcon, LocationIcon } from '@/components/svgs';
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
import { Badge, EmptyPlaceholder, Flex, Text } from '@/components/elements';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  animal: TAnimal | null;
}

export function AnimalDetailModal({ isOpen, onClose, animal }: Props) {
  if (!animal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        css={{
          maxWidth: '$px$800',
          padding: '$px$24',
          paddingTop: '$px$40',
          '@md_max': { padding: '$px$16', paddingTop: '$px$40' },
        }}
      >
        <DialogTitle></DialogTitle>
        <ModalContent>
          {/* Left: Image */}
          <ImageSection>
            {animal.image ? (
              <AnimalImage src={animal.image} alt={animal.name} />
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
                  {animal.name}
                </Text>
                {animal.city && (
                  <Flex align="center" gap="4">
                    <LocationIcon
                      css={{ color: '$slateGray', width: '14px' }}
                    />
                    <Text heading="h8" color="secondry">
                      {animal.city}
                    </Text>
                  </Flex>
                )}
              </Flex>
              <Badge
                css={{
                  backgroundColor: '$dimWhite',
                  color: '$main',
                  border: '1px solid $main',
                  px: '$px$12',
                  py: '$px$6',
                  borderRadius: '$radius$full',
                  fontSize: '$fontSize$xs',
                  fontWeight: '$fontWeight$bold',
                  whiteSpace: 'nowrap',
                }}
              >
                {animal.age} year{animal.age !== 1 ? 's' : ''}
              </Badge>
            </InfoHeader>

            <InfoGrid>
              <InfoItem>
                <Text
                  heading="h8"
                  color="secondry"
                  css={{ fontWeight: '$fontWeight$medium' }}
                >
                  Type
                </Text>
                <Text
                  heading="h7"
                  color="primary"
                  css={{ textTransform: 'capitalize' }}
                >
                  {animal.type || 'N/A'}
                </Text>
              </InfoItem>
              <InfoItem>
                <Text
                  heading="h8"
                  color="secondry"
                  css={{ fontWeight: '$fontWeight$medium' }}
                >
                  Breed
                </Text>
                <Text heading="h7" color="primary">
                  {animal.breed || 'Unknown'}
                </Text>
              </InfoItem>
              <InfoItem>
                <Text
                  heading="h8"
                  color="secondry"
                  css={{ fontWeight: '$fontWeight$medium' }}
                >
                  Gender
                </Text>
                <Text
                  heading="h7"
                  color="primary"
                  css={{ textTransform: 'capitalize' }}
                >
                  {animal.sex || 'Unknown'}
                </Text>
              </InfoItem>
              <InfoItem>
                <Text
                  heading="h8"
                  color="secondry"
                  css={{ fontWeight: '$fontWeight$medium' }}
                >
                  Color
                </Text>
                <Text heading="h7" color="primary">
                  {animal.color || 'Unknown'}
                </Text>
              </InfoItem>
            </InfoGrid>

            {/* Health Conditions */}
            {((animal.healthCondition && animal.healthCondition.length > 0) ||
              animal.vaccinated ||
              animal.neutered) && (
              <Flex direction="column" gap="4" css={{ mt: '$px$10' }}>
                <Text
                  heading="h8"
                  color="secondry"
                  css={{ fontWeight: '$fontWeight$medium' }}
                >
                  Health & Medical
                </Text>
                <TagsContainer>
                  {animal.vaccinated && (
                    <Badge
                      css={{
                        backgroundColor: '$lightGreen',
                        color: '$dGreen',
                        border: '1px solid $borderGreen',
                      }}
                    >
                      Vaccinated
                    </Badge>
                  )}
                  {animal.neutered && (
                    <Badge
                      css={{
                        backgroundColor: '$lightGreen',
                        color: '$dGreen',
                        border: '1px solid $borderGreen',
                      }}
                    >
                      Neutered
                    </Badge>
                  )}
                  {animal.healthCondition?.map((hc) => (
                    <Badge
                      key={hc}
                      css={{
                        backgroundColor: '$dimWhite',
                        color: '$main',
                        border: '1px solid $main',
                      }}
                    >
                      {hc}
                    </Badge>
                  ))}
                </TagsContainer>
              </Flex>
            )}

            {/* Characteristics */}
            {animal.characteristics && animal.characteristics.length > 0 && (
              <Flex direction="column" gap="4" css={{ mt: '$px$10' }}>
                <Text
                  heading="h8"
                  color="secondry"
                  css={{ fontWeight: '$fontWeight$medium' }}
                >
                  Characteristics
                </Text>
                <TagsContainer>
                  {animal.characteristics.map((char) => (
                    <Badge
                      key={char}
                      css={{
                        backgroundColor: '$dimWhite',
                        color: '$main',
                        border: '1px solid $main',
                      }}
                    >
                      {char}
                    </Badge>
                  ))}
                </TagsContainer>
              </Flex>
            )}

            {/* Description & Contact Box */}
            {(animal.description || animal.address || animal.phoneNumber) && (
              <DescriptionBox>
                {animal.description && (
                  <Flex direction="column" css={{ mb: '$px$16' }}>
                    <Text
                      heading="h8"
                      color="main"
                      css={{ fontWeight: '$fontWeight$bold', mb: '$px$4' }}
                    >
                      About {animal.name}
                    </Text>
                    <Text
                      heading="h8"
                      color="secondry"
                      css={{ lineHeight: 1.5, whiteSpace: 'pre-line' }}
                    >
                      {animal.description}
                    </Text>
                  </Flex>
                )}

                {animal.address && (
                  <Flex direction="column" gap="4" css={{ mb: '$px$10' }}>
                    <Text
                      heading="h8"
                      color="main"
                      css={{ fontWeight: '$fontWeight$bold' }}
                    >
                      Location / Address
                    </Text>
                    <Text heading="h8" color="secondry">
                      {animal.address}
                    </Text>
                  </Flex>
                )}

                {animal.phoneNumber && (
                  <Flex direction="column" gap="4">
                    <Text
                      heading="h8"
                      color="main"
                      css={{ fontWeight: '$fontWeight$bold' }}
                    >
                      Contact Number
                    </Text>
                    <Text heading="h8" color="secondry">
                      {animal.phoneNumber}
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
