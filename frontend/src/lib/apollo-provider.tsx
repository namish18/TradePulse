'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { apolloClient } from './apollo-client';

interface ApolloWrapperProps {
  children: ReactNode;
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
