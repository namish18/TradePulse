'use client';

import { ReactNode } from 'react';
import { Header, Sidebar } from '@/components/common';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-primary-dark)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '2rem', paddingBottom: '2rem' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
