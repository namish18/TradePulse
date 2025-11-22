import { LoginForm } from '@/components/auth';
import { Header } from '@/components/common';
import Link from 'next/link';

export const metadata = {
  title: 'Login - Trading Platform',
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ width: '100%', maxWidth: '28rem' }}>
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--color-white)', marginBottom: '0.5rem' }}>
                Welcome Back
              </h1>
              <p style={{ color: 'var(--color-gray-400)' }}>Sign in to your account</p>
            </div>

            <LoginForm />

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-gray-400)' }}>
                Don&apos;t have an account?{' '}
                <Link href="/signup" style={{ color: 'var(--color-danger)', fontWeight: '600', textDecoration: 'none' }}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(2, 6, 111, 0.1)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(2, 6, 111, 0.2)' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-400)' }}>
              <strong>Demo credentials:</strong> Use any email and password for testing
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
