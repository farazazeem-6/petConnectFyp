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
  AddPetCard,
  AddPetIcon,
  BrowseHeading,
  ContentRow,
  GridArea,
  MobileFilterBtn,
  PageRoot,
  TopBar,
} from './BrowsePets.style';
import { FilterIcon, PawIcon } from '@/components/svgs';
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

export function BrowsePets() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();
  const { list: animals, loading } = useAppSelector((s: RootState) => s.animal);
  const [selectedAnimal, setSelectedAnimal] = useState<TAnimal | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Active filter state
  const [filters, setFilters] = useState<TFilterState>(defaultFilters);

  // Fetch animals from Firebase on mount
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

  // ── Client-side filter logic ────────────────────────────────
  const filtered = useMemo(() => {
    return animals.filter((a: TAnimal) => {
      // user cannot saw his own listing
      if (user && a.userId === user.uid) return false;
      // Animal type — single-select, '' means no filter
      if (filters.animalType && a.type !== filters.animalType) return false;
      // Breed — '' means no filter
      if (filters.breed && a.breed !== filters.breed) return false;
      if (filters.minAge !== '' && a.age < Number(filters.minAge)) return false;
      if (filters.maxAge !== '' && a.age > Number(filters.maxAge)) return false;
      if (filters.city && a.city !== filters.city) return false;
      if (filters.gender && a.sex !== filters.gender) return false;
      if (filters.vaccinated && !a.vaccinated) return false;
      return true;
    });
  }, [animals, filters]);

  return (
    <PageRoot>
      <Container>
        {/* Heading: hidden on desktop (md+), shown only on mobile */}
        <BrowseHeading>
          <TopBar>
            <Flex direction="column" css={{ gap: '4px' }}>
              <Text
                as="h1"
                heading="h3"
                css={{ color: '$main', fontWeight: '$fontWeight$bold' }}
              >
                Browse Pets
              </Text>
              <Text heading="h8" css={{ color: '$slateGray' }}>
                Find your perfect companion
              </Text>
            </Flex>

            <MobileFilterBtn
              type="button"
              aria-label="Open filter panel"
              onClick={handleToggle}
            >
              <FilterIcon css={{ color: '$white' }} width={16} height={16} />
              Filters
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
            {loading ? (
              <CardGrid
                css={{
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '$px$10',
                  '@lg_max': { gridTemplateColumns: 'repeat(3, 1fr)' },
                  '@md_max': {
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '$px$8',
                  },
                }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <AnimalCardSkeleton key={i} />
                ))}
              </CardGrid>
            ) : filtered.length === 0 ? (
              <EmptyPlaceholder
                title="No pets found"
                subtitle="Try adjusting your filters to discover more pets."
                icon={
                  <PawIcon css={{ color: '$main' }} width={48} height={48} />
                }
              />
            ) : (
              <CardGrid
                css={{
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '$px$10',
                  '@lg_max': { gridTemplateColumns: 'repeat(3, 1fr)' },
                  '@md_max': {
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '$px$8',
                  },
                }}
              >
                {/* "Add Your Pet" placeholder — navigates to create-listing */}
                <AddPetCard
                  role="button"
                  tabIndex={0}
                  aria-label="Add your pet"
                  onClick={handleAddPet}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPet()}
                >
                  <AddPetIcon aria-hidden="true">+</AddPetIcon>
                  <Text
                    heading="h5"
                    css={{
                      color: '$main',
                      fontWeight: '$fontWeight$semibold',
                      textAlign: 'center',
                    }}
                  >
                    Add Your Pet
                  </Text>
                </AddPetCard>

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
