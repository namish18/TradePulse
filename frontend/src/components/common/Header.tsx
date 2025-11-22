'use client';

import Link from 'next/link';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const linkStyle: React.CSSProperties = {
    color: 'var(--color-gray-300)',
    transition: 'color var(--transition-base)',
    cursor: 'pointer',
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        borderBottom: '1px solid rgba(2, 6, 111, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '4rem',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '700',
              fontSize: '1.25rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--color-danger) 0%, var(--color-primary-light) 100%)',
              }}
            />
            <span style={{ color: 'var(--color-white)' }}>Trading</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'none',
              '@media (min-width: 768px)': { display: 'flex' },
              alignItems: 'center',
              gap: '2rem',
            } as any}
          >
            {user && (
              <>
                <Link
                  href="/dashboard"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-300)';
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/market"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-300)';
                  }}
                >
                  Market
                </Link>
                <Link
                  href="/dashboard/portfolio"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-300)';
                  }}
                >
                  Portfolio
                </Link>
                <Link
                  href="/dashboard/risk"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-300)';
                  }}
                >
                  Risk
                </Link>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div
            style={{
              display: 'none',
              '@media (min-width: 768px)': { display: 'flex' },
              alignItems: 'center',
              gap: '1rem',
            } as any}
          >
            {user ? (
              <>
                <span style={{ color: 'var(--color-gray-300)' }}>{user.email}</span>
                <Link href="/settings" title="Settings">
                  <Settings
                    style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-gray-300)', cursor: 'pointer', transition: 'color var(--transition-base)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as any).style.color = 'var(--color-white)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as any).style.color = 'var(--color-gray-300)';
                    }}
                  />
                </Link>
                <button
                  onClick={() => logout()}
                  title="Logout"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-gray-300)',
                    transition: 'color var(--transition-base)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-white)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-gray-300)';
                  }}
                >
                  <LogOut style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                style={{
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  backgroundColor: 'var(--color-danger)',
                  color: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'background-color var(--transition-base)',
                  textDecoration: 'none',
                }}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              '@media (max-width: 767px)': { display: 'block' },
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-white)',
              transition: 'background-color var(--transition-base)',
            } as any}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            {isMenuOpen ? <X style={{ width: '1.5rem', height: '1.5rem' }} /> : <Menu style={{ width: '1.5rem', height: '1.5rem' }} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            style={{
              display: 'none',
              '@media (max-width: 767px)': { display: 'block' },
              paddingTop: '1rem',
              paddingBottom: '1rem',
              borderTop: '1px solid rgba(2, 6, 111, 0.2)',
            } as any}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {user && (
                <>
                  <Link href="/dashboard" style={{ ...linkStyle, textDecoration: 'none' }}>
                    Dashboard
                  </Link>
                  <Link href="/dashboard/market" style={{ ...linkStyle, textDecoration: 'none' }}>
                    Market
                  </Link>
                  <Link href="/dashboard/portfolio" style={{ ...linkStyle, textDecoration: 'none' }}>
                    Portfolio
                  </Link>
                  <Link href="/dashboard/risk" style={{ ...linkStyle, textDecoration: 'none' }}>
                    Risk
                  </Link>
                  <hr style={{ borderColor: 'rgba(2, 6, 111, 0.2)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} />
                  <Link href="/settings" style={{ ...linkStyle, textDecoration: 'none' }}>
                    Settings
                  </Link>
                  <button
                    onClick={() => logout()}
                    style={{
                      textAlign: 'left',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      ...linkStyle,
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <Link
                  href="/login"
                  style={{
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    backgroundColor: 'var(--color-danger)',
                    color: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'background-color var(--transition-base)',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
