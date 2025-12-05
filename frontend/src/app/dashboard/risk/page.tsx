'use client';

import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default function RiskPage() {
    const metrics = {
        var95: 12450.50,
        var99: 18750.30,
        sharpeRatio: 1.85,
        beta: 1.12,
        maxDrawdown: 8.5,
        volatility: 15.3,
    };

    const alerts = [
        { id: 1, severity: 'critical', message: 'Portfolio VaR exceeded threshold', time: '5 min ago' },
        { id: 2, severity: 'warning', message: 'High correlation detected in tech sector', time: '1 hour ago' },
        { id: 3, severity: 'info', message: 'Daily risk report generated', time: '2 hours ago' },
    ];

    const scenarios = [
        { name: 'Market Crash -20%', impact: -25340.50, probability: 'low' },
        { name: 'Tech Sector Correction', impact: -15240.30, probability: 'medium' },
        { name: 'Interest Rate Hike', impact: -8920.15, probability: 'high' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Risk Analytics</h1>
            </div>

            {/* Risk Metrics Grid */}
            <div className={styles.metricsGrid}>
                <Card variant="elevated">
                    <div className={styles.metric}>
                        <div className={styles.metricLabel}>VaR (95%)</div>
                        <div className={styles.metricValue}>${metrics.var95.toLocaleString()}</div>
                        <div className={styles.metricDescription}>1-day, 95% confidence</div>
                    </div>
                </Card>
                <Card variant="elevated">
                    <div className={styles.metric}>
                        <div className={styles.metricLabel}>VaR (99%)</div>
                        <div className={styles.metricValue}>${metrics.var99.toLocaleString()}</div>
                        <div className={styles.metricDescription}>1-day, 99% confidence</div>
                    </div>
                </Card>
                <Card variant="elevated">
                    <div className={styles.metric}>
                        <div className={styles.metricLabel}>Sharpe Ratio</div>
                        <div className={styles.metricValue}>{metrics.sharpeRatio.toFixed(2)}</div>
                        <div className={`${styles.metricDescription} ${styles.positive}`}>Good</div>
                    </div>
                </Card>
                <Card variant="elevated">
                    <div className={styles.metric}>
                        <div className={styles.metricLabel}>Beta</div>
                        <div className={styles.metricValue}>{metrics.beta.toFixed(2)}</div>
                        <div className={styles.metricDescription}>vs S&P 500</div>
                    </div>
                </Card>
                <Card variant="elevated">
                    <div className={styles.metric}>
                        <div className={styles.metricLabel}>Max Drawdown</div>
                        <div className={`${styles.metricValue} ${styles.negative}`}>{metrics.maxDrawdown}%</div>
                        <div className={styles.metricDescription}>30-day period</div>
                    </div>
                </Card>
                <Card variant="elevated">
                    <div className={styles.metric}>
                        <div className={styles.metricLabel}>Volatility</div>
                        <div className={styles.metricValue}>{metrics.volatility}%</div>
                        <div className={styles.metricDescription}>Annualized</div>
                    </div>
                </Card>
            </div>

            {/* Alerts Panel */}
            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Risk Alerts</h2>
                    </div>
                    <div className={styles.alertsList}>
                        {alerts.map(alert => (
                            <div key={alert.id} className={`${styles.alert} ${styles[alert.severity]}`}>
                                <div className={styles.alertIcon}>
                                    {alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '⚠️' : 'ℹ️'}
                                </div>
                                <div className={styles.alertContent}>
                                    <div className={styles.alertMessage}>{alert.message}</div>
                                    <div className={styles.alertTime}>{alert.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Stress Scenarios */}
            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Stress Scenarios</h2>
                    </div>
                    <div className={styles.scenariosList}>
                        {scenarios.map((scenario, i) => (
                            <div key={i} className={styles.scenario}>
                                <div>
                                    <div className={styles.scenarioName}>{scenario.name}</div>
                                    <div className={styles.scenarioProbability}>
                                        Probability: <span className={styles[scenario.probability]}>{scenario.probability}</span>
                                    </div>
                                </div>
                                <div className={`${styles.scenarioImpact} ${styles.negative}`}>
                                    ${scenario.impact.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
