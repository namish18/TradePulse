'use client';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function SettingsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Settings</h1>
            </div>

            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>User Profile</h2>
                    </div>
                    <div className={styles.cardBody}>
                        <Input label="Name" placeholder="Your name" defaultValue="John Trader" />
                        <Input label="Email" type="email" placeholder="email@example.com" defaultValue="trader@example.com" />
                        <Button variant="primary">Save Profile</Button>
                    </div>
                </Card>
            </div>

            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Notifications</h2>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.setting}>
                            <div>
                                <div className={styles.settingLabel}>Price Alerts</div>
                                <div className={styles.settingDescription}>Get notified when prices hit your targets</div>
                            </div>
                            <input type="checkbox" defaultChecked className={styles.checkbox} />
                        </div>
                        <div className={styles.setting}>
                            <div>
                                <div className={styles.settingLabel}>Risk Alerts</div>
                                <div className={styles.settingDescription}>Receive notifications when risk thresholds are exceeded</div>
                            </div>
                            <input type="checkbox" defaultChecked className={styles.checkbox} />
                        </div>
                        <div className={styles.setting}>
                            <div>
                                <div className={styles.settingLabel}>Daily Summary</div>
                                <div className={styles.settingDescription}>Get a daily email with your portfolio performance</div>
                            </div>
                            <input type="checkbox" className={styles.checkbox} />
                        </div>
                    </div>
                </Card>
            </div>

            <div className={styles.section}>
                <Card variant="elevated">
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>API Keys</h2>
                    </div>
                    <div className={styles.cardBody}>
                        <p className={styles.infoText}>Manage your API keys for programmatic access to TradePulse</p>
                        <div className={styles.apiKey}>
                            <code className={styles.code}>tp_sk_xxxxxxxxxxxxxxxxxxxxxxxx</code>
                            <Button variant="ghost" size="sm">Revoke</Button>
                        </div>
                        <Button variant="outline">Generate New Key</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
