-- Add Indexes for Performance
-- Creates indexes on frequently queried columns

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- Portfolios indexes
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_created_at ON portfolios(created_at DESC);

-- Positions indexes
CREATE INDEX IF NOT EXISTS idx_positions_portfolio_id ON positions(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_positions_symbol ON positions(symbol);
CREATE INDEX IF NOT EXISTS idx_positions_portfolio_symbol ON positions(portfolio_id, symbol);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_portfolio_id ON orders(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_orders_symbol ON orders(symbol);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_portfolio_status ON orders(portfolio_id, status);

-- Trades indexes
CREATE INDEX IF NOT EXISTS idx_trades_portfolio_id ON trades(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_trades_position_id ON trades(position_id);
CREATE INDEX IF NOT EXISTS idx_trades_order_id ON trades(order_id);
CREATE INDEX IF NOT EXISTS idx_trades_symbol ON trades(symbol);
CREATE INDEX IF NOT EXISTS idx_trades_executed_at ON trades(executed_at DESC);

-- Market ticks indexes (TimescaleDB automatically creates time index)
CREATE INDEX IF NOT EXISTS idx_market_ticks_symbol_time ON market_ticks(symbol, time DESC);

-- Risk metrics indexes
CREATE INDEX IF NOT EXISTS idx_risk_metrics_portfolio_time ON risk_metrics(portfolio_id, time DESC);

-- Alerts indexes
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_portfolio_id ON alerts(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_alerts_type ON alerts(type);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_is_read ON alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_user_unread ON alerts(user_id, is_read, created_at DESC) WHERE is_read = FALSE;

-- Audit logs indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action_type ON audit_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Partial indexes for active records
CREATE INDEX IF NOT EXISTS idx_orders_active ON orders(portfolio_id, created_at DESC) 
  WHERE status IN ('pending', 'open', 'partially_filled');

-- GIN indexes for JSONB columns
CREATE INDEX IF NOT EXISTS idx_alerts_metadata ON alerts USING GIN (metadata);
CREATE INDEX IF NOT EXISTS idx_audit_logs_details ON audit_logs USING GIN (details);

COMMENT ON INDEX idx_users_email IS 'Fast user lookup by email for authentication';
COMMENT ON INDEX idx_portfolios_user_id IS 'Portfolio lookup by user';
COMMENT ON INDEX idx_positions_portfolio_symbol IS 'Position lookup by portfolio and symbol';
COMMENT ON INDEX idx_orders_portfolio_status IS 'Order filtering by portfolio and status';
COMMENT ON INDEX idx_alerts_user_unread IS 'Fast unread alerts lookup for users';
