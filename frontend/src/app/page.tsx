'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks';
import { Header, Footer } from '@/components/common';
import { Button } from '@/components/ui';
import {
  TrendingUp,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Check,
} from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Advanced <span className="text-gradient">Trading Analytics</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Professional-grade risk management and trading analytics platform with
                real-time market data, WebSocket subscriptions, and advanced analytics.
              </p>
              <div className="flex gap-4">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="gap-2">
                      Go to Dashboard <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="#features">
                      <Button size="lg" variant="ghost">
                        Learn More
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-danger opacity-20 blur-3xl rounded-full" />
              <div className="relative glass rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="h-2 bg-gradient-to-r from-primary-light to-danger rounded-full" />
                  <div className="h-32 bg-primary-dark rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-danger opacity-20" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 bg-primary-dark rounded opacity-50" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-primary-light/5 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-300">Everything you need for professional trading</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: 'Real-time Market Data',
                  description:
                    'Live market prices and order book updates via WebSocket connections',
                },
                {
                  icon: BarChart3,
                  title: 'Advanced Analytics',
                  description:
                    'Comprehensive risk metrics, Value at Risk, and stress testing tools',
                },
                {
                  icon: Shield,
                  title: 'Risk Management',
                  description: 'Portfolio exposure tracking and risk limit controls',
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Optimized with Next.js server components and edge runtime',
                },
                {
                  icon: Check,
                  title: 'Enterprise Ready',
                  description: 'Secure authentication, full TypeScript support, and GraphQL API',
                },
                {
                  icon: TrendingUp,
                  title: 'Scalable',
                  description:
                    'Built to handle high-frequency trading and large portfolios',
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="glass p-8 rounded-lg">
                    <div className="w-12 h-12 bg-danger/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-danger" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Modern Tech Stack</h2>
            <p className="text-lg text-gray-300">Built with cutting-edge technologies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Next.js 15',
              'React 19 Server Components',
              'TypeScript',
              'Apollo Client',
              'GraphQL',
              'WebSocket (graphql-ws)',
              'Tailwind CSS 4',
              'Edge Runtime',
              'PostgreSQL',
            ].map((tech) => (
              <div key={tech} className="glass p-4 rounded-lg text-center">
                <p className="text-white font-medium">{tech}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
            <div className="glass rounded-2xl p-12 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-danger opacity-10 rounded-2xl" />
              <div className="relative">
                <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-gray-300 mb-8">
                  Join thousands of traders using our platform
                </p>
                <Link href="/login">
                  <Button size="lg">Start Trading Now</Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
