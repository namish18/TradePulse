'use client';

import { usePortfolio } from '@/hooks';
import { PositionsTable, PnLSummary, ExposureBreakdown } from '@/components/portfolio';
import { LoadingSpinner } from '@/components/common';

export default function PortfolioPage() {
  const { portfolio, loading } = usePortfolio();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner message="Loading portfolio data..." />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">Failed to load portfolio</p>
      </div>
    );
  }

  const totalPnL = portfolio.positions.reduce((sum, p) => sum + p.pnl, 0);
  const totalExposure = portfolio.positions.reduce((sum, p) => sum + p.exposure, 0);
  const pnlPercent = totalExposure === 0 ? 0 : (totalPnL / totalExposure) * 100;

  const exposures = portfolio.positions.map((p) => ({
    asset: p.symbol,
    value: p.exposure,
    percentage: (p.exposure / totalExposure) * 100,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Portfolio</h1>
        <p className="text-gray-400 mt-2">Manage and monitor your trading positions</p>
      </div>

      {/* P&L Summary */}
      <PnLSummary
        totalValue={portfolio.totalValue}
        cashBalance={portfolio.cashBalance}
        pnl={totalPnL}
        pnlPercent={pnlPercent}
      />

      {/* Positions and Exposure */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PositionsTable positions={portfolio.positions} />
        </div>
        <div>
          <ExposureBreakdown exposures={exposures} title="Asset Allocation" />
        </div>
      </div>
    </div>
  );
}
