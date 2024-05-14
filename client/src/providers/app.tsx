import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import carImg from '@/assets/png/car.png';
import { Button, Spinner } from '@/components/Elements';
import { Notifications } from '@/components/Notifications/Notifications';
import { AuthLoader } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';

const ErrorFallback = () => {
  const onRefresh = () => {
    storage.clearToken();
    window.location.replace('/');
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen text-center"
      role="alert"
    >
      <img src={carImg} className="w-[400px] p-5" alt="" />
      <h2 className="text-3xl font-semibold">Oops, something went wrong</h2>
      <div className="pt-8">
        <p>There was a problem while connecting</p>
        <p>Please refresh the page or check your connection.</p>
      </div>

      <Button className="button-filled mt-10" onClick={() => onRefresh()}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <Notifications />
            <AuthLoader
              renderLoading={() => (
                <div className="w-screen h-screen flex justify-center items-center">
                  <Spinner size="xl" />
                </div>
              )}
            >
              <Router>{children}</Router>
            </AuthLoader>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
