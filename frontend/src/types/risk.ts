// Risk analysis types

export interface RiskMetric {
    var95: number; // 95% Value at Risk
    var99: number; // 99% Value at Risk
    sharpeRatio: number;
    beta: number;
    maxDrawdown: number;
    volatility: number;
}

export interface GreeksData {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
}

export interface VaRData {
    confidence: number;
    value: number;
    timeHorizon: string;
    methodology: 'historical' | 'parametric' | 'monteCarlo';
}

export interface StressScenario {
    id: string;
    name: string;
    description: string;
    impact: number;
    impactPercent: number;
    probability: 'low' | 'medium' | 'high';
}

export interface Alert {
    id: string;
    type: 'risk' | 'price' | 'position' | 'system';
    severity: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: number;
    isRead: boolean;
    data?: Record<string, any>;
}

export interface ExposureBreakdown {
    category: string;
    value: number;
    percentage: number;
    color: string;
}

export interface Position {
    id: string;
    symbol: string;
    quantity: number;
    entryPrice: number;
    currentPrice: number;
    pnl: number;
    pnlPercent: number;
    side: 'long' | 'short';
    openedAt: number;
}

export interface PortfolioSummary {
    totalValue: number;
    dailyPnL: number;
    dailyPnLPercent: number;
    openPositions: number;
    winRate: number;
    totalTrades: number;
}
