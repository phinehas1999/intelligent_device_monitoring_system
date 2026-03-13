"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: wire this to your auth client / API
      console.log("submit", { email, password });
      // simulate delay
      await new Promise((r) => setTimeout(r, 600));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent text-accent px-4">
      <div className="max-w-md w-full bg-primary/90 border border-white/6 rounded-2xl p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-accent">IDMS</h1>
          <p className="text-sm text-accent/70">Sign in to your account</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-xs text-accent/70">Email</span>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-accent/50">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/5 focus:border-accent focus:outline-none"
                placeholder="you@company.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs text-accent/70">Password</span>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-accent/50">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/5 focus:border-accent focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </label>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-accent" />
              <span className="text-accent/70">Remember me</span>
            </label>
            <Link
              href="/forgot"
              className="text-sm text-accent/60 hover:text-accent"
            >
              Forgot?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-lg bg-accent text-primary font-semibold hover:brightness-95 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-accent/70">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
