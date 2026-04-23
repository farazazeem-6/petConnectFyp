'use client';
import React, { useCallback } from 'react';
import {
  ANIMAL_TYPE_OPTIONS,
  DEFAULT_BREED_OPTIONS,
  DEFAULT_CITY_OPTIONS,
  GENDER_OPTIONS,
} from '@/constants';
import {
  Checkbox,
  Flex,
  Radio,
  Selection,
  Input,
  Text,
} from '@/components/elements';
import {
  AgeFieldWrapper,
  AgeLabel,
  AgeRangeRow,
  DrawerOverlay,
  FilterSection,
  OptionRow,
  ResetButton,
  SectionLabel,
  SectionTitle,
  SidebarHeader,
  SidebarInner,
  SidebarRoot,
  SidebarScrollArea,
} from './FilterSidebar.style';
import { CloseIcon } from '@/components/svgs';
import { TFilterSidebarProps, TFilterState } from '@/utils/types';

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  isOpen,
  onClose,
  breedOptions = DEFAULT_BREED_OPTIONS,
  cityOptions = DEFAULT_CITY_OPTIONS,
}: TFilterSidebarProps) {
  const set = useCallback(
    <K extends keyof TFilterState>(key: K, value: TFilterState[K]) =>
      onChange({ ...filters, [key]: value }),
    [filters, onChange],
  );

  return (
    <>
      <DrawerOverlay
        role="presentation"
        aria-hidden="true"
        data-open={isOpen ? 'true' : 'false'}
        onClick={onClose}
      />

      <SidebarRoot
        as="aside"
        aria-label="Filter sidebar"
        data-open={isOpen ? 'true' : 'false'}
        id="filter-sidebar"
      >
        <SidebarHeader>
          <Flex align="center" justify="between" css={{ width: '100%' }}>
            <Flex direction="column" css={{ gap: '$px$2' }}>
              <Text as="p" heading="h3" css={{ color: '$main' }}>
                Filter Results
              </Text>
            </Flex>
            <CloseIcon onClick={onClose} />
          </Flex>
        </SidebarHeader>

        <SidebarScrollArea>
          <SidebarInner>
            <FilterSection>
              <SectionLabel>
                <SectionTitle as="p">Animal Type</SectionTitle>
              </SectionLabel>
              <Selection
                options={ANIMAL_TYPE_OPTIONS}
                value={filters.animalType}
                onChange={(val) => set('animalType', val)}
                placeholder="Select an Animal"
                enableSearch={false}
                enableClear={false}
              />
            </FilterSection>

            <FilterSection>
              <SectionLabel>
                <SectionTitle as="p">Breed</SectionTitle>
              </SectionLabel>
              <Selection
                options={breedOptions.map((breed) => ({
                  label: breed,
                  value: breed,
                }))}
                value={filters.breed}
                onChange={(val) => set('breed', val)}
                placeholder="Select a Breed"
                enableSearch={false}
                enableClear={false}
              />
            </FilterSection>

            <FilterSection>
              <SectionLabel>
                <SectionTitle as="p">Age Range</SectionTitle>
              </SectionLabel>
              <AgeRangeRow>
                <AgeFieldWrapper>
                  <AgeLabel as="label" htmlFor="filter-min-age">
                    Min
                  </AgeLabel>
                  <Input
                    id="filter-min-age"
                    type="number"
                    inputSize="sm"
                    placeholder="0"
                    value={filters.minAge}
                    onChange={(e) => set('minAge', e.target.value)}
                    css={{ padding: '$px$15 $px$8', fontSize: '$px$12' }}
                  />
                </AgeFieldWrapper>
                <AgeFieldWrapper>
                  <AgeLabel as="label" htmlFor="filter-max-age">
                    Max
                  </AgeLabel>
                  <Input
                    id="filter-max-age"
                    type="number"
                    inputSize="sm"
                    placeholder="15"
                    value={filters.maxAge}
                    onChange={(e) => set('maxAge', e.target.value)}
                    css={{ padding: '$px$15 $px$8', fontSize: '$px$12' }}
                  />
                </AgeFieldWrapper>
              </AgeRangeRow>
            </FilterSection>

            <FilterSection>
              <SectionLabel>
                <SectionTitle as="p">Location</SectionTitle>
              </SectionLabel>
              <Selection
                options={cityOptions.map((city) => ({
                  label: city,
                  value: city,
                }))}
                value={filters.city}
                onChange={(val) => set('city', val)}
                placeholder="Select a City"
                enableSearch={false}
                enableClear={false}
              />
            </FilterSection>

            <FilterSection>
              <SectionLabel>
                <SectionTitle as="p">Gender</SectionTitle>
              </SectionLabel>
              {GENDER_OPTIONS.map((g) => {
                const val = g.toLowerCase();
                return (
                  <OptionRow key={val}>
                    <Radio
                      id={`filter-gender-${val}`}
                      name="filter-gender"
                      value={val}
                      checked={filters.gender === val}
                      onChange={() => set('gender', val)}
                    />
                    <label
                      htmlFor={`filter-gender-${val}`}
                      style={{ cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                      {g}
                    </label>
                  </OptionRow>
                );
              })}
            </FilterSection>

            <FilterSection>
              <SectionLabel>
                <SectionTitle as="p">Vaccinated</SectionTitle>
              </SectionLabel>
              <OptionRow>
                <Checkbox
                  id="filter-vaccinated"
                  size="sm"
                  checked={filters.vaccinated}
                  onCheckedChange={(val) => set('vaccinated', val === true)}
                  css={{
                    backgroundColor: filters.vaccinated ? '$main' : '#E6E6E8',
                    '&[data-state="checked"]': { backgroundColor: '$main' },
                  }}
                />
                <label
                  htmlFor="filter-vaccinated"
                  style={{ cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Vaccinated Only
                </label>
              </OptionRow>
            </FilterSection>

            <ResetButton
              type="button"
              onClick={onReset}
              aria-label="Reset all filters"
            >
              Reset Filters
            </ResetButton>
          </SidebarInner>
        </SidebarScrollArea>
      </SidebarRoot>
    </>
  );
}
