-- Create TimescaleDB Hypertables
-- Converts time-series tables to hypertables for optimal performance

-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Convert market_ticks to hypertable
SELECT create_hypertable('market_ticks', 'time', 
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- Convert risk_metrics to hypertable
SELECT create_hypertable('risk_metrics', 'time',
  chunk_time_interval => INTERVAL '7 days',
  if_not_exists => TRUE
);

-- Add compression policies for market_ticks (compress data older than 7 days)
ALTER TABLE market_ticks SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'symbol',
  timescaledb.compress_orderby = 'time DESC'
);

SELECT add_compression_policy('market_ticks', INTERVAL '7 days', if_not_exists => TRUE);

-- Add compression policies for risk_metrics (compress data older than 30 days)
ALTER TABLE risk_metrics SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'portfolio_id',
  timescaledb.compress_orderby = 'time DESC'
);

SELECT add_compression_policy('risk_metrics', INTERVAL '30 days', if_not_exists => TRUE);

-- Add retention policies (optional - delete old data)
-- Market ticks: keep for 1 year
SELECT add_retention_policy('market_ticks', INTERVAL '1 year', if_not_exists => TRUE);

-- Risk metrics: keep for 2 years
SELECT add_retention_policy('risk_metrics', INTERVAL '2 years', if_not_exists => TRUE);

-- Add continuous aggregates for OHLCV data
CREATE MATERIALIZED VIEW IF NOT EXISTS market_ticks_1h
WITH (timescaledb.continuous) AS
SELECT
  time_bucket('1 hour', time) AS bucket,
  symbol,
  FIRST(price, time) AS open,
  MAX(price) AS high,
  MIN(price) AS low,
  LAST(price, time) AS close,
  SUM(volume) AS volume
FROM market_ticks
GROUP BY bucket, symbol
WITH NO DATA;

-- Refresh policy for continuous aggregate
SELECT add_continuous_aggregate_policy('market_ticks_1h',
  start_offset => INTERVAL '3 hours',
  end_offset => INTERVAL '1 hour',
  schedule_interval => INTERVAL '1 hour',
  if_not_exists => TRUE
);

-- Create daily OHLCV aggregate
CREATE MATERIALIZED VIEW IF NOT EXISTS market_ticks_1d
WITH (timescaledb.continuous) AS
SELECT
  time_bucket('1 day', time) AS bucket,
  symbol,
  FIRST(price, time) AS open,
  MAX(price) AS high,
  MIN(price) AS low,
  LAST(price, time) AS close,
  SUM(volume) AS volume
FROM market_ticks
GROUP BY bucket, symbol
WITH NO DATA;

SELECT add_continuous_aggregate_policy('market_ticks_1d',
  start_offset => INTERVAL '3 days',
  end_offset => INTERVAL '1 day',
  schedule_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

COMMENT ON MATERIALIZED VIEW market_ticks_1h IS 'Hourly OHLCV aggregates';
COMMENT ON MATERIALIZED VIEW market_ticks_1d IS 'Daily OHLCV aggregates';
