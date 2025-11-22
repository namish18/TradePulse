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
    <aside className="hidden lg:flex flex-col w-64 bg-primary-light border-r border-primary-light/20 h-full">
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  active
                    ? 'bg-danger text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-primary-light/20 p-4 space-y-2">
        <p className="text-sm text-gray-300 px-4">{user.email}</p>
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
