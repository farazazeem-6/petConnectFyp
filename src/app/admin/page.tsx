import { Admin } from '@/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - Pet Connect',
  description: 'Manage users, donated animals, and lost & found reports.',
};

export default function AdminPage() {
  return <Admin />;
}
