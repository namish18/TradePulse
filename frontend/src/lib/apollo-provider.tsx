'use client';

import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';
import { createClientSideClient } from './apollo-client';
import { useEffect, useState } from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client, setClient] = useState<ApolloClient | null>(null);

  useEffect(() => {
    // Initialize client only on mount to avoid SSR hydration issues
    const apolloClient = createClientSideClient();
    setClient(apolloClient);

    // Cleanup on unmount
    return () => {
      apolloClient.stop();
    };
  }, []);

  if (!client) {
    // Return null or loading state during SSR/initial client render
    return <>{children}</>;
  }

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}