import { ContactUs } from '@/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Pet Connect',
  description: 'Get in touch with the Pet Connect team for any inquiries or support.',
};

export default function ContactUsPage() {
  return <ContactUs />;
}
