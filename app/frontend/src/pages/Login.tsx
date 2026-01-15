import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from '@/components/ui/alert';
import { ArrowRight, Mail, Lock, Apple, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('비밀번호 재설정을 위해 이메일을 입력해주세요.');
      return;
    }

    try {
      const { resetPassword } = await import('@/contexts/AuthContext');
      const auth = useAuth();
      await auth.resetPassword(email);
      alert('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
    } catch (err: any) {
      setError(err.message || '비밀번호 재설정에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-[#D2D2D7] dark:border-[#3A3A3C]">
        <div className="container-apple">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#0071E3] transition-colors duration-200"
            >
              대표님 AI
            </button>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8 opacity-0 animate-fade-in-up">
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
              로그인
            </h1>
            <p className="text-lg text-[#6E6E73] dark:text-[#98989D]">
              대표님 AI에 오신 것을 환영합니다
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                이메일
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868B]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-apple pl-12"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                비밀번호
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#86868B]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-apple pl-12"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#D2D2D7] dark:border-[#3A3A3C] text-[#0071E3] focus:ring-[#0071E3]"
                />
                <span className="text-[#1D1D1F] dark:text-[#F5F5F7]">로그인 상태 유지</span>
              </label>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="link-apple text-sm"
              >
                비밀번호 찾기
              </button>
            </div>

            <Button
              type="submit"
              className="btn-apple-primary w-full text-lg py-4 min-h-[52px] relative"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  로그인 중...
                </div>
              ) : (
                <>
                  로그인 <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D2D2D7] dark:border-[#3A3A3C]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-black text-[#6E6E73] dark:text-[#98989D]">또는</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-[#1D1D1F] dark:hover:bg-[#F5F5F7] rounded-full py-3 min-h-[48px] transition-all duration-300"
            >
              <Apple className="mr-2 h-5 w-5" />
              Apple로 계속하기
            </Button>
            <Button
              type="button"
              className="w-full bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] border-2 border-[#D2D2D7] dark:border-[#3A3A3C] hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-full py-3 min-h-[48px] transition-all duration-300"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 계속하기
            </Button>
          </div>

          <p className="text-center text-sm text-[#6E6E73] dark:text-[#98989D]">
            로그인하면{' '}
            <a href="#" className="link-apple">이용약관</a>
            {' '}및{' '}
            <a href="#" className="link-apple">개인정보처리방침</a>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
