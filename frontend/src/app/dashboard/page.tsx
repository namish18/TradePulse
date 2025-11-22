'use client';

import { Card, CardContent, CardHeader } from '@/components/ui';
import { usePortfolio, useRiskMetrics } from '@/hooks';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { LoadingSpinner } from '@/components/common';
import { TrendingUp, TrendingDown, Wallet, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { portfolio, loading: portfolioLoading } = usePortfolio();
  const { metrics, loading: metricsLoading } = useRiskMetrics();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--color-white)' }}>Dashboard</h1>
        <p style={{ color: 'var(--color-gray-400)', marginTop: '0.5rem' }}>Welcome to your trading platform</p>
      </div>

      {/* Quick Stats */}
      {portfolioLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadingSpinner />
        </div>
      ) : portfolio ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {/* Total Value */}
          <Card variant="glass">
            <CardContent style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Value</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-white)' }}>
                    {formatCurrency(portfolio.totalValue)}
                  </p>
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(2, 6, 111, 0.2)', borderRadius: 'var(--radius-lg)' }}>
                  <Wallet style={{ width: '1.5rem', height: '1.5rem', color: 'var(--color-primary-light)' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash Balance */}
          <Card variant="glass">
            <CardContent style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Cash Balance</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-white)' }}>
                    {formatCurrency(portfolio.cashBalance)}
                  </p>
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-lg)' }}>
                  <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: '#4ade80' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Used Margin */}
          <Card variant="glass">
            <CardContent style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Used Margin</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-white)' }}>
                    {formatCurrency(portfolio.usedMargin)}
                  </p>
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: 'var(--radius-lg)' }}>
                  <AlertTriangle style={{ width: '1.5rem', height: '1.5rem', color: 'var(--color-warning)' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Margin */}
          <Card variant="glass">
            <CardContent style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Available Margin</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-white)' }}>
                    {formatCurrency(portfolio.availableMargin)}
                  </p>
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-lg)' }}>
                  <TrendingDown style={{ width: '1.5rem', height: '1.5rem', color: 'var(--color-success)' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Positions Summary */}
      {portfolio && (
        <Card variant="glass">
          <CardHeader>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-white)' }}>Open Positions</h2>
          </CardHeader>
          <CardContent>
            {portfolio.positions.length === 0 ? (
              <p style={{ color: 'var(--color-gray-400)', textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
                No open positions
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {portfolio.positions.slice(0, 6).map((position) => (
                  <div
                    key={position.id}
                    style={{
                      padding: '1rem',
                      backgroundColor: 'var(--color-primary-dark)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid rgba(2, 6, 111, 0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h3 style={{ color: 'var(--color-white)', fontWeight: '600' }}>{position.symbol}</h3>
                      <span
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: position.pnl >= 0 ? '#4ade80' : '#f87171',
                        }}
                      >
                        {position.pnl >= 0 ? '+' : '-'}
                        {formatCurrency(Math.abs(position.pnl))}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-400)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <p>Qty: {position.quantity.toFixed(2)}</p>
                      <p>Price: {formatCurrency(position.currentPrice)}</p>
                      <p>Exposure: {formatCurrency(position.exposure)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Risk Metrics */}
      {metricsLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadingSpinner />
        </div>
      ) : metrics ? (
        <Card variant="glass">
          <CardHeader>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-white)' }}>Risk Metrics</h2>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <div>
                <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>VaR (95%)</p>
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-white)' }}>
                  {formatPercentage(metrics.var95)}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>VaR (99%)</p>
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-white)' }}>
                  {formatPercentage(metrics.var99)}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Sharpe Ratio</p>
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-white)' }}>
                  {metrics.sharpeRatio.toFixed(2)}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Volatility</p>
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-white)' }}>
                  {formatPercentage(metrics.volatility)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
