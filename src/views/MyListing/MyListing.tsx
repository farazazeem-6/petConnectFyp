'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Text, Container, CardGrid } from '@/components/elements';
import {
  AnimalCard,
  AnimalCardSkeleton,
  AlertModal,
  EmptyActionBanner,
  AnimalDetailModal,
  LostFoundDetailModal,
} from '@/components/ui';
import {
  Dialog,
  DialogTitle,
  DialogDescription,
} from '@/components/elements/Dialog';
import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import { useAuth } from '@/hooks/useAuth';
import { TAnimal, TLostFoundReport } from '@/utils/types';
import { ListingTab, UnifiedListing } from './types';
import { TABS } from './constants';
import {
  getUserAnimals,
  getUserLostFoundReports,
  deleteAnimal,
  deleteLostFoundReport,
} from '@/lib/firebase/animal.service';
import {
  PawIcon,
  HeartArrowIcon,
  SearchIcon,
  PlusIcon,
} from '@/components/svgs';
import {
  PageRoot,
  ToolBar,
  TabPillGroup,
  TabPill,
  CreateBtn,
  GridArea,
  CountLabel,
  ChoiceRow,
  ChoiceCard,
  ChoiceIcon,
  MobileListingAddButton,
} from './MyListing.style';
import { AlertDialogContent } from '@/components/ui/AlertModal/AlertModal.style';
import { RoutePageWrapper } from '@/components/styles';
import { GRID_CSS } from '../BrowsePets';

// ── Main view ─────────────────────────────────────────────────────────────────
export function MyListing() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // ── Data state ─────────────────────────────────────────────────────────────
  const [donations, setDonations] = useState<TAnimal[]>([]);
  const [reports, setReports] = useState<TLostFoundReport[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // ── UI state ───────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ListingTab>('all');

  // Create listing choice modal
  const [choiceOpen, setChoiceOpen] = useState(false);

  // Delete confirmation modal
  const [deleteTarget, setDeleteTarget] = useState<UnifiedListing | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // View detail modal
  const [viewTarget, setViewTarget] = useState<UnifiedListing | null>(null);

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Please log in to view your listings.');
      router.replace('/auth');
    }
  }, [user, authLoading, router]);

  // ── Fetch user's listings ──────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    if (!user?.uid) return;
    setDataLoading(true);
    try {
      const [animalData, reportData] = await Promise.all([
        getUserAnimals(user.uid),
        getUserLostFoundReports(user.uid),
      ]);
      setDonations(animalData);
      setReports(reportData);
    } catch (err) {
      console.error('[MyListing] Failed to load listings:', err);
      toast.error('Failed to load your listings. Please refresh.');
    } finally {
      setDataLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!authLoading && user) fetchAll();
  }, [authLoading, user, fetchAll]);

  // ── Compute filtered unified list ──────────────────────────────────────────
  const filteredList = useMemo((): UnifiedListing[] => {
    const donationItems: UnifiedListing[] = donations.map((d) => ({
      kind: 'donation',
      data: d,
    }));
    const lostItems: UnifiedListing[] = reports
      .filter((r) => r.reportType === 'lost')
      .map((r) => ({ kind: 'lostFound', data: r }));
    const foundItems: UnifiedListing[] = reports
      .filter((r) => r.reportType === 'found')
      .map((r) => ({ kind: 'lostFound', data: r }));

    switch (activeTab) {
      case 'donated':
        return donationItems;
      case 'lost':
        return lostItems;
      case 'found':
        return foundItems;
      default:
        return [...donationItems, ...lostItems, ...foundItems];
    }
  }, [donations, reports, activeTab]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  /** Navigate to the correct edit stepper with pre-fill id */
  const handleEdit = useCallback(
    (listing: UnifiedListing) => {
      if (listing.kind === 'donation') {
        router.push(`/create-listing?edit=${listing.data.id}`);
      } else {
        router.push(`/report-animal?edit=${listing.data.id}`);
      }
    },
    [router],
  );

  /** Open delete confirmation modal */
  const handleDeleteRequest = useCallback((listing: UnifiedListing) => {
    setDeleteTarget(listing);
  }, []);

  /** Confirm delete: call Firestore then refresh */
  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget.kind === 'donation') {
        await deleteAnimal(deleteTarget.data.id!);
        toast.success('Donation listing deleted.');
      } else {
        await deleteLostFoundReport(deleteTarget.data.id!);
        toast.success('Report deleted.');
      }
      setDeleteTarget(null);
      await fetchAll();
    } catch {
      toast.error('Could not delete the listing. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTarget, fetchAll]);

  /** Create listing: open choice modal */
  const handleCreateClick = useCallback(() => setChoiceOpen(true), []);

  /** Choice modal: navigate to the correct stepper */
  const handleChooseDonation = useCallback(() => {
    setChoiceOpen(false);
    router.push('/create-listing');
  }, [router]);

  const handleChooseLostFound = useCallback(() => {
    setChoiceOpen(false);
    router.push('/report-animal');
  }, [router]);

  // ── Loading state ──────────────────────────────────────────────────────────
  const isLoading = authLoading || dataLoading;
  const hasResults = !isLoading && filteredList.length > 0;
  const isEmpty = !isLoading && filteredList.length === 0;

  return (
    <PageRoot>
      <RoutePageWrapper>
        {/* ── Dashboard header ── */}
        <DashBoardHeader
          heading="My Listings"
          subHeading="Manage your donated, lost & found animal listings"
          icon={<PawIcon width={25} height={25} css={{ fill: '$white' }} />}
        />

        {/* ── Toolbar ── */}
        <ToolBar>
          <TabPillGroup>
            {TABS.map(({ label, value }) => (
              <TabPill
                key={value}
                type="button"
                active={activeTab === value}
                onClick={() => setActiveTab(value)}
                id={`tab-${value}`}
              >
                {label}
              </TabPill>
            ))}
          </TabPillGroup>
          <CreateBtn
            type="button"
            id="create-listing-btn"
            aria-label="Create a new listing"
            onClick={handleCreateClick}
          >
            + Create Listing
          </CreateBtn>
        </ToolBar>

        {/* ── Count label ── */}
        {!isLoading && (
          <CountLabel css={{ marginBottom: '$px$14' }}>
            {filteredList.length} listing{filteredList.length !== 1 ? 's' : ''}
          </CountLabel>
        )}

        <GridArea>
          {/* ── Loading skeletons ── */}
          {isLoading && (
            <CardGrid css={GRID_CSS}>
              {Array.from({ length: 6 }).map((_, i) => (
                <AnimalCardSkeleton key={i} />
              ))}
            </CardGrid>
          )}

          {/* ── Empty state ── */}
          {isEmpty && (
            <EmptyActionBanner
              id="my-listing-empty-cta"
              title={
                activeTab === 'all'
                  ? "You haven't posted any listings yet"
                  : `No ${activeTab} listings yet`
              }
              subtitle='Click "Create Listing" to add your first listing'
              buttonText="Create Listing"
              buttonIcon={
                <PlusIcon
                  width={16}
                  height={16}
                  css={{ color: '$white', fill: '$white' }}
                />
              }
              icon={
                <PawIcon
                  width={36}
                  height={36}
                  css={{ color: '$main', fill: '$main' }}
                />
              }
              onClick={handleCreateClick}
            />
          )}

          {/* ── Cards grid ── */}
          {hasResults && (
            <CardGrid css={GRID_CSS}>
              {filteredList.map((listing) => {
                if (listing.kind === 'donation') {
                  const a = listing.data;
                  return (
                    <AnimalCard
                      key={a.id}
                      image={a.image}
                      name={a.name}
                      breed={a.breed ?? ''}
                      age={`${a.age} yr${a.age !== 1 ? 's' : ''}`}
                      location={a.city ?? ''}
                      badges={
                        [
                          a.vaccinated ? 'Vaccinated' : '',
                          a.neutered ? 'Neutered' : '',
                          a.status === 'available' ? 'Available' : 'Adopted',
                        ].filter(Boolean) as string[]
                      }
                      onEdit={() => handleEdit(listing)}
                      onDelete={() => handleDeleteRequest(listing)}
                      onViewDetail={() => setViewTarget(listing)}
                    />
                  );
                }

                // Lost / Found report card
                const r = listing.data;
                return (
                  <AnimalCard
                    key={r.id}
                    variant="report"
                    image={r.image}
                    name={r.name}
                    breed={r.breed}
                    color={r.color}
                    location={r.lastSeenLocation}
                    reportType={r.reportType}
                    dateSeen={r.lastSeenDate}
                    reportStatus={r.status}
                    badges={[]}
                    onEdit={() => handleEdit(listing)}
                    onDelete={() => handleDeleteRequest(listing)}
                    onViewDetail={() => setViewTarget(listing)}
                  />
                );
              })}
            </CardGrid>
          )}
        </GridArea>
      </RoutePageWrapper>

      {/* ── Create listing choice modal ── */}
      <Dialog open={choiceOpen} onOpenChange={setChoiceOpen}>
        <AlertDialogContent showCloseIcon type="info">
          <DialogTitle>
            <Text
              as="h2"
              heading="h4"
              css={{
                color: '$main',
                fontWeight: '$fontWeight$bold',
                mb: '$px$4',
              }}
            >
              What would you like to post?
            </Text>
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <Text
                heading="h8Bold"
                css={{ color: '$slateGray', mb: '$px$16' }}
              >
                Choose the type of listing you want to create.
              </Text>
              <ChoiceRow>
                {/* Donation card */}
                <ChoiceCard
                  type="button"
                  onClick={handleChooseDonation}
                  id="choice-donation"
                >
                  <ChoiceIcon>
                    <HeartArrowIcon
                      width={28}
                      height={28}
                      css={{ color: '$main', stroke: '$main' }}
                    />
                  </ChoiceIcon>
                  <Text
                    heading="h5"
                    css={{ color: '$main', fontWeight: '$fontWeight$bold' }}
                  >
                    Donate an Animal
                  </Text>
                  <Text
                    heading="h8Bold"
                    css={{ color: '$slateGray', lineHeight: 1.5 }}
                  >
                    List a pet you want to give a new home
                  </Text>
                </ChoiceCard>

                {/* Lost & Found card */}
                <ChoiceCard
                  type="button"
                  onClick={handleChooseLostFound}
                  id="choice-lost-found"
                >
                  <ChoiceIcon>
                    <SearchIcon
                      width={28}
                      height={28}
                      css={{ color: '$main' }}
                    />
                  </ChoiceIcon>
                  <Text
                    heading="h5"
                    css={{ color: '$main', fontWeight: '$fontWeight$bold' }}
                  >
                    Lost & Found
                  </Text>
                  <Text
                    heading="h8Bold"
                    css={{ color: '$slateGray', lineHeight: 1.5 }}
                  >
                    Report a lost pet or one you've found
                  </Text>
                </ChoiceCard>
              </ChoiceRow>
            </div>
          </DialogDescription>
        </AlertDialogContent>
      </Dialog>

      {/* ── Delete confirmation modal ── */}
      <AlertModal
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        type="error"
        title="Delete Listing"
        subtitle={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.data.name}"? This cannot be undone.`
            : ''
        }
        cancelText="Cancel"
        acceptText="Delete"
        loading={isDeleting}
        loadingText="Deleting…"
        onCancel={() => setDeleteTarget(null)}
        onAccept={handleDeleteConfirm}
      />

      {/* ── View Detail modals ── */}
      <AnimalDetailModal
        isOpen={viewTarget?.kind === 'donation'}
        onClose={() => setViewTarget(null)}
        animal={viewTarget?.kind === 'donation' ? viewTarget.data : null}
      />
      <LostFoundDetailModal
        isOpen={viewTarget?.kind === 'lostFound'}
        onClose={() => setViewTarget(null)}
        report={viewTarget?.kind === 'lostFound' ? viewTarget.data : null}
      />
      <MobileListingAddButton
        title="Create new listing"
        onClick={() => setChoiceOpen(true)}
      >
        <PlusIcon width={20} height={20} css={{ color: '$white' }} />
      </MobileListingAddButton>
    </PageRoot>
  );
}
