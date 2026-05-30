'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import { AlertModal } from '@/components/ui';
import { Button, Text } from '@/components/elements';
import { ShieldIcon } from '@/components/svgs';
import { useAuth } from '@/hooks/useAuth';
import {
  deleteRegisteredAnimal,
  getUserRegistrations,
} from '@/lib/firebase';
import { StaticRoutes } from '@/constants';
import {
  MAX_REGISTRATIONS_PER_USER,
  type TRegisteredAnimal,
} from '@/utils/types';
import { RegistrationQrCard } from './components/RegistrationQrCard';
import {
  REGISTRY_MESSAGES,
} from './constants';
import {
  HubWrapper,
  HubHeaderRow,
  RegistryGrid,
  RegistryCard,
  RegistryCardImage,
  RegistryCardBody,
  RegistryCardTitle,
  RegistryMeta,
  RegistryIdBadge,
  CardActions,
  EmptyRegistryCard,
  LimitBanner,
} from './RegisterAnimal.style';
import { formatDisplayDate, capitalize } from '@/views/Admin/utils';

export const RegisterAnimalHub = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlight = searchParams.get('highlight');
  const { user, loading: authLoading } = useAuth();

  const [registrations, setRegistrations] = useState<TRegisteredAnimal[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<TRegisteredAnimal | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error(REGISTRY_MESSAGES.loginRequired);
      router.replace(StaticRoutes.AUTH);
    }
  }, [user, authLoading, router]);

  const loadRegistrations = useCallback(async () => {
    if (!user?.uid) return;
    setDataLoading(true);
    try {
      const data = await getUserRegistrations(user.uid);
      setRegistrations(data);
    } catch {
      toast.error(REGISTRY_MESSAGES.loadError);
    } finally {
      setDataLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!authLoading && user) loadRegistrations();
  }, [authLoading, user, loadRegistrations]);

  const highlightedRegistration = useMemo(() => {
    if (!highlight) return null;
    return (
      registrations.find(
        (item) =>
          item.id === highlight || item.registrationId === highlight,
      ) ?? null
    );
  }, [highlight, registrations]);

  const canRegisterMore = registrations.length < MAX_REGISTRATIONS_PER_USER;

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    setIsDeleting(true);
    try {
      await deleteRegisteredAnimal(deleteTarget.id);
      setRegistrations((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      toast.success(REGISTRY_MESSAGES.deleted);
      setDeleteTarget(null);
      if (highlight) router.replace(StaticRoutes.REGISTER_ANIMAL);
    } catch {
      toast.error(REGISTRY_MESSAGES.submitError);
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <HubWrapper>
      <DashBoardHeader
        heading={REGISTRY_MESSAGES.hubTitle}
        subHeading={REGISTRY_MESSAGES.hubSubtitle}
        icon={<ShieldIcon width={25} height={25} css={{ color: '$white' }} />}
      />

      <HubHeaderRow>
        <Text heading="paragraph" color="secondry">
          {registrations.length} of {MAX_REGISTRATIONS_PER_USER} pets registered
        </Text>
        <Button
          variant="primary"
          disabled={!canRegisterMore}
          onClick={() => router.push(`${StaticRoutes.REGISTER_ANIMAL}/new`)}
        >
          {REGISTRY_MESSAGES.registerNew}
        </Button>
      </HubHeaderRow>

      {!canRegisterMore && (
        <LimitBanner>{REGISTRY_MESSAGES.maxReached}</LimitBanner>
      )}

      {highlightedRegistration && (
        <RegistrationQrCard
          registrationId={highlightedRegistration.registrationId}
          petName={highlightedRegistration.name}
        />
      )}

      {dataLoading ? (
        <Text heading="paragraph" color="secondry">
          Loading registrations…
        </Text>
      ) : registrations.length === 0 ? (
        <EmptyRegistryCard>
          <Text heading="h4" css={{ color: '$main', mb: '$px$8' }}>
            {REGISTRY_MESSAGES.noRegistrations}
          </Text>
          <Text heading="paragraph" color="secondry">
            {REGISTRY_MESSAGES.noRegistrationsHint}
          </Text>
        </EmptyRegistryCard>
      ) : (
        <RegistryGrid>
          {registrations.map((item) => (
            <RegistryCard key={item.id}>
              <RegistryCardImage src={item.image} alt={item.name} />
              <RegistryCardBody>
                <RegistryIdBadge>{item.registrationId}</RegistryIdBadge>
                <RegistryCardTitle>{item.name}</RegistryCardTitle>
                <RegistryMeta>
                  {capitalize(item.type)}
                  {item.breed ? ` · ${item.breed}` : ''}
                </RegistryMeta>
                <RegistryMeta>
                  {REGISTRY_MESSAGES.registeredOn}{' '}
                  {formatDisplayDate(item.createdAt)}
                </RegistryMeta>

                <CardActions>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `${StaticRoutes.REGISTER_ANIMAL}?highlight=${item.registrationId}`,
                      )
                    }
                  >
                    Download QR
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `${StaticRoutes.REGISTER_ANIMAL}/edit/${item.id}`,
                      )
                    }
                  >
                    {REGISTRY_MESSAGES.editRegistration}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `${StaticRoutes.REGISTRY}/${item.registrationId}`,
                      )
                    }
                  >
                    {REGISTRY_MESSAGES.viewProfile}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setDeleteTarget(item)}
                  >
                    {REGISTRY_MESSAGES.deleteRegistration}
                  </Button>
                </CardActions>
              </RegistryCardBody>
            </RegistryCard>
          ))}
        </RegistryGrid>
      )}

      <AlertModal
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={REGISTRY_MESSAGES.deleteTitle}
        subtitle={REGISTRY_MESSAGES.deleteSubtitle}
        type="error"
        acceptText="Delete"
        loading={isDeleting}
        loadingText="Deleting…"
        onAccept={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </HubWrapper>
  );
};
