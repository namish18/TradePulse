
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart3, Shield, Zap, TrendingUp, Clock, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark via-primary-darker to-primary-dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-primary-dark/80 backdrop-blur-md border-b border-accent-red/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-red to-primary-blue rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-rajdhani text-white">TradePulse</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#platform" className="text-gray-300 hover:text-white transition-colors">
                Platform
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                className="bg-accent-red hover:bg-accent-red/90 text-white px-6 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-accent-red/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-primary-blue/10 border border-primary-blue/20 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-accent-red" />
                <span className="text-sm font-medium text-gray-300">Real-Time Analytics Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold font-rajdhani leading-tight">
                <span className="text-white">Trade Smarter</span>
                <br />
                <span className="bg-gradient-to-r from-accent-red to-primary-blue bg-clip-text text-transparent">
                  With Real-Time
                </span>
                <br />
                <span className="text-white">Intelligence</span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Advanced trading analytics hub powered by real-time market data streams, 
                comprehensive portfolio tracking, and intelligent risk management.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="group bg-accent-red hover:bg-accent-red/90 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-xl hover:shadow-accent-red/30 flex items-center justify-center space-x-2"
                >
                  <span>Start Trading</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="#platform"
                  className="border-2 border-primary-blue/30 hover:border-primary-blue text-white px-8 py-4 rounded-lg font-semibold transition-all hover:bg-primary-blue/10 flex items-center justify-center"
                >
                  View Platform
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold font-rajdhani text-white">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-rajdhani text-white">&lt;100ms</div>
                  <div className="text-sm text-gray-400">Latency</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-rajdhani text-white">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="relative lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-red/20 to-primary-blue/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-primary-blue/10 to-accent-red/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full flex items-center justify-center">
                <div className="w-full h-full bg-primary-darker/50 rounded-2xl border border-accent-red/20 flex items-center justify-center">
                  <BarChart3 className="w-64 h-64 text-accent-red/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-darker/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-rajdhani text-white mb-4">
              Powerful Features for Professional Traders
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything needed to make informed trading decisions with confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-primary-dark border border-white/5 hover:border-accent-red/30 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-accent-red/10">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-red/20 to-primary-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-accent-red" />
              </div>
              <h3 className="text-2xl font-bold font-rajdhani text-white mb-4">
                Real-Time Data Streams
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Live market data with sub-100ms latency powered by Redpanda streaming infrastructure
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-primary-dark border border-white/5 hover:border-accent-red/30 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-accent-red/10">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-red/20 to-primary-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-accent-red" />
              </div>
              <h3 className="text-2xl font-bold font-rajdhani text-white mb-4">
                Advanced Analytics
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Comprehensive portfolio tracking with PnL analysis, exposure breakdowns, and performance metrics
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-primary-dark border border-white/5 hover:border-accent-red/30 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-accent-red/10">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-red/20 to-primary-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-accent-red" />
              </div>
              <h3 className="text-2xl font-bold font-rajdhani text-white mb-4">
                Risk Management
              </h3>
              <p className="text-gray-400 leading-relaxed">
                VaR calculations, Greeks analysis, stress scenarios, and intelligent alert systems
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="group bg-primary-dark border border-white/5 hover:border-accent-red/30 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-accent-red/10">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-red/20 to-primary-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-accent-red" />
              </div>
              <h3 className="text-2xl font-bold font-rajdhani text-white mb-4">
                GraphQL API
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Flexible GraphQL API with WebSocket subscriptions for real-time updates
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="group bg-primary-dark border border-white/5 hover:border-accent-red/30 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-accent-red/10">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-red/20 to-primary-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-accent-red" />
              </div>
              <h3 className="text-2xl font-bold font-rajdhani text-white mb-4">
                High Performance
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Built on Next.js 15 with edge runtime for blazing-fast global performance
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="group bg-primary-dark border border-white/5 hover:border-accent-red/30 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-accent-red/10">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-red/20 to-primary-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-accent-red" />
              </div>
              <h3 className="text-2xl font-bold font-rajdhani text-white mb-4">
                Live Market Data
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time ticker feeds, order book depth, and historical price charts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-accent-red/10 to-primary-blue/10 border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl lg:text-5xl font-bold font-rajdhani text-white mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of traders leveraging real-time analytics for better decisions
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-accent-red/30 group"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-red to-primary-blue rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-rajdhani text-white">TradePulse</span>
              </div>
              <p className="text-gray-400 text-sm">
                Real-time trading analytics for professional traders
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/market" className="hover:text-white transition-colors">Market Data</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/risk" className="hover:text-white transition-colors">Risk Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 TradePulse. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}