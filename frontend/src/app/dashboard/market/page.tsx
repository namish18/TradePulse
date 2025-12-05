'use client';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import styles from './page.module.css';

export default function MarketPage() {
    const indices = [
        { name: 'S&P 500', value: '4,783.45', change: '+1.2%', positive: true },
        { name: 'NASDAQ', value: '15,011.35', change: '+0.8%', positive: true },
        { name: 'DOW', value: '37,440.34', change: '-0.3%', positive: false },
    ];

    const topMovers = [
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: 495.50, change: '+8.5%', volume: '45.2M', positive: true },
        { symbol: 'TSLA', name: 'Tesla Inc', price: 242.84, change: '+5.2%', volume: '102.3M', positive: true },
        { symbol: 'AAPL', name: 'Apple Inc', price: 178.72, change: '-2.1%', volume: '55.8M', positive: false },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Market Data</h1>
                <Input
                    type="search"
                    placeholder="Search symbols..."
                    icon={<span>🔍</span>}
                />
            </div>

            {/* Market Indices */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Market Indices</h2>
                <div className={styles.indicesGrid}>
                    {indices.map((index, i) => (
                        <Card key={i} variant="elevated">
                            <div className={styles.indexCard}>
                                <div className={styles.indexName}>{index.name}</div>
                                <div className={styles.indexValue}>{index.value}</div>
                                <div className={`${styles.indexChange} ${index.positive ? styles.positive : styles.negative}`}>
                                    {index.change}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Top Movers */}
            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Top Movers</h2>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <div>Symbol</div>
                            <div>Name</div>
                            <div>Price</div>
                            <div>Change</div>
                            <div>Volume</div>
                        </div>
                        {topMovers.map((stock, i) => (
                            <div key={i} className={styles.tableRow}>
                                <div className={styles.symbol}>{stock.symbol}</div>
                                <div className={styles.name}>{stock.name}</div>
                                <div>${stock.price}</div>
                                <div className={stock.positive ? styles.positive : styles.negative}>
                                    {stock.change}
                                </div>
                                <div className={styles.volume}>{stock.volume}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Chart Placeholder */}
            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Live Chart</h2>
                    </div>
                    <div className={styles.chartPlaceholder}>
                        <p>Chart component would be integrated here (e.g., Chart.js, Recharts)</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
