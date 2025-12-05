import { LoginForm } from '@/components/auth/LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.background} />
            <div className={styles.content}>
                <LoginForm />
            </div>
        </div>
    );
}
