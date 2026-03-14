"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Building2, Lock, Mail, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const signupResult = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (signupResult.error) {
        setError(signupResult.error.message || "Could not create auth account");
        return;
      }

      const authUserId = signupResult.data?.user?.id;
      if (!authUserId) {
        setError("Auth signup succeeded but user id was not returned");
        return;
      }

      const provisionRes = await fetch("/api/auth/provision-user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          tenantName,
          email,
          authUserId,
        }),
      });

      const payload = await provisionRes.json();
      if (!provisionRes.ok) {
        setError(payload.message || payload.error || "Provisioning failed");
        return;
      }

      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent text-accent px-4">
      <div className="max-w-md w-full bg-primary/90 border border-white/6 rounded-2xl p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-accent">Create account</h1>
          <p className="text-sm text-accent/70">
            Set up your tenant and admin account
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-xs text-accent/70">Full name</span>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-accent/50">
                <User size={16} />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/5 focus:border-accent focus:outline-none"
                placeholder="Jane Admin"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs text-accent/70">Tenant name</span>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-accent/50">
                <Building2 size={16} />
              </span>
              <input
                type="text"
                required
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/5 focus:border-accent focus:outline-none"
                placeholder="Acme Corp"
              />
            </div>
          </label>

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
                placeholder="At least 8 characters"
              />
            </div>
          </label>

          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-lg bg-secondary cursor-pointer text-accent font-semibold hover:brightness-95 transition"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          {error ? (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          ) : null}

          <p className="text-sm text-accent/70 text-center pt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline hover:text-accent">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
