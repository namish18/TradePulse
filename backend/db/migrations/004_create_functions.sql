-- Database Functions
-- Helper functions for common calculations

-- Function to calculate portfolio total value
CREATE OR REPLACE FUNCTION calculate_portfolio_value(p_portfolio_id UUID)
RETURNS DECIMAL(20, 8) AS $$
DECLARE
  total_value DECIMAL(20, 8);
BEGIN
  SELECT COALESCE(SUM(quantity * current_price), 0)
  INTO total_value
  FROM positions
  WHERE portfolio_id = p_portfolio_id;
  
  RETURN total_value;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to calculate portfolio P&L
CREATE OR REPLACE FUNCTION calculate_portfolio_pnl(p_portfolio_id UUID)
RETURNS TABLE (
  total_pnl DECIMAL(20, 8),
  realized_pnl DECIMAL(20, 8),
  unrealized_pnl DECIMAL(20, 8)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(p.realized_pnl + (p.quantity * (p.current_price - p.avg_entry_price))), 0) AS total_pnl,
    COALESCE(SUM(p.realized_pnl), 0) AS realized_pnl,
    COALESCE(SUM(p.quantity * (p.current_price - p.avg_entry_price)), 0) AS unrealized_pnl
  FROM positions p
  WHERE p.portfolio_id = p_portfolio_id;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get OHLCV data for a symbol
CREATE OR REPLACE FUNCTION get_ohlcv(
  p_symbol VARCHAR(10),
  p_interval INTERVAL,
  p_start_time TIMESTAMPTZ,
  p_end_time TIMESTAMPTZ
)
RETURNS TABLE (
  bucket TIMESTAMPTZ,
  open DECIMAL(20, 8),
  high DECIMAL(20, 8),
  low DECIMAL(20, 8),
  close DECIMAL(20, 8),
  volume BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    time_bucket(p_interval, time) AS bucket,
    FIRST(price, time) AS open,
    MAX(price) AS high,
    MIN(price) AS low,
    LAST(price, time) AS close,
    SUM(market_ticks.volume) AS volume
  FROM market_ticks
  WHERE symbol = p_symbol
    AND time >= p_start_time
    AND time <= p_end_time
  GROUP BY bucket
  ORDER BY bucket DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to update position with new trade
CREATE OR REPLACE FUNCTION update_position_with_trade()
RETURNS TRIGGER AS $$
DECLARE
  existing_position RECORD;
  new_avg_price DECIMAL(20, 8);
  new_quantity DECIMAL(20, 8);
BEGIN
  -- Get existing position
  SELECT * INTO existing_position
  FROM positions
  WHERE portfolio_id = NEW.portfolio_id AND symbol = NEW.symbol;

  IF FOUND THEN
    -- Calculate new average price and quantity
    IF NEW.side = 'buy' THEN
      new_quantity := existing_position.quantity + NEW.quantity;
      new_avg_price := ((existing_position.quantity * existing_position.avg_entry_price) + 
                       (NEW.quantity * NEW.price)) / new_quantity;
      
      UPDATE positions
      SET quantity = new_quantity,
          avg_entry_price = new_avg_price,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = existing_position.id;
    ELSE -- sell
      new_quantity := existing_position.quantity - NEW.quantity;
      
      IF new_quantity > 0 THEN
        -- Calculate realized P&L
        UPDATE positions
        SET quantity = new_quantity,
            realized_pnl = realized_pnl + (NEW.quantity * (NEW.price - existing_position.avg_entry_price)),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = existing_position.id;
      ELSE
        -- Close position
        UPDATE positions
        SET quantity = 0,
            realized_pnl = realized_pnl + (existing_position.quantity * (NEW.price - existing_position.avg_entry_price)),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = existing_position.id;
      END IF;
    END IF;
  ELSE
    -- Create new position
    IF NEW.side = 'buy' THEN
      INSERT INTO positions (portfolio_id, symbol, quantity, avg_entry_price, current_price)
      VALUES (NEW.portfolio_id, NEW.symbol, NEW.quantity, NEW.price, NEW.price);
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update positions when trades are executed
CREATE TRIGGER trigger_update_position_on_trade
  AFTER INSERT ON trades
  FOR EACH ROW
  WHEN (NEW.status = 'executed')
  EXECUTE FUNCTION update_position_with_trade();

-- Function to get top movers
CREATE OR REPLACE FUNCTION get_top_movers(
  p_limit INTEGER DEFAULT 10,
  p_direction VARCHAR(10) DEFAULT 'both'
)
RETURNS TABLE (
  symbol VARCHAR(10),
  price DECIMAL(20, 8),
  change DECIMAL(20, 8),
  change_percent DECIMAL(10, 4),
  volume BIGINT,
  timestamp TIMESTAMPTZ
) AS $$
BEGIN
  IF p_direction = 'gainers' THEN
    RETURN QUERY
    SELECT DISTINCT ON (m.symbol)
      m.symbol,
      m.price,
      m.change,
      m.change_percent,
      m.volume,
      m.time AS timestamp
    FROM market_ticks m
    WHERE m.time >= NOW() - INTERVAL '1 day'
    ORDER BY m.symbol, m.time DESC, m.change_percent DESC
    LIMIT p_limit;
  ELSIF p_direction = 'losers' THEN
    RETURN QUERY
    SELECT DISTINCT ON (m.symbol)
      m.symbol,
      m.price,
      m.change,
      m.change_percent,
      m.volume,
      m.time AS timestamp
    FROM market_ticks m
    WHERE m.time >= NOW() - INTERVAL '1 day'
    ORDER BY m.symbol, m.time DESC, m.change_percent ASC
    LIMIT p_limit;
  ELSE
    RETURN QUERY
    SELECT DISTINCT ON (m.symbol)
      m.symbol,
      m.price,
      m.change,
      m.change_percent,
      m.volume,
      m.time AS timestamp
    FROM market_ticks m
    WHERE m.time >= NOW() - INTERVAL '1 day'
    ORDER BY m.symbol, m.time DESC, ABS(m.change_percent) DESC
    LIMIT p_limit;
  END IF;
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION calculate_portfolio_value IS 'Calculate total market value of a portfolio';
COMMENT ON FUNCTION calculate_portfolio_pnl IS 'Calculate total, realized, and unrealized P&L for a portfolio';
COMMENT ON FUNCTION get_ohlcv IS 'Get OHLCV candlestick data for a symbol over a time range';
COMMENT ON FUNCTION get_top_movers IS 'Get top gaining/losing stocks by percentage change';
