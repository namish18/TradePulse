# TradePulse Backend

Production-ready Node.js backend for the TradePulse real-time trading analytics platform.

## Tech Stack

- **Runtime**: Node.js 20+ with ES Modules
- **Language**: JavaScript (ES2022+)
- **API**: GraphQL with Apollo Server 4
- **Database**: PostgreSQL with TimescaleDB extension
- **Message Queue**: Redpanda (Kafka-compatible)
- **Cache/Pub-Sub**: Redis
- **Authorization**: SpiceDB (Zanzibar-style)
- **Real-time**: GraphQL Subscriptions via graphql-ws
- **Authentication**: JWT-based

## Features

- 🔐 JWT-based authentication with refresh tokens
- 🛡️ SpiceDB authorization for fine-grained access control
- 📊 Real-time market data via GraphQL subscriptions
- 💼 Portfolio management with P&L tracking
- ⚠️ Risk analytics (VaR, Greeks, stress testing)
- 🔔 Alert system with threshold monitoring
- 📈 TimescaleDB for time-series data optimization
- 🚀 Kafka event streaming
- ⚡ Redis caching for performance
- 🧪 Comprehensive test coverage

## Prerequisites

Before running the backend, ensure you have the following installed:

- Node.js 20+
- PostgreSQL 14+ with TimescaleDB extension
- Redis 7+
- Redpanda or Apache Kafka
- SpiceDB (optional for authorization)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   # Run migrations
   npm run migrate
   
   # Seed with sample data (optional)
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The GraphQL API will be available at `http://localhost:4000/graphql`

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run all tests with coverage
- `npm run test:unit` - Run unit tests only
- `npm run test:integration` - Run integration tests only
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## Project Structure

```
backend/
├── config/           # Configuration files (DB, Redis, Kafka, SpiceDB)
├── graphql/          # GraphQL schema, resolvers, directives
├── controllers/      # Business logic controllers
├── routes/           # REST routes (health checks, webhooks)
├── middlewares/      # Express middlewares (auth, logging, errors)
├── models/           # Database models
├── services/         # Business logic services
├── utils/            # Utility functions
├── jobs/             # Scheduled jobs
├── consumers/        # Kafka consumers
├── producers/        # Kafka producers
├── db/               # Database migrations and seeds
├── tests/            # Unit and integration tests
├── logs/             # Application logs
└── server.js         # Application entry point
```

## API Documentation

### GraphQL Endpoint

- **URL**: `http://localhost:4000/graphql`
- **Playground**: Available in development mode

### Key Queries

#### Get Market Data
```graphql
query GetMarketTick($symbol: String!) {
  marketTick(symbol: $symbol) {
    symbol
    price
    volume
    timestamp
  }
}
```

#### Get Portfolio
```graphql
query GetPortfolio($id: ID!) {
  portfolio(id: $id) {
    id
    name
    totalValue
    totalPnL
    positions {
      symbol
      quantity
      unrealizedPnL
    }
  }
}
```

### Key Mutations

#### Login
```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    refreshToken
    user {
      id
      email
      name
    }
  }
}
```

### Subscriptions

#### Real-time Market Updates
```graphql
subscription MarketUpdates($symbols: [String!]!) {
  marketTickUpdated(symbols: $symbols) {
    symbol
    price
    change
    timestamp
  }
}
```

## Database Schema

The application uses TimescaleDB for efficient time-series data storage. Key tables:

- `users` - User accounts
- `portfolios` - User portfolios
- `positions` - Portfolio positions
- `orders` - Trade orders
- `trades` - Executed trades
- `market_ticks` - Market price data (hypertable)
- `risk_metrics` - Risk calculations (hypertable)
- `alerts` - User alerts

## Kafka Topics

- `market-ticks` - Real-time market price updates
- `order-events` - Order lifecycle events
- `risk-events` - Risk calculation results
- `alerts` - Triggered alerts

## Authentication

The API uses JWT tokens for authentication:

1. **Register/Login** to receive an access token and refresh token
2. **Include the access token** in the `Authorization` header:
   ```
   Authorization: Bearer <your-access-token>
   ```
3. **Refresh tokens** using the `/auth/refresh` endpoint when expired

## Authorization

SpiceDB provides fine-grained authorization:

- Users can only access their own portfolios
- Admin users have elevated permissions
- Resource-level permissions (read, write, delete)

## Error Handling

All errors follow a consistent format:

```json
{
  "errors": [{
    "message": "Error description",
    "code": "ERROR_CODE",
    "extensions": {
      "field": "fieldName"
    }
  }]
}
```

## Rate Limiting

- **Anonymous**: 100 requests/minute
- **Authenticated**: 500 requests/minute
- **WebSocket**: 1000 concurrent connections

## Logging

Logs are stored in `logs/` directory and formatted as JSON in production. Log levels:

- `error` - Error messages
- `warn` - Warning messages
- `info` - Informational messages
- `debug` - Debug messages (development only)

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database and Redis
3. Set strong JWT secrets
4. Enable SSL for database and Redis connections
5. Configure SpiceDB with proper credentials
6. Set up log aggregation
7. Configure process manager (PM2, Docker, etc.)

### Docker Deployment (Coming Soon)

```bash
docker-compose up -d
```

## Performance Optimization

- **Redis caching** for frequently accessed data
- **Database connection pooling** for efficient connections
- **Kafka batching** for event processing
- **Hypertables** for time-series optimization
- **GraphQL query complexity** analysis
- **DataLoader** for N+1 query prevention

## Security Best Practices

- ✅ JWT tokens with expiration
- ✅ bcrypt password hashing
- ✅ SQL injection prevention (parameterized queries)
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Input validation with Joi
- ✅ XSS prevention

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Run linter and tests
6. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub or contact the development team.
