import { ReactNode } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { ProtectedRoute } from '@/components/auth';

export const metadata = {
  title: 'Dashboard - Trading Platform',
};

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
