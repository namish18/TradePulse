'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.logo}>TradePulse</h1>
                </div>
                <nav className={styles.nav}>
                    <Link href="/dashboard" className={styles.navLink}>
                        <span className={styles.navIcon}>📊</span>
                        <span className={styles.navText}>Dashboard</span>
                    </Link>
                    <Link href="/dashboard/market" className={styles.navLink}>
                        <span className={styles.navIcon}>📈</span>
                        <span className={styles.navText}>Market</span>
                    </Link>
                    <Link href="/dashboard/portfolio" className={styles.navLink}>
                        <span className={styles.navIcon}>💼</span>
                        <span className={styles.navText}>Portfolio</span>
                    </Link>
                    <Link href="/dashboard/risk" className={styles.navLink}>
                        <span className={styles.navIcon}>⚠️</span>
                        <span className={styles.navText}>Risk</span>
                    </Link>
                    <Link href="/settings" className={styles.navLink}>
                        <span className={styles.navIcon}>⚙️</span>
                        <span className={styles.navText}>Settings</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={styles.main}>
                {/* Header */}
                <header className={styles.header}>
                    <button
                        className={styles.menuButton}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        ☰
                    </button>
                    <div className={styles.headerRight}>
                        <button className={styles.iconButton}>
                            <span className={styles.notificationBadge}>3</span>
                            🔔
                        </button>
                        <div className={styles.userMenu}>
                            <div className={styles.avatar}>U</div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
}
