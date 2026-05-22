import { Favourites } from '@/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favourites - Pet Connect',
  description: 'Manage your favourite pets and listings.',
};

export default function FavouritesPage() {
  return <Favourites />;
}
