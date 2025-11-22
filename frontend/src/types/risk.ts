export interface RiskMetrics {
  id: string;
  portfolioId: string;
  var95: number;
  var99: number;
  expectedShortfall: number;
  beta: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  timestamp: string;
}

export interface StressScenario {
  id: string;
  name: string;
  description: string;
  marketShock: number;
  volatilityShock: number;
  portfolioDelta: number;
}

export interface RiskAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface Exposure {
  asset: string;
  value: number;
  percentage: number;
  currency: string;
}
