'use client';
import { ThemeProvider } from 'next-themes';
import { ThemeSync } from './ThemeSync';
import { Container, Loader } from '@/components/elements';
import { useEffect, useState } from 'react';
import { Header, Footer } from '@/layout';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="app-theme"
    >
      <ThemeSync />
      {mounted ? (
        <>
          <Header />
          <>{children}</>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </ThemeProvider>
  );
};
