'use client';

import { useAuth } from '@/hooks';
import { ProtectedRoute } from '@/components/auth';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { DashboardLayout } from '@/components/dashboard';

function SettingsContent() {
  const { user } = useAuth();

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

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--color-gray-300)',
    marginBottom: '0.5rem',
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--color-white)' }}>Settings</h1>
          <p style={{ color: 'var(--color-gray-400)', marginTop: '0.5rem' }}>Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <Card variant="glass">
          <CardHeader>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-white)' }}>Profile</h2>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                style={{ ...inputStyle, opacity: 0.5 }}
              />
            </div>
            <div>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                style={{ ...inputStyle, opacity: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card variant="glass">
          <CardHeader>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-white)' }}>Notifications</h2>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '1rem', height: '1rem' }} />
              <span style={{ color: 'var(--color-white)' }}>Email notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '1rem', height: '1rem' }} />
              <span style={{ color: 'var(--color-white)' }}>Push notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '1rem', height: '1rem' }} />
              <span style={{ color: 'var(--color-white)' }}>SMS alerts</span>
            </label>
          </CardContent>
        </Card>

        {/* Risk Limits */}
        <Card variant="glass">
          <CardHeader>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-white)' }}>Risk Limits</h2>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Daily Loss Limit ($)</label>
              <input
                type="number"
                defaultValue="10000"
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
              <label style={labelStyle}>Max Leverage</label>
              <input
                type="number"
                defaultValue="2"
                min="1"
                step="0.1"
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-danger)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(2, 6, 111, 0.2)';
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
