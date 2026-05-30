export type AdminTab = 'users' | 'donations' | 'registered' | 'lostFound';

export const ADMIN_TABS: { id: AdminTab; label: string }[] = [
  { id: 'users', label: 'Users' },
  { id: 'donations', label: 'Donated Animals' },
  { id: 'registered', label: 'Registered Animals' },
  { id: 'lostFound', label: 'Lost & Found' },
];

export const ADMIN_MESSAGES = {
  heading: 'Admin Panel',
  subHeading: 'Manage users, donated animals, registered animals, and lost & found reports.',
  accessDenied: 'You do not have permission to access the admin panel.',
  loadError: 'Failed to load admin data. Please refresh.',
  deleteUserTitle: 'Delete User',
  deleteUserSubtitle:
    'This will permanently delete the Firebase Auth account, user profile, and all their listings. This action cannot be undone.',
  deleteAnimalTitle: 'Delete Listing',
  deleteAnimalSubtitle: 'This donation listing will be permanently removed.',
  deleteRegisteredTitle: 'Delete Registration',
  deleteRegisteredSubtitle: 'This animal registration will be permanently removed.',
  deleteReportTitle: 'Delete Report',
  deleteReportSubtitle: 'This lost & found report will be permanently removed.',
  roleUpdated: 'User role updated successfully.',
  roleUpdateFailed: 'Failed to update user role.',
  deleteSuccess: 'Deleted successfully.',
  deleteFailed: 'Delete failed. Please try again.',
  searchUsers: 'Search by name, email, or user ID',
  filterCity: 'All cities',
  filterType: 'All animal types',
  filterReportType: 'All report types',
  filterRole: 'All roles',
};

export const ROLE_FILTER_OPTIONS = [
  { label: 'All roles', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
];

export const REPORT_TYPE_FILTER_OPTIONS = [
  { label: 'All report types', value: 'all' },
  { label: 'Lost', value: 'lost' },
  { label: 'Found', value: 'found' },
];

export const CITY_FILTER_OPTIONS = [
  { label: 'All cities', value: 'all' },
  ...['Faisalabad', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Gujranwala', 'Quetta'].map(
    (city) => ({ label: city, value: city.toLowerCase() }),
  ),
];

export const TYPE_FILTER_OPTIONS = [
  { label: 'All animal types', value: 'all' },
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Fish', value: 'fish' },
  { label: 'Bird', value: 'bird' },
  { label: 'Mouse', value: 'mouse' },
  { label: 'Horse', value: 'horse' },
  { label: 'Hamster', value: 'hamster' },
  { label: 'Rabbit', value: 'rabbit' },
  { label: 'Turtle', value: 'turtle' },
  { label: 'Pigeon', value: 'pigeon' },
  { label: 'Other', value: 'other' },
];
