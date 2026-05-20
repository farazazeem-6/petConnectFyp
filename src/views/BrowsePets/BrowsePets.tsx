'use client';
import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Text, Flex, Container, CardGrid } from '@/components/elements';
import { useAuth } from '@/hooks';
import {
  AnimalCard,
  AnimalCardSkeleton,
  AnimalDetailModal,
  FilterSidebar,
  EmptyActionBanner,
  SmartMatchResultBanner,
  SmartMatchModal,
} from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchAnimals } from '@/store/animal';
import type { RootState } from '@/store/store';
import type { TAnimal, TFilterState } from '@/utils/types';
import {
  AddActionBar,
  AddActionButton,
  BrowseHeading,
  ContentRow,
  GridArea,
  MobileFilterBtn,
  PageRoot,
  TopBar,
} from './BrowsePets.style';
import { filterAnimalsBySmartMatch } from '@/utils/smartMatch';
import {
  FilterIcon,
  HeartArrowIcon,
  PlusIcon,
  SparkIcon,
} from '@/components/svgs';
import { messages } from '@/constants';
import { SmartMatchButton } from '@/components/ui/SmartMatch/style';
import { MobileListingAddButton } from '../MyListing/MyListing.style';

// ── Default sidebar filter state ──────────────────────────────────────────────
const defaultFilters: TFilterState = {
  animalType: '',
  breed: '',
  minAge: '',
  maxAge: '',
  city: '',
  gender: '',
  vaccinated: false,
};

// ── Responsive card grid columns ──────────────────────────────────────────────
export const GRID_CSS = {
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '$px$10',
  '@lg_max': { gridTemplateColumns: 'repeat(3, 1fr)' },
  '@md_max': { gridTemplateColumns: 'repeat(2, 1fr)', gap: '$px$8' },
};

export function BrowsePets() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();
  const { list: animals, loading } = useAppSelector((s: RootState) => s.animal);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [selectedAnimal, setSelectedAnimal] = useState<TAnimal | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<TFilterState>(defaultFilters);

  // Smart Match state
  const [smartMatchOpen, setSmartMatchOpen] = useState(false);
  // Empty array = smart match not active; populated = active with derived tags
  const [smartMatchTags, setSmartMatchTags] = useState<string[]>([]);

  React.useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  // ── Filter sidebar handlers ───────────────────────────────────────────────
  const handleFilterDrawerClose = useCallback(
    () => setFilterDrawerOpen(false),
    [],
  );
  const handleFilterDrawerToggle = useCallback(
    () => setFilterDrawerOpen((v) => !v),
    [],
  );
  const handleFiltersReset = useCallback(() => setFilters(defaultFilters), []);

  // ── Smart Match handlers ──────────────────────────────────────────────────
  const handleSmartMatchOpen = useCallback(() => setSmartMatchOpen(true), []);

  const handleSmartMatchClose = useCallback(() => setSmartMatchOpen(false), []);

  // Receives the tag array when user finishes the quiz
  const handleSmartMatchApply = useCallback((tags: string[]) => {
    setSmartMatchTags(tags);
  }, []);

  // Clears smart match and returns to normal listing
  const handleSmartMatchClear = useCallback(() => {
    setSmartMatchTags([]);
  }, []);

  // ── Add pet handler ───────────────────────────────────────────────────────
  const handleAddPet = useCallback(() => {
    if (!user) {
      toast.error('You must be logged in to add an animal.');
      router.push('/auth');
    } else {
      router.push('/create-listing');
    }
  }, [user, router]);

  // ── Filtering pipeline ────────────────────────────────────────────────────
  // Step 1 — always apply sidebar filters (type, breed, age, city, gender, vaccinated)
  const sidebarFiltered = useMemo(() => {
    return animals.filter((a: TAnimal) => {
      if (user && a.userId === user.uid) return false;
      if (filters.animalType && a.type !== filters.animalType) return false;
      if (filters.breed && a.breed !== filters.breed) return false;
      if (filters.minAge !== '' && a.age < Number(filters.minAge)) return false;
      if (filters.maxAge !== '' && a.age > Number(filters.maxAge)) return false;
      if (filters.city && a.city !== filters.city) return false;
      if (filters.gender && a.sex !== filters.gender) return false;
      if (filters.vaccinated && !a.vaccinated) return false;
      return true;
    });
  }, [animals, filters, user]);

  // Step 2 — if smart match is active, further filter & sort by match score
  const isSmartMatchActive = smartMatchTags.length > 0;

  const displayedAnimals = useMemo(() => {
    if (!isSmartMatchActive) return sidebarFiltered;
    return filterAnimalsBySmartMatch(sidebarFiltered, smartMatchTags);
  }, [sidebarFiltered, smartMatchTags, isSmartMatchActive]);

  // ── Derived display flags ─────────────────────────────────────────────────
  const hasResults = !loading && displayedAnimals.length > 0;
  const emptyAndDoneLoading = !loading && displayedAnimals.length === 0;

  return (
    <PageRoot>
      <Container>
        {/* ── Mobile top bar ─────────────────────────────────────────────── */}
        <BrowseHeading>
          <TopBar>
            <Flex direction="column" css={{ gap: '$px$4' }}>
              <Text
                as="h1"
                heading="h3"
                css={{ color: '$main', fontWeight: '$fontWeight$bold' }}
              >
                {messages.browsePets.title}
              </Text>
            </Flex>
            <MobileFilterBtn
              type="button"
              aria-label="Open filter panel"
              onClick={handleFilterDrawerToggle}
            >
              <FilterIcon css={{ color: '$white' }} width={16} height={16} />
              {messages.browsePets.filterButton}
            </MobileFilterBtn>
          </TopBar>
        </BrowseHeading>

        <ContentRow>
          {/* ── Left sidebar filter panel ─────────────────────────────────── */}
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleFiltersReset}
            isOpen={filterDrawerOpen}
            onClose={handleFilterDrawerClose}
          />

          <GridArea>
            {/* ── Action bar ─────────────────────────────────────────────── */}
            <AddActionBar>
              {/* Left side */}
              {isSmartMatchActive ? (
                <SmartMatchResultBanner
                  matchedTags={smartMatchTags}
                  resultCount={displayedAnimals.length}
                  onClear={handleSmartMatchClear}
                />
              ) : (
                <Text
                  heading="h8"
                  css={{
                    color: '$slateGray',
                    fontWeight: '$fontWeight$medium',
                  }}
                >
                  {!loading &&
                    `${displayedAnimals.length} pet${displayedAnimals.length !== 1 ? 's' : ''} found`}
                </Text>
              )}

              {/* Right side */}
              <Flex css={{ gap: '$px$10', alignItems: 'center' }}>
                <SmartMatchButton
                  type="button"
                  aria-label="Find my perfect pet match"
                  onClick={handleSmartMatchOpen}
                >
                  <SparkIcon
                    width={15}
                    height={15}
                    css={{ color: 'inherit' }}
                  />
                  Find My Match
                </SmartMatchButton>

                <AddActionButton
                  css={{ '@sm_max': { display: 'none' } }}
                  type="button"
                  id="add-pet-btn"
                  aria-label="Add your pet"
                  onClick={handleAddPet}
                >
                  + {messages.browsePets.ctaButton}
                </AddActionButton>
              </Flex>
            </AddActionBar>

            {/* ── Loading skeletons ─────────────────────────────────────── */}
            {loading && (
              <CardGrid css={GRID_CSS}>
                {Array.from({ length: 8 }).map((_) => (
                  <AnimalCardSkeleton key={'pet' + _} />
                ))}
              </CardGrid>
            )}

            {/* ── Empty state ───────────────────────────────────────────── */}
            {emptyAndDoneLoading && (
              <EmptyActionBanner
                id="add-pet-cta-banner"
                title={
                  isSmartMatchActive
                    ? 'No matches found'
                    : messages.browsePets.emptyTitle
                }
                subtitle={
                  isSmartMatchActive
                    ? 'Try adjusting your preferences or clear the smart match to browse all pets.'
                    : messages.browsePets.emptySubtitle
                }
                buttonText={
                  isSmartMatchActive
                    ? 'Clear smart match'
                    : messages.browsePets.ctaButton
                }
                buttonIcon={
                  isSmartMatchActive ? (
                    <SparkIcon
                      width={16}
                      height={16}
                      css={{ color: '$white' }}
                    />
                  ) : (
                    <PlusIcon
                      width={16}
                      height={16}
                      css={{ color: '$white', fill: '$white' }}
                    />
                  )
                }
                icon={
                  <HeartArrowIcon
                    width={36}
                    height={36}
                    css={{ color: '$main' }}
                  />
                }
                onClick={
                  isSmartMatchActive ? handleSmartMatchClear : handleAddPet
                }
              />
            )}

            {/* ── Results grid ──────────────────────────────────────────── */}
            {hasResults && (
              <CardGrid css={GRID_CSS}>
                {displayedAnimals.map((animal: TAnimal) => (
                  <AnimalCard
                    key={animal.id}
                    image={animal.image}
                    name={animal.name}
                    breed={animal.breed ?? ''}
                    age={`${animal.age} months`}
                    location={animal.city ?? ''}
                    badges={
                      [
                        animal.vaccinated ? 'Vaccinated' : '',
                        animal.neutered ? 'Neutered' : '',
                        animal.status === 'available' ? 'Available' : 'Adopted',
                      ].filter(Boolean) as string[]
                    }
                    onViewDetail={() => setSelectedAnimal(animal)}
                  />
                ))}
              </CardGrid>
            )}
          </GridArea>
        </ContentRow>

        {/* ── Animal detail modal ───────────────────────────────────────── */}
        <AnimalDetailModal
          isOpen={!!selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
          animal={selectedAnimal}
        />

        {/* ── Smart Match quiz modal / mobile bottom-sheet ──────────────── */}
        <SmartMatchModal
          isOpen={smartMatchOpen}
          onClose={handleSmartMatchClose}
          onApply={handleSmartMatchApply}
        />
        <MobileListingAddButton
          title="Create new listing"
          onClick={handleAddPet}
        >
          <PlusIcon width={20} height={20} css={{ color: '$white' }} />
        </MobileListingAddButton>
      </Container>
    </PageRoot>
  );
}
