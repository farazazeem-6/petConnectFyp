'use client';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, Flex } from '@/components/elements';
import {
  AnimalCard,
  AnimalCardSkeleton,
  FilterSidebar,
} from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchAnimals } from '@/store/animal';
import type { RootState } from '@/store/store';
import type { TAnimal, TFilterState } from '@/utils/types';
import {
  ContentRow,
  GridArea,
  MobileFilterBtn,
  PageContainer,
  PageRoot,
  PetGrid,
  ResultsBar,
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
  const { list: animals, loading } = useAppSelector((s: RootState) => s.animal);

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

  // ── Client-side filter logic ────────────────────────────────
  const filtered = useMemo(() => {
    return animals.filter((a: TAnimal) => {
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
      <PageContainer>
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

        <ContentRow>
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            isOpen={drawerOpen}
            onClose={handleClose}
          />

          <GridArea>
            <ResultsBar>
              <Text
                heading="h8"
                css={{ color: '$slateGray', fontSize: '$rem$0_87' }}
              >
                {loading ? 'Loading…' : `${filtered.length} pets found`}
              </Text>
            </ResultsBar>

            {loading ? (
              <PetGrid>
                {Array.from({ length: 6 }).map((_, i) => (
                  <AnimalCardSkeleton key={i} />
                ))}
              </PetGrid>
            ) : filtered.length === 0 ? (
              <EmptyPlaceholder
                title="No pets found"
                subtitle="Try adjusting your filters to discover more pets."
                icon={
                  <PawIcon css={{ color: '$main' }} width={48} height={48} />
                }
              />
            ) : (
              <PetGrid>
                {filtered.map((animal: TAnimal) => (
                  <AnimalCard
                    key={animal.id}
                    image={animal.image}
                    name={animal.name}
                    breed={animal.breed ?? ''}
                    age={`${animal.age} yr${animal.age !== 1 ? 's' : ''}`}
                    badges={
                      [
                        animal.vaccinated ? 'Vaccinated' : '',
                        animal.neutered ? 'Neutered' : '',
                        animal.status === 'available' ? 'Available' : 'Adopted',
                      ].filter(Boolean) as string[]
                    }
                  />
                ))}
              </PetGrid>
            )}
          </GridArea>
        </ContentRow>
      </PageContainer>
    </PageRoot>
  );
}
