import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ApolloProvider } from '@/lib/apollo-provider';
import { AuthProvider } from '@/components/auth/AuthProvider';
import './globals.css';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'TradePulse - Real-Time Trading Analytics',
    description: 'Professional trading analytics platform with real-time market data, risk management, and portfolio tracking',
    keywords: 'trading, analytics, real-time, market data, risk management, portfolio',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={styles.html}>
            <body className={inter.className}>
                <ApolloProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </ApolloProvider>
            </body>
        </html>
    );
}
