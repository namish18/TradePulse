# TradePulse Frontend

A production-ready Next.js 15 real-time trading analytics platform with GraphQL, WebSocket subscriptions, and professional-grade UI.

## 🚀 Features

- **Real-Time Market Data**: WebSocket-powered live price updates with millisecond latency
- **Risk Analytics**: Advanced VaR calculations, Greeks tracking, and stress scenario testing
- **Portfolio Management**: Real-time P&L tracking, position monitoring, and exposure analysis
- **Modern Tech Stack**: Next.js 15, TypeScript, Apollo Client, GraphQL
- **Premium UI**: Dark theme with CSS Modules, animations, and responsive design
- **Edge Authentication**: JWT-based auth compatible with edge runtime

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- A running GraphQL backend server (see Backend Setup below)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your GraphQL endpoints
```

## 📝 Environment Setup

Edit `.env.local`:

```env
NEXT_PUBLIC_GRAPHQL_HTTP_URL=http://localhost:4000/graphql
NEXT_PUBLIC_GRAPHQL_WS_URL=ws://localhost:4000/graphql
SESSION_SECRET=your-secret-key-min-32-chars-change-in-production
NEXT_PUBLIC_ENABLE_PERSISTED_QUERIES=false
```

## 🚦 Development

```bash
# Start development server
npm run dev

# Open browser
http://localhost:3000
```

## 🏗️ Build for Production

```bash
# Type check
npm run type-check

# Build
npm run build

# Start production server
npm start
```

## 🔌 GraphQL Code Generation

After your GraphQL backend is running:

```bash
# Generate TypeScript types from GraphQL schema
npm run codegen
```

This will:
- Fetch the schema from your GraphQL server
- Generate TypeScript types in `src/types/graphql.ts`
- Create React hooks for queries, mutations, and subscriptions

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── login/              # Login page
│   │   ├── settings/           # Settings page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   ├── common/             # Shared components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── portfolio/          # Portfolio components
│   │   ├── risk/               # Risk management components
│   │   └── ui/                 # UI component library
│   ├── graphql/
│   │   ├── queries/            # GraphQL queries
│   │   ├── mutations/          # GraphQL mutations
│   │   ├── subscriptions/      # GraphQL subscriptions
│   │   └── fragments/          # Reusable fragments
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Core libraries (Apollo, Auth)
│   ├── styles/                 # Global CSS and design system
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
├── public/                     # Static assets
└── package.json
```

## 🎨 Design System

The application uses a comprehensive design system with CSS custom properties:

- **Colors**: Dark theme with accent red (#FF073A) and primary blue (#02066F)
- **Typography**: Inter font family with responsive sizing
- **Spacing**: Consistent scale from xs (4px) to 4xl (96px)
- **Components**: Fully styled UI library with variants and states

All styling uses CSS Modules for scoped styles and maintainability.

## 🔐 Authentication

Authentication is handled via:
- Edge-compatible JWT using `jose` library
- HTTP-only cookies for session management
- Middleware for route protection
- Auth context for client-side state

Protected routes automatically redirect to login if not authenticated.

## 📊 GraphQL Integration

### Queries
- Market data, indices, top movers
- Portfolio positions and summary
- Risk metrics and alerts

### Mutations
- Place/cancel orders
- Close positions
- Update settings

### Subscriptions
- Real-time market data updates
- Live portfolio P&L streams
- Risk alert notifications

## 🧪 Backend Requirements

This frontend expects a GraphQL backend with:

1. **Schema** matching the operations in `src/graphql/`
2. **HTTP endpoint** for queries and mutations
3. **WebSocket endpoint** for subscriptions (graphql-ws protocol)
4. **CORS** enabled for the frontend origin

Example backend stack:
- Apollo Server / GraphQL Yoga
- graphql-ws for subscriptions
- Authentication layer matching JWT format

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Environment Variables

Ensure all environment variables are set in your deployment platform.

## 📖 Key Features Explained

### Real-Time Updates
WebSocket subscriptions provide live updates for:
- Market prices and order book changes
- Portfolio position updates
- Risk metric calculations
- System alerts

### Risk Management
- Value at Risk (VaR) at 95% and 99% confidence
- Greeks for options positions
- Stress scenario testing
- Maximum drawdown analysis

### Portfolio Tracking
- Real-time P&L calculations
- Position-level analytics
- Sector/asset class exposure
- Trade history

## 🛡️ Security

- JWT tokens with secret key encryption
- HTTP-only secure cookies
- CSRF protection via SameSite cookies
- Input validation and sanitization
- Protected API routes

## 🎯 Performance

- Server-side rendering for initial load
- Client-side data fetching with caching
- Code splitting per route
- Optimized bundle size
- Efficient WebSocket connections

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/learn/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 📄 License

Copyright © 2024 TradePulse. All rights reserved.

## 🤝 Support

For issues and questions:
- Create an issue in the repository
- Contact: support@tradepulse.com
- Documentation: https://docs.tradepulse.com
