'use client';

// ─── FilterSidebar ────────────────────────────────────────────────
// Reusable sidebar filter panel for any browse/list page.
// • Desktop  → static sidebar on the left
// • ≤ 768px  → hidden drawer; slides in from the left on trigger
// ─────────────────────────────────────────────────────────────────

import React, { useCallback } from 'react';
import { Text } from '@/components/elements/Text';
import { Flex } from '@/components/elements/Flex';
import {
  AgeFieldWrapper,
  AgeInput,
  AgeLabel,
  AgeRangeRow,
  CheckboxRow,
  DrawerCloseBtn,
  DrawerOverlay,
  FilterSection,
  RadioRow,
  ResetButton,
  SectionLabel,
  SidebarHeader,
  SidebarInner,
  SidebarRoot,
  StyledCheckbox,
  StyledRadio,
  StyledSelect,
} from './FilterSidebar.style';

// ─── Types ────────────────────────────────────────────────────────

export interface FilterState {
  animalTypes: string[];   // e.g. ['dog', 'cat']
  breed: string;           // 'all' or a specific breed
  minAge: string;
  maxAge: string;
  city: string;
  gender: string;          // '' | 'male' | 'female'
  vaccinated: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updated: FilterState) => void;
  onReset: () => void;
  isOpen: boolean;         // controls mobile drawer open state
  onClose: () => void;     // closes the drawer
  onToggle: () => void;    // opens the drawer (used by trigger button)
  // Data for dynamic selects
  breedOptions?: string[];
  cityOptions?: string[];
}

// ─── Section icon helper (tiny emoji/icon) ────────────────────────
function SectionIcon({ label }: { label: string }) {
  const icons: Record<string, string> = {
    'Animal Type': '🐾',
    Breed: '🐕',
    'Age Range': '📅',
    Location: '📍',
    Gender: '⚥',
    Vaccinated: '💉',
  };
  return <span aria-hidden="true">{icons[label] ?? '•'}</span>;
}

// ─── Component ────────────────────────────────────────────────────

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  isOpen,
  onClose,
  onToggle,
  breedOptions = ['All Breeds', 'Labrador', 'Poodle', 'Persian', 'Siamese', 'Budgerigar'],
  cityOptions = ['Select City', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar'],
}: FilterSidebarProps) {

  // ── Helpers ────────────────────────────────────────────────────

  // Toggle an animal type on/off
  const toggleType = useCallback(
    (type: string) => {
      const already = filters.animalTypes.includes(type);
      onChange({
        ...filters,
        animalTypes: already
          ? filters.animalTypes.filter((t) => t !== type)
          : [...filters.animalTypes, type],
      });
    },
    [filters, onChange],
  );

  // Generic field update helper
  const set = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      onChange({ ...filters, [key]: value });
    },
    [filters, onChange],
  );

  // ── Shared sidebar content (desktop + drawer share same JSX) ───
  const content = (
    <SidebarInner>

      {/* ── Header ─────────────────────────────────────────────── */}
      <SidebarHeader>
        <Flex align="center" justify="between" css={{ width: '100%' }}>
          <Flex direction="column" css={{ gap: '2px' }}>
            <Text
              as="p"
              heading="h5Bold"
              css={{ color: '$main', fontSize: '$rem$1', letterSpacing: '0.01em' }}
            >
              Filter Results
            </Text>
            <Text
              as="p"
              heading="h9"
              css={{ color: '$slateGray', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Refine Your Search
            </Text>
          </Flex>

          {/* "×" button — visible only in mobile drawer */}
          <DrawerCloseBtn
            type="button"
            aria-label="Close filters"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </DrawerCloseBtn>
        </Flex>
      </SidebarHeader>

      {/* ── 1. Animal Type (checkboxes) ──────────────────────── */}
      <FilterSection>
        <SectionLabel>
          <SectionIcon label="Animal Type" />
          <Text
            heading="h9"
            css={{
              color: '$foreground',
              fontSize: '$rem$0_75',
              fontWeight: '$fontWeight$semibold',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Animal Type
          </Text>
        </SectionLabel>

        {['Dog', 'Cat', 'Bird'].map((type) => {
          const val = type.toLowerCase();
          const checked = filters.animalTypes.includes(val);
          return (
            <CheckboxRow
              key={val}
              as="label"
              htmlFor={`animal-type-${val}`}
              aria-label={`Filter by ${type}`}
            >
              <StyledCheckbox
                id={`animal-type-${val}`}
                type="checkbox"
                checked={checked}
                onChange={() => toggleType(val)}
              />
              <Text heading="h8Bold" css={{ fontSize: '$rem$0_87', color: '$foreground' }}>
                {type}
              </Text>
            </CheckboxRow>
          );
        })}
      </FilterSection>

      {/* ── 2. Breed (native select) ─────────────────────────── */}
      <FilterSection>
        <SectionLabel>
          <SectionIcon label="Breed" />
          <Text
            heading="h9"
            css={{
              fontSize: '$rem$0_75',
              fontWeight: '$fontWeight$semibold',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Breed
          </Text>
        </SectionLabel>

        <StyledSelect
          id="filter-breed"
          aria-label="Filter by breed"
          value={filters.breed}
          onChange={(e) => set('breed', e.target.value)}
        >
          {breedOptions.map((b) => (
            <option key={b} value={b === 'All Breeds' ? 'all' : b}>
              {b}
            </option>
          ))}
        </StyledSelect>
      </FilterSection>

      {/* ── 3. Age Range (two number inputs) ─────────────────── */}
      <FilterSection>
        <SectionLabel>
          <SectionIcon label="Age Range" />
          <Text
            heading="h9"
            css={{
              fontSize: '$rem$0_75',
              fontWeight: '$fontWeight$semibold',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Age Range
          </Text>
        </SectionLabel>

        <AgeRangeRow>
          {/* Min age */}
          <AgeFieldWrapper>
            <AgeLabel as="label" htmlFor="filter-min-age">Min Age</AgeLabel>
            <AgeInput
              id="filter-min-age"
              type="number"
              min={0}
              max={30}
              placeholder="0"
              value={filters.minAge}
              onChange={(e) => set('minAge', e.target.value)}
              aria-label="Minimum age in years"
            />
          </AgeFieldWrapper>

          {/* Max age */}
          <AgeFieldWrapper>
            <AgeLabel as="label" htmlFor="filter-max-age">Max Age</AgeLabel>
            <AgeInput
              id="filter-max-age"
              type="number"
              min={0}
              max={30}
              placeholder="15"
              value={filters.maxAge}
              onChange={(e) => set('maxAge', e.target.value)}
              aria-label="Maximum age in years"
            />
          </AgeFieldWrapper>
        </AgeRangeRow>
      </FilterSection>

      {/* ── 4. Location (native select) ──────────────────────── */}
      <FilterSection>
        <SectionLabel>
          <SectionIcon label="Location" />
          <Text
            heading="h9"
            css={{
              fontSize: '$rem$0_75',
              fontWeight: '$fontWeight$semibold',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Location
          </Text>
        </SectionLabel>

        <StyledSelect
          id="filter-city"
          aria-label="Filter by city"
          value={filters.city}
          onChange={(e) => set('city', e.target.value)}
        >
          {cityOptions.map((c) => (
            <option key={c} value={c === 'Select City' ? '' : c}>
              {c}
            </option>
          ))}
        </StyledSelect>
      </FilterSection>

      {/* ── 5. Gender (radio buttons) ─────────────────────────── */}
      <FilterSection>
        <SectionLabel>
          <SectionIcon label="Gender" />
          <Text
            heading="h9"
            css={{
              fontSize: '$rem$0_75',
              fontWeight: '$fontWeight$semibold',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Gender
          </Text>
        </SectionLabel>

        {['Male', 'Female'].map((g) => {
          const val = g.toLowerCase();
          return (
            <RadioRow
              key={val}
              as="label"
              htmlFor={`filter-gender-${val}`}
              aria-label={`Filter by ${g}`}
            >
              <StyledRadio
                id={`filter-gender-${val}`}
                type="radio"
                name="filter-gender"
                value={val}
                checked={filters.gender === val}
                onChange={() => set('gender', val)}
              />
              <Text heading="h8Bold" css={{ fontSize: '$rem$0_87', color: '$foreground' }}>
                {g}
              </Text>
            </RadioRow>
          );
        })}
      </FilterSection>

      {/* ── 6. Vaccinated (single checkbox) ──────────────────── */}
      <FilterSection>
        <SectionLabel>
          <SectionIcon label="Vaccinated" />
          <Text
            heading="h9"
            css={{
              fontSize: '$rem$0_75',
              fontWeight: '$fontWeight$semibold',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Vaccinated
          </Text>
        </SectionLabel>

        <CheckboxRow
          as="label"
          htmlFor="filter-vaccinated"
          aria-label="Show only vaccinated pets"
        >
          <StyledCheckbox
            id="filter-vaccinated"
            type="checkbox"
            checked={filters.vaccinated}
            onChange={(e) => set('vaccinated', e.target.checked)}
          />
          <Text heading="h8Bold" css={{ fontSize: '$rem$0_87', color: '$foreground' }}>
            Vaccinated Only
          </Text>
        </CheckboxRow>
      </FilterSection>

      {/* ── Reset button ──────────────────────────────────────── */}
      <ResetButton
        type="button"
        variant="default"
        onClick={onReset}
        aria-label="Reset all filters"
      >
        Reset Filters
      </ResetButton>

    </SidebarInner>
  );

  // ── Render ────────────────────────────────────────────────────
  return (
    <>
      {/* Dark overlay — click it to close the drawer on mobile */}
      <DrawerOverlay
        role="presentation"
        data-open={isOpen ? 'true' : 'false'}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar / Drawer — CSS switches between static and fixed based on screen size */}
      <SidebarRoot
        as="aside"
        aria-label="Filter sidebar"
        data-open={isOpen ? 'true' : 'false'}
        id="filter-sidebar"
      >
        {content}
      </SidebarRoot>
    </>
  );
}
