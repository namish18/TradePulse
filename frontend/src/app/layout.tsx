import type { Metadata } from 'next';
import { ApolloWrapper } from '@/lib/apollo-provider';
import { AuthProvider } from '@/components/auth';
import { ErrorBoundary } from '@/components/common';
import '@/styles/globals.css';
import '@/styles/utilities.css';

export const metadata: Metadata = {
  title: 'Trading Platform',
  description: 'Advanced trading analytics and risk management platform',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ApolloWrapper>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ApolloWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
