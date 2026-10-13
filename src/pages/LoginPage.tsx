import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, ShieldCheck, Mail, Lock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { signInWithGoogle, loginWithEmail, resetPassword, currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || (isAdmin ? '/admin' : '/dashboard');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Google Sign-in failed', err);
      setErrorMsg(err.message || 'Google authentication could not be completed.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      setErrorMsg(null);
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Email sign-in failed', err);
      setErrorMsg(err.message || 'Invalid email or credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email address to receive password reset instructions.');
      return;
    }
    try {
      setLoading(true);
      setErrorMsg(null);
      await resetPassword(email);
      setResetSent(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#C5A880] to-[#997E59] flex items-center justify-center text-[#0B192C]">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-brand tracking-widest text-lg font-bold uppercase text-[#0B192C]">
              Sandpiper
            </span>
          </Link>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Client & Advisor Sign In
          </h2>
          <p className="text-xs text-stone-500">
            Access saved properties, confidential viewings, and advisory services.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {resetSent && (
          <div className="p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 rounded">
            Password reset link dispatched to {email}. Check your inbox.
          </div>
        )}

        {/* 1. Google 1-Click Sign-in (Primary Firebase Popup) */}
        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs tracking-wider flex items-center justify-center gap-3 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google Account</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-stone-200 w-full" />
          <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-stone-400 font-semibold absolute">
            Or with email
          </span>
        </div>

        {/* 2. Email & Password form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] text-[#C5A880] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#0B192C] text-[#C5A880] hover:text-white rounded text-xs font-bold uppercase tracking-widest transition-all shadow-md disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-600">
          Do not possess an account yet?{' '}
          <Link to="/register" className="text-[#0B192C] font-semibold underline">
            Register as Client
          </Link>
        </div>

        {/* Admin guidance badge */}
        <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-500 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-700 block font-semibold">Administrator Access</strong>
            Signing in with <code>tezpurassam2024@gmail.com</code> automatically activates the privileged administration suite.
          </div>
        </div>
      </div>
    </div>
  );
};
