import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      toast.success("Account created! You are now logged in.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogleRegister = () => {
    toast.error("Google registration will be available soon");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),transparent_22%),#0a0f1e] p-4 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-36 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-28 w-96 h-96 bg-violet-500/18 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-[0_35px_120px_-35px_rgba(139,92,246,0.8)] backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="hidden lg:block bg-slate-900/80 p-10">
              <div className="relative h-full rounded-[1.5rem] border border-white/5 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.14),transparent_30%)] p-8">
                <div className="space-y-6">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300 font-medium">
                      Start your portfolio
                    </span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-semibold tracking-tight text-white">
                      Create your account
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Build your crypto dashboard with secure sign-up and
                      instant access to market insights.
                    </p>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 text-cyan-300">•</span>
                      <span>Track prices in real time.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 text-cyan-300">•</span>
                      <span>Save your watchlist and alerts.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 text-cyan-300">•</span>
                      <span>Secure wallet-style verification later.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="mb-8 text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
                  NovaFi Account
                </p>
                <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-white">
                  Join NovaFi Today
                </h1>
                <p className="mt-3 text-sm text-slate-400">
                  Create your free account to manage crypto holdings and alerts.
                </p>
              </div>

              <div className="mb-6 rounded-3xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
                🔒 KYC verification required for withdrawals above $10,000.
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="johndoe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-400"
                >
                  Create Account
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-950 px-3 text-slate-400">
                    Or sign up with
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10"
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
                    className="font-semibold text-cyan-300 transition hover:text-cyan-200"
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
