import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Pet Connect',
  description: 'Sign in or create a Pet Connect account to adopt, find services, and connect with pet lovers.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
