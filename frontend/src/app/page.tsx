import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default function HomePage() {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Real-Time Trading Analytics
                        <span className={styles.highlight}> at Your Fingertips</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Professional-grade risk management, portfolio tracking, and market analysis
                        powered by GraphQL and WebSocket subscriptions
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/dashboard">
                            <Button variant="primary" size="lg">
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" size="lg">
                                View Platform
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Why TradePulse?</h2>
                    <div className={styles.featureGrid}>
                        <Card variant="elevated" hoverable>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>📊</div>
                                <h3 className={styles.featureTitle}>Real-Time Streams</h3>
                                <p className={styles.featureText}>
                                    WebSocket-powered market data with millisecond latency.
                                    Never miss a trading opportunity with live price updates.
                                </p>
                            </div>
                        </Card>

                        <Card variant="elevated" hoverable>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>⚠️</div>
                                <h3 className={styles.featureTitle}>Risk Analytics</h3>
                                <p className={styles.featureText}>
                                    Advanced VaR calculations, Greeks tracking, and stress
                                    scenario testing to protect your portfolio.
                                </p>
                            </div>
                        </Card>

                        <Card variant="elevated" hoverable>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>🔌</div>
                                <h3 className={styles.featureTitle}>GraphQL API</h3>
                                <p className={styles.featureText}>
                                    Modern, type-safe API with flexible queries and real-time
                                    subscriptions for seamless data access.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footerContent}>
                        <div className={styles.footerBrand}>
                            <h3 className={styles.brandName}>TradePulse</h3>
                            <p className={styles.brandTagline}>
                                Professional Trading Analytics
                            </p>
                        </div>
                        <div className={styles.footerLinks}>
                            <a href="#" className={styles.footerLink}>Documentation</a>
                            <a href="#" className={styles.footerLink}>API Reference</a>
                            <a href="#" className={styles.footerLink}>Contact</a>
                        </div>
                    </div>
                    <p className={styles.copyright}>
                        © 2024 TradePulse. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
