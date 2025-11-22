'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    backgroundColor: 'var(--color-primary-dark)',
    border: '1px solid rgba(2, 6, 111, 0.2)',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--color-white)',
    fontSize: '1rem',
    transition: 'border-color var(--transition-base)',
    fontFamily: 'inherit',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {error && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(127, 29, 29, 0.2)', border: '1px solid #f87171', borderRadius: 'var(--radius-lg)', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-gray-300)', marginBottom: '0.5rem' }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={inputStyle}
          onFocus={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-danger)';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(2, 6, 111, 0.2)';
          }}
        />
      </div>

      <div>
        <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-gray-300)', marginBottom: '0.5rem' }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={inputStyle}
          onFocus={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-danger)';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(2, 6, 111, 0.2)';
          }}
        />
      </div>

      <Button type="submit" loading={loading} style={{ width: '100%' }}>
        Sign In
      </Button>
    </form>
  );
}
