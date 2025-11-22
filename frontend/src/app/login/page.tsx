import { LoginForm } from '@/components/auth';
import { Header } from '@/components/common';
import Link from 'next/link';

export const metadata = {
  title: 'Login - Trading Platform',
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-primary-dark flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="glass rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to your account</p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-danger hover:text-red-400 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary-light/10 rounded-lg border border-primary-light/20">
            <p className="text-sm text-gray-400">
              <strong>Demo credentials:</strong> Use any email and password for testing
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
