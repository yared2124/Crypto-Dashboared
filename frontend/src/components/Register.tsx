import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ username, email, password });
      toast.success("Account created! You are now logged in.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-36 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-28 w-96 h-96 bg-purple-500/12 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/90 shadow-[0_35px_120px_-35px_rgba(139,92,246,0.5)] backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Panel - Benefits */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900/60 to-slate-950/80 p-12 border-r border-slate-700/50">
              <div>
                <div className="inline-flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold">
                    ◈
                  </div>
                  <span className="text-xl font-bold text-white">NovaFi</span>
                </div>

                <div className="space-y-8">
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      Get Started
                    </span>
                    <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">
                      Join thousands of traders
                    </h2>
                  </div>

                  <p className="text-base leading-7 text-slate-300">
                    Create your free account and start managing your crypto
                    portfolio with professional tools.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300">
                        Real-time price tracking
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300">
                        Smart price alerts
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300">
                        Portfolio analytics
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 pt-8 border-t border-slate-700/50">
                Fast Setup • Secure • Free
              </div>
            </div>

            {/* Right Panel - Register Form */}
            <div className="p-8 sm:p-10">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Create Account
                </h1>
                <p className="text-sm text-slate-400">
                  Join NovaFi to manage your crypto holdings
                </p>
              </div>

              <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 flex items-start gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 0v2m0-6v-2m0-2h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-amber-100">
                  KYC verification required for withdrawals above $10,000.
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 transition-all"
                    placeholder="johndoe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 mt-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-950 px-3 text-xs font-medium text-slate-400">
                    Or sign up with
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-100 transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign up with Google</span>
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
