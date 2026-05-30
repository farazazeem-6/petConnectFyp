'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Text, Button } from '@/components/elements';
import { ShieldIcon } from '@/components/svgs';
import { getRegistrationByRegistrationId } from '@/lib/firebase';
import { StaticRoutes } from '@/constants';
import type { TRegisteredAnimal } from '@/utils/types';
import { ANIMAL_TYPE_OPTIONS } from '@/constants';
import { REGISTRY_MESSAGES } from '@/views/RegisterAnimal/constants';
import {
  PublicProfileWrapper,
  PublicHero,
  PublicHeroImage,
  PublicHeroBody,
  PublicTitle,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  ContactBanner,
  RegistryIdBadge,
} from '@/views/RegisterAnimal/RegisterAnimal.style';
import { formatDisplayDate, capitalize } from '@/views/Admin/utils';

export const AnimalRegistryProfile = () => {
  const params = useParams<{ registrationId: string }>();
  const registrationId = params.registrationId;

  const [registration, setRegistration] = useState<TRegisteredAnimal | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!registrationId) return;

    (async () => {
      try {
        const data = await getRegistrationByRegistrationId(registrationId);
        if (!data || data.status !== 'active') {
          setNotFound(true);
          return;
        }
        setRegistration(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [registrationId]);

  if (loading) {
    return (
      <PublicProfileWrapper>
        <Text heading="paragraph" color="secondry">
          Loading pet profile…
        </Text>
      </PublicProfileWrapper>
    );
  }

  if (notFound || !registration) {
    return (
      <PublicProfileWrapper>
        <Text heading="h3" css={{ color: '$main', mb: '$px$12' }}>
          {REGISTRY_MESSAGES.publicNotFound}
        </Text>
        <Link href={StaticRoutes.HOME}>
          <Button variant="primary">Go to Pet Connect</Button>
        </Link>
      </PublicProfileWrapper>
    );
  }

  const typeLabel =
    ANIMAL_TYPE_OPTIONS.find((o) => o.value === registration.type)?.label ??
    capitalize(registration.type);

  return (
    <PublicProfileWrapper>
      <PublicHero>
        <PublicHeroImage src={registration.image} alt={registration.name} />
        <PublicHeroBody>
          <RegistryIdBadge>{registration.registrationId}</RegistryIdBadge>
          <PublicTitle>{registration.name}</PublicTitle>
          <Text heading="paragraph" color="secondry">
            {REGISTRY_MESSAGES.publicSubtitle}
          </Text>

          <DetailGrid>
            <DetailItem>
              <DetailLabel>Animal Type</DetailLabel>
              <DetailValue>{typeLabel}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Breed</DetailLabel>
              <DetailValue>{registration.breed || '—'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Color</DetailLabel>
              <DetailValue>{registration.color}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Age</DetailLabel>
              <DetailValue>{registration.age} months</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Gender</DetailLabel>
              <DetailValue>{capitalize(registration.sex)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>City</DetailLabel>
              <DetailValue>{registration.city || '—'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{REGISTRY_MESSAGES.registeredOn}</DetailLabel>
              <DetailValue>{formatDisplayDate(registration.createdAt)}</DetailValue>
            </DetailItem>
            {registration.distinguishingFeatures && (
              <DetailItem css={{ gridColumn: '1 / -1' }}>
                <DetailLabel>Distinguishing Features</DetailLabel>
                <DetailValue>{registration.distinguishingFeatures}</DetailValue>
              </DetailItem>
            )}
          </DetailGrid>

          <ContactBanner>
            <Text
              heading="paragraph"
              css={{ color: '$white !important', fontWeight: 600, mb: '$px$8' }}
            >
              If you found this pet, please contact the owner
            </Text>
            <Text heading="paragraph" css={{ color: '$white !important' }}>
              {registration.ownerName} · {registration.ownerPhone}
            </Text>
          </ContactBanner>

          <Link href={StaticRoutes.HOME}>
            <Button variant="outline" css={{ mt: '$px$24' }}>
              Visit Pet Connect
            </Button>
          </Link>
        </PublicHeroBody>
      </PublicHero>
    </PublicProfileWrapper>
  );
};
