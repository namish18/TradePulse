-- Development Seed Data
-- Sample data for development and testing

-- Insert sample users (password: 'password123' - hashed with bcrypt)
INSERT INTO users (id, email, password_hash, name, role) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@tradepulse.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY0h51LNuE3YGdS', 'Admin User', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'trader@tradepulse.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY0h51LNuE3YGdS', 'John Trader', 'trader'),
  ('00000000-0000-0000-0000-000000000003', 'viewer@tradepulse.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY0h51LNuE3YGdS', 'Jane Viewer', 'viewer')
ON CONFLICT (id) DO NOTHING;

-- Insert sample portfolios
INSERT INTO portfolios (id, user_id, name, description) VALUES
  ('00000000-0000-0000-0001-000000000001', '00000000-0000-0000-0000-000000000002', 'Growth Portfolio', 'Long-term growth stocks'),
  ('00000000-0000-0000-0001-000000000002', '00000000-0000-0000-0000-000000000002', 'Income Portfolio', 'Dividend-paying stocks'),
  ('00000000-0000-0000-0001-000000000003', '00000000-0000-0000-0000-000000000003', 'Demo Portfolio', 'Demonstration portfolio')
ON CONFLICT (id) DO NOTHING;

-- Insert sample positions
INSERT INTO positions (id, portfolio_id, symbol, quantity, avg_entry_price, current_price) VALUES
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000001', 'AAPL', 100, 150.25, 175.50),
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0001-000000000001', 'GOOGL', 50, 2800.00, 2950.75),
  ('00000000-0000-0000-0002-000000000003', '00000000-0000-0000-0001-000000000001', 'MSFT', 75, 300.50, 350.25),
  ('00000000-0000-0000-0002-000000000004', '00000000-0000-0000-0001-000000000002', 'JNJ', 200, 165.00, 170.50),
  ('00000000-0000-0000-0002-000000000005', '00000000-0000-0000-0001-000000000002', 'PG', 150, 140.00, 145.75)
ON CONFLICT (id) DO NOTHING;

-- Insert sample alerts
INSERT INTO alerts (user_id, portfolio_id, type, severity, title, message, is_read) VALUES
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0001-000000000001', 'price', 'info', 'Price Alert: AAPL', 'AAPL has reached your target price of $175', false),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0001-000000000001', 'risk', 'warning', 'Risk Alert', 'Portfolio volatility has increased by 15%', false),
  ('00000000-0000-0000-0000-000000000002', NULL, 'system', 'info', 'Welcome to TradePulse', 'Your account has been successfully created', true);

-- Insert audit log samples
INSERT INTO audit_logs (user_id, action_type, resource_type, resource_id, details) VALUES
  ('00000000-0000-0000-0000-000000000002', 'LOGIN', NULL, NULL, '{"ip": "127.0.0.1", "success": true}'::jsonb),
  ('00000000-0000-0000-0000-000000000002', 'CREATE_PORTFOLIO', 'portfolio', '00000000-0000-0000-0001-000000000001', '{"name": "Growth Portfolio"}'::jsonb),
  ('00000000-0000-0000-0000-000000000002', 'CREATE_POSITION', 'position', '00000000-0000-0000-0002-000000000001', '{"symbol": "AAPL", "quantity": 100}'::jsonb);

-- Note: Sample market data will be inserted via sample_market_data.sql
