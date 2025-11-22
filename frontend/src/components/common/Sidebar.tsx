'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Wallet,
  AlertTriangle,
  Settings,
  LogOut,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/hooks';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/dashboard', exact: true },
    { icon: TrendingUp, label: 'Market', href: '/dashboard/market' },
    { icon: Wallet, label: 'Portfolio', href: '/dashboard/portfolio' },
    { icon: AlertTriangle, label: 'Risk', href: '/dashboard/risk' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      style={{
        display: 'none',
        '@media (min-width: 1024px)': { display: 'flex' },
        flexDirection: 'column',
        width: '16rem',
        backgroundColor: 'var(--color-primary-light)',
        borderRight: '1px solid rgba(2, 6, 111, 0.2)',
        height: '100%',
      } as any}
    >
      <nav
        style={{
          flex: 1,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition-base)',
                backgroundColor: active ? 'var(--color-danger)' : 'transparent',
                color: active ? 'var(--color-white)' : 'var(--color-gray-300)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-300)';
                }
              }}
            >
              <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
              <span style={{ fontWeight: '500' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(2, 6, 111, 0.2)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-300)', paddingLeft: '1rem' }}>
          {user.email}
        </p>
        <button
          onClick={() => logout()}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-gray-300)',
            backgroundColor: 'transparent',
            border: 'none',
            transition: 'all var(--transition-base)',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '1rem',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-white)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gray-300)';
          }}
        >
          <LogOut style={{ width: '1.25rem', height: '1.25rem' }} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
