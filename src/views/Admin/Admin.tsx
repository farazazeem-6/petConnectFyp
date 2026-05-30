'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import { AlertModal } from '@/components/ui';
import { Selection } from '@/components/elements';
import { StaticRoutes } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  deleteAnimal,
  deleteLostFoundReport,
  fetchAdminDashboardData,
  deleteUserAccount,
  updateUserRole,
} from '@/lib/firebase';
import { deleteRegisteredAnimal } from '@/lib/firebase/registration.service';
import { updateUserRole as updateAuthUserRole } from '@/store/auth/authSlice';
import {
  isAdminRole,
  TAdminUser,
  TAnimal,
  TLostFoundReport,
  TRegisteredAnimal,
  UserRole,
} from '@/utils/types';
import { CrownIcon } from '@/components/svgs';
import { RowActionsMenu } from './components/RowActionsMenu';
import {
  ADMIN_MESSAGES,
  ADMIN_TABS,
  AdminTab,
  CITY_FILTER_OPTIONS,
  REPORT_TYPE_FILTER_OPTIONS,
  ROLE_FILTER_OPTIONS,
  TYPE_FILTER_OPTIONS,
} from './constants';
import {
  AdminWrapper,
  CountLabel,
  EmptyState,
  FiltersBar,
  MonoText,
  PetThumb,
  RoleBadge,
  SearchInput,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
  StatusBadge,
  TabBar,
  TabButton,
  Table,
  TableCard,
  TableHeaderRow,
  TableScroll,
  TableTitle,
  Td,
  Th,
  UserAvatar,
  UserCell,
  UserEmail,
  UserMeta,
  UserName,
} from './Admin.style';
import { capitalize, formatDisplayDate, truncateId } from './utils';

type DeleteTarget =
  | { type: 'user'; item: TAdminUser }
  | { type: 'donation'; item: TAnimal }
  | { type: 'lostFound'; item: TLostFoundReport }
  | { type: 'registered'; item: TRegisteredAnimal };

export const Admin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [users, setUsers] = useState<TAdminUser[]>([]);
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [reports, setReports] = useState<TLostFoundReport[]>([]);
  const [registeredAnimals, setRegisteredAnimals] = useState<TRegisteredAnimal[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [reportTypeFilter, setReportTypeFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && (!user || !isAdminRole(user.role))) {
      toast.error(ADMIN_MESSAGES.accessDenied);
      router.replace(StaticRoutes.HOME);
    }
  }, [user, authLoading, router]);

  const loadData = useCallback(async () => {
    setDataLoading(true);
    try {
      const data = await fetchAdminDashboardData();
      setUsers(data.users);
      setAnimals(data.animals);
      setReports(data.lostFoundReports);
      setRegisteredAnimals(data.registeredAnimals);
    } catch {
      toast.error('[Admin] load failed');
      toast.error(ADMIN_MESSAGES.loadError);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user && isAdminRole(user.role)) {
      loadData();
    }
  }, [authLoading, user, loadData]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.uid.toLowerCase().includes(query);

      const matchesRole = roleFilter === 'all' || item.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const filteredAnimals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return animals.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.petId?.toLowerCase().includes(query) ||
        item.userId.toLowerCase().includes(query);

      const matchesCity =
        cityFilter === 'all' || item.city?.toLowerCase() === cityFilter;

      const matchesType = typeFilter === 'all' || item.type === typeFilter;

      return matchesSearch && matchesCity && matchesType;
    });
  }, [animals, search, cityFilter, typeFilter]);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.userId.toLowerCase().includes(query) ||
        item.lastSeenLocation.toLowerCase().includes(query);

      const matchesCity =
        cityFilter === 'all' ||
        item.lastSeenLocation.toLowerCase().includes(cityFilter);

      const matchesType = typeFilter === 'all' || item.type === typeFilter;

      const matchesReportType =
        reportTypeFilter === 'all' || item.reportType === reportTypeFilter;

      return matchesSearch && matchesCity && matchesType && matchesReportType;
    });
  }, [reports, search, cityFilter, typeFilter, reportTypeFilter]);

  const filteredRegisteredAnimals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return registeredAnimals.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.registrationId?.toLowerCase().includes(query) ||
        item.ownerName.toLowerCase().includes(query) ||
        item.userId.toLowerCase().includes(query);

      const matchesCity =
        cityFilter === 'all' || item.city?.toLowerCase() === cityFilter;

      const matchesType = typeFilter === 'all' || item.type === typeFilter;

      return matchesSearch && matchesCity && matchesType;
    });
  }, [registeredAnimals, search, cityFilter, typeFilter]);

  const handleToggleRole = async (target: TAdminUser) => {
    const nextRole: UserRole = target.role === 'admin' ? 'user' : 'admin';

    try {
      setActionLoading(true);
      await updateUserRole(target.uid, nextRole);
      setUsers((prev) =>
        prev.map((item) =>
          item.uid === target.uid ? { ...item, role: nextRole } : item,
        ),
      );

      if (user?.uid === target.uid) {
        dispatch(updateAuthUserRole(nextRole));
      }

      toast.success(ADMIN_MESSAGES.roleUpdated);
    } catch {
      toast.error('[Admin] role update failed');
      toast.error(ADMIN_MESSAGES.roleUpdateFailed);
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setActionLoading(true);

      if (deleteTarget.type === 'user') {
        await deleteUserAccount(deleteTarget.item.uid);
        setUsers((prev) =>
          prev.filter((item) => item.uid !== deleteTarget.item.uid),
        );
        setAnimals((prev) =>
          prev.filter((item) => item.userId !== deleteTarget.item.uid),
        );
        setReports((prev) =>
          prev.filter((item) => item.userId !== deleteTarget.item.uid),
        );
        setRegisteredAnimals((prev) =>
          prev.filter((item) => item.userId !== deleteTarget.item.uid),
        );
      }

      if (deleteTarget.type === 'donation' && deleteTarget.item.id) {
        await deleteAnimal(deleteTarget.item.id);
        setAnimals((prev) =>
          prev.filter((item) => item.id !== deleteTarget.item.id),
        );
      }

      if (deleteTarget.type === 'lostFound' && deleteTarget.item.id) {
        await deleteLostFoundReport(deleteTarget.item.id);
        setReports((prev) =>
          prev.filter((item) => item.id !== deleteTarget.item.id),
        );
      }

      if (deleteTarget.type === 'registered' && deleteTarget.item.id) {
        await deleteRegisteredAnimal(deleteTarget.item.id);
        setRegisteredAnimals((prev) =>
          prev.filter((item) => item.id !== deleteTarget.item.id),
        );
      }

      toast.success(ADMIN_MESSAGES.deleteSuccess);
      setDeleteTarget(null);
    } catch {
      toast.error('[Admin] delete failed');
      toast.error(ADMIN_MESSAGES.deleteFailed);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteModalCopy = useMemo(() => {
    if (!deleteTarget) return { title: '', subtitle: '' };

    if (deleteTarget.type === 'user') {
      return {
        title: ADMIN_MESSAGES.deleteUserTitle,
        subtitle: ADMIN_MESSAGES.deleteUserSubtitle,
      };
    }

    if (deleteTarget.type === 'donation') {
      return {
        title: ADMIN_MESSAGES.deleteAnimalTitle,
        subtitle: ADMIN_MESSAGES.deleteAnimalSubtitle,
      };
    }

    if (deleteTarget.type === 'registered') {
      return {
        title: ADMIN_MESSAGES.deleteRegisteredTitle,
        subtitle: ADMIN_MESSAGES.deleteRegisteredSubtitle,
      };
    }

    return {
      title: ADMIN_MESSAGES.deleteReportTitle,
      subtitle: ADMIN_MESSAGES.deleteReportSubtitle,
    };
  }, [deleteTarget]);

  if (authLoading || !user || !isAdminRole(user.role)) {
    return null;
  }

  return (
    <AdminWrapper>
      <DashBoardHeader
        heading={ADMIN_MESSAGES.heading}
        subHeading={ADMIN_MESSAGES.subHeading}
        icon={<CrownIcon width={25} height={25} css={{ color: '$white' }} />}
      />

      <StatsGrid>
        <StatCard>
          <StatLabel>Total Users</StatLabel>
          <StatValue>{users.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Donated Animals</StatLabel>
          <StatValue>{animals.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Registered Animals</StatLabel>
          <StatValue>{registeredAnimals.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Lost & Found Reports</StatLabel>
          <StatValue>{reports.length}</StatValue>
        </StatCard>
      </StatsGrid>

      <TabBar>
        {ADMIN_TABS.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabBar>

      <FiltersBar>
        <SearchInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={ADMIN_MESSAGES.searchUsers}
        />

        {activeTab === 'users' ? (
          <Selection
            options={ROLE_FILTER_OPTIONS}
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder={ADMIN_MESSAGES.filterRole}
            enableSearch={false}
            inputSize="md"
          />
        ) : (
          <>
            <Selection
              options={CITY_FILTER_OPTIONS}
              value={cityFilter}
              onChange={setCityFilter}
              placeholder={ADMIN_MESSAGES.filterCity}
              enableSearch
              inputSize="md"
            />
            <Selection
              options={TYPE_FILTER_OPTIONS}
              value={typeFilter}
              onChange={setTypeFilter}
              placeholder={ADMIN_MESSAGES.filterType}
              enableSearch={false}
              inputSize="md"
            />
            {activeTab === 'lostFound' && (
              <Selection
                options={REPORT_TYPE_FILTER_OPTIONS}
                value={reportTypeFilter}
                onChange={setReportTypeFilter}
                placeholder={ADMIN_MESSAGES.filterReportType}
                enableSearch={false}
                inputSize="md"
              />
            )}
          </>
        )}
      </FiltersBar>

      {activeTab === 'users' && (
        <TableCard>
          <TableHeaderRow>
            <TableTitle>User Accounts</TableTitle>
            <CountLabel>{filteredUsers.length} shown</CountLabel>
          </TableHeaderRow>
          <TableScroll>
            <Table>
              <thead>
                <tr>
                  <Th>User</Th>
                  <Th>User ID</Th>
                  <Th>Role</Th>
                  <Th>Created</Th>
                  <Th>Favourites</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {dataLoading ? (
                  <tr>
                    <Td colSpan={6}>
                      <EmptyState>Loading users…</EmptyState>
                    </Td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <Td colSpan={6}>
                      <EmptyState>No users match your filters.</EmptyState>
                    </Td>
                  </tr>
                ) : (
                  filteredUsers.map((item) => (
                    <tr key={item.uid}>
                      <Td>
                        <UserCell>
                          <UserAvatar src={item.photoURL} alt={item.name} />
                          <UserMeta>
                            <UserName>{item.name || 'Unnamed User'}</UserName>
                            <UserEmail>{item.email}</UserEmail>
                          </UserMeta>
                        </UserCell>
                      </Td>
                      <Td>
                        <MonoText title={item.uid}>
                          {truncateId(item.uid, 14)}
                        </MonoText>
                      </Td>
                      <Td>
                        <RoleBadge role={item.role}>{item.role}</RoleBadge>
                      </Td>
                      <Td>{formatDisplayDate(item.createdAt)}</Td>
                      <Td>{item.favouritePetIds?.length ?? 0}</Td>
                      <Td>
                        <RowActionsMenu
                          actions={[
                            {
                              label:
                                item.role === 'admin'
                                  ? 'Switch to User'
                                  : 'Switch to Admin',
                              onClick: () => handleToggleRole(item),
                            },
                            {
                              label: 'Delete User',
                              danger: true,
                              onClick: () => {
                                if (item.uid === user.uid) {
                                  toast.error(
                                    'You cannot delete your own account.',
                                  );
                                  return;
                                }
                                setDeleteTarget({ type: 'user', item });
                              },
                            },
                          ]}
                        />
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </TableScroll>
        </TableCard>
      )}

      {activeTab === 'donations' && (
        <TableCard>
          <TableHeaderRow>
            <TableTitle>Donated Animals</TableTitle>
            <CountLabel>{filteredAnimals.length} shown</CountLabel>
          </TableHeaderRow>
          <TableScroll>
            <Table>
              <thead>
                <tr>
                  <Th>Pet</Th>
                  <Th>Pet ID</Th>
                  <Th>Type</Th>
                  <Th>City</Th>
                  <Th>Status</Th>
                  <Th>Owner ID</Th>
                  <Th>Created</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {dataLoading ? (
                  <tr>
                    <Td colSpan={8}>
                      <EmptyState>Loading donated animals…</EmptyState>
                    </Td>
                  </tr>
                ) : filteredAnimals.length === 0 ? (
                  <tr>
                    <Td colSpan={8}>
                      <EmptyState>
                        No donated animals match your filters.
                      </EmptyState>
                    </Td>
                  </tr>
                ) : (
                  filteredAnimals.map((item) => (
                    <tr key={item.id}>
                      <Td>
                        <UserCell>
                          <PetThumb src={item.image} alt={item.name} />
                          <UserMeta>
                            <UserName>{item.name}</UserName>
                            <UserEmail>{item.breed || '—'}</UserEmail>
                          </UserMeta>
                        </UserCell>
                      </Td>
                      <Td>{item.petId || '—'}</Td>
                      <Td>{capitalize(item.type)}</Td>
                      <Td>{item.city || '—'}</Td>
                      <Td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </Td>
                      <Td>
                        <MonoText title={item.userId}>
                          {truncateId(item.userId, 12)}
                        </MonoText>
                      </Td>
                      <Td>{formatDisplayDate(item.createdAt)}</Td>
                      <Td>
                        <RowActionsMenu
                          actions={[
                            {
                              label: 'Delete Listing',
                              danger: true,
                              onClick: () =>
                                setDeleteTarget({ type: 'donation', item }),
                            },
                          ]}
                        />
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </TableScroll>
        </TableCard>
      )}

      {activeTab === 'registered' && (
        <TableCard>
          <TableHeaderRow>
            <TableTitle>Registered Animals</TableTitle>
            <CountLabel>{filteredRegisteredAnimals.length} shown</CountLabel>
          </TableHeaderRow>
          <TableScroll>
            <Table>
              <thead>
                <tr>
                  <Th>Pet</Th>
                  <Th>Registration ID</Th>
                  <Th>Type</Th>
                  <Th>City</Th>
                  <Th>Owner Name</Th>
                  <Th>Owner ID</Th>
                  <Th>Created</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {dataLoading ? (
                  <tr>
                    <Td colSpan={8}>
                      <EmptyState>Loading registered animals…</EmptyState>
                    </Td>
                  </tr>
                ) : filteredRegisteredAnimals.length === 0 ? (
                  <tr>
                    <Td colSpan={8}>
                      <EmptyState>
                        No registered animals match your filters.
                      </EmptyState>
                    </Td>
                  </tr>
                ) : (
                  filteredRegisteredAnimals.map((item) => (
                    <tr key={item.id}>
                      <Td>
                        <UserCell>
                          <PetThumb src={item.image} alt={item.name} />
                          <UserMeta>
                            <UserName>{item.name}</UserName>
                            <UserEmail>{item.breed || '—'}</UserEmail>
                          </UserMeta>
                        </UserCell>
                      </Td>
                      <Td>{item.registrationId || '—'}</Td>
                      <Td>{capitalize(item.type)}</Td>
                      <Td>{item.city || '—'}</Td>
                      <Td>{item.ownerName}</Td>
                      <Td>
                        <MonoText title={item.userId}>
                          {truncateId(item.userId, 12)}
                        </MonoText>
                      </Td>
                      <Td>{formatDisplayDate(item.createdAt)}</Td>
                      <Td>
                        <RowActionsMenu
                          actions={[
                            {
                              label: 'Delete Registration',
                              danger: true,
                              onClick: () =>
                                setDeleteTarget({ type: 'registered', item }),
                            },
                          ]}
                        />
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </TableScroll>
        </TableCard>
      )}

      {activeTab === 'lostFound' && (
        <TableCard>
          <TableHeaderRow>
            <TableTitle>Lost & Found Reports</TableTitle>
            <CountLabel>{filteredReports.length} shown</CountLabel>
          </TableHeaderRow>
          <TableScroll>
            <Table>
              <thead>
                <tr>
                  <Th>Report</Th>
                  <Th>Animal Type</Th>
                  <Th>Report Type</Th>
                  <Th>Location</Th>
                  <Th>Status</Th>
                  <Th>Reporter ID</Th>
                  <Th>Created</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {dataLoading ? (
                  <tr>
                    <Td colSpan={8}>
                      <EmptyState>Loading reports…</EmptyState>
                    </Td>
                  </tr>
                ) : filteredReports.length === 0 ? (
                  <tr>
                    <Td colSpan={8}>
                      <EmptyState>No reports match your filters.</EmptyState>
                    </Td>
                  </tr>
                ) : (
                  filteredReports.map((item) => (
                    <tr key={item.id}>
                      <Td>
                        <UserCell>
                          <PetThumb src={item.image} alt={item.name} />
                          <UserMeta>
                            <UserName>{item.name}</UserName>
                            <UserEmail>
                              {item.breed || capitalize(item.type)}
                            </UserEmail>
                          </UserMeta>
                        </UserCell>
                      </Td>
                      <Td>{capitalize(item.type)}</Td>
                      <Td>
                        <StatusBadge>{item.reportType}</StatusBadge>
                      </Td>
                      <Td>{item.lastSeenLocation}</Td>
                      <Td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </Td>
                      <Td>
                        <MonoText title={item.userId}>
                          {truncateId(item.userId, 12)}
                        </MonoText>
                      </Td>
                      <Td>{formatDisplayDate(item.createdAt)}</Td>
                      <Td>
                        <RowActionsMenu
                          actions={[
                            {
                              label: 'Delete Report',
                              danger: true,
                              onClick: () =>
                                setDeleteTarget({ type: 'lostFound', item }),
                            },
                          ]}
                        />
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </TableScroll>
        </TableCard>
      )}

      <AlertModal
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={deleteModalCopy.title}
        subtitle={deleteModalCopy.subtitle}
        type="error"
        acceptText="Delete"
        cancelText="Cancel"
        loading={actionLoading}
        loadingText="Deleting…"
        onAccept={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminWrapper>
  );
};
