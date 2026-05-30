import { RegisterAnimalForm } from '@/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Your Pet - Pet Connect',
  description: 'Complete your pet registration and receive a unique QR code.',
};

export default function RegisterAnimalNewPage() {
  return <RegisterAnimalForm />;
}
