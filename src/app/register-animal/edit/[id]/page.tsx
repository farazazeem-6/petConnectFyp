import { RegisterAnimalForm } from '@/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Pet Registration - Pet Connect',
  description: 'Update your registered pet details.',
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function RegisterAnimalEditPage({ params }: PageProps) {
  const { id } = await params;
  return <RegisterAnimalForm editId={id} />;
}
