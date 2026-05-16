import { AboutUs } from '@/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Pet Connect',
  description:
    'Get in touch with the Pet Connect team for any inquiries or support.',
};

export default function AboutUsPage() {
  return <AboutUs />;
}
