// Automatic Persisted Queries (APQ) configuration for Apollo Client
// This reduces bandwidth by sending query hashes instead of full queries

import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

export function createPersistedQueriesLink() {
    const enabled = process.env.NEXT_PUBLIC_ENABLE_PERSISTED_QUERIES === 'true';

    if (!enabled) {
        return null;
    }

    return createPersistedQueryLink({ sha256 });
}
