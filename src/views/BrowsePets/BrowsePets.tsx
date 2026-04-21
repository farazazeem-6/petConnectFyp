'use client';

// ─── BrowsePets View ─────────────────────────────────────────────
// Main page layout for browsing adoptable pets.
// Renders: FilterSidebar (left) + pet card grid (right).
// Mobile (≤768px): sidebar converts to a slide-in drawer from left.
// ─────────────────────────────────────────────────────────────────

import React, { useCallback, useMemo, useState } from 'react';
import { styled } from '@/theme';
import { Box } from '@/components/elements/Box';
import { Flex } from '@/components/elements/Flex';
import { Text } from '@/components/elements/Text';
import { AnimalCard } from '@/components/ui/AnimalCard';
import { AnimalCardSkeleton } from '@/components/ui/AnimalCard';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import type { FilterState } from '@/components/ui/FilterSidebar';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchAnimals } from '@/store/animal';
import type { RootState } from '@/store/store';
import type { Animal } from '@/utils/types';

// ─── Default filter state ─────────────────────────────────────
const defaultFilters: FilterState = {
  animalTypes: [],
  breed: 'all',
  minAge: '',
  maxAge: '',
  city: '',
  gender: '',
  vaccinated: false,
};

// ─── Layout styled components ─────────────────────────────────

// Page root — light background, full height
const PageRoot = styled(Box, {
  minHeight: '100dvh',
  backgroundColor: '$colorGray',
  paddingTop: '$px$24',
  paddingBottom: '$px$48',
});

// Max-width container with responsive padding
const PageContainer = styled(Box, {
  maxWidth: '$px$1200',
  margin: '0 auto',
  paddingInline: '$px$24',
  '@md_max': { paddingInline: '$px$16' },
  '@sm_max': { paddingInline: '$px$12' },
});

// Top bar — page heading on left, mobile filter button on right
const TopBar = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$px$24',
  gap: '$px$12',
});

// Two-column layout: sidebar + grid
const ContentRow = styled(Flex, {
  alignItems: 'flex-start',
  gap: '$px$24',
  // On mobile sidebar is a fixed drawer, so no column stacking needed
  '@md_max': { gap: 0 },
});

// Right-hand grid area
const GridArea = styled(Box, {
  flex: 1,
  minWidth: 0, // prevent flex item overflow
});

// Responsive cards grid
const PetGrid = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '$px$20',
  '@lg_max': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@sm_max': { gridTemplateColumns: '1fr' },
});

// Results count row above the grid
const ResultsBar = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$px$16',
  paddingBottom: '$px$12',
  borderBottom: '1px solid $lightGrayLine',
});

// Empty state when no pets match filters
const EmptyState = styled(Flex, {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$px$60',
  gap: '$px$12',
  backgroundColor: '$white',
  borderRadius: '$radius$lg',
  border: '1px dashed $lightGrayLine',
});

// "Filters" icon button — only visible on mobile (≤md) to open the drawer
const MobileFilterBtn = styled('button', {
  display: 'none',
  '@md_max': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '$px$8',
    padding: '$px$10 $px$18',
    backgroundColor: '$main',
    color: '$white',
    border: 'none',
    borderRadius: '$radius$full',
    fontSize: '$rem$0_87',
    fontWeight: '$fontWeight$semibold',
    cursor: 'pointer',
    boxShadow: '$md',
    transition: 'background 0.2s ease',
    '&:hover': { backgroundColor: '$darkMain' },
  },
});

// ─── Filter icon SVG ──────────────────────────────────────────
function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────

export function BrowsePets() {
  const dispatch = useAppDispatch();
  const { list: animals, loading } = useAppSelector((s: RootState) => s.animal);

  // Drawer open/close state (controls mobile sidebar)
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Active filter state
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Fetch animals from Firebase on mount
  React.useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const handleClose = useCallback(() => setDrawerOpen(false), []);
  const handleToggle = useCallback(() => setDrawerOpen((v) => !v), []);
  const handleReset = useCallback(() => setFilters(defaultFilters), []);

  // ── Client-side filter logic ────────────────────────────────
  const filtered = useMemo(() => {
    return animals.filter((a: Animal) => {
      if (filters.animalTypes.length > 0 && !filters.animalTypes.includes(a.type)) return false;
      if (filters.breed !== 'all' && filters.breed && a.breed !== filters.breed) return false;
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

        {/* ── Page heading + mobile drawer trigger ── */}
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

          {/* Mobile-only button to open the filter drawer */}
          <MobileFilterBtn
            type="button"
            aria-label="Open filter panel"
            onClick={handleToggle}
          >
            <FilterIcon />
            Filters
          </MobileFilterBtn>
        </TopBar>

        {/* ── Sidebar + Grid row ───────────────────── */}
        <ContentRow>

          {/* LEFT: Filter Sidebar
              • Desktop — static sticky panel
              • Mobile  — fixed drawer sliding from the left       */}
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            isOpen={drawerOpen}
            onClose={handleClose}
            onToggle={handleToggle}
          />

          {/* RIGHT: Pet card grid */}
          <GridArea>
            {/* Results count */}
            <ResultsBar>
              <Text heading="h8" css={{ color: '$slateGray', fontSize: '$rem$0_87' }}>
                {loading ? 'Loading…' : `${filtered.length} pets found`}
              </Text>
            </ResultsBar>

            {loading ? (
              /* Loading skeletons */
              <PetGrid>
                {Array.from({ length: 6 }).map((_, i) => (
                  <AnimalCardSkeleton key={i} />
                ))}
              </PetGrid>
            ) : filtered.length === 0 ? (
              /* No results */
              <EmptyState>
                <Text css={{ fontSize: '$rem$2_5' }}>🐾</Text>
                <Text heading="h5" css={{ color: '$main', fontWeight: '$fontWeight$semibold' }}>
                  No pets found
                </Text>
                <Text heading="h8" css={{ color: '$slateGray', textAlign: 'center' }}>
                  Try adjusting your filters to discover more pets.
                </Text>
              </EmptyState>
            ) : (
              /* Pet cards */
              <PetGrid>
                {filtered.map((animal: Animal) => (
                  <AnimalCard
                    key={animal.id}
                    image={animal.image}
                    name={animal.name}
                    breed={animal.breed ?? '—'}
                    age={`${animal.age} yr${animal.age !== 1 ? 's' : ''}`}
                    badges={[
                      animal.vaccinated ? 'Vaccinated' : '',
                      animal.neutered ? 'Neutered' : '',
                      animal.status === 'available' ? 'Available' : 'Adopted',
                    ].filter(Boolean) as string[]}
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
