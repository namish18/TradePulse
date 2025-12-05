'use client';

import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default function PortfolioPage() {
    const positions = [
        { symbol: 'AAPL', quantity: 100, entryPrice: 170.50, currentPrice: 178.72, pnl: 822.00, pnlPercent: 4.82 },
        { symbol: 'TSLA', quantity: 50, entryPrice: 230.00, currentPrice: 242.84, pnl: 642.00, pnlPercent: 5.58 },
        { symbol: 'MSFT', quantity: 75, entryPrice: 385.00, currentPrice: 380.34, pnl: -349.50, pnlPercent: -1.21 },
        { symbol: 'NVDA', quantity: 30, entryPrice: 460.00, currentPrice: 495.50, pnl: 1065.00, pnlPercent: 7.72 },
    ];

    const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
    const totalValue = positions.reduce((sum, pos) => sum + pos.currentPrice * pos.quantity, 0);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Portfolio</h1>
            </div>

            {/* Summary Cards */}
            <div className={styles.summaryGrid}>
                <Card variant="elevated">
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryLabel}>Total Value</div>
                        <div className={styles.summaryValue}>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    </div>
                </Card>
                <Card variant="elevated">
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryLabel}>Total P&L</div>
                        <div className={`${styles.summaryValue} ${totalPnL >= 0 ? styles.positive : styles.negative}`}>
                            ${totalPnL.toFixed(2)}
                        </div>
                        <div className={`${styles.summaryChange} ${totalPnL >= 0 ? styles.positive : styles.negative}`}>
                            {((totalPnL / (totalValue - totalPnL)) * 100).toFixed(2)}%
                        </div>
                    </div>
                </Card>
                <Card variant="elevated">
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryLabel}>Open Positions</div>
                        <div className={styles.summaryValue}>{positions.length}</div>
                    </div>
                </Card>
            </div>

            {/* Positions Table */}
            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Positions</h2>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <div>Symbol</div>
                            <div>Quantity</div>
                            <div>Entry Price</div>
                            <div>Current Price</div>
                            <div>P&L</div>
                            <div>P&L %</div>
                            <div>Actions</div>
                        </div>
                        {positions.map((pos, i) => (
                            <div key={i} className={styles.tableRow}>
                                <div className={styles.symbol}>{pos.symbol}</div>
                                <div>{pos.quantity}</div>
                                <div>${pos.entryPrice.toFixed(2)}</div>
                                <div>${pos.currentPrice.toFixed(2)}</div>
                                <div className={pos.pnl >= 0 ? styles.positive : styles.negative}>
                                    ${pos.pnl.toFixed(2)}
                                </div>
                                <div className={pos.pnlPercent >= 0 ? styles.positive : styles.negative}>
                                    {pos.pnlPercent >= 0 ? '+' : ''}{pos.pnlPercent.toFixed(2)}%
                                </div>
                                <div>
                                    <button className={styles.actionBtn}>Close</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Exposure Breakdown */}
            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Exposure by Sector</h2>
                    </div>
                    <div className={styles.exposurePlaceholder}>
                        <p>Pie chart or bar chart for sector exposure would be displayed here</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
