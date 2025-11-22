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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary-dark)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '5rem',
            paddingBottom: '5rem',
            maxWidth: '80rem',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <h1 style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--color-white)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Advanced <span className="text-gradient">Trading Analytics</span>
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-300)', marginBottom: '2rem', lineHeight: '1.6' }}>
                Professional-grade risk management and trading analytics platform with
                real-time market data, WebSocket subscriptions, and advanced analytics.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button size="lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Go to Dashboard <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
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
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, var(--color-primary-light), var(--color-danger))',
                  opacity: 0.2,
                  filter: 'blur(80px)',
                  borderRadius: '9999px',
                }}
              />
              <div
                className="glass"
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-2xl)',
                  padding: '2rem',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ height: '0.5rem', background: 'linear-gradient(to right, var(--color-primary-light), var(--color-danger))', borderRadius: '9999px' }} />
                  <div
                    style={{
                      height: '8rem',
                      backgroundColor: 'var(--color-primary-dark)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <BarChart3 style={{ width: '4rem', height: '4rem', color: 'var(--color-danger)', opacity: 0.2 }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{ height: '2rem', backgroundColor: 'var(--color-primary-dark)', borderRadius: 'var(--radius-md)', opacity: 0.5 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          style={{
            backgroundColor: 'rgba(2, 6, 111, 0.05)',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '5rem',
            paddingBottom: '5rem',
          }}
        >
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--color-white)', marginBottom: '1rem' }}>
                Powerful Features
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-300)' }}>
                Everything you need for professional trading
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              }}
            >
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
                  <div key={i} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ width: '3rem', height: '3rem', backgroundColor: 'rgba(255, 7, 58, 0.1)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon style={{ width: '1.5rem', height: '1.5rem', color: 'var(--color-danger)' }} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-white)', marginBottom: '0.5rem' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: 'var(--color-gray-400)' }}>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section
          style={{
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '5rem',
            paddingBottom: '5rem',
            maxWidth: '80rem',
            margin: '0 auto',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--color-white)', marginBottom: '1rem' }}>
              Modern Tech Stack
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-300)' }}>
              Built with cutting-edge technologies
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {[
              'Next.js 15',
              'React 19 Server Components',
              'TypeScript',
              'Apollo Client',
              'GraphQL',
              'WebSocket (graphql-ws)',
              'Pure CSS (No Tailwind)',
              'Edge Runtime',
              'PostgreSQL',
            ].map((tech) => (
              <div key={tech} className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-white)', fontWeight: '500' }}>{tech}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section
            style={{
              position: 'relative',
              overflow: 'hidden',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '5rem',
              paddingBottom: '5rem',
              maxWidth: '80rem',
              margin: '0 auto',
            }}
          >
            <div
              className="glass"
              style={{
                borderRadius: 'var(--radius-2xl)',
                padding: '3rem',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, var(--color-primary-light), var(--color-danger))',
                  opacity: 0.1,
                  borderRadius: 'var(--radius-2xl)',
                }}
              />
              <div style={{ position: 'relative' }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--color-white)', marginBottom: '1rem' }}>
                  Ready to Get Started?
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-300)', marginBottom: '2rem' }}>
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
