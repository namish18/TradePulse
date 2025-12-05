'use client';

import { ApolloProvider as Provider } from '@apollo/client';
import { getApolloClient } from './apollo-client';
import { ReactNode } from 'react';

interface ApolloProviderProps {
    children: ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
    const client = getApolloClient();

    return <Provider client={client}>{children}</Provider>;
}
