'use client';

import Link from 'next/link';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary-dark border-b border-primary-light/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-danger to-primary-light" />
            <span className="text-white">Trading</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {user && (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/dashboard/market" className="text-gray-300 hover:text-white transition-colors">
                  Market
                </Link>
                <Link href="/dashboard/portfolio" className="text-gray-300 hover:text-white transition-colors">
                  Portfolio
                </Link>
                <Link href="/dashboard/risk" className="text-gray-300 hover:text-white transition-colors">
                  Risk
                </Link>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-300">{user.email}</span>
                <Link href="/settings" title="Settings">
                  <Settings className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                </Link>
                <button
                  onClick={() => logout()}
                  title="Logout"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-danger hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-light/20">
            <div className="flex flex-col gap-4">
              {user && (
                <>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/market" className="text-gray-300 hover:text-white transition-colors">
                    Market
                  </Link>
                  <Link href="/dashboard/portfolio" className="text-gray-300 hover:text-white transition-colors">
                    Portfolio
                  </Link>
                  <Link href="/dashboard/risk" className="text-gray-300 hover:text-white transition-colors">
                    Risk
                  </Link>
                  <hr className="border-primary-light/20" />
                  <Link href="/settings" className="text-gray-300 hover:text-white transition-colors">
                    Settings
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="text-left text-gray-300 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-danger hover:bg-red-600 text-white rounded-lg transition-colors text-center"
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
