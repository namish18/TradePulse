-- Sample Market Data
-- Generates sample market tick data for development

-- Function to generate sample market data
DO $$
DECLARE
  symbols TEXT[] := ARRAY['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM', 'JNJ', 'V'];
  symbol TEXT;
  ts TIMESTAMPTZ;
  base_price DECIMAL(20, 8);
  current_price DECIMAL(20, 8);
  vol BIGINT;
  i INTEGER;
BEGIN
  -- Generate data for the last 30 days
  FOREACH symbol IN ARRAY symbols
  LOOP
    -- Set a base price for each symbol
    base_price := CASE symbol
      WHEN 'AAPL' THEN 175.00
      WHEN 'GOOGL' THEN 140.00
      WHEN 'MSFT' THEN 350.00
      WHEN 'AMZN' THEN 145.00
      WHEN 'TSLA' THEN 250.00
      WHEN 'META' THEN 320.00
      WHEN 'NVDA' THEN 480.00
      WHEN 'JPM' THEN 150.00
      WHEN 'JNJ' THEN 165.00
      WHEN 'V' THEN 240.00
      ELSE 100.00
    END;

    current_price := base_price;

    -- Generate hourly data for the last 30 days
    FOR i IN 0..(30 * 24 - 1) LOOP
      ts := NOW() - ((30 * 24 - 1 - i) || ' hours')::INTERVAL;
      
      -- Random walk price
      current_price := current_price + (random() - 0.5) * base_price * 0.02;
      
      -- Random volume
      vol := (1000000 + random() * 5000000)::BIGINT;

      INSERT INTO market_ticks (time, symbol, price, open, high, low, close, volume, change, change_percent)
      VALUES (
        ts,
        symbol,
        current_price,
        current_price * (0.99 + random() * 0.02),
        current_price * (1.0 + random() * 0.01),
        current_price * (0.99 - random() * 0.01),
        current_price,
        vol,
        current_price - base_price,
        ((current_price - base_price) / base_price) * 100
      )
      ON CONFLICT (time, symbol) DO NOTHING;
    END LOOP;

    RAISE NOTICE 'Generated market data for %', symbol;
  END LOOP;
END $$;

-- Insert sample risk metrics
INSERT INTO risk_metrics (time, portfolio_id, var_95, var_99, cvar_95, cvar_99, sharpe_ratio, sortino_ratio, max_drawdown, beta, alpha, volatility)
SELECT
  generate_series(NOW() - INTERVAL '30 days', NOW(), INTERVAL '1 day') AS time,
  '00000000-0000-0000-0001-000000000001'::UUID,
  -5000 - random() * 2000,
  -8000 - random() * 3000,
  -6000 - random() * 2500,
  -9000 - random() * 3500,
  1.2 + random() * 0.5,
  1.5 + random() * 0.6,
  -0.15 - random() * 0.1,
  1.0 + (random() - 0.5) * 0.3,
  0.02 + random() * 0.03,
  0.15 + random() * 0.1
ON CONFLICT (time, portfolio_id) DO NOTHING;
