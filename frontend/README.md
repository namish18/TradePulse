# Trading Frontend

Production-ready Next.js 15 frontend application with React 19, GraphQL, WebSocket subscriptions, and edge authentication.

## Features

- **Next.js App Router** with React Server Components
- **GraphQL Integration** with Apollo Client
- **WebSocket Subscriptions** via graphql-ws
- **Edge Runtime Authentication** with secure middleware
- **Real-time Market Data** with live updates
- **TypeScript** for full type safety
- **Tailwind CSS 4** for styling
- **Responsive Design** with mobile-first approach
- **Error Boundaries** and error handling
- **Performance Optimized** with server-side rendering

## Tech Stack

- Next.js 15
- React 19
- TypeScript 5.3
- Apollo Client 3.8
- GraphQL 16.8
- Tailwind CSS 4
- graphql-ws 5.14
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Update the GraphQL endpoints to match your backend:

```env
NEXT_PUBLIC_GRAPHQL_HTTP_URL=http://localhost:4000/graphql
NEXT_PUBLIC_GRAPHQL_WS_URL=ws://localhost:4000/graphql
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
npm run build
npm start
```

### Code Generation

Generate TypeScript types from GraphQL schema:

```bash
npm run generate-graphql
```

Watch for changes:

```bash
npm run graphql:watch
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Libraries and utilities
│   ├── graphql/            # GraphQL queries, mutations, subscriptions
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   └── middleware.ts       # Edge middleware for authentication
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── codegen.yml            # GraphQL code generation config
```

## Key Features

### Authentication

- Edge runtime middleware for session validation
- Protected routes with automatic redirects
- Secure token management

### GraphQL

- Persistent query support
- WebSocket subscriptions for real-time data
- Type-safe operations via code generation
- Apollo Client caching strategies

### Real-time Updates

- Market data streaming
- Portfolio position updates
- Risk metric calculations
- Alert notifications

### UI Components

- Reusable component library
- Loading states and error boundaries
- Responsive layouts
- Dark theme with custom colors

## Configuration

### Colors

- Primary Dark: `#00022E`
- Primary Light: `#02066F`
- Accent/Danger: `#FF073A`

### Performance

- Server-side rendering for initial data
- Client-side hydration for interactivity
- Optimized bundle splitting
- Image optimization

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update types in TypeScript
4. Keep components small and focused
5. Document complex logic

## License

Proprietary - All rights reserved
