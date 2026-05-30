import { Suspense } from 'react';
import { RegisterAnimalHub } from '@/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Registry - Pet Connect',
  description:
    'Register your pets with a unique QR ID card to help reunite them if they get lost.',
};

export default function RegisterAnimalPage() {
  return (
    <Suspense fallback={null}>
      <RegisterAnimalHub />
    </Suspense>
  );
}
