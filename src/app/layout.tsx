import { globalStyles, Greycliff } from '@/theme';
import { Providers } from './Providers';
import { Metadata } from 'next';

globalStyles();
export const metadata: Metadata = {
  title: 'Pet Connect',
  description:
    'Find your new best friend, donate to animals in need, or report lost and found pets. Join our community to help every animal find a safe and loving home.',
  icons: { icon: { url: './fevicon.png', type: 'image/svg+xml' } },
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      style={{ fontSize: 'clamp(12px, 1vw, 16px)' }}
      lang="en"
      suppressHydrationWarning
    >
      <body
        style={{ margin: '0', padding: '0' }}
        className={Greycliff.className}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
