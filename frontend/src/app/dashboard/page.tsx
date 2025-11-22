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
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to your trading platform</p>
      </div>

      {/* Quick Stats */}
      {portfolioLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : portfolio ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Value */}
          <Card variant="glass">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Value</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(portfolio.totalValue)}
                  </p>
                </div>
                <div className="p-3 bg-primary-light/20 rounded-lg">
                  <Wallet className="w-6 h-6 text-primary-light" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash Balance */}
          <Card variant="glass">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Cash Balance</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(portfolio.cashBalance)}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Used Margin */}
          <Card variant="glass">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Used Margin</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(portfolio.usedMargin)}
                  </p>
                </div>
                <div className="p-3 bg-warning/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Margin */}
          <Card variant="glass">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Available Margin</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(portfolio.availableMargin)}
                  </p>
                </div>
                <div className="p-3 bg-success/20 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-success" />
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
            <h2 className="text-xl font-semibold text-white">Open Positions</h2>
          </CardHeader>
          <CardContent>
            {portfolio.positions.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No open positions</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolio.positions.slice(0, 6).map((position) => (
                  <div
                    key={position.id}
                    className="p-4 bg-primary-dark rounded-lg border border-primary-light/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{position.symbol}</h3>
                      <span
                        className={`text-sm font-semibold ${
                          position.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {position.pnl >= 0 ? '+' : '-'}
                        {formatCurrency(Math.abs(position.pnl))}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
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
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : metrics ? (
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Risk Metrics</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">VaR (95%)</p>
                <p className="text-lg font-semibold text-white">
                  {formatPercentage(metrics.var95)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">VaR (99%)</p>
                <p className="text-lg font-semibold text-white">
                  {formatPercentage(metrics.var99)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Sharpe Ratio</p>
                <p className="text-lg font-semibold text-white">
                  {metrics.sharpeRatio.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Volatility</p>
                <p className="text-lg font-semibold text-white">
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
