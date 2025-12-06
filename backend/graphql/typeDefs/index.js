/**
 * GraphQL TypeDefs Index
 * Merges all GraphQL type definitions
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read GraphQL schema files
const commonTypeDefs = readFileSync(join(__dirname, 'common.graphql'), 'utf-8');
const authTypeDefs = readFileSync(join(__dirname, 'auth.graphql'), 'utf-8');
const marketTypeDefs = readFileSync(join(__dirname, 'market.graphql'), 'utf-8');
const portfolioTypeDefs = readFileSync(join(__dirname, 'portfolio.graphql'), 'utf-8');
const riskTypeDefs = readFileSync(join(__dirname, 'risk.graphql'), 'utf-8');

// Base Query and Mutation types (required by GraphQL)
const baseTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

// Combine all type definitions
const typeDefs = [
    baseTypeDefs,
    commonTypeDefs,
    authTypeDefs,
    marketTypeDefs,
    portfolioTypeDefs,
    riskTypeDefs,
];

export default typeDefs;
