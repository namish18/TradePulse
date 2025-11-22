'use client';

import { useAuth } from '@/hooks';
import { ProtectedRoute } from '@/components/auth';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { DashboardLayout } from '@/components/dashboard';

function SettingsContent() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Profile</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 bg-primary-dark border border-primary-light/20 rounded-lg text-gray-400 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full px-4 py-2 bg-primary-dark border border-primary-light/20 rounded-lg text-gray-400 disabled:opacity-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-white">Email notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-white">Push notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-white">SMS alerts</span>
            </label>
          </CardContent>
        </Card>

        {/* Risk Limits */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Risk Limits</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Daily Loss Limit ($)
              </label>
              <input
                type="number"
                defaultValue="10000"
                className="w-full px-4 py-2 bg-primary-dark border border-primary-light/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-danger"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Leverage
              </label>
              <input
                type="number"
                defaultValue="2"
                min="1"
                step="0.1"
                className="w-full px-4 py-2 bg-primary-dark border border-primary-light/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-danger"
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
