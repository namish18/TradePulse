'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default function DashboardPage() {
    // Mock data - would come from GraphQL
    const stats = [
        { label: 'Portfolio Value', value: '$125,430.50', change: '+5.2%', positive: true },
        { label: 'Daily P&L', value: '+$2,340.25', change: '+1.9%', positive: true },
        { label: 'Open Positions', value: '12', change: '+3', positive: true },
        { label: 'Win Rate', value: '68.5%', change: '+2.3%', positive: true },
    ];

    const recentTrades = [
        { symbol: 'AAPL', side: 'BUY', quantity: 100, price: 178.50, pnl: '+$450', time: '10:34 AM' },
        { symbol: 'TSLA', side: 'SELL', quantity: 50, price: 242.30, pnl: '+$830', time: '10:12 AM' },
        { symbol: 'MSFT', side: 'BUY', quantity: 75, price: 380.20, pnl: '-$120', time: '9:45 AM' },
    ];

    return (
        <ProtectedRoute>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Dashboard</h1>
                    <p className={styles.subtitle}>Welcome back! Here's your trading overview.</p>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <Card key={index} variant="elevated">
                            <div className={styles.stat}>
                                <div className={styles.statLabel}>{stat.label}</div>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                                    {stat.change}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className={styles.section}>
                    <Card variant="elevated">
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Quick Actions</h2>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.actionButton}>📈 New Trade</button>
                            <button className={styles.actionButton}>📊 View Reports</button>
                            <button className={styles.actionButton}>⚙️ Settings</button>
                            <button className={styles.actionButton}>🔔 Alerts</button>
                        </div>
                    </Card>
                </div>

                {/* Recent Trades */}
                <div className={styles.section}>
                    <Card variant="elevated">
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Recent Trades</h2>
                            <a href="/dashboard/portfolio" className={styles.cardLink}>View All</a>
                        </div>
                        <div className={styles.table}>
                            <div className={styles.tableHeader}>
                                <div>Symbol</div>
                                <div>Side</div>
                                <div>Quantity</div>
                                <div>Price</div>
                                <div>P&L</div>
                                <div>Time</div>
                            </div>
                            {recentTrades.map((trade, index) => (
                                <div key={index} className={styles.tableRow}>
                                    <div className={styles.symbol}>{trade.symbol}</div>
                                    <div className={`${styles.side} ${trade.side === 'BUY' ? styles.buy : styles.sell}`}>
                                        {trade.side}
                                    </div>
                                    <div>{trade.quantity}</div>
                                    <div>${trade.price}</div>
                                    <div className={trade.pnl.startsWith('+') ? styles.positive : styles.negative}>
                                        {trade.pnl}
                                    </div>
                                    <div className={styles.time}>{trade.time}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </ProtectedRoute>
    );
}
