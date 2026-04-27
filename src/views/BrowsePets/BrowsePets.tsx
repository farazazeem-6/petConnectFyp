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
  CTABanner,
  CTAIconRing,
  CTAContent,
  CTAButton,
  GridArea,
  MobileFilterBtn,
  PageRoot,
  TopBar,
} from './BrowsePets.style';
import { FilterIcon, PawIcon, HeartArrowIcon } from '@/components/svgs';
import { messages } from '@/constants';
import { EmptyPlaceholder } from '@/components/elements';

const defaultFilters: TFilterState = {
  animalType: '',
  breed: '',
  minAge: '',
  maxAge: '',
  city: '',
  gender: '',
  vaccinated: false,
};

const GRID_CSS = {
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
  const [selectedAnimal, setSelectedAnimal] = useState<TAnimal | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<TFilterState>(defaultFilters);

  React.useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const handleClose = useCallback(() => setDrawerOpen(false), []);
  const handleToggle = useCallback(() => setDrawerOpen((v) => !v), []);
  const handleReset = useCallback(() => setFilters(defaultFilters), []);

  const handleAddPet = useCallback(() => {
    if (!user) {
      toast.error('You must be logged in to add an animal.');
      router.push('/auth');
    } else {
      router.push('/create-listing');
    }
  }, [user, router]);

  const filtered = useMemo(() => {
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
  }, [animals, filters]);

  const hasResults = !loading && filtered.length > 0;
  const emptyAndDoneLoading = !loading && filtered.length === 0;

  return (
    <PageRoot>
      <Container>
        {/* Mobile heading */}
        <BrowseHeading>
          <TopBar>
            <Flex direction="column" css={{ gap: '4px' }}>
              <Text
                as="h1"
                heading="h3"
                css={{ color: '$main', fontWeight: '$fontWeight$bold' }}
              >
                {messages.browsePets.title}
              </Text>
              <Text heading="h8" css={{ color: '$slateGray' }}>
                {messages.browsePets.subtitle}
              </Text>
            </Flex>
            <MobileFilterBtn
              type="button"
              aria-label="Open filter panel"
              onClick={handleToggle}
            >
              <FilterIcon css={{ color: '$white' }} width={16} height={16} />
              {messages.browsePets.filterButton}
            </MobileFilterBtn>
          </TopBar>
        </BrowseHeading>

        <ContentRow>
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            isOpen={drawerOpen}
            onClose={handleClose}
          />

          <GridArea>
            {/* ── Action bar: always visible, independent of loading state ── */}
            <AddActionBar>
              <Text
                heading="h8"
                css={{ color: '$slateGray', fontWeight: '$fontWeight$medium' }}
              >
                {!loading && `${filtered.length} pet${filtered.length !== 1 ? 's' : ''} found`}
              </Text>
              <AddActionButton
                type="button"
                id="add-pet-btn"
                aria-label="Add your pet"
                onClick={handleAddPet}
              >
                {messages.browsePets.ctaButton}
              </AddActionButton>
            </AddActionBar>

            {/* ── Loading ── */}
            {loading && (
              <CardGrid css={GRID_CSS}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <AnimalCardSkeleton key={i} />
                ))}
              </CardGrid>
            )}

            {/* ── Empty state: full-width CTA banner ── */}
            {emptyAndDoneLoading && (
              <CTABanner
                type="button"
                aria-label="Add your pet"
                onClick={handleAddPet}
                id="add-pet-cta-banner"
              >
                <CTAIconRing>
                  <HeartArrowIcon
                    width={36}
                    height={36}
                    css={{ color: '$main' }}
                  />
                </CTAIconRing>
                <CTAContent>
                  <Text
                    heading="h3"
                    css={{
                      color: '$main',
                      fontWeight: '$fontWeight$bold',
                      lineHeight: 1.3,
                    }}
                  >
                    {messages.browsePets.emptyTitle}
                  </Text>
                  <Text
                    heading="h8"
                    css={{ color: '$slateGray', lineHeight: 1.6 }}
                  >
                    {messages.browsePets.emptySubtitle}
                  </Text>
                </CTAContent>
                <CTAButton>
                  {messages.browsePets.ctaButton}
                </CTAButton>
              </CTABanner>
            )}

            {/* ── Has results: grid ── */}
            {hasResults && (
              <CardGrid css={GRID_CSS}>
                {filtered.map((animal: TAnimal) => (
                  <AnimalCard
                    key={animal.id}
                    image={animal.image}
                    name={animal.name}
                    breed={animal.breed ?? ''}
                    age={`${animal.age} yr${animal.age !== 1 ? 's' : ''}`}
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

        <AnimalDetailModal
          isOpen={!!selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
          animal={selectedAnimal}
        />
      </Container>
    </PageRoot>
  );
}
