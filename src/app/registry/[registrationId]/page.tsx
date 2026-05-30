import { AnimalRegistryProfile } from '@/views/AnimalRegistryProfile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Registry Profile - Pet Connect',
  description: 'Official registered pet profile on Pet Connect.',
};

export default function RegistryProfilePage() {
  return <AnimalRegistryProfile />;
}
