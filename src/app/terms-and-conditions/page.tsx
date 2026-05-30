import { TermsConditions } from '@/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Pet Connect',
  description:
    'Read the Terms and Conditions for using Pet Connect, our pet adoption and community platform.',
};

export default function TermsAndConditionsPage() {
  return <TermsConditions />;
}
