'use client';
import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Text, Flex, Container, CardGrid, Button } from '@/components/elements';
import { useAuth } from '@/hooks';
import {
  AnimalCard,
  AnimalCardSkeleton,
  FilterSidebar,
  LostFoundDetailModal,
} from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchLostFoundReports } from '@/store';
import type { RootState } from '@/store/store';
import type {
  TLostFoundReport,
  TFilterState,
  ReportTypeFilter,
  TabPillProps,
} from '@/utils/types';
import { messages, LOST_FOUND_TABS } from '@/constants';
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
  FilterTopButton,
} from './LostFound.style';
import {
  FilterIcon,
  PawIcon,
  SearchIcon,
  LocationIcon,
} from '@/components/svgs';

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

// ── Filter Buttons ──────────────────────────────────────────────────
function TabPill({ id, label, icon, active, onClick }: TabPillProps) {
  return (
    <FilterTopButton variant={'default'} active={active} id={id} type="button" onClick={onClick}>
      {icon}
      {label}
    </FilterTopButton>
  );
}

export function LostFound() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();
  const { list: reports, loading } = useAppSelector(
    (s: RootState) => s.lostFound,
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<TFilterState>(defaultFilters);
  const [reportTypeFilter, setReportTypeFilter] =
    useState<ReportTypeFilter>('all');
  const [selectedReport, setSelectedReport] = useState<TLostFoundReport | null>(
    null,
  );

  React.useEffect(() => {
    dispatch(fetchLostFoundReports());
  }, [dispatch]);

  const handleClose = useCallback(() => setDrawerOpen(false), []);
  const handleToggle = useCallback(() => setDrawerOpen((v) => !v), []);
  const handleReset = useCallback(() => setFilters(defaultFilters), []);

  const handleAddReport = useCallback(() => {
    if (!user) {
      toast.error(messages.errors.reportLogin);
      router.push('/auth');
    } else {
      router.push('/report-animal');
    }
  }, [user, router]);

  const filtered = useMemo(() => {
    return reports.filter((r: TLostFoundReport) => {
      if (user && r.userId === user.uid) return false;
      if (reportTypeFilter !== 'all' && r.reportType !== reportTypeFilter)
        return false;
      if (filters.animalType && r.type !== filters.animalType) return false;
      if (filters.breed && r.breed !== filters.breed) return false;
      if (filters.gender && r.sex !== filters.gender) return false;
      return true;
    });
  }, [reports, filters, reportTypeFilter, user]);

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
                {messages.lostFound.title}
              </Text>
              <Text heading="h8" css={{ color: '$slateGray' }}>
                {messages.lostFound.subtitle}
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

        {/* ── Report-type tab pills ── */}
        <Flex css={{ gap: '$px$8', marginBottom: '$px$16', flexWrap: 'wrap' }}>
          {LOST_FOUND_TABS.map(({ label, value, id, icon }) => (
            <TabPill
              key={value}
              id={id}
              label={label}
              icon={icon(reportTypeFilter === value)}
              active={reportTypeFilter === value}
              onClick={() => setReportTypeFilter(value)}
            />
          ))}
        </Flex>

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
                {!loading &&
                  `${filtered.length} report${filtered.length !== 1 ? 's' : ''} found`}
              </Text>
              <AddActionButton
                type="button"
                id="add-report-btn"
                aria-label="Report an animal"
                onClick={handleAddReport}
              >
                {messages.lostFound.ctaButton}
              </AddActionButton>
            </AddActionBar>

            {/* ── Loading state ── */}
            {loading && (
              <CardGrid css={GRID_CSS}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <AnimalCardSkeleton key={i} variant="report" />
                ))}
              </CardGrid>
            )}

            {/* ── Empty state: full-width CTA banner ── */}
            {emptyAndDoneLoading && (
              <>
                <CTABanner
                  type="button"
                  aria-label="Report an animal"
                  onClick={handleAddReport}
                  id="report-cta-banner"
                >
                  <CTAIconRing>
                    <PawIcon
                      width={36}
                      height={36}
                      css={{ color: '$main', fill: '$main' }}
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
                      {messages.lostFound.emptyTitle}
                    </Text>
                    <Text
                      heading="h8"
                      css={{ color: '$slateGray', lineHeight: 1.6 }}
                    >
                      {messages.lostFound.emptySubtitle}
                    </Text>
                  </CTAContent>
                  <CTAButton>
                    <SearchIcon
                      width={16}
                      height={16}
                      css={{ color: '$white' }}
                    />
                    {messages.lostFound.foundReportButton}
                  </CTAButton>
                </CTABanner>
              </>
            )}

            {/* ── Has results: grid ── */}
            {hasResults && (
              <CardGrid css={GRID_CSS}>
                {filtered.map((report: TLostFoundReport) => (
                  <AnimalCard
                    key={report.id}
                    variant="report"
                    image={report.image}
                    name={report.name}
                    breed={report.breed}
                    color={report.color}
                    location={report.lastSeenLocation}
                    reportType={report.reportType}
                    dateSeen={report.lastSeenDate}
                    reportStatus={report.status}
                    badges={[]}
                    onViewDetail={() => setSelectedReport(report)}
                  />
                ))}
              </CardGrid>
            )}
          </GridArea>
        </ContentRow>
      </Container>

      <LostFoundDetailModal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
      />
    </PageRoot>
  );
}
