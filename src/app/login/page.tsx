'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, LogIn, User, Lock, Eye, EyeOff, Shield, Users } from 'lucide-react';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '';

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '로그인에 실패했습니다.');
        setIsLoading(false);
        return;
      }

      // Redirect based on role
      if (redirect) {
        router.push(redirect);
      } else if (data.session.role === 'candidate') {
        router.push('/candidate');
      } else if (data.session.role === 'staff') {
        router.push('/staff');
      } else {
        router.push('/');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (demoId: string, demoPassword: string) => {
    setId(demoId);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--primary)] opacity-5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--accent)] opacity-5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">
            <span className="text-[var(--text-primary)]">Elect</span>
            <span className="text-[var(--primary)]">AI</span>
          </span>
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--border)] p-8">
          <h1 className="text-xl font-bold text-[var(--text-primary)] text-center mb-2">
            관리자 로그인
          </h1>
          <p className="text-sm text-[var(--text-secondary)] text-center mb-6">
            후보자 또는 선거팀 계정으로 로그인하세요
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                아이디
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="아이디를 입력하세요"
                  className="w-full pl-10 pr-4 py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-10 pr-10 py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[var(--danger)] bg-red-50 px-3 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:bg-[var(--primary-dark)] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-tertiary)] text-center mb-3">
              데모 계정으로 빠른 로그인
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleQuickLogin('candidate1', 'demo1234')}
                className="w-full flex items-center gap-3 px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[#F7F9FC] transition text-left"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">후보자 계정</p>
                  <p className="text-xs text-[var(--text-tertiary)]">candidate1 / demo1234</p>
                </div>
              </button>
              <button
                onClick={() => handleQuickLogin('staff1', 'demo1234')}
                className="w-full flex items-center gap-3 px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[#F7F9FC] transition text-left"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">선거팀 계정</p>
                  <p className="text-xs text-[var(--text-tertiary)]">staff1 / demo1234</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
            ← 메인 페이지로 돌아가기
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <div className="w-8 h-8 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
