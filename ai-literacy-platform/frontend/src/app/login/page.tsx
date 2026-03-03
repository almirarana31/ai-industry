'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth.store';
import { authAPI, setAccessToken } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setTokens, isAuthenticated } = useAuthStore();
  const toast = useToast();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authAPI.login(email, password);

      if (response.success && response.data) {
        setUser(response.data.user);
        setTokens(response.data.accessToken, response.data.refreshToken);
        setAccessToken(response.data.accessToken);
        toast.success('Welcome back!', `Logged in as ${response.data.user.firstName}`);
        router.push('/dashboard');
      } else {
        setError(response.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-ai-purple/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-ai-purple rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 8V4H8"/>
              <rect width="16" height="12" x="4" y="8" rx="2"/>
              <path d="M2 14h2"/>
              <path d="M20 14h2"/>
              <path d="M15 13v2"/>
              <path d="M9 13v2"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">AI Literacy Platform</h1>
          <p className="text-slate-400 mt-2">
            Enterprise AI training for responsible innovation
          </p>
        </div>

        {/* Login form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <p className="text-xs font-medium text-slate-400 mb-2">Demo Credentials</p>
          <div className="space-y-1 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Employee:</span> john.doe@globaltech.com
            </p>
            <p>
              <span className="text-slate-500">Manager:</span> sarah.chen@globaltech.com
            </p>
            <p>
              <span className="text-slate-500">Admin:</span> admin@globaltech.com
            </p>
            <p className="text-slate-500 text-xs mt-2">Password: Demo123!</p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary-400 hover:text-primary-300">
            Request access
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
