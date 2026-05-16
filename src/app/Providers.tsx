'use client';

import { ThemeProvider } from 'next-themes';
import { ThemeSync } from './ThemeSync';
import { Loader } from '@/components/elements';
import { useEffect, useState } from 'react';
import { Header, Footer } from '@/layout';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { usePathname } from 'next/navigation';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { listenToAuthChanges } from '@/lib/firebase/auth.listener';
import { Toaster } from 'react-hot-toast';
import MobileBottomNav from '@/components/ui/MobileBottomNav/MobileBottomNav';
import { ChatbotProvider } from './chatProvider';

// Pages that must NOT show Header + Footer
const AUTH_ROUTES = ['/auth'];

// This component is used to initialize global auth listener
// It MUST be inside ReduxProvider because it uses Redux dispatch
const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    listenToAuthChanges(dispatch);
  }, [dispatch]);

  return <>{children}</>;
};

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname?.startsWith(r));
  const isAboutRoute = pathname?.startsWith('/about-us');
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '10px',
            fontSize: '0.875rem',
          },
        }}
      />
      {!isAuthRoute && <Header />}
      {children}
      {!isAuthRoute && <Footer />}
      {!isAuthRoute && <MobileBottomNav />}
      {!isAuthRoute && !isAboutRoute && <ChatbotProvider />}
    </>
  );
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ReduxProvider store={store}>
      <AuthInitializer>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="app-theme"
        >
          <ThemeSync />
          {mounted ? <AppShell>{children}</AppShell> : <Loader />}
        </ThemeProvider>
      </AuthInitializer>
    </ReduxProvider>
  );
};
