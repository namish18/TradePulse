'use client';

import { useRiskMetrics } from '@/hooks';
import { RiskMetrics, AlertsPanel, VaRChart, StressScenarios } from '@/components/risk';
import { LoadingSpinner } from '@/components/common';

// Mock data for demo purposes
const mockAlerts = [
  {
    id: '1',
    severity: 'high' as const,
    message: 'Portfolio VaR exceeds 5% threshold',
    timestamp: new Date().toISOString(),
    resolved: false,
  },
  {
    id: '2',
    severity: 'medium' as const,
    message: 'Margin usage above 70%',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    resolved: false,
  },
];

const mockVaRHistory = [
  { timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), var95: 3.2, var99: 5.1 },
  { timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), var95: 3.5, var99: 5.4 },
  { timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), var95: 3.1, var99: 5.0 },
  { timestamp: new Date(Date.now() - 86400000).toISOString(), var95: 3.8, var99: 5.7 },
  { timestamp: new Date().toISOString(), var95: 4.2, var99: 6.1 },
];

const mockScenarios = [
  {
    id: '1',
    name: 'Market Crash (-10%)',
    description: 'Sudden 10% market decline',
    marketShock: -10,
    volatilityShock: 30,
    portfolioDelta: -12.5,
  },
  {
    id: '2',
    name: 'Interest Rate Shock (+2%)',
    description: 'Rapid interest rate increase',
    marketShock: -5,
    volatilityShock: 15,
    portfolioDelta: -7.2,
  },
  {
    id: '3',
    name: 'VIX Spike (x3)',
    description: 'Volatility index triples',
    marketShock: -8,
    volatilityShock: 150,
    portfolioDelta: -15.3,
  },
];

export default function RiskPage() {
  const { metrics, loading } = useRiskMetrics();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Risk Management</h1>
        <p className="text-gray-400 mt-2">Monitor portfolio risk and stress test scenarios</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner message="Loading risk metrics..." />
        </div>
      ) : metrics ? (
        <>
          {/* Risk Metrics Overview */}
          <RiskMetrics metrics={metrics} />

          {/* Alerts and VaR History */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VaRChart data={mockVaRHistory} />
            </div>
            <div>
              <AlertsPanel alerts={mockAlerts} />
            </div>
          </div>

          {/* Stress Scenarios */}
          <StressScenarios scenarios={mockScenarios} />
        </>
      ) : null}
    </div>
  );
}
